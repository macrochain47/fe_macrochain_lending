'use client'
import React, { useEffect } from 'react'
import './MyLoan.scss'
import { Avatar, Segmented } from 'antd'
import LoanItem from '@/components/LoanItem'
import appApi from '@/api/appAPI'
import { useAppSelector } from '@/state/hook'
import ModalLogin from '@/components/ModalLogin/ModalLogin'


const myLoan = () => {
  const [dataLoans, setDataLoans] = React.useState([])
  const userState = useAppSelector(state => state.userState)
  const fetchDataLoans = async () => {
    const data = await appApi.getMyBorrow()
    const listLoan = data.data;
    listLoan.reverse();
    console.log(data.data)
    setDataLoans(data.data)
  }

  useEffect(() => {
    fetchDataLoans()

  }, [])
  
  return (
    <div className='app-myloan'>
      {userState.isAuthenticated ? null : <ModalLogin />}
      <p className='app-myloan--header'>Your Loan</p>
      <Segmented
        options={[
          {
            label: (
              <div className='segment-item'>
                <Avatar src="./assets/images/lend.png" className='avatar'/>
                <div className='name'>Borrow</div>
              </div>
            ),
            value: 'user1',
          },
          {
            label: (
              <div className='segment-item'>
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
          dataLoans.length > 0 &&
          dataLoans.map((item, index) => (
            <LoanItem data={item}/>
          ))
        }
      </div>
    </div>
  )
}

export default myLoan