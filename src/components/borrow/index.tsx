/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import './NFTAsset.scss'

const NFTAsset = ({data} : {data: any}) => {
    console.log(data)
    return (
        <div className='nft-asset'>
            <div>
                <img 
                    alt="NFT" 
                    className='nft-image'
                    src={data.image}
                    style={{width:'100%', height:200, objectFit: 'cover'}}                
                />
                {
                    data.status === 'listing' ?
                        <div className='collateral111'>Asset is currently under collateral.</div>
                        : <></>
                }
            </div>

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