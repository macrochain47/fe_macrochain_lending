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
        <p className='info-item'>Token Standard: <span>ERC721</span></p>
        <p className='info-item'>Last updated: <span>7 month ago</span></p>
      </div>

      <div className='divider'/>

      <div className='loan-term'>
        <div className='term-item'>
          <p className='term-item--title'>Pricinpal</p>
          <span className='term-item--value'>1000 USD</span>
        </div>
        <div className='term-item'>
          <p className='term-item--title'>APR</p>
          <span className='term-item--value'>10%</span>
        </div>
        <div className='term-item'>
          <p className='term-item--title'>Duration</p>
          <span className='term-item--value'>10 month</span>
        </div>
        <div className='term-item'>
          <p className='term-item--title'>Repayment</p>
          <span className='term-item--value'>200 USD</span>
        </div>
      </div>

      <div className='divider'/>
      <div className='loan-user'>
        <p className='title'>Borrow statistics</p>
        <div className='content'>
          <Progress size={80} type="circle" 
            strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
            percent={percent} format={(percent) => `${percent}%`} 
            className='content--progress'/>
          <div className='content-item'>
            <p className='content-item--title'>Total repaided</p>
            <p className='content-item--text'>15.000$ of 20.0000$</p>
          </div>
          <Divider type='vertical' className='divider'/>
          <div>
            <p className='content-item--title'>APR</p>
            <p className='content-item--text'>~10%</p>
          </div>
        </div>
      </div>

      <div className='divider'/>
      
      <div className='loan-action'>
        <Button type='primary' size='large'>Repay loan</Button>
        <Button type='primary' size='large'>Extend loan</Button>
      </div>

    </div>
  )
}

export default LoanItem