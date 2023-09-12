'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import './LendingPage.scss'
import { countRepayment, shortenString } from '@/services/helper'

import { Button, InputNumber, Progress, Select, Space, Table, Tag, Divider, Spin, Modal, Result} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import appApi from '@/api/appAPI'
import { useParams, useRouter } from 'next/navigation'
import { LendingCT, NFTBaseCT } from '@/constants/addressContract'
import { useAppSelector } from '@/state/hook'
import { getERC20Contract, getLendingContract } from '@/services/blockchain'
import { ERC2Data } from '@/contracts/ERC20'

interface DataType {
  key: string;
  principal: number;
  apr: number;
  term: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Principal',
    dataIndex: 'principal',
    key: 'principal',
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.principal - b.principal,

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
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Accept</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    principal: 1500,
    apr: 15,
    term: '2 month',
    tags: ['0x9A3281751c620B6c9528c9811abd8903b9B8c23f'],
  },
  {
    key: '2',
    principal: 1500,
    apr: 17,
    term: '70 days',
    tags: ['0x6225D07A59be4F47400E8885d8EFC78FF7D9e171'],
  },
  {
    key: '3',
    principal: 2000,
    apr: 20,
    term: '60 days',
    tags: ['0xa42c95Ba5fCEC7f56697b5c7Ecc55E55F4A1FE7E'],
  },
  {
    key: '4',
    principal: 2000,
    apr: 13,
    term: '30 days',
    tags: ['0x4bC523b9950dfc1d32f519e32242e2C5f835853A'],
  },
  {
    key: '5',
    principal: 2000,
    apr: 12,
    term: '1 month',
    tags: ['0xaa1cF60f29Ce05B80B23788E58A99b9a617BA52b'],
  },
];

interface IOffer {
  principal: number | null,
  principalType: string | null,
  apr: number | null,
  duration: number | null,
  durationType: string | null,
  repayment: number | null
}

const getRepayment = (offer: IOffer) => {
  if (offer.apr && offer.principal && offer.duration && offer.durationType) {
    return countRepayment(offer.apr, offer.principal, offer.duration, offer.durationType)
  }
  else return null
}

const LendingPage = () => { 
  const [percent, setPercent] = useState(0);
  const [offer, setOffer] = useState<IOffer>({
    principal: 0,
    principalType: 'USDT',
    apr: 0,
    duration: 0,
    durationType: 'day',
    repayment: 0,
  })
  const urlParams = useParams();
  const [dataLoan, setDataLoan] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState(false)

  const router = useRouter()
  const fetchDataLoan = async () => {
    const data = await appApi.getLoan(String(urlParams.id))
    setDataLoan(data.data)
    console.log(data)
  }
  
  useEffect(() => {
    const myInterval = setInterval(() => {
      setPercent((prev) => prev < 60 ? prev + 2 : prev )
    }, 10)

    fetchDataLoan()
  }, [])

  useEffect(() => {
    setOffer({...offer, repayment: getRepayment(offer)})
    console.log('vcl')
  }, [offer.apr, offer.principal, offer.duration, offer.durationType])


  const {appState, userState} = useAppSelector(state => state)
  const acceptLoan = async () => {
    if (!userState.isAuthenticated) {
      alert("Connect wallet before faucet token");
      return;
    }
    setLoading(true)

    const LendContract = getLendingContract(appState.web3, LendingCT)
    const ERC20Contract = getERC20Contract(appState.web3, dataLoan.principalAddress)

    try {
      const approveReceipt = await ERC20Contract.methods.approve(LendingCT, BigInt(dataLoan.principal * 1000000000000000000)).send({from: userState.address})

      const acceptTermMethod = LendContract.methods.acceptTerm(dataLoan.loanID)
      const acceptTermReceipt = await acceptTermMethod.send({from: userState.address})
      console.log(acceptTermReceipt)
      await appApi.acceptLoan({ 
        id: dataLoan.loanID,
      })
      setOpenModal(true)
    } catch (error) {
      console.log(error)        
    }
    setLoading(false)
  }

  return (
    <div className='app-lendingpage'>
        <div className='app-lendingpage--left'>
            <div className='info-lend'>
              <div className='info-lend--header'>
                <p>Loan detail</p>

                <div className='id-due'>
                  <p>ID: {dataLoan._id || ''}</p>
                  <p>Due: 14 Aug 23 / 11:47 AM</p>
                </div>
              </div>

              <div className='info-lend--content'>
                <div className='info-nft'>
                  <img 
                    alt="NFT" 
                    width={200}
                    height={200}
                    style={{borderRadius: 10}}
                    src={dataLoan.nft ? dataLoan.nft.image : ""} 
                  />  
                  <div className='info-nft--list-props'>
                    <p className='info-nft--name'>Starbuck NFT</p>
                    <div>
                      <p className='info-nft--prop'>Token ID: <span>{dataLoan.nft ? dataLoan.nft.tokenID : '' }</span></p>
                      <p className='info-nft--prop'>Contract address:  <span>{shortenString(NFTBaseCT,6,8)}</span> </p>
                      <p className='info-nft--prop'>Token Standard: <span>  ERC-721 </span> </p>
                      <p className='info-nft--prop'>Last updated:  <span> 1 month ago </span> </p>
                    </div>
                  </div>
                </div>
                <div className='info-lend-items'>
                  <div style={{marginRight: 10}}>
                    <div className='info-lend-item'>
                      <span>Principal </span> 
                      {dataLoan.principal || ''} {dataLoan.principalType || ''}
                    </div>
                    <div className='info-lend-item'>
                      <p>APR</p>
                      <p> {dataLoan.apr}%</p> 
                    </div>
                  </div>
                  <div>
                    <div className='info-lend-item'>
                      <p>Term</p>
                      <p>10 days</p>
                    </div>
                    <div className='info-lend-item'>
                      <p>Repayment</p> 
                      <p>{Number(dataLoan.repayment).toFixed(2)  || ''} {dataLoan.principalType || ''}</p>
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
                dataSource={data} 
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
                  className='ation-input-number'
                  addonBefore={<p className='action--content-addon'>Principal</p>}
                  addonAfter={(
                    <Select style={{width: 100, color: 'white', fontWeight: 600}} value={offer.durationType} onChange={(value : string) => setOffer({...offer, durationType: value})}>
                      <Select.Option value="usdc">USDT</Select.Option>
                      <Select.Option value="usdc">USDC</Select.Option>
                      <Select.Option value="klay">KLAY</Select.Option>
                    </Select>
                  )}
                  onChange={(value : (number | null)) => setOffer({...offer, principal: value})}
                />
                <InputNumber
                  addonBefore={<p className='action--content-addon'>Apr</p>}
                  addonAfter={<p style={{color: 'white', fontWeight: 600}}>%</p>}
                  size='large'
                  className='ation-input-number'
                  controls={false}
                  onChange={(value : (number | null)) => setOffer({...offer, apr: value})}
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
                  onChange={(value : (number | null)) => setOffer({...offer, duration: value})}
                  controls={false}
                  size='large'
                  className='ation-input-number'
                />
              </div>
              <p className='repayment'>Repayment: {offer.repayment} {offer.principalType} </p>
              <div className="button-create" onClick={() => console.log(offer)}>Create offer</div>
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