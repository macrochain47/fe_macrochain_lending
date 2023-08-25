'use client'
import React from 'react'

import "./MyInfo.scss"
import TokenItem from '@/components/TokenItem'
import NFTAsset from '@/components/borrow'
import { tokens } from '@/constants/token'

const MyInfo = () => {
  return (
    <div className='app-myinfo'>
      <div className='app-myinfo--left'>
        <div className='app-myinfo--left--asset'>
          <div className='asset-item'>
            <p className='asset-item--title'>Borrowed asset</p>
            <p className='asset-item--amount' style={{color: '#ff7875'}}>-1000 USD</p>
          </div>

          <div className='asset-item'>
            <p className='asset-item--title'>On loan asset</p>
            <p className='asset-item--amount' style={{color: '#73d13d'}}>1000 USD</p>
          </div>
        </div>

        <div className='app-myinfo--left--nfts'>
          <NFTAsset />
          <NFTAsset />
          <NFTAsset />
          <NFTAsset />
          <NFTAsset />
        </div>
      </div>

      <div className='app-myinfo--right'>
        <div className='item'>
          <p className='item--header'>Loans detail</p>
        </div>

        <div className='item'>
          <p className='item--header'>Tokens</p>
          <div className='list-token'>
            {
              tokens.map((token, index) => (
                <TokenItem key={index} name={token.name} balance={'0.000'} image={token.image} />
              ))
            }
          </div>
        </div>
      </div>




  </div>
  )
}

export default MyInfo