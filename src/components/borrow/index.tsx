/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import './NFTAsset.scss'

const NFTAsset = ({data} : {data: any}) => {
    return (
        <div className='nft-asset'>
            <img 
                alt="NFT" 
                className='nft-image'
                src={data.image}
                style={{width:'100%', height:200, objectFit: 'cover'}}
            />

            <div className='nft-info'>
                <div className='nft-info-header'>
                    <p className='nft-id'>#000{data.tokenID < 10 ? '0' + data.tokenID : data.tokenID}</p>
                    <p className='nft-principal'>{data.valuation} USD</p>
                </div>
                <p className='nft-name'>
                    {data.tokenName} 
                </p>
            </div>
        </div>
    )
}

export default NFTAsset