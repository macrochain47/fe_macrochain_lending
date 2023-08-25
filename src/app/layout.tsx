import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/layouts/Header'
import Sidebar from '@/layouts/Siderbar'
import { Providers } from './providers'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TangiLend',
  description: 'Tangilend is an app that lets you use real-world assets, like property or vehicles, as collateral to secure loans, connecting borrowers and lenders through blockchain technology and smart contracts for secure, transparent lending and borrowing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
            <div className='app'>
              <Providers>
                <Header />  
                <Header />
                <Sidebar />
                <div className='app-content'>
                  <div style={{width: 'var(--main-width)'}}>
                    {children}
                  </div>
                </div>
              </Providers>
            </div>
      </body>
    </html>
  )
}
    