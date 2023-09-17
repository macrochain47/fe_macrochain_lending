'use client'
import React, { useEffect, useState } from 'react'

import "./MyInfo.scss"
import TokenItem from '@/components/TokenItem'
import NFTAsset from '@/components/borrow'
import { tokens } from '@/constants/token'
import { Divider, Progress } from 'antd'
import appApi from '@/api/appAPI'
import { getERC20Contract } from '@/services/blockchain'
import { useAppSelector } from '@/state/hook'
import { USDC_CT, USDT_CT } from '@/constants/addressContract'
import ModalLogin from '@/components/ModalLogin/ModalLogin'

const MyInfo = () => {
  const percent = 70
  const [myNFTs, setMyNFTs] = useState([])
  const [balance, setBalance] = useState({
    usdt: '0.00',
    usdc: '0.00',
    klay: '0.00',
  })  
  const {appState, userState} = useAppSelector(state => state)

  console.log(userState)
  useEffect(() => {
    const func = async () => {
      const myNFTs = await appApi.getMyNFT()
      setMyNFTs(myNFTs.data)

      const USDTContract = getERC20Contract(appState.web3, USDT_CT)
      const USDCContract = getERC20Contract(appState.web3, USDC_CT)

      const usdtBalance = await USDTContract.methods.balanceOf(userState.address).call()
      const usdcBalance = await USDCContract.methods.balanceOf(userState.address).call()
      console.log({
        usdt: usdtBalance,
        usdc: usdcBalance
      })
      
      setBalance({
        ...balance,
        usdt: (Number(usdtBalance)/ 10**18).toFixed(2),
        usdc: (Number(usdcBalance)/ 10**18).toFixed(2),
        klay: '0'
      })
    }
    func()
  }, [])
  

  return (
    <div className='app-myinfo'>
      {userState.isAuthenticated ? null : <ModalLogin />}
      <div className='app-myinfo--left'>
        <div className='app-myinfo--left--asset'>
          <div className='asset-item'>
            <p className='asset-item--title'>Borrowed asset</p>
            <p className='asset-item--amount' style={{color: '#ff7875'}}>-1000 USD</p>
            <p className='asset-item--note'>Interest: 200 USD</p>
          </div>

          <div className='asset-item'>
            <p className='asset-item--title'>On loan asset</p>
            <p className='asset-item--amount' style={{color: '#73d13d'}}>1000 USD</p>
            <p className='asset-item--note'>Interest: 200 USD</p>
          </div>

          <div className='asset-item'>
            <p className='asset-item--title'>Account:</p>
            <p className='asset-item--amount' style={{color: '#ccc'}}>0xa42c95Ba5fCEC7f56697b5c7Ecc55E55F4A1FE7E</p>
            <p className='asset-item--note'>Join time: 10 days</p>
          </div>


        </div>

        <p className='header'>Collateral & Asset</p>
        <div className='app-myinfo--left--nfts'>
          {
            myNFTs.map((nft, index) => (
              <NFTAsset data={nft}/>
            ))
          }
        </div>



      </div>

      <div className='app-myinfo--right'>
        <div className='item'>
          <p className='item--header'>Tokens</p>
          <div className='list-token'>
            {
              tokens.map((token, index) => (
                <TokenItem key={index} name={token.name} balance={index == 0 ? String(balance.usdt) : (index == 1 ? String(balance.usdc) : (Number(userState.balance) / 10**18).toFixed(2))} image={token.image} />
              ))
            }
          </div>
        </div>
        <div className='item'>
          <p className='item--header'>Statistics</p>
          <div className='app-myinfo--statistics'>
            <p className='title'>Lend info</p>
            <div className='content'>
              <Progress size={80} type="circle" 
                strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                percent={percent} format={(percent) => `${percent}%`} 
                className='content--progress'
              />
              
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
          <div className='app-myinfo--statistics'>
            <p className='title'>Lend info</p>
            <div className='content'>
              <Progress size={80} type="circle" 
                strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                percent={percent} format={(percent) => `${percent}%`} 
                className='content--progress'
              />
              
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

  </div>
  )
}

export default MyInfo