'use client';

import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Divider, Popover } from 'antd'
import Web3 from 'web3';
import { toast } from 'react-toastify';

import imageDark from '@/../public/assets/logo.svg'
import imageLight from '../../assets/img/logo-light.png'
import "./Header.scss"
import store from '@/state';
import appApi from '@/api/appAPI';
import jwt_decode from "jwt-decode";
import { IUserState, saveInfo } from '@/state/user/userSlice';
import { saveWeb3 } from '@/state/app/appSlice';
import { clearInfo } from '@/state/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/state/hook';
import PopoverUser from './helper/PopoverUser';


const SIGN_MESSAGE = "Verify Account";
const signatureLogin = async (web3: any, userAddress: string) : Promise<string> => {
  return await web3.eth.personal.sign(SIGN_MESSAGE, userAddress, "");
}

export const hdConnectWallet = async () => {
  let storeData = store.getState();
  if (typeof window.ethereum !== "undefined") {
      const myWeb3 = new Web3(window.ethereum);
      try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const address = (await myWeb3.eth.getAccounts())[0];
          const signature = await signatureLogin(myWeb3, address);
          console.log(address, signature) 
          const res = await appApi.login({
              address: address,
              signature: signature,
              message: "Verify Account",
          })
          const token_decode : any = (jwt_decode(res?.data.accessToken))
          
          const myUserState : IUserState = {
              address:  address,
              token: res?.data.accessToken,
              network: Number(await myWeb3.eth.net.getId()),
              balance: String(await myWeb3.eth.getBalance(address)),
              isAuthenticated: true,
              signature: signature,
              createdAt: res?.data.user.createdAt,
              expiredTime: new Date(token_decode.exp * 1000)
          }
          // if (!storeData.appState.isListening) {
          //     window.ethereum.on("accountsChanged", () =>  hdAccountChange())
          //     window.ethereum.on("chainChanged", () => hdNetworkChange())
          // }
          store.dispatch(saveInfo(myUserState));
          store.dispatch(saveWeb3(myWeb3));

          // toast.update(toastify, { render: "Connect wallet successfully!", type: "success", isLoading: false, autoClose: 1000});
      } catch (error) {
          // toast.update(toastify, { render: "Connect wallet failed, see detail in console.", type: "error", isLoading: false, autoClose: 1000});
          console.log(error)
      }
  } else {
      alert("MetaMask is not installed.");
  }
}
// const hdAccountChange = async () => {
//   let storeData = store.getState();
//   if (!storeData.appState.isListening) return;
//   const toastify = toast.loading("Account changed, sign message to continue...")
//   try {
//   const myWeb3 = new Web3(window.ethereum);
//   await window.ethereum.request({ method: "eth_requestAccounts" });
//   const address = (await myWeb3.eth.getAccounts())[0];
//   const signature = await signatureLogin(myWeb3, address);
//       const res = await appApi.login({
//           address: address,
//           signature: signature,
//           message: "Verify Account",
//       })
//       const token_decode : any = (jwt_decode(res?.data.accessToken))
//       const myUserState : IUserState = {
//           address: address,
//           token: res?.data.accessToken,
//           network: Number(await myWeb3.eth.net.getId()),
//           wallet: [],
//           balance:fixStringBalance(String(
//               await myWeb3.eth.getBalance(address)
//           ), 18),
//           isAuthenticated: true,
//           signature: signature,
//           createdAt: res?.data.user.createdAt,
//           expiredTime: new Date(token_decode.exp * 1000)
//       }
//       myUserState.wallet = await getBalanceAccount(myWeb3, myUserState, storeData.appState.tokens)
//       store.dispatch(saveInfo(myUserState));
//       store.dispatch(saveWeb3(myWeb3));
//       toast.update(toastify, { render: "Change account successfully!", type: "success", isLoading: false, autoClose: 1000});
//   } catch (error) {
//       toast.update(toastify, { render: "Change account failed", type: "error", isLoading: false, autoClose: 1000});
//       alert(error);
//   }
// }
// const hdNetworkChange = async () => {
//   let storeData = store.getState();
//   if (!storeData.appState.isConnectedWallet) return;
//   const toastify = toast.loading("Network changed, please wait a moment...")
//   const myWeb3 = new Web3(window.ethereum);
//   const address = (await myWeb3.eth.getAccounts())[0];
//   const myUserState : IUserState = {
//       address:  address,
//       token: storeData.userState.token,
//       network: Number(await myWeb3.eth.net.getId()),
//       wallet: [],
//       balance:fixStringBalance(String(
//           await myWeb3.eth.getBalance(address)
//       ), 18),
//       isAuthenticated: true,
//       signature: storeData.userState.signature,
//       createdAt: storeData.userState.createdAt,
//       expiredTime: storeData.userState.expiredTime
//   }
//   myUserState.wallet = await getBalanceAccount(myWeb3, myUserState, storeData.appState.tokens)
//   store.dispatch(saveInfo(myUserState));
//   store.dispatch(saveWeb3(myWeb3));
//   toast.update(toastify, { render: "Change network successful!", type: "success", isLoading: false, autoClose: 1000});
// }

