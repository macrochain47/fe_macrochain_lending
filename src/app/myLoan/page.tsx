import React from 'react'
import './MyLoan.scss'
import { Avatar, Segmented } from 'antd'
import { UserOutlined } from '@ant-design/icons'


const myLoan = () => {
  return (
    <div className='app-myloan'>
      <p className='app-myloan--header'>Your Loan</p>

      <Segmented
        options={[
          {
            label: (
              <div className='segment-item'>
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                <div className='name'>Borrow</div>
              </div>
            ),
            value: 'user1',
          },
          {
            label: (
              <div className='segment-item'>
                <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                <div className='name'>Lend</div>
              </div>
            ),
            value: 'user2',
          },
        ]}
      />
    </div>
  )
}

export default myLoan