'use client'
import { Button, Input, InputNumber, Modal, Result, Select, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import "./Tokenize.scss"
import { getERC721Contract } from '@/services/blockchain'
import { useAppSelector } from '@/state/hook'
import { CheckCircleTwoTone } from '@ant-design/icons'
import appApi from '@/api/appAPI'
import ModalLogin from '@/components/ModalLogin/ModalLogin'
import { useRouter } from 'next/navigation'
import { hdConnectWallet } from '@/layouts/Header'
import Moralis from 'moralis'

const LIST_ADMINS = ['0x6225D07A59be4F47400E8885d8EFC78FF7D9e171']

const Tokenize = () => {
    const {userState, appState} = useAppSelector(state => state)
    const [assetData, setAssetData] = useState({
        tokenID: 0,
        name: "",
        valuation: 0,
        type: "",
        image: "",
        owner: "",
        uri: ""
    })

    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    
    useEffect(() => {

        const myTimeout = setTimeout(() => {
            if (userState.isAuthenticated && !LIST_ADMINS.includes(userState.address)){
                alert("You aren't admin.")
                router.push('/')
            } 
        }, 500)

        return () => {
            clearInterval(myTimeout)
        }
    }, [userState])

    const sendAsset = async () => {          
        if (assetData == 0 || assetData.name == "" || assetData.valuation == 0 || assetData.type == "" || assetData.image == "" || assetData.owner == ""){
            alert("Please fill all field.")
            return
        }
        if (!userState.isAuthenticated){
            hdConnectWallet()
            return
        }
        setLoading(true)
        setOpenModal(true)
        if (!Moralis.Core.isStarted) {
            await Moralis.start({
                apiKey: '6vBl8N0kdP8zUtDcnxIJ8rvS57KTJMPXVIWIpjuXeQycVyYw5R2Klwnsrp79nIfd',
                // ...and any other configuration
            });
        }
        const abi = [
            {
                path: "metadata.json",
                content: {
                name: assetData.name,
                type: assetData.type,
                valuation: assetData.valuation,
                description: "This will be the NFT description.",
                image: assetData.image,
                }
            },
        ];
         
        const response = await Moralis.EvmApi.ipfs.uploadFolder({abi});
        
        const uri = response.toJSON()[0].path
    
        const ERC721CT = getERC721Contract(appState.web3);

        const mintMethod = ERC721CT.methods.adminMintAsset(assetData.valuation, uri, assetData.owner);
        await mintMethod.estimateGas({from: userState.address})
        
        const mintRecipt = await mintMethod.send({from: userState.address})
        console.log(mintRecipt)
        setAssetData({...assetData, tokenID: parseInt(mintRecipt.logs[1].data), uri: uri})

        await appApi.addAsset({
            tokenID: parseInt(mintRecipt.logs[1].data), // tokenID,
            uri : uri,
            tokenName: assetData.name,
            user: assetData.owner,
            image: assetData.image,
            valuation: assetData.valuation
        })

        setLoading(false)
    }

    const grantAsset = async () => {

    }

    return (
        <div className='app-admin-tokenize'>
            {userState.isAuthenticated ? null : <ModalLogin />}
            <h1>Tokenize</h1>  
            <div className='token-field'>
                <p className='title'>Name</p>
                <Input placeholder='Your name of NFT' size='large' className='input' value={assetData.name}
                    onChange={(e) => setAssetData({...assetData, name: e.target.value})}
                />
            </div>

            <div style={{display: 'flex', columnGap: 10}}>
                <div className='token-field' >
                    <p className='title'>Valuation</p>
                    <InputNumber placeholder='Image of Asset' size='large' className='input' value={assetData.valuation}
                        onChange={(e) => setAssetData({...assetData, valuation: Number(e)})}
                        controls={false}
                        addonAfter='USD'
                    />
                </div>
                <div className='token-field' >
                    <p className='title'>Type Asset</p>
                    <Select
                        placeholder="Select a type"
                        onChange={(e) => setAssetData({...assetData, type: String(e)})}
                        options={[
                        {
                            value: 'watch',
                            label: 'Watch',
                        },
                        {
                            value: 'jewelry',
                            label: 'Jewelry',
                        },
                        {
                            value: 'car',
                            label: 'Car',
                        },
                        {
                            value: 'phone',
                            label: 'Phone',
                        },
                        {
                            value: 'other',
                            label: 'Other',
                        }
                        ]}
                    />
                </div>
            </div>
            <div className='token-field'>
                <p className='title'>Image</p>
                <Input placeholder='Image of asset certification' size='large' className='input' value={assetData.image}
                    onChange={(e) => setAssetData({...assetData, image: e.target.value})}
                />
            </div>

            <div className='token-field'>
                <p className='title'>Owner</p>
                <Input placeholder='Wallet address of owner' size='large' className='input' value={assetData.owner}
                    onChange={(e) => setAssetData({...assetData, owner: e.target.value})}
                />
            </div>

            <div style={{display:'flex', flexDirection:'row'}}>
                <div className='btn-tokenize' onClick={sendAsset}>Send Asset</div>
                <div className='btn-tokenize' onClick={() => {}}>Grant Asset</div>
                
            </div>

            <Modal title="Tokenize Asset" open={openModal} centered 
                width={800 - 32}
                closable={true}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{style: {display: loading ? 'none' : 'inline-block'}}}
                onCancel={() => setOpenModal(false)}
                onOk={() => setOpenModal(false)}
                className='modal-tokenize'
            >
                {   
                    loading ?
                    <div>
                        <Spin tip="Loading" size="large" style={{padding: 50, display:"flex",justifyContent:'center' }} />
                        <p style={{textAlign:'center', marginTop: -30, marginBottom: 30}}>Waiting to process...</p>
                    </div>
                    :
                    <div>
                    <div style={{textAlign:'left', display: 'flex', justifyContent: 'center', flexDirection:'column'}}>
                        <div style={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <img src={assetData.image} alt='asset' 
                                style={{width: 200, height: 200, objectFit: 'cover', borderRadius: 10}}
                            />

                            <div style={{display: 'flex', alignItems:'center', margin: '20px 0'}}>
                                <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '2rem', marginRight: 20}}/>
                                <p style={{fontSize: '1.4rem', fontWeight: 600}}>Successfully Tokenized Your Asset!</p>
                            </div>
                        </div>

                        <p style={{fontSize: '1rem', fontWeight: 500}}>Token ID: <span style={{color: "#fff"}}>#00000{assetData.tokenID}</span></p>
                        <p style={{fontSize: '1rem', fontWeight: 500}}>Token name: <span style={{color: "#fff"}}>{assetData.name}</span></p>
                        <p style={{fontSize: '1rem', fontWeight: 500}}>Metadata: <span style={{color: "#fff"}}>{assetData.uri}</span></p>
                        <p style={{fontSize: '1rem', fontWeight: 500}}>Owner: <span style={{color: "#fff"}}>{assetData.owner}</span></p>

                        <div className={{display: 'flex', flexDirection: 'row'}}>
                            <p style={{fontSize: '1rem', fontWeight: 500}}>Valuation: <span style={{color: "#fff"}}>{assetData.valuation}</span></p>
                            <p style={{fontSize: '1rem', fontWeight: 500}}>Type: <span style={{color: "#fff"}}>{assetData.type}</span></p>
                        </div>
                    </div>
                    </div>
                }
            </Modal>
        </div>  
    )
}

export default Tokenize