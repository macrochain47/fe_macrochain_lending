'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import './LendingPage.scss'

import { Progress, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { clearInterval } from 'timers';

interface DataType {
  key: string;
  principle: number;
  apr: number;
  term: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Principle',
    dataIndex: 'principle',
    key: 'principle',
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.principle - b.principle,

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
    principle: 1500,
    apr: 32,
    term: '10 days',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    principle: 1500,
    apr: 42,
    term: '10 days',
    tags: ['loser'],
  },
  {
    key: '3',
    principle: 2000,
    apr: 32,
    term: '10 days',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    principle: 2000,
    apr: 32,
    term: '10 days',
    tags: ['cool', 'teacher'],
  },
  {
    key: '5',
    principle: 2000,
    apr: 32,
    term: '10 days',
    tags: ['cool', 'teacher'],
  },
];


const LendingPage = () => {
  const [percent, setPercent] = useState(0);
  
  useEffect(() => {
    const myInterval = setInterval(() => {
      setPercent((prev) => prev < 60 ? prev + 2 : prev )
    }, 10)
  }, [])
  return (
    <div className='app-lendingpage'>
        <div className='app-lendingpage--left'>
            <div className='info-lend'>
              <div className='info-lend--header'>
                <div>
                  <p>ID: 64a1...ax342as</p>
                  <p>Due: 14 Aug 23 / 11:47 AM</p>
                </div>
                
                <div className='info-lend-items'>
                  <div className='info-lend-item'>
                    <span>Principal </span> 
                    0.8 ETH
                  </div>
                  
                  <div className='info-lend-item'>
                    <p>APR </p>
                    <p> 11.8%</p> 
                  </div>
                  
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

              <div className='info-lend--content'>
                <div className='info-nft'>
                  <Image 
                    alt="NFT" 
                    width={230}
                    height={230}
                    src="https://goerli.arcade.xyz/_next/image?url=https%3A%2F%2Fimages.arcade.xyz%2Fgoerli%2F0x3f228cbcec3ad130c45d21664f2c7f5b23130d23%2F6266&w=384&q=75" 
                  />
                  <div className='info-nft--list-props'>
                    <p className='info-nft--name'>Starbuck NFT</p>
                    <p className='info-nft--prop'>Token ID: <span>6932</span></p>
                    <p className='info-nft--prop'>Contract address:  <span> 0x5af0...25a5  </span> </p>
                    <p className='info-nft--prop'>Token Standard: <span>  ERC-721 </span> </p>
                    <p className='info-nft--prop'>Last updated:  <span> 7 month ago </span> </p>
                  </div>
                </div>
                <div className='table-offer'>

                </div>
              </div>
            </div>

            <div className='offer'>
              <div className='offer--header'>
                <p>OPEN OFFER</p>
              </div>
            <div className='offer--table'>
              <Table
                className="table-striped-rows"
                onRow={(record, rowIndex) => {
                  return {
                    style: { backgroundColor: '#aaa'},
                    onMouseEnter: (event) => {
                      return {
                        style: { backgroundColor: '#aaa'},
                      }
                    }, 
                    onMouseLeave: (event) => {
                      return {
                        style: { backgroundColor: '#aaa'},
                      }
                    }, 
                  };
                }}
                onHeaderRow={(column, index) => {
                  return {
                    style: { backgroundColor: 'red'}
                  };
                }}
                columns={columns} 
                dataSource={data} 
              />
            </div>
          </div>
        </div>

        <div className='app-lendingpage--right'>
            <div className='action'>
              <div className='action--header'>
                  <p>MAKE AN OFFER</p>
              </div>
            </div>

            <div className='user-info'>
              <div className='user-info--header'>
                <p>BORROWER</p>
              </div>
              <Progress type="circle" percent={percent} format={(percent) => `${percent} Days`} />
            </div>
        </div>
    </div>
  )
}

export default LendingPage