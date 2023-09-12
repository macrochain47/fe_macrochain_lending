'use client'
import React from 'react'
import Image from 'next/image'
import './NFTListing.scss'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { tokens } from '@/constants/token'


const LoanListing = ({data} : {data:any}) => {
    const router = useRouter()
    return (
        <Link href={`lend/${data._id}`} className='nft'>
            <div className='nft-header'>
                <p className='nft-id'>
                    #0000{data.nft.tokenID}
                </p>
                <p className='nft-name'>
                    {data.nft.tokenName}
                </p>
            </div>
            
            <img 
                alt="NFT" 
                className='nft-image'
                src={data.nft.image}
                style={{width: '100%',  objectFit: 'cover', marginBottom: 10}}
            />

            <div className='nft--loans-info'>
                <div className='loan-apr'>
                    <p className='nft-info-title'>APR </p>
                    <p className='loan-info-content'>{data.apr}%</p> 
                </div>
                <div className='loan-term'>
                    <p className='nft-info-title'>Duration</p>
                    <p className='loan-info-content'>{data.duration} {data.durationType}{data.duration > 1 ? 's' : ""}</p>
                </div>
                <div className='loan-term'>
                    <p className='nft-info-title'>Principal</p>
                    <div style={{display: 'flex', alignItems:'center'}} className='loan-info-content'>
                        {data.principal} 
                        <img src={tokens[data.principalType === 'USDT' ? 0 : 1].image} alt='token' style={{
                            width: 20, marginLeft: 6
                        }}/>
                    </div>
                </div>
                
            </div>
        </Link>
    )
}

export default LoanListing