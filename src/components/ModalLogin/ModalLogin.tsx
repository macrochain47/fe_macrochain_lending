'use client'
import { hdConnectWallet } from "@/layouts/Header"
import { Modal } from "antd"
import { useRouter } from "next/navigation"
import { useState } from "react"
import "./ModalLogin.scss"
export default function ModalLogin() {
    const router = useRouter()
    const [confirmLoading, setConfirmLoading] = useState(false)

    const clickConnectWallet = async () => {
        setConfirmLoading(true)
        await hdConnectWallet()
        setConfirmLoading(false)
    }

    return (
        <Modal
            title="Notification"
            open={true}
            okText="Connect Wallet"
            cancelText="Go Home"
            onOk={clickConnectWallet}
            confirmLoading={confirmLoading}

            onCancel={() => router.push('/')}
        >
            <p>You need to connect your wallet to continue!</p>
        </Modal>

    )
}