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
        <div className={`modal-overlay ${isOpen ? 'show' : ''}`}>
            <div className="modal">
               {children}
            </div>
        </div>,
        modalRoot
    );
};

export default CustomModal