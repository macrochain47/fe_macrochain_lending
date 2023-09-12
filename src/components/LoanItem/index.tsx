'use client'
import {  LendingCT, NFTBaseCT } from '@/constants/addressContract';
import './LoanItem.scss'
import { Button, Divider, Modal, Progress, Result, Spin } from 'antd'
import { shortenString } from '@/services/helper';
import { getERC20Contract, getLendingContract } from '@/services/blockchain';
import { useAppSelector } from '@/state/hook';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const LoanItem = ({data} : {data : any}) => {
  const {appState, userState} = useAppSelector(state => state)
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const percent = 70;
  const router = useRouter()

  const handleRepayLoan = async () => {
    setLoading(true)    
    const LendingContract = getLendingContract(appState.web3, LendingCT)
    const ERC20Contract = getERC20Contract(appState.web3, data.principalAddress)
    try {
      const approveMethod = await ERC20Contract.methods.approve(LendingCT, BigInt(Number(data.repayment)*1000000000000000000)).send({from: userState.address})
      const paybackRecipt = await LendingContract.methods.payback(NFTBaseCT, data.loanID).send({from: userState.address})

      setOpenModal(true)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)





  }

  return (
    <div className='app-loanitem'>
      <div>
        <p className='loan-id'>ID: <span>#{data._id}</span></p>

        <img 
          alt="NFT" 
          className='app-loanitem--image'
          src={data.nft.image} 
        />
      </div>
    
      <div className='loan-nft-info'>
        <p className='name-nft'>Starbuck NFT</p>
        <p className='info-item'>Token ID: <span>#000{data.nft.tokenID}</span></p>
        <p className='info-item'>Contract Address: <span>{shortenString(NFTBaseCT, 5,8)}</span></p>

        <div className='loan-term'>
          <div className='term-item'>
            <p className='term-item--title'>Pricinpal</p>
            <p className='term-item--value'>{Number(data.principal).toFixed(2)} {data.principalType}</p>
          </div>
          <div className='term-item'>
            <p className='term-item--title'>APR</p>
            <p className='term-item--value'>{data.apr}%</p>
          </div>
          <div className='term-item'>
            <p className='term-item--title'>Duration</p>
            <p className='term-item--value'>{data.duration} {data.durationType}</p>
          </div>
          <div className='term-item'>
            <p className='term-item--title'>Repayment</p>
            <p className='term-item--value'>{Number(data.repayment).toFixed(2)} USD</p>
          </div>
        </div>
      </div>

      <div className='divider'/>
       
      <div className='loan-left'>
        <div>
          <p className='info-item'>Status: <span>On Loan</span></p>
          <p className='info-item'>Due date: <span>10/10/2023</span></p>  
        </div>
      
        <div className='time-info'>
          <div className='content'>
            <Progress size={80} type="circle" 
            strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
            percent={percent} format={(percent) => `${percent}%`} 
            className='content--progress'/>
            <div className='content-item'>
              <p className='content-item--title'>Borrowed time</p>
              <p className='content-item--text'>91 days of 10 months</p>
            </div>
          </div>
        </div>
        
        <div className='loan-action'>
          <Button type='primary' size='large' className='btn-action' onClick={handleRepayLoan}>{ loading ? <Spin /> : 'Repay loan'}</Button>
          <Button type='primary' size='large' className='btn-action'>Extend loan</Button>
        </div>
      </div>
      <Modal title="Notification" open={openModal} centered 
                width={800 - 32}
                closable={true}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{style: {display: 'none'}}}
                onCancel={() => setOpenModal(false)}
            >
        <Result
          status="success"
          title="Successfully Listed Your Asset!"
          subTitle="Order number: 2017182818828182881. Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button type="primary" key="console" onClick={() => router.replace('/')}>
              Go Home
            </Button>
          ]}
        />
      </Modal>

    </div>
  )
}

export default LoanItem