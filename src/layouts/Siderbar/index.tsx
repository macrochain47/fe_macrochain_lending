'use client';

import { BulbOutlined, CreditCardOutlined, InboxOutlined, PoweroffOutlined, StarOutlined, UserOutlined } from '@ant-design/icons'
import './Sidebar.scss'
import { useTheme } from 'next-themes'


const Sidebar = () => {
    const { theme, setTheme } = useTheme()

    return (
        <div className='app-sidebar'>
            <div className='app-sidebar--container'>
                <div className='sidebar-option'>
                    <UserOutlined rev={""}/>
                </div>
                <div className='sidebar-option'>
                    <CreditCardOutlined rev={""}/>
                </div>            
                <div className='sidebar-option'>
                    <StarOutlined rev={""} onClick={() => console.log('vcl')}/>
                </div>
                <div className='sidebar-option'>
                    <InboxOutlined rev={""} onClick={() => console.log('vcl')}/>
                </div>
                <div className='sidebar-option'>
                    <PoweroffOutlined rev={""} onClick={() => console.log('vcl')}/>
                </div>
            </div>

            <div className='app-sidebar--container'>
                <div className='sidebar-option'>
                    <BulbOutlined rev={""} onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar  