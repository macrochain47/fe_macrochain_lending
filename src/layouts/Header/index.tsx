'use client';

import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import imageDark from '../../assets/img/logo-dark.png'
import imageLight from '../../assets/img/logo-light.png'
import "./Header.scss"
import { Button } from 'antd'
import { useTheme } from 'next-themes'



const Header = () => {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }


  return (
    <div className='app-header'>
        <div className='app-header--container'>
            <div className='header-left'>
                {
                  theme == 'light' &&
                    <Image src={imageLight} alt="logo" height={32} className='logo'/>
                }
                
                {
                  theme == 'dark' &&
                    <Image src={imageDark} alt="logo" height={32} className='logo'/>
                }

                <Link href="/borrows" className='option-link'>Borrow</Link>
                <Link href="/lends" className='option-link'>Lend</Link>
                <Link href="/loans" className='option-link'>Loan</Link>
            </div>

            <Button type='primary'>Connect Wallet</Button>
        </div>  
    </div>
  )
}

export default Header