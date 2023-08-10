import React from 'react'
import Image from 'next/image'
import './NFTListing.scss'

const NFTListing = () => {
  return (
    <div className='nft'>
        <div className='nft--header'>
            <p className='nft--header-id'>
                #1293085580
            </p>

            <p className='nft--header-name'>
                Starbuck NFT
            </p>
            
        </div>
        <div>
            <Image 
                alt="NFT" 
                width={200}
                height={200}
                src="https://goerli.arcade.xyz/_next/image?url=https%3A%2F%2Fimages.arcade.xyz%2Fgoerli%2F0x3f228cbcec3ad130c45d21664f2c7f5b23130d23%2F6266&w=384&q=75" />
        </div>
        <div>
            <p>Price</p>
        </div>
        <div>
            <p>Buy</p>
        </div>
    </div>
  )
}

export default NFTListing