import React from 'react'
import Image from 'next/image'

import './TokenItem.scss'

interface ITokenItemProps {
  name: string,
  balance: string,
  image: string
}

const TokenItem = ({name, balance, image}: ITokenItemProps) => (
  <div className='token-item'>
    <Image width={36} height={36} src={image} alt='Token'/>
    <p className='token-name'>{name}</p>
    <p className='token-balance'>{balance}</p>
  </div>
)

export default TokenItem