'use client'
import { Button, Input, InputNumber, Modal, Result, Spin } from 'antd'
import React, { useState } from 'react'
import "./Tokenize.scss"
import { getNFTBaseContract } from '@/services/blockchain'
import { NFTBaseCT } from '@/constants/addressContract'
import { useAppSelector } from '@/state/hook'
import { CheckCircleTwoTone } from '@ant-design/icons'
import appApi from '@/api/appAPI'

const Tokenize = () => {
    const {userState, appState} = useAppSelector(state => state)
    const [infoNFT, setInfoNFT] = useState({
        name: '',
        valuation: 0
    })
    const [infoMint, setInfoMint] = useState({
        tokenId: 0,
        tokenName: '',
        owner: '',
        transactionHash: ''
    })

    const [openModal, setOpenModal] = useState(false)
    const [isMinting, setIsMinting] = useState(false)

    const handleMintNFT = async () => {
        if (!userState.isAuthenticated) {
            alert("Connect wallet before faucet token");
            return;
        }

        setIsMinting(true)
        setOpenModal(true)
        const NFTBaseContract = getNFTBaseContract(appState.web3, NFTBaseCT)

        const dataSign = [
            {
                type: "address",
                value: NFTBaseCT,
            },
            {
                type: "address",
                value: userState.address,
            }
        ] 

        const message = appState.web3.utils.soliditySha3(...dataSign)
        const signature = await appState.web3.eth.personal.sign(message, userState.address, '')

        try {
            const tokenizeMethod = NFTBaseContract.methods.tokenize(
                infoNFT.valuation,
                signature
            )

            const tokenizeRecipt = await tokenizeMethod.send({from: userState.address}) 
            setIsMinting (false)
            console.log(tokenizeRecipt)
            
            console.log({
                tokenID: parseInt(tokenizeRecipt.logs[1].data),
                tokenName: infoNFT.name,
                valuation: infoNFT.valuation,
                owner: userState.address,
                transactionHash: tokenizeRecipt.transactionHash
            })

            await appApi.addNFT({
                tokenID: parseInt(tokenizeRecipt.logs[1].data),
                tokenName: infoNFT.name,
                image: "https://ipfs.moralis.io:2053/ipfs/QmcVfVhhPC3m2PxoXbP5FnskWtATzQjgc617cSXF9kT3gD/RWAs0.jpeg",
                valuation: infoNFT.valuation,
            })
            
            setInfoMint({
                tokenId: parseInt(tokenizeRecipt.logs[1].data),
                tokenName: infoNFT.name,
                owner: userState.address,
                transactionHash: tokenizeRecipt.transactionHash
            })

            

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='app-tokenize'>
            <h1>Tokenize</h1>  
            <div className='token-field'>
                <p className='title'>Name</p>
                <Input placeholder='Your name of NFT' size='large' className='input' value={infoNFT.name}
                    onChange={(e) => setInfoNFT({...infoNFT, name: e.target.value})}
                />
            </div>

            <div className='token-field'>
                <p className='title'>Valuation</p>
                <InputNumber placeholder='Valuation of Asset' size='large' className='input' value={infoNFT.valuation}
                    onChange={(e) => setInfoNFT({...infoNFT, valuation: Number(e)})}
                    controls={false}
                    addonAfter='USD'
                />
            </div>

            <div className='btn-tokenize' onClick={handleMintNFT}>Tokenize Asset</div>

            <Modal title="Tokenize Asset" open={openModal} centered 
                width={800 - 32}
                closable={true}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{style: {display: isMinting ? 'none' : 'inline-block'}}}
                onCancel={() => setOpenModal(false)}
                onOk={() => setOpenModal(false)}
                className='modal-tokenize'
            >
                {
                    isMinting ? 
                    <div>
                        <Spin tip="Loading" size="large" style={{padding: 50, display:"flex",justifyContent:'center' }} />
                        <p style={{textAlign:'center', marginTop: -30, marginBottom: 30}}>Waiting to process...</p>
                    </div>
                    :
                    <div>
                    <div style={{textAlign:'left', display: 'flex', justifyContent: 'center', flexDirection:'column'}}>
                        <div style={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <img src="https://ipfs.moralis.io:2053/ipfs/QmcVfVhhPC3m2PxoXbP5FnskWtATzQjgc617cSXF9kT3gD/RWAs0.jpeg" alt='asset' 
                                style={{width: 200, height: 200, objectFit: 'cover', borderRadius: 10}}
                            />

                            <div style={{display: 'flex', alignItems:'center', margin: '20px 0'}}>
                                <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '2rem', marginRight: 20}}/>
                                <p style={{fontSize: '1.4rem', fontWeight: 600}}>Successfully Tokenized Your Asset!</p>
                            </div>
                        </div>


                        <p>Token ID: #00000{infoMint.tokenId}</p>
                        <p>Token name: {infoMint.tokenName}</p>
                        <p>Owner: {infoMint.owner}</p>
                        <p>Transaction Hash: {infoMint.transactionHash}</p>
                    </div>
                    </div>

                }
            </Modal>

        </div>  
    )
}

export default Tokenize