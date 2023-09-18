'use client'
import React, { useEffect, useState } from 'react'
import './MyLoan.scss'
import { Avatar, Segmented } from 'antd'
import LoanItem from '@/components/LoanItem'
import appApi from '@/api/appAPI'
import { useAppSelector } from '@/state/hook'
import ModalLogin from '@/components/ModalLogin/ModalLogin'


const myLoan = () => {
  const [page, setPage] = useState<string>('borrow')
  const [dataBorrows, setDataBorrows] = React.useState([])
  const [dataLends, setDataLends] = React.useState([])
  const userState = useAppSelector(state => state.userState)


  const fetchDataLoans = async () => {
    let data = await appApi.getMyBorrows()
    const listBorow = data.data;
    listBorow.reverse();
    setDataBorrows(listBorow)
    
    data = await appApi.getMyLends()
    const listLend = data.data;
    listLend.reverse();
    setDataLends(listLend)
  }

  console.log(dataBorrows, dataLends)


  useEffect(() => {
    userState.isAuthenticated &&
    fetchDataLoans()
  }, [userState])
  
  return (
    <div className='app-myloan'>
      {userState.isAuthenticated ? null : <ModalLogin />}
      <p className='app-myloan--header'>Your Loan</p>
      <Segmented
        options={[
          {
            label: (
              <div className='segment-item'
                onClick={() => page === 'borrow' ? null : setPage('borrow')}
              >
                <Avatar src="./assets/images/lend.png" className='avatar'/>
                <div className='name'>Borrow</div>
              </div>
            ),
            value: 'user1',
          },
          {
            label: (
              <div className='segment-item'
                onClick={() => page === 'lend' ? null : setPage('lend')}
              >
                <Avatar src="./assets/images/borrow.png" className='avatar'/>
                <div className='name'>Lend</div>
              </div>
            ),
            value: 'user2',
          },
        ]}
      />


      <div className='app-myloan--list'>
        {
          page === 'borrow' && dataBorrows.length > 0 &&
          dataBorrows.map((item, index) => (
            <LoanItem data={item} isLend={false}/>
          ))
        }

        {
          page === 'lend' && dataLends.length > 0 &&
          dataLends.map((item, index) => (
            <LoanItem data={item} isLend={true}/>
          ))
        }
      </div>
    </div>
  )
}

export default myLoan