import React from 'react'

const ModalLogin = () => {
  return (
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
  </Modal>
  )
}

export default ModalLogin