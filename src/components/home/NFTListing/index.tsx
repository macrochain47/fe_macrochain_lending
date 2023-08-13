'use client'
import React from 'react'
import Image from 'next/image'
import './NFTListing.scss'
import { useRouter } from 'next/navigation'


const NFTListing = () => {
    const router = useRouter()
  return (
    <div className='nft' onClick={() => router.push("lend/1")}>
        <div className='nft--header'>
            <div className='nft--header-info'>
                <p className='nft--header-id'>
                    #1293085580
                </p>
                <p className='nft--header-name'>
                    Starbuck NFT
                </p>
            </div>

            <div className='nft--header-valuation'>
                <p className='nft-info-title'>Valuation</p> 
                <p>1 ETH</p>
            </div>
        </div>
        
        <div>
            <Image 
                alt="NFT" 
                width={230}
                height={230}
                src="https://goerli.arcade.xyz/_next/image?url=https%3A%2F%2Fimages.arcade.xyz%2Fgoerli%2F0x3f228cbcec3ad130c45d21664f2c7f5b23130d23%2F6266&w=384&q=75" />
        </div>


        <p className='nft--principal'>
            <span className='nft-info-title'>Principal: </span> 
            0.8 ETH
        </p>
        <div className='nft--loans-info'>
            <div className='loan-apr'>
                <p className='nft-info-title'>APR </p>
                <p> 11.8%</p> 
            </div>

            <div className='loan-term'>
                <p className='nft-info-title'>Term</p>
                <p>10 days</p>
            </div>
        </div>

    </div>
  )
}

export default NFTListing