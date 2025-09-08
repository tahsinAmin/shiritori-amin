'use client'

import React, { useState, useRef, useEffect } from 'react';

// Reusable ClickAwayHandler component
function ClickAwayHandler({ children, onClickAway, isActive = true }: { children: React.ReactNode; onClickAway: () => void; isActive?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isActive) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                ref.current &&
                event.target instanceof Node &&
                !ref.current.contains(event.target)
            ) {
                onClickAway();
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClickAway, isActive]);

    return <div ref={ref}>{children}</div>;
}

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

// Example components to demonstrate the ClickAwayHandler
function Dropdown({ isOpen, onClose }: DropdownProps) {
    if (!isOpen) return null;

    return (
        <ClickAwayHandler onClickAway={onClose} isActive={isOpen}>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Settings
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Logout
                    </a>
                </div>
            </div>
        </ClickAwayHandler>
    );
}

interface TooltipProps {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

function Tooltip({ isVisible, onClose, children }: TooltipProps) {
    if (!isVisible) return null;

    return (
        <ClickAwayHandler onClickAway={onClose} isActive={isVisible}>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded shadow-lg z-10">
                {children}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
            </div>
        </ClickAwayHandler>
    );
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <ClickAwayHandler onClickAway={onClose} isActive={isOpen}>
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                        >
                            ×
                        </button>
                    </div>
                    <div>{children}</div>
                </div>
            </ClickAwayHandler>
        </div>
    );
}

// Main demo component
export default function ClickAwayDemo() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    ClickAwayHandler Component Demo
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Dropdown Example */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Dropdown Menu</h2>
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
                            >
                                Menu
                                <span className="ml-2">▼</span>
                            </button>
                            <Dropdown
                                isOpen={dropdownOpen}
                                onClose={() => setDropdownOpen(false)}
                            />
                        </div>
                        <p className="text-sm text-gray-600 mt-4">
                            Click the menu button to open, then click anywhere outside to close.
                        </p>
                    </div>

                    {/* Tooltip Example */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Tooltip</h2>
                        <div className="relative inline-block">
                            <button
                                onClick={() => setTooltipVisible(!tooltipVisible)}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Show Tooltip
                            </button>
                            <Tooltip
                                isVisible={tooltipVisible}
                                onClose={() => setTooltipVisible(false)}
                            >
                                This is a tooltip! Click outside to close.
                            </Tooltip>
                        </div>
                        <p className="text-sm text-gray-600 mt-4">
                            Click the button to show tooltip, then click anywhere outside to close.
                        </p>
                    </div>

                    {/* Modal Example */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Modal Dialog</h2>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
                        >
                            Open Modal
                        </button>
                        <Modal
                            isOpen={modalOpen}
                            onClose={() => setModalOpen(false)}
                            title="Example Modal"
                        >
                            <p className="text-gray-600 mb-4">
                                This modal uses the ClickAwayHandler component.
                                Try clicking outside the modal content to close it!
                            </p>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
                            >
                                Close Modal
                            </button>
                        </Modal>
                        <p className="text-sm text-gray-600 mt-4">
                            Click to open modal, then click outside the modal content to close.
                        </p>
                    </div>
                </div>

                {/* Code Example */}
                <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                    <h2 className="text-xl font-semibold mb-4">How to Use ClickAwayHandler</h2>
                    <div className="bg-gray-100 p-4 rounded text-sm font-mono overflow-x-auto">
                        <pre>{`// Wrap any component with ClickAwayHandler
<ClickAwayHandler onClickAway={() => setIsOpen(false)} isActive={isOpen}>
  <YourComponent />
</ClickAwayHandler>`}
                        </pre>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                        <p><strong>Props:</strong></p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li><code className="bg-gray-200 px-1 rounded">onClickAway</code>: Function called when clicked outside</li>
                            <li><code className="bg-gray-200 px-1 rounded">isActive</code>: Whether the click-away detection is active (default: true)</li>
                            <li><code className="bg-gray-200 px-1 rounded">children</code>: The component(s) to wrap</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}