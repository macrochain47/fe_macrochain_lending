'use client';

import { BulbOutlined, CreditCardOutlined, InboxOutlined, PoweroffOutlined, StarOutlined, UserOutlined } from '@ant-design/icons'
import './Sidebar.scss'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation';
import { userLogOut } from '../Header';

const Sidebar = () => {
    const { theme, setTheme } = useTheme()
    const router = useRouter()
    return (
        <div className='app-sidebar'>
            <div className='app-sidebar--container'>
                <div className='sidebar-option'>
                    <UserOutlined rev={""} />
                </div>
                <div className='sidebar-option'>
                    <CreditCardOutlined rev={""} onClick={() => router.push('/myInfo')}/>
                </div>            
                <div className='sidebar-option'>
                    <InboxOutlined rev={""} onClick={() => router.push('/myLoan')}/>
                </div>
                <div className='sidebar-option'>
                    <StarOutlined rev={""}/>
                </div>
                <div className='sidebar-option'>
                    <PoweroffOutlined rev={""} onClick={() => userLogOut()}/>
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