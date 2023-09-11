'use client'
import './LoanItem.scss'
import { Button, Divider, Progress } from 'antd'
const LoanItem = () => {
  const percent = 70;
  return (
    <div className='app-loanitem'>
      <div>
        <p className='loan-id'>ID: <span>64a2211...ax342as</span></p>

        <img 
          alt="NFT" 
          className='app-loanitem--image'
          src="https://i.seadn.io/gcs/files/9e841b77bd66373b9699ecad6e962d61.png?w=500&auto=format" 
        />
      </div>
    
      <div className='loan-nft-info'>
        <p className='name-nft'>Starbuck NFT</p>
        <p className='info-item'>Token ID: <span>#6932</span></p>
        <p className='info-item'>Contract Address: <span>0x5af0...25a5</span></p>

        <div className='loan-term'>
          <div className='term-item'>
            <p className='term-item--title'>Pricinpal</p>
            <p className='term-item--value'>1000 USD</p>
          </div>
          <div className='term-item'>
            <p className='term-item--title'>APR</p>
            <p className='term-item--value'>10%</p>
          </div>
          <div className='term-item'>
            <p className='term-item--title'>Duration</p>
            <p className='term-item--value'>10 month</p>
          </div>
          <div className='term-item'>
            <p className='term-item--title'>Repayment</p>
            <p className='term-item--value'>200 USD</p>
          </div>
        </div>
      </div>

      <div className='divider'/>
       
      <div className='loan-left'>
        <div>
          <p className='info-item'>Status: <span>On Loan</span></p>
          <p className='info-item'>Due date: <span>10/10/2021</span></p>  
        </div>
      
        <div className='time-info'>
          <div className='content'>
            <Progress size={80} type="circle" 
            strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
            percent={percent} format={(percent) => `${percent}%`} 
            className='content--progress'/>
            <div className='content-item'>
              <p className='content-item--title'>Borrowed time</p>
              <p className='content-item--text'>91 days of 10 months</p>
            </div>
          </div>
        </div>
        
        <div className='loan-action'>
          <Button type='primary' size='large' className='btn-action'>Repay loan</Button>
          <Button type='primary' size='large' className='btn-action'>Extend loan</Button>
        </div>
      </div>

    </div>
  )
}

export default LoanItem