'use client';

import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import imageDark from '../../assets/img/logo-dark.png'
import imageLight from '../../assets/img/logo-light.png'
import "./Header.scss"
import { Button } from 'antd'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

const Header = () => {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className='app-header'>
        <div className='app-header--container'>
            
            <div className="logo" onClick={() => router.push('/')}>
              <Image src={imageLight} alt="logo" height={32} className='logo'/>
            </div>
            
            <div className='header-link'>
                <Link href="/borrows" className='option-link'>Borrow</Link>
                <Link href="/lends" className='option-link'>Lend</Link>
                <Link href="/loans" className='option-link'>Loan</Link>
            </div>

            <Button type='primary'>Connect Wallet</Button>
        </div>  
      </div>
    )

  }


  return (
    <div className='app-header'>
        <div className='app-header--container'>
          <div className="logo" onClick={() => router.push('/')}>
            {
              theme == 'light' &&
                <Image src={imageLight} alt="logo" height={32} className='logo'/>
            }
            
            {
              theme == 'dark' &&
                <Image src={imageDark} alt="logo" height={32} className='logo'/>
            }
          </div>
           
          <div className='header-link'>
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