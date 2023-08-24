'use client'
import React, { useState } from 'react'
import LoanListing from '@/components/home/NFTListing'
import './Borrow.scss'
import { InputNumber, Select } from 'antd'
import Image from 'next/image'
import { InfoCircleOutlined } from '@ant-design/icons'

interface ITermProps {
  principle: number | null;
  principleType: string;
  apr: number | null;
  duration: number | null;
  durationType: string | null;
  openForOffer: boolean;
  repayment: number | null;
}

const Borrow = () => {
  const [term, setTerm] = useState<ITermProps>({
    principle: 0,
    principleType: 'ETH',
    apr: 0,
    duration: 0,
    durationType: 'day',
    openForOffer: true,
    repayment: 0,
  })


  return (
    <div className='app-borrow'>
      <div className='app-borrow-nfts'>
        <LoanListing />
        <LoanListing />
        <LoanListing />
        <LoanListing />
        <LoanListing />
        <LoanListing />
        <LoanListing />
        <LoanListing />
        <LoanListing />
        <LoanListing />
        <LoanListing />
        <LoanListing />
        <LoanListing />
        <LoanListing />
        <LoanListing />
        <LoanListing />
        <LoanListing />
        <LoanListing />
        <LoanListing />
      </div>

      <div className='app-borrow-info'>
        <div className='action'>
          <div className='action--header'>
              <p>Collateral</p>
          </div>

          <div className='collateral'>
            <img src="https://themegamaxi.com/wp-content/uploads/2022/10/2-1-1-300x300.jpeg" 
              alt="azuki" 
              width={100} 
              height={100}
              className='img-collateral'
            />

            <div>
              <p className='nft-name'>Starbuck NFT</p>
              <p className='info-nft--prop'>Token ID: <span>6932</span></p>
              <p className='info-nft--prop'>Contract address:  <span> 0x5af0...25a5  </span> </p>
            </div>

            <div className='btn-info'>
              <InfoCircleOutlined className='btn-info--icon'/>
            </div>
          </div>
          <div className='action--header'>
              <p>Set term</p>
          </div>
          <div className='action--content'>
            <InputNumber
              size='large'
              className='ation-input-number'
              addonBefore={<p className='action--content-addon'>Principle</p>}
              addonAfter={(
                <Select style={{width: 100, color: 'white', fontWeight: 600}} value={term.durationType} onChange={(value : string) => setTerm({...term, principleType: value})}>
                  <Select.Option value="day">ETH</Select.Option>
                  <Select.Option value="week">USDT</Select.Option>
                  <Select.Option value="month">KLAY</Select.Option>
                </Select>
              )}
              controls={false}
              onChange={(value : (number | null)) => setTerm({...term, principle: value})}
            />
            <InputNumber
              addonBefore={<p className='action--content-addon'>Apr</p>}
              addonAfter={<p style={{color: 'white', fontWeight: 600}}>%</p>}
              size='large'
              className='ation-input-number'
              controls={false}
              onChange={(value : (number | null)) => setTerm({...term, apr: value})}
            />
            <InputNumber
              addonBefore={<p className='action--content-addon'>Duration</p>}
              addonAfter={(
                <Select style={{width: 140, color: 'white', fontWeight: 600}} value={term.durationType} onChange={(value : string) => setTerm({...term, durationType: value})}>
                  <Select.Option value="day">days</Select.Option>
                  <Select.Option value="week">weeks</Select.Option>
                  <Select.Option value="month">months</Select.Option>
                </Select>
              )}
              onChange={(value : (number | null)) => setTerm({...term, duration: value})}
              controls={false}
              size='large'
              className='ation-input-number'
            />
          </div>
          <p className='repayment'>Repayment: {term.repayment} {term.principleType} </p>
          <div className="button-create" onClick={() => console.log(term)}>Borrow</div>
        </div>
      </div>
    </div>
  )
}

export default Borrow