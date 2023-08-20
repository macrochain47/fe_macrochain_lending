import { shortenString } from '@/services/helper'
import { useAppSelector } from '@/state/hook'
import { CheckCircleTwoTone, CopyOutlined, PoweroffOutlined, SwapOutlined } from '@ant-design/icons'
import { Button, Divider, Popover } from 'antd'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'


import React from 'react'
import { userLogOut } from '..'
const PopoverUser = () => {
    const userState = useAppSelector(state => state.userState)
    return (
        <Popover placement="bottomRight" content={(
            <div className='popover-user' >
            <div className='popover-user-info'>
                
                <p className='address'>{shortenString(userState.address, 7, 5)}</p>
            </div>
            <Divider className='divider' />
            <div className='popover-user-network'>
                <p>Network</p>
                <div> 
                <CheckCircleTwoTone twoToneColor="#52c41a" style={{marginRight: 10}}/>
                Baobab Testnet
                </div>
            </div>
            <Divider className='divider' />
            <div className='popover-user-action'>
                <div style={{display: 'flex', alignItems:'center'}}>
                <SwapOutlined style={{top: -2, marginRight: 10}}/>
                Change account
                </div>
                <div style={{display: 'flex', alignItems:'center'}}
                >
                <CopyOutlined style={{top: -2, marginRight: 10}}/>
                Coppy address
                </div>

                <div style={{display: 'flex', alignItems:'center'}}
                    onClick={userLogOut}
                >
                <PoweroffOutlined style={{top: -2, marginRight: 10}}/>
                Log out
                </div>

            </div>
            </div>
        )
        } trigger={'click'} arrow={false}>
            <Button 
            type='primary' 
            className='btn-user'
            icon={<Jazzicon diameter={24} seed={jsNumberForAddress(userState.address)} />}
            size='large'
            >
            {shortenString(userState.address, 3, 4)}
            </Button>
        </Popover>
  )
}

export default PopoverUser