'use client'
import React from 'react'
import Image from 'next/image'
import './NFTListing.scss'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const LoanListing = () => {
    const router = useRouter()
  return (
    <Link href="lend/1" className='nft'>
        <p className='nft-id'>
            #1293085580
        </p>
        <p className='nft-name'>
            Starbuck NFT
        </p>
        
        <img 
            alt="NFT" 
            className='nft-image'
            src="https://goerli.arcade.xyz/_next/image?url=https%3A%2F%2Fimages.arcade.xyz%2Fgoerli%2F0x3f228cbcec3ad130c45d21664f2c7f5b23130d23%2F6266&w=384&q=75" 
        />
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

    </Link>
  )
}

export default LoanListing