export const userLogOut = () => {
  if (store.getState().userState.isAuthenticated) {
    store.dispatch(clearInfo())
    toast.success("Log out successfully!")
  }
} 

const Header = () => {
  const { theme } = useTheme()
  const router = useRouter()
  const userState = useAppSelector((state) => state.userState)

  // if (!mounted) {
  //   return (
  //     <div className='app-header'>
  //       <div className='app-header--container'>
  //           <div className="logo" onClick={() => router.push('/')}>
  //             <Image src={imageLight} alt="logo" height={32} className='logo'/>
  //           </div>
  //           <div className='header-link'>
  //               <Link href="/borrows" className='option-link'>Borrow</Link>
  //               <Link href="/lends" className='option-link'>Lend</Link>
  //               <Link href="/loans" className='option-link'>Loan</Link>
  //           </div>
  //           <Button type='primary' style={{backgroundColor: '#2F2B38 !important'}}>Connect Wallet</Button>
  //       </div>  
  //     </div>
  //   )
  // }
  // return (
  //   <div className='app-header'>
  //       <div className='app-header--container'>
  //         <div className="logo" onClick={() => router.push('/')}>
  //           {
  //             theme == 'light' &&
  //               <Image src={imageLight} alt="logo" height={32} className='logo'/>
  //           }
            
  //           {
  //             theme == 'dark' &&
  //               <Image src={imageDark} alt="logo" height={32} className='logo'/>
  //           }
  //         </div>
           
  //         <div className='header-link'>
  //             <Link href="/borrows" className='option-link'>Borrow</Link>
  //             <Link href="/lends" className='option-link'>Lend</Link>
  //             <Link href="/loans" className='option-link'>Tokenize</Link>
  //         </div>

  //         {
  //           !userState.isAuthenticated ?
  //           <Button 
  //             type='primary' 
  //             onClick={hdConnectWallet}
  //             className='btn-connect'
  //           >Connect Wallet</Button>
  //           :
  //           <PopoverUser />
  //         }
  //       </div>  
  //   </div>
    return (
    <div className='app-header'>
        <div className='app-header--container'>
          <div className="logo" onClick={() => router.push('/')}>
                <Image src={imageDark} alt="logo" height={32} className='logo'/>
          </div>
           
          <div className='header-link'>
              <Link href="/borrows" className='option-link'>Borrow</Link>
              <Link href="/lends" className='option-link'>Lend</Link>
              <Link href="/loans" className='option-link'>Tokenize</Link>
          </div>

          {
            !userState.isAuthenticated ?
            <Button 
              type='primary' 
              onClick={hdConnectWallet}
              className='btn-connect'
            >Connect Wallet</Button>
            :
            <PopoverUser />
          }
        </div>  
    </div>
  )
}

export default Header