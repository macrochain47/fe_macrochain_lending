'use client'
import './LoanItem.scss'
import { Button, Divider, Empty, Modal, Progress, Result, Spin } from 'antd'
import { shortenString } from '@/services/helper';
import { getERC20Contract, getLendingContract } from '@/services/blockchain';
import { useAppSelector } from '@/state/hook';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ERC721CT_Address, LendingCT_Address } from '@/constants/addressContract';
import appApi from '@/api/appAPI';




const getStatus = (status : string) => {
  if (status === 'on-loan') {
    return <span style={{color: '#60e682', fontWeight: 700}}>
      On loan
    </span>
  } else if (status === 'pending') {
    return <span style={{color: '#ff752b', fontWeight: 700}}>
      Pending
    </span>
  }
}

const LoanItem = ({data, isLend} : {data : any, isLend: boolean}) => {
  const dataOffer = data.acceptedOffer || data.defaultOffer;
  console.log(dataOffer, data)

  const {appState, userState} = useAppSelector(state => state)
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const percent = 70;
  const router = useRouter()

  const repayLoan = async () => {
    setLoading(true) 
    const LendingContract = getLendingContract(appState.web3)
    const ERC20Contract = getERC20Contract(appState.web3, dataOffer.principalAddress)
    try {
      const repayment = await LendingContract.methods.getRepayment(data.loanID).call();
      const approveMethod = await ERC20Contract.methods.approve(LendingCT_Address, BigInt(repayment)).send({from: userState.address})
      const paybackRecipt = await LendingContract.methods.repayLoan(data.loanID).send({from: userState.address})

      await appApi.repayLoan(data._id)
      setOpenModal(true)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  console.log(userState.address, data.borrower)
  if (!isLend) {
    return (
      <div className='app-loanitem'>
        <div>
          <p className='loan-id'>ID: <span>{data._id}</span></p>
  
          <img 
            alt="NFT" 
            className='app-loanitem--image'
            src={data.asset.image} 
          />
        </div>
      
        <div className='loan-nft-info'>
          <p className='name-nft'>{data.asset.tokenName}</p>
          <p className='info-item'>Token ID: <span>#000{data.asset.tokenID}</span></p>
          <p className='info-item'>Valuation: <span>{data.asset.valuation} USD</span></p>
          <p className='info-item'>Metadata: <a href={data.asset.uri} target="_blank"  >{shortenString(data.asset.uri, 15, 8)}</a></p>
          <p className='info-item'>Contract Address: <span>{shortenString(ERC721CT_Address, 5,8)}</span></p>
  
          <div className='loan-term'>
            <div className='term-item'>
              <p className='term-item--title'>Pricinpal</p>
              <p className='term-item--value'>{Number(dataOffer.principal).toFixed(1)} {dataOffer.principalType}</p>
            </div>
            <div className='term-item'>
              <p className='term-item--title'>APR</p>
              <p className='term-item--value'>{dataOffer.apr}%</p>
            </div>
            <div className='term-item'>
              <p className='term-item--title'>Duration</p>
              <p className='term-item--value'>{dataOffer.duration} {dataOffer.durationType}</p>
            </div>
            <div className='term-item'>
              <p className='term-item--title'>Repayment</p>
              <p className='term-item--value'>{Number(dataOffer.repayment).toFixed(1)} {dataOffer.principalType}</p>
            </div>
          </div>
        </div>
  
        <div className='divider'/>
        {
          data.status === 'on-loan' &&
        <div className='loan-left'>
          <div>
            <p className='info-item'>Status: {getStatus(data.status)}</p>
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
          
          <div className='loan-action' style={{width: '100%', paddingBottom: 10}}>
            <Button type='primary' size='large' className='btn-action' onClick={repayLoan}>{ loading ? <Spin /> : 'Repay loan'}</Button>
            <Button type='primary' size='large' className='btn-action'>Extend loan</Button>
          </div>
        </div>
        } 
  
        {
          data.status === 'pending' &&
          <div className='loan-left' style={{flexGrow: 1}}>
          <div>
            <p className='info-item'>Status: {getStatus(data.status)}</p>
          </div>
        
          <div className='time-info'>
            <div className='content'>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} 
                description={<span style={{color: '#ccc'}}>No Data</span>}
              />
            </div>
          </div>
          
          <div className='loan-action' style={{width: '100%', paddingBottom: 10}}>
            <Button type='primary' size='large' className='btn-action' style={{marginRight: 'auto', marginLeft: 'auto'}}>View Offers</Button>
          </div>
        </div>
        }
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
  } else {
    return (
      <div className='app-loanitem'>
      <div>
        <p className='loan-id'>ID: <span>{data._id}</span></p>

        <img 
          alt="NFT" 
          className='app-loanitem--image'
          src={data.asset.image} 
        />
      </div>
    
      <div className='loan-nft-info'>
        <p className='name-nft'>{data.asset.tokenName}</p>
        <p className='info-item'>Token ID: <span>#000{data.asset.tokenID}</span></p>
        <p className='info-item'>Valuation: <span>{data.asset.valuation} USD</span></p>
        <p className='info-item'>Metadata: <a href={data.asset.uri} target="_blank"  >{shortenString(data.asset.uri, 15, 8)}</a></p>
        <p className='info-item'>Contract Address: <span>{shortenString(ERC721CT_Address, 5,8)}</span></p>

        <div className='loan-term'>
          <div className='term-item'>
            <p className='term-item--title'>Pricinpal</p>
            <p className='term-item--value'>{Number(dataOffer.principal).toFixed(1)} {dataOffer.principalType}</p>
          </div>
          <div className='term-item'>
            <p className='term-item--title'>APR</p>
            <p className='term-item--value'>{dataOffer.apr}%</p>
          </div>
          <div className='term-item'>
            <p className='term-item--title'>Duration</p>
            <p className='term-item--value'>{dataOffer.duration} {dataOffer.durationType}</p>
          </div>
          <div className='term-item'>
            <p className='term-item--title'>Repayment</p>
            <p className='term-item--value'>{Number(dataOffer.repayment).toFixed(1)} {dataOffer.principalType}</p>
          </div>
        </div>
      </div>

      <div className='divider'/>

      <div className='loan-left'>
        <div>
          <p className='info-item'>Status: {getStatus(data.status)}</p>
          <p className='info-item'>Due date: <span>10/10/2023</span></p>  
        </div>
      
        <div className='time-info' style={{padding: '0 70px'}}>
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
        
        <div className='loan-action' style={{width: '100%', paddingBottom: 10}}>
          <Button type='primary' size='large' className='btn-action' onClick={() => {}}>Forfeit Asset</Button>
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

}

export default LoanItem