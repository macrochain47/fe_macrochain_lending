import React from 'react'
import './MyLoan.scss'
import { Avatar, Segmented } from 'antd'
import LoanItem from '@/components/LoanItem'


const myLoan = () => {
  return (
    <div className='app-myloan'>
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
        <LoanItem />
        <LoanItem />
        <LoanItem />
        <LoanItem />
      </div>
    </div>
  )
}

export default myLoan