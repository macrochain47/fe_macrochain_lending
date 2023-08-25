/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import './NFTAsset.scss'

const NFTAsset = () => {
    return (
        <div className='nft-asset'>
            <img 
                alt="NFT" 
                className='nft-image'
                src="https://themegamaxi.com/wp-content/uploads/2022/10/2-1-1-300x300.jpeg" 
            />

            <div className='nft-info'>
                <div className='nft-info-header'>
                    <p className='nft-id'>#3131</p>
                    <p className='nft-principal'>2000 USD</p>
                </div>
                <p className='nft-name'>
                    AzukiAzukiAzuki 
                </p>
            </div>
        </div>
    )
}

export default NFTAsset