'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import './LendingPage.scss'
import { countRepayment, getAddressOfStableCoin, shortenString } from '@/services/helper'

import { Button, InputNumber, Progress, Select, Space, Table, Tag, Divider, Spin, Modal, Result} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import appApi from '@/api/appAPI'
import { useParams, useRouter } from 'next/navigation'
import { useAppSelector } from '@/state/hook'
import { getERC20Contract, getLendingContract } from '@/services/blockchain'
import { ERC721CT_Address, LendingCT_Address, USDT_CT_Address } from '@/constants/addressContract'
import { v4 as uuidv4 } from 'uuid'

interface DataType {
  key: string;
  principal: number;
  principalType: string;
  apr: number;
  term: string;
  tags: string[];
  offerID: string;
  offer_id: string;
  
}



interface IOffer {
  principal: number,
  principalType: string,
  principalAddress: string,
  apr: number,
  duration: number,
  durationType: string,
  repayment: number
}


const LendingPage = () => { 
  const [percent, setPercent] = useState(0);
  const [offer, setOffer] = useState<IOffer>({
    principal: 0,
    principalType: 'USDT',
    principalAddress: USDT_CT_Address,
    apr: 0,
    duration: 0,
    durationType: 'day',
    repayment: 0,
  })

  const [listOffer, setListOffer] = useState<any>([])
  const urlParams = useParams();
  const [dataLoan, setDataLoan] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()

  const fetchDataLoan = async () => {
    const data = await appApi.getLoan(String(urlParams.id))
    setDataLoan(data.data)
    console.log(data.data)
    const offers = await appApi.getOfferOfLoan(String(urlParams.id))
    const curOffer : DataType[] = offers.data.map((item : any, index: number) => {
      return {
        key: String(index),
        principal: String(item.principal + " " + item.principalType),
        apr: item.apr,
        term: `${item.duration} ${item.durationType}`,
        tags: [item.lender.address],
        offerID: item.offerID,
        offer_id: item._id
      }
      }
    )
    console.log(curOffer)
    setListOffer(curOffer)
  }
  
  useEffect(() => {
    const myInterval = setInterval(() => {
      setPercent((prev) => prev < 60 ? prev + 2 : prev )
    }, 10)

    fetchDataLoan()
  }, [])

  useEffect(() => {
    setOffer({...offer, repayment: Number(countRepayment(offer.principal, offer.apr, offer.duration, offer.durationType))})
  }, [offer.apr, offer.principal, offer.duration, offer.durationType])


  const {appState, userState} = useAppSelector(state => state)


  const acceptLoan = async () => {
    if (!userState.isAuthenticated) {
      alert("Connect wallet before faucet token");
      return;
    }

    setLoading(true)
    const LendContract = getLendingContract(appState.web3)
    const ERC20Contract = getERC20Contract(appState.web3, dataLoan.defaultOffer.principalAddress)
    try {
      const approveReceipt = await ERC20Contract.methods
        .approve(LendingCT_Address, BigInt(dataLoan.defaultOffer.principal * 1000000000000000000))
        .send({from: userState.address})

      const startLendRecipt = await LendContract.methods
        .startLending(dataLoan.loanID)
        .send({from: userState.address})

      await appApi.startLend(dataLoan.loanID)
      setOpenModal(true)
      
    } catch (error) {
      console.log(error)        
    }
    setLoading(false)
  }

  const offerLoan = async () => {
    if (!userState.isAuthenticated) {
      alert("Connect wallet to continue");
      return;
    }

    if (offer.principal == 0 || offer.apr == 0 || offer.duration == 0 || offer.durationType == '') {
      alert("Please fill all fields");
      return;
    }
    const LendContract = getLendingContract(appState.web3)
    const ERC20Contract = getERC20Contract(appState.web3, String(offer.principalAddress))
    const offerID = appState.web3.utils.keccak256(uuidv4())
    try {
      await ERC20Contract.methods
        .approve(LendingCT_Address, BigInt(Number(offer.principal)* 1000000000000000000))
        .send({from: userState.address})

      await LendContract.methods
        .offerLoanTerm(
          dataLoan.loanID,
          offerID,
          BigInt(offer.principal* 1000000000000000000),
          offer.apr,
          (offer.durationType === 'day' ? offer.duration : (offer.durationType === 'week' ? Number(offer.duration) * 7 : Number(offer.duration) * 30)),
          offer.principalAddress
        ).send({from: userState.address})
    
      await appApi.makeOffer({
        loanID: dataLoan._id,
        offerID: offerID,
        principal: offer.principal,
        principalType: String(offer.principalType),
        principalAddress: String(offer.principalAddress),
        apr: offer.apr,
        duration: offer.duration,
        durationType: offer.durationType,
        repayment: Number(offer.repayment)
      })
      setOpenModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  const acceptOffer = async (tags : any) => {
    if (!userState.isAuthenticated) {
      alert("Connect wallet to continue");
      return;
    }
    const LendContract = getLendingContract(appState.web3)
    try {
      await LendContract.methods
        .startBorrowing(dataLoan.loanID, tags.offerID)
        .send({from: userState.address})

      await appApi.startBorrow({loanID: dataLoan._id, offerID: tags.offer_id})
      setOpenModal(true)
    } catch (error) {
      console.log(error)
    }
  }


  const columns: ColumnsType<DataType> = [
    {
      title: 'Principal',
      dataIndex: 'principal',
      key: 'principal',
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => Number(a.principal) - Number(b.principal),
    },
    {
      title: 'APR',
      dataIndex: 'apr',
      key: 'apr',
      render: (number) => <p>{number}%</p>,
      sorter: (a, b) => a.apr - b.apr,
    },
    {
      title: 'Term',
      dataIndex: 'term',
      key: 'term',
      sorter: (a, b) => a.term.length - b.term.length,
    },
    {
      title: 'Lender',
      key: 'Lender',
      dataIndex: 'tags',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Action',
      key: 'tags',
      render: (tags) => (
        <Space size="middle">
          {
            userState.address == dataLoan.borrower.address &&
            <a onClick={() => acceptOffer(tags)}>Accept</a>
          }
          {
            userState.address == tags.tags[0] &&
            <a>Delete</a>
          }
        </Space>
      ),
    },
  ];

  return (
    <div className='app-lendingpage'>
        <div className='app-lendingpage--left'>
            <div className='info-lend'>
              <div className='info-lend--header'>
                <p>Loan detail</p>

                <div className='id-due' style={{marginBottom: -20}}>
                  <p>ID: <span>#{dataLoan._id || ''}</span></p>
                  <p>Borrower: <span>{dataLoan.borrower ? shortenString(dataLoan.borrower.address, 10, 8) : ''}</span></p>
                </div>
              </div>

              <div className='info-lend--content'>
                <div className='info-nft'>
                  <img 
                    alt="NFT" 
                    width={200}
                    height={220}
                    style={{borderRadius: 10, objectFit: 'cover'}}
                    src={dataLoan.asset ? dataLoan.asset.image : ""} 
                  />  
                  <div className='info-nft--list-props'>
                    <p className='info-nft--name'>{dataLoan.asset && dataLoan.asset.tokenName}</p>
                    <div>
                      <p className='info-nft--prop'>Token ID: <span>#0000{dataLoan.asset ? dataLoan.asset.tokenID : '' }</span></p>
                      <p className='info-nft--prop'>Contract address:  <span>{shortenString(ERC721CT_Address,6,8)}</span> </p>
                      <p className='info-nft--prop'>Token Standard: <span>  ERC-721 </span> </p>
                      <p className='info-nft--prop'>Last updated:  <span> 1 month ago </span> </p>
                    </div>
                  </div>
                </div>
                <div className='info-lend-items'>
                  <div style={{marginRight: 10}}>
                    <div className='info-lend-item'>
                      <span>Principal </span> 
                          
                        {dataLoan.defaultOffer && dataLoan.defaultOffer.principal || ''} {dataLoan.defaultOffer && dataLoan.defaultOffer.principalType || ''}
                    </div>
                    <div className='info-lend-item'>
                      <p>APR</p>
                      <p> { dataLoan.defaultOffer && dataLoan.defaultOffer.apr}%</p> 
                    </div>
                  </div>
                  <div>
                    <div className='info-lend-item'>
                      <p>Term</p>
                      <p>{ dataLoan.defaultOffer && dataLoan.defaultOffer.duration} { dataLoan.defaultOffer && dataLoan.defaultOffer.durationType}</p>
                    </div>
                    <div className='info-lend-item'>
                      <p>Repayment</p> 
                      <p>{Number( dataLoan.defaultOffer && dataLoan.defaultOffer.repayment).toFixed(2)  || ''} { dataLoan.defaultOffer && dataLoan.defaultOffer.principalType || ''}</p>
                    </div>
                  </div>
                </div>
                <div className="button-create" onClick={acceptLoan}>{loading ? <Spin /> : 'Accept Loan'}</div>
              </div>
            </div>

            <div className='offer'>
            <div className='offer--header'>
              <p>Open offer</p>
            </div>
            <div className='offer--table'>
              <Table
                columns={columns} 
                dataSource={listOffer} 
                bordered={false}
                pagination={false}
              />
            </div>
          </div>
        </div>

        <div className='app-lendingpage--right'>
            <div className='action'>
              <div className='action--header'>
                  <p>Make an offer</p>
              </div>
              <div className='action--content'>
                <InputNumber
                  size='large'
                  controls={false}
                  className='ation-input-number'
                  addonBefore={<p className='action--content-addon'>Principal</p>}
                  addonAfter={(
                    <Select style={{width: 100, color: 'white', fontWeight: 600}} value={offer.principalType} 
                      onChange={(value : string) => setOffer({...offer, principalType: value, principalAddress: getAddressOfStableCoin(value)})}>
                      <Select.Option value="USDT">USDT</Select.Option>
                      <Select.Option value="USDC">USDC</Select.Option>
                      <Select.Option value="KLAY">KLAY</Select.Option>  
                    </Select>
                  )}
                  onChange={(value : (number | null)) => setOffer({...offer, principal: Number(value)})}
                />
                <InputNumber
                  addonBefore={<p className='action--content-addon'>Apr</p>}
                  addonAfter={<p style={{color: 'white', fontWeight: 600}}>%</p>}
                  size='large'
                  className='ation-input-number'
                  controls={false}
                  onChange={(value : (number | null)) => setOffer({...offer, apr: Number(value)})}
                />
                <InputNumber
                  addonBefore={<p className='action--content-addon'>Duration</p>}
                  addonAfter={(
                    <Select style={{width: 140, color: 'white', fontWeight: 600}} value={offer.durationType} onChange={(value : string) => setOffer({...offer, durationType: value})}>
                      <Select.Option value="day">days</Select.Option>
                      <Select.Option value="week">weeks</Select.Option>
                      <Select.Option value="month">months</Select.Option>
                    </Select>
                  )}
                  onChange={(value : (number | null)) => setOffer({...offer, duration: Number(value)})}
                  controls={false}
                  size='large'
                  className='ation-input-number'
                />
              </div>
              <p className='repayment'>Repayment: {offer.repayment} {offer.principalType} </p>
              <div className="button-create" onClick={offerLoan}>Make offer</div>
            </div>

            <div className='user-info'>
              <div className='user-info--header'>
                <p>Borrower</p>
              </div>
                    
              <div className='user-info-borrow'>
                <p className='title'>Borrow statistics</p>
                <div className='content'>
                  <Progress size={80} type="circle" 
                    strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                    percent={percent} format={(percent) => `${percent}%`} 
                    className='content--progress'/>
                  <div className='content-item'>
                    <p className='content-item--title'>Total repaided</p>
                    <p className='content-item--text'>15.000$ of 20.0000$</p>
                  </div>
                  <Divider type='vertical' className='divider'/>
                  <div>
                    <p className='content-item--title'>APR</p>
                    <p className='content-item--text'>~10%</p>
                  </div>
                </div>
              </div>

              <div className='user-info-borrow'>
                <p className='title'>Lend statistics</p>
                <div className='content'>
                  <Progress size={80} type="circle" 
                    strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                    percent={percent} format={(percent) => `${percent}%`} 
                    className='content--progress'/>
                  <div className='content-item'>
                    <p className='content-item--title'>Total repaided</p>
                    <p className='content-item--text'>15.000$ of 20.0000$</p>
                  </div>
                  <Divider type='vertical' className='divider'/>
                  <div>
                    <p className='content-item--title'>APR</p>
                    <p className='content-item--text'>~10%</p>
                  </div>
                </div>
              </div>

            </div>
        </div>
        <Modal title="Notification" open={openModal} centered 
                width={800 - 32}
                closable={true}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{style: {display: 'none'}}}
                onCancel={() => setOpenModal(false)}
            >
        <Result
          status="success"
          title="Successfully Granted a Loan"
          subTitle="Order number: 2017182818828182881. Check it in your profile."
          extra={[
            <Button type="primary" key="console" onClick={() => router.replace('/')}>
              Go Home
            </Button>,
          ]}
        />
      </Modal>
    </div>
  )
}

export default LendingPage