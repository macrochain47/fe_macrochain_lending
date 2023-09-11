/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import { getNFTBaseContract } from '@/services/blockchain'
import { InputNumber, Select } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

import './Borrow.scss'
import { countRepayment } from '@/services/helper'
import NFTAsset from '@/components/borrow'
import { useAppSelector } from '@/state/hook'
import { NFTBaseCT } from '@/constants/addressContract'
import Web3 from 'web3'
interface ITermProps {
  principal: number | null;
  principalType: string;
  apr: number | null;
  duration: number | null;
  durationType: string ;
  openForOffer: boolean;
  repayment: number | null;
}

const Borrow = () => {
  const { userState, appState } = useAppSelector(state => state)
  const myWeb3 = new Web3(window.ethereum);

  const [term, setTerm] = useState<ITermProps>({
    principal: 0,
    principalType: 'ETH',
    apr: 0,
    duration: 0,
    durationType: 'day',
    openForOffer: true,
    repayment: 0,
  })

  const [nft, setNft] = useState<any>(null)

  
  useEffect(() => {
    if (term.principal && term.apr && term.duration){
      setTerm({...term, repayment: countRepayment(term.principal, term.apr, term.duration, term.durationType)})
    }
  }, [term])

  const handleClickSelectNFT = () => {
    setNft(true)
  }

  const clickLendNFT = async () => {
    console.log('vcl')
    if (!userState.isAuthenticated) {
      alert("Connect wallet before faucet token");
      return;
    }

    const NFTBaseContract = getNFTBaseContract(appState.web3, NFTBaseCT)

    const dataSign = [
      {
        type: "address",
        value: NFTBaseCT,
      },
      {
        type: "address",
        value: userState.address,
      }
    ]
    const message = appState.web3.utils.soliditySha3(...dataSign)
    console.log(message)
    const signature = await myWeb3.eth.personal.sign(message, userState.address, '')
    console.log(signature)
    
    const tokenizeMethod = NFTBaseContract.methods.tokenize(
      term.principal,
      signature
    )

    try {
      await tokenizeMethod.estimatesGas({from: userState.address})
      const tokenizeRecipt = await tokenizeMethod.send({from: userState.address})
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='app-borrow'>
      <header className='header'>Collateral & Asset</header>

      <div className='content'>
        <div className='app-borrow-nfts'>
          <div onClick={handleClickSelectNFT}>
            <NFTAsset />
          </div>
          <div onClick={handleClickSelectNFT}>
            <NFTAsset />
          </div>
          <div onClick={handleClickSelectNFT}>
            <NFTAsset />
          </div>
          <div onClick={handleClickSelectNFT}>
            <NFTAsset />
          </div>
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
                    <img src="https://themegamaxi.com/wp-content/uploads/2022/10/2-1-1-300x300.jpeg" 
                      alt="azuki" 
                      width={100} 
                      height={100}
                      className='img-collateral'
                    />

                    <div>
                      <p className='nft-name'>Starbuck NFT</p>
                      <p className='info-nft--prop'>Token ID: <span>#6932</span></p>
                      <p className='info-nft--prop'>Contract address:  <span> 0x5af0...25a5  </span> </p>

                      <p className='info-nft--evaluation'>2000 USD</p>
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
                    <Select style={{width: 100, color: 'white', fontWeight: 600}} value={term.principalType} onChange={(value : string) => setTerm({...term, principalType: value})}>
                      <Select.Option value="ETH">ETH</Select.Option>
                      <Select.Option value="USDT">USDT</Select.Option>
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