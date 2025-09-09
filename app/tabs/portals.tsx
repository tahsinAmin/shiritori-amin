import TabContent from "../components/TabContent";

export default function HomeTab() {
  return (
    <TabContent
      title="Welcome Portals"
      description="This is the Portals tab with a video and a code snippet."
      videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
      code={`
                portal/page.tsx
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

global.css


.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    background-color: white;
    border: 1px solid black;
    z-index: 1;
  }
  
  .modal-overlay.show {
    display: block;
  }
  
  .modal-overlay {
    display: none;
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.1)
  }

  layout.tsx

  ...
   <div id="modal-container">

        </div>
      </body>

   CustomModal.tsx

   import React, { useEffect, useState } from 'react';
   import { createPortal } from 'react-dom';
   
   const CustomModal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
       const [mounted, setMounted] = useState(false);
   
       useEffect(() => {
           setMounted(true);
   
           function handler(event: KeyboardEvent) {
               if (event.key === 'Escape') {
                   onClose();
               }
           }
           document.addEventListener('keydown', handler)
   
           return () => {
               document.removeEventListener('keydown', handler)
           }
       }, [onClose]);
   
       if (!mounted) return null;
   
       const modalRoot = document.querySelector('#modal-container');
       if (!modalRoot) return null;
   
       return createPortal(
           <div className={'modal-overlay isOpen ? 'show' : ''}'}>
               <div className="modal">
                  {children}
               </div>
           </div>,
           modalRoot
       );
   };
   
   export default CustomModal


   /portal/page.tsx

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
`}
    />
  );
};