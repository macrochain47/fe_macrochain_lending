'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import './LendingPage.scss'
import { countRepayment } from '@/services/helper'

import { Button, InputNumber, Progress, Select, Space, Table, Tag, Divider} from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  principal: number;
  apr: number;
  term: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'principal',
    dataIndex: 'principal',
    key: 'principal',
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.principal - b.principal,

  },
  {
    title: 'APR',
    dataIndex: 'apr',
    key: 'apr',
    sorter: (a, b) => a.apr - b.apr,
  },
  {
    title: 'Term',
    dataIndex: 'term',
    key: 'term',
    sorter: (a, b) => a.term.length - b.term.length,
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        {/* <a>Invite {record.name}</a> */}
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    principal: 1500,
    apr: 32,
    term: '10 days',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    principal: 1500,
    apr: 42,
    term: '10 days',
    tags: ['loser'],
  },
  {
    key: '3',
    principal: 2000,
    apr: 32,
    term: '10 days',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    principal: 2000,
    apr: 32,
    term: '10 days',
    tags: ['cool', 'teacher'],
  },
  {
    key: '5',
    principal: 2000,
    apr: 32,
    term: '10 days',
    tags: ['cool', 'teacher'],
  },
];

interface IOffer {
  principal: number | null,
  principalType: string | null,
  apr: number | null,
  duration: number | null,
  durationType: string | null,
  repayment: number | null
}

const getRepayment = (offer: IOffer) => {
  if (offer.apr && offer.principal && offer.duration && offer.durationType) {
    return countRepayment(offer.apr, offer.principal, offer.duration, offer.durationType)
  }
  else return null
}

const LendingPage = () => {
  const [percent, setPercent] = useState(0);
  const [offer, setOffer] = useState<IOffer>({
    principal: 0,
    principalType: 'ETH',
    apr: 0,
    duration: 0,
    durationType: 'day',
    repayment: 0,
  })

  console.log(offer)
  
  useEffect(() => {
    const myInterval = setInterval(() => {
      setPercent((prev) => prev < 60 ? prev + 2 : prev )
    }, 10)
  }, [])

  useEffect(() => {
    setOffer({...offer, repayment: getRepayment(offer)})
    console.log('vcl')
  }, [offer.apr, offer.principal, offer.duration, offer.durationType])

  return (
    <div className='app-lendingpage'>
        <div className='app-lendingpage--left'>
            <div className='info-lend'>
              <div className='info-lend--header'>
                <p>Loan detail</p>

                <div className='id-due'>
                  <p>ID: 64a1...ax342as</p>
                  <p>Due: 14 Aug 23 / 11:47 AM</p>
                </div>
              </div>

              <div className='info-lend--content'>
                <div className='info-nft'>
                  <img 
                    alt="NFT" 
                    width={200}
                    height={200}
                    src="https://i.seadn.io/gcs/files/9e841b77bd66373b9699ecad6e962d61.png?w=500&auto=format" 
                  />
                  <div className='info-nft--list-props'>
                    <p className='info-nft--name'>Starbuck NFT</p>
                    <div>
                      <p className='info-nft--prop'>Token ID: <span>6932</span></p>
                      <p className='info-nft--prop'>Contract address:  <span> 0x5af0...25a5  </span> </p>
                      <p className='info-nft--prop'>Token Standard: <span>  ERC-721 </span> </p>
                      <p className='info-nft--prop'>Last updated:  <span> 7 month ago </span> </p>
                    </div>
                  </div>
                </div>
                <div className='info-lend-items'>
                  <div style={{marginRight: 10}}>
                    <div className='info-lend-item'>
                      <span>Principal </span> 
                      0.8 ETH
                    </div>
                    <div className='info-lend-item'>
                      <p>APR </p>
                      <p> 11.8%</p> 
                    </div>
                  </div>
                  <div>
                    <div className='info-lend-item'>
                      <p>Term</p>
                      <p>10 days</p>
                    </div>
                    <div className='info-lend-item'>
                      <p>Repayment</p> 
                      <p>1 ETH</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='offer'>
            <div className='offer--header'>
              <p>Open offer</p>
            </div>
            <div className='offer--table'>
              <Table
                columns={columns} 
                dataSource={data} 
                bordered={false}
                pagination={false}
              />
            </div>
          </div>
        </div>

        <div className='app-lendingpage--right'>
            <div className='action'>
              <div className='action--header'>
                  <p>Make an offer</p>
              </div>
              <div className='action--content'>
                <InputNumber
                  size='large'
                  className='ation-input-number'
                  addonBefore={<p className='action--content-addon'>Principal</p>}
                  addonAfter={(
                    <Select style={{width: 100, color: 'white', fontWeight: 600}} value={offer.durationType} onChange={(value : string) => setOffer({...offer, durationType: value})}>
                      <Select.Option value="day">ETH</Select.Option>
                      <Select.Option value="week">USDT</Select.Option>
                      <Select.Option value="month">KLAY</Select.Option>
                    </Select>
                  )}
                  onChange={(value : (number | null)) => setOffer({...offer, principal: value})}
                />
                <InputNumber
                  addonBefore={<p className='action--content-addon'>Apr</p>}
                  addonAfter={<p style={{color: 'white', fontWeight: 600}}>%</p>}
                  size='large'
                  className='ation-input-number'
                  controls={false}
                  onChange={(value : (number | null)) => setOffer({...offer, apr: value})}
                />
                <InputNumber
                  addonBefore={<p className='action--content-addon'>Duration</p>}
                  addonAfter={(
                    <Select style={{width: 140, color: 'white', fontWeight: 600}} value={offer.durationType} onChange={(value : string) => setOffer({...offer, durationType: value})}>
                      <Select.Option value="day">days</Select.Option>
                      <Select.Option value="week">weeks</Select.Option>
                      <Select.Option value="month">months</Select.Option>
                    </Select>
                  )}
                  onChange={(value : (number | null)) => setOffer({...offer, duration: value})}
                  controls={false}
                  size='large'
                  className='ation-input-number'
                />
              </div>
              <p className='repayment'>Repayment: {offer.repayment} {offer.principalType} </p>
              <div className="button-create" onClick={() => console.log(offer)}>Create offer</div>
            </div>

            <div className='user-info'>
              <div className='user-info--header'>
                <p>Borrower</p>
              </div>
                    
              <div className='user-info-borrow'>
                <p className='title'>Borrow info</p>
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

              <div className='user-info-borrow'>
                <p className='title'>Lend info</p>
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

            </div>
        </div>
    </div>
  )
}

export default LendingPage