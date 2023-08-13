'use client'
import React from 'react'
import Image from 'next/image'
import './LendingPage.scss'

import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
        sorter: (a, b) => a.name.length - b.name.length,

  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
        sorter: (a, b) => a.name.length - b.name.length,

  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
        sorter: (a, b) => a.name.length - b.name.length,

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
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


const LendingPage = () => {
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

                  <p>#1293085580</p>
                  <p>Starbuck NFT</p>
                </div>
                <div className='table-offer'>
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

            <div className='offer'>

            </div>
        </div>

        <div className='app-lendingpage--right'>
            <div className='action'>

            </div>

            <div className='user-info'>

            </div>
        </div>
    </div>
  )
}

export default LendingPage