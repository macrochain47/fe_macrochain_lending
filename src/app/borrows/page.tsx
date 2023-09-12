/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import { getLendingContract, getNFTBaseContract } from '@/services/blockchain'
import { Button, InputNumber, Modal, Result, Select, Spin } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

import './Borrow.scss'
import { countRepayment } from '@/services/helper'
import NFTAsset from '@/components/borrow'
import { useAppSelector } from '@/state/hook'
import { LendingCT, NFTBaseCT, USDC_CT, USDT_CT } from '@/constants/addressContract'
import appApi from '@/api/appAPI'
import { useRouter } from 'next/navigation'

interface ITermProps {
  principal: number | null;
  principalType: string;
  principalAddress: string;
  apr: number | null;
  duration: number;
  durationType: string ;
  openForOffer: boolean;
  repayment: number | null;
}

const Borrow = () => {
  const { userState, appState } = useAppSelector(state => state)
  const [myNFTs, setMyNFTs] = useState([])
  const [nft, setNft] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [term, setTerm] = useState<ITermProps>({
    principal: 0,
    principalType: 'USDT',
    principalAddress: USDT_CT,
    apr: 0,
    duration: 0,
    durationType: 'day',
    openForOffer: true,
    repayment: 0,
  })
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const func = async () => {
      const data = await appApi.getMyNFT()

      const myNFTs = data.data.filter((nft : any) => nft.status === 'default')
      console.log(myNFTs)
      myNFTs.reverse()
      console.log(myNFTs)

      setMyNFTs(myNFTs)
    }
    func()
  }, [])

  useEffect(() => {
    if (term.principal && term.apr && term.duration){
      setTerm({...term, repayment: countRepayment(term.principal, term.apr, term.duration, term.durationType)})
    }
  }, [term.principal, term.principalType, term.apr, term.duration, term.durationType])
  
  const handleClickSelectNFT = (data : any) => {
    setNft(data)
  }

  const clickLendNFT = async () => {
    if (!userState.isAuthenticated) {
      alert("Connect wallet before faucet token");
      return;
    }
    setLoading(true)
    const loanID = Math.floor(Math.random() * 1000000000)
    const LendingContract = getLendingContract(appState.web3, LendingCT) 
    const NFTBaseContract = getNFTBaseContract(appState.web3, NFTBaseCT)
    
    try {
      const approveMethod = NFTBaseContract.methods.approve(LendingCT, nft.tokenID)
    
      await approveMethod.send({from: userState.address})
  
      const createLoanMethod = LendingContract.methods.listLoan(
        NFTBaseCT,
        loanID,
        (term.durationType === 'day' ? term.duration : (term.durationType === 'week' ? Number(term.duration) * 7 : Number(term.duration) * 30)),
        nft.tokenID,
        term.principalAddress,
        BigInt(Number(term.principal) * 1000000000000000000),
        term.apr,
      )
  
      await createLoanMethod.send({from: userState.address})
  
      await appApi.createLoan({
        nftID: nft._id,
        loanID: loanID,
        valuation: nft.valuation,
        principal: term.principal,
        principalType: term.principalType,
        principalAddress: term.principalAddress,
        apr: term.apr,
        duration: term.duration,
        durationType: term.durationType,
        repayment: term.repayment
      })
      setOpenModal(true)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)

  }

  return (
    <div className='app-borrow'>
      <header className='header'>Collateral & Asset</header>

      <div className='content'>
        <div className='app-borrow-nfts'>
          {
            myNFTs.map((nft, index) => (
              <div onClick={() => handleClickSelectNFT(nft)}>
                <NFTAsset data={nft} />
              </div>
            ))
          }
        </div>
        {
          <div className='app-borrow-info'>
            
            <div className='action'>
              <div className='action--header'>
                <p>Collateral</p>
              </div>
              {
                nft != null &&
                <>  
                  <div className='collateral'>
                    <img src={nft.image} 
                      alt="azuki" 
                      width={100} 
                      height={100}
                      className='img-collateral'
                    />

                    <div>
                      <p className='nft-name'>{nft.tokenName}</p>
                      <p className='info-nft--prop'>Token ID: <span>#000{nft.tokenID}</span></p>
                      <p className='info-nft--prop'>Contract address:  <span> 0x5af0...25a5  </span> </p>

                      <p className='info-nft--evaluation'>${nft.valuation} USD</p>
                    </div>


                    <div className='btn-info'>
                      <InfoCircleOutlined className='btn-info--icon'/>
                    </div>
                  </div>
                </>
              }
              <div className='action--header'>
                  <p>Set term</p>
              </div>
              <div className='action--content'>
                <InputNumber
                  size='large'
                  className='ation-input-number'
                  addonBefore={<p className='action--content-addon'>Principal</p>}
                  addonAfter={(
                    <Select style={{width: 100, color: 'white', fontWeight: 600}} value={term.principalType} onChange={(value : string) => setTerm({...term, principalType: value, principalAddress: value === "USDT" ? USDT_CT : ( value === "USDC" ? USDC_CT : '')})}>
                      <Select.Option value="USDT">USDT</Select.Option>
                      <Select.Option value="USDC">USDC</Select.Option>
                      <Select.Option value="KLAY">KLAY</Select.Option>
                    </Select>
                  )}
                  controls={false}
                  onChange={(value : (number | null)) => setTerm({...term, principal: value})}
                />
                <InputNumber
                  addonBefore={<p className='action--content-addon'>Apr</p>}
                  addonAfter={<p style={{color: 'white', fontWeight: 600}}>%</p>}
                  size='large'
                  className='ation-input-number'
                  controls={false}
                  onChange={(value : (number | null)) => setTerm({...term, apr: value})}
                />
                <InputNumber
                  addonBefore={<p className='action--content-addon'>Duration</p>}
                  addonAfter={(
                    <Select style={{width: 140, color: 'white', fontWeight: 600}} value={term.durationType} onChange={(value : string) => setTerm({...term, durationType: value})}>
                      <Select.Option value="day">days</Select.Option>
                      <Select.Option value="week">weeks</Select.Option>
                      <Select.Option value="month">months</Select.Option>
                    </Select>
                  )}
                  onChange={(value : (number | null)) => setTerm({...term, duration: Number(value)})}
                  controls={false}
                  size='large'
                  className='ation-input-number'
                />
              </div>
              <p className='repayment'>Repayment: {term.repayment} {term.principalType} </p>
              <div className="button-create" onClick={clickLendNFT}>{loading ? <Spin />: 'Borrow'}</div>
            </div>
          </div>
        }
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
          title="Successfully Listed Your Asset!"
          subTitle="Order number: 2017182818828182881. Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button type="primary" key="console" onClick={() => router.replace('/')}>
              Go Home
            </Button>
          ]}
        />
      </Modal>
    </div>
  )
}

export default Borrow