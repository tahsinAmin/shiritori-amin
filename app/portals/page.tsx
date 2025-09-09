'use client'
import React, { useState } from 'react'
import CustomModal from '../components/CustomModal'

const PortalPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div style={{ position: 'relative', marginTop: '100px' }}>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      <CustomModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>this is a <strong>Custom</strong> Modal</p>
        <button onClick={() => setModalOpen(false)}>Close</button>
      </CustomModal>
    </div >
  )
}

export default PortalPage