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
                src="https://i.seadn.io/gcs/files/9e841b77bd66373b9699ecad6e962d61.png?w=500&auto=format" 
            />

            <div className='nft--loans-info'>
                <div className='loan-apr'>
                    <p className='nft-info-title'>APR </p>
                    <p> 11.8%</p> 
                </div>
                <div className='loan-term'>
                    <p className='nft-info-title'>Term</p>
                    <p>10 days</p>
                </div>
                <div className='loan-term'>
                    <p className='nft-info-title'>Principal</p>
                    <p>100 USD</p>
                </div>
                
            </div>
        </Link>
    )
}

export default LoanListing