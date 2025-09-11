'use client'

import React, { useEffect, useRef, useState } from 'react'

interface Props<T> {
    results?: T[];
    renderItem: (item: T) => React.ReactNode;
    onChange?: React.ChangeEventHandler;
}

const LiveSearch = ({ results = [], renderItem, onChange }: Props<any>) => {
    const [focusIndex, setFocusIndex] = useState<number>(-1);
    const resultContainer = useRef<HTMLDivElement>(null);
    const [showResults, setShowResults] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const { key } = e;
        let nextIndexCount = 0;
        if (e.key === 'ArrowDown') {
            console.log('ArrowDown pressed');
            nextIndexCount = (focusIndex + 1) % results.length;
        }
        if (e.key === 'ArrowUp') {
            console.log('ArrowUp pressed');
            nextIndexCount = (focusIndex + results.length - 1) % results.length;
        }
        if (e.key === 'Escape') {
            console.log('Escape pressed');
        }
        if (e.key === 'Enter') {
            console.log('Enter pressed');
        }
        setFocusIndex(nextIndexCount);
    }

    useEffect(() => {
        if (!resultContainer.current) return;

        resultContainer.current.scrollIntoView({ block: 'center', inline: 'center' });
    }, [focusIndex]);

    useEffect(() => {
        if (!results.length) return setShowResults(false);
        setShowResults(true);
    }, [results]);

    return (
        <div className='h-[90vh] flex items-center justify-center'>
            <div tabIndex={1} onKeyDown={handleKeyDown} className='relative'>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Search..."
                    className='w-[600px] px-5 py-3 text-lg rounded-full border-2 border-gray-500 focus:border-gray-700 outline-none transition' />

                {/* Search results container */}
                {showResults && (
                    <div className='absolute mt-1 w-full p-2 bg-white shadow-lg 
                rounded-bl rounded-br max-h-56 overflow-y-auto'>
                        {results.map((item, index) => (
                            <div
                                key={index}
                                ref={index === focusIndex ? resultContainer : null}
                                style={{
                                    backgroundColor:
                                        index === focusIndex ? 'rgba(0,0,0,0.1)' : ''
                                }}
                                className='cursor-pointer hover:bg-black hover:bg-opacity-10 p-2'>
                                {renderItem(item)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default LiveSearch