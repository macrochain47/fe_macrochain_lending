/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import { getLendingContract } from '@/services/blockchain'
import { InputNumber, Select } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

import './Borrow.scss'
import { countRepayment } from '@/services/helper'
import NFTAsset from '@/components/borrow'
import { useAppSelector } from '@/state/hook'
import { LendingCT, NFTBaseCT, USDC_CT, USDT_CT } from '@/constants/addressContract'
import appApi from '@/api/appAPI'
import { v4 as uuidv4 } from 'uuid';

interface ITermProps {
  principal: number | null;
  principalType: string;
  principalAddress: string;
  apr: number | null;
  duration: number | null;
  durationType: string ;
  openForOffer: boolean;
  repayment: number | null;
}

const Borrow = () => {
  const { userState, appState } = useAppSelector(state => state)
  const [myNFTs, setMyNFTs] = useState([])
  const [nft, setNft] = useState<any>(null)

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

  useEffect(() => {
    const func = async () => {
      const myNFTs = await appApi.getMyNFT()
      setMyNFTs(myNFTs.data.filter((nft : any) => nft.status === 'default'))
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

    console.log({
      nftID: nft._id,
      loanID: uuidv4(),
      valuation: nft.valuation,
      princial: term.principal,
      principalType: term.principalType,
      principalAddress: term.principalAddress,
      apr: term.apr,
      duration: term.durationType === 'day' ? term.duration : (term.durationType === 'week' ? Number(term.duration) * 7 : Number(term.duration) * 30),
    })

    await appApi.createLoan({
      nftID: nft._id,
      loanID: uuidv4(),
      valuation: nft.valuation,
      principal: term.principal,
      principalType: term.principalType,
      principalAddress: term.principalAddress,
      apr: term.apr,
      duration: term.durationType === 'day' ? term.duration : (term.durationType === 'week' ? Number(term.duration) * 7 : Number(term.duration) * 30),
    })
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
                  onChange={(value : (number | null)) => setTerm({...term, duration: value})}
                  controls={false}
                  size='large'
                  className='ation-input-number'
                />
              </div>
              <p className='repayment'>Repayment: {term.repayment} {term.principalType} </p>
              <div className="button-create" onClick={clickLendNFT}>Borrow</div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Borrow