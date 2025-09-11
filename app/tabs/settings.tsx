import TabContent from "../components/TabContent";

export default function HomeTab() {
    return (
        <TabContent
            title="Welcome Settings"
            description="This is the settings tab with a video and a code snippet."
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
            code={`'use client';
import React, { useState } from 'react'
import LiveSearch from '../components/LiveSearch'

const profiles = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Doe' },
    { id: '3', name: 'John Smith' },
    { id: '4', name: 'Jane Smith' },
    { id: '5', name: 'Hannah' },
    { id: '6', name: 'Heather' },
    { id: '7', name: 'Helen' },
    { id: '8', name: 'Gabriele' },
    { id: '9', name: 'Anne Teak' },
    { id: '10', name: 'Addie Minstra' },
    { id: '11', name: 'Anne Ortha' },
]

const Page = () => {

    const [results, setResults] = useState<{ id: string, name: string }[]>();
    
    const [selectedProfile, setSelectedProfile] = useState<{ id: string, name: string }>();

    type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
    const handleChange: changeHandler = (e) => {
        const { target } = e;

        if (!target.value.trim()) return setResults([]);

        const filteredResults = profiles.filter((profile) =>
            profile.name.toLowerCase().includes(target.value.toLowerCase()));
        setResults(filteredResults);
    }
    return (
        <LiveSearch
            results={results}
            onChange={handleChange}
            renderItem={(item) => <p>{item.name}</p>}
            onSelect={(item) => setSelectedProfile(item)}
            value={selectedProfile?.name}
        />
    )
}

export default Page


'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

interface Props<T> {
    results?: T[];
    renderItem: (item: T) => React.ReactNode;
    onChange?: React.ChangeEventHandler;
    onSelect?: (item: T) => void;
    value?: string;
}

const LiveSearch = <T,>({ results = [], renderItem, onChange, onSelect, value }: Props<T>) => {
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const resultContainer = useRef<HTMLDivElement>(null);
    const [showResults, setShowResults] = useState(false);
    const [defaultValue, setDefaultValue] = useState('');

    const handleSelection = (selectIndex: number) => {
        const selectedItem = results[selectIndex];
        if (!selectedItem) {
            resetSearchComplete();
            return;
        }
        if (onSelect) onSelect(selectedItem);
        resetSearchComplete();
    }

    const resetSearchComplete = useCallback(() => {
        setFocusedIndex(-1);
        setShowResults(false);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const { key } = e;
        let nextIndexCount = 0;
        if (key === 'ArrowDown') {
            console.log('ArrowDown pressed');
            nextIndexCount = (focusedIndex + 1) % results.length;
        }
        if (key === 'ArrowUp') {
            console.log('ArrowUp pressed');
            nextIndexCount = (focusedIndex + results.length - 1) % results.length;
        }
        if (key === 'Escape') {
            resetSearchComplete();
        }
        if (key === 'Enter') {
            e.preventDefault();
            handleSelection(focusedIndex)
        }
        setFocusedIndex(nextIndexCount);
    }

    type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
    const handleChange: changeHandler = (e) => {
        setDefaultValue(e.target.value);
        if (onChange) onChange(e);
    }

    useEffect(() => {
        if (!resultContainer.current) return;

        resultContainer.current.scrollIntoView({ block: 'center', inline: 'center' });
    }, [focusedIndex]);

    useEffect(() => {
        if (!results.length) return setShowResults(false);
        setShowResults(true);
    }, [results]);

    useEffect(() => {
        if (value) setDefaultValue(value);
    }, [value]);

    return (
        <div className='h-[90vh] flex items-center justify-center'>
            <div
                tabIndex={1}
                onBlur={resetSearchComplete}
                onKeyDown={handleKeyDown}
                className='relative'>
                <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Search..."
                    value={defaultValue}
                    className='w-[600px] px-5 py-3 text-lg rounded-full border-2 border-gray-500 focus:border-gray-700 outline-none transition' />

                {/* Search results container */}
                {showResults && (
                    <div className='absolute mt-1 w-full p-2 bg-white shadow-lg 
                rounded-bl rounded-br max-h-56 overflow-y-auto'>
                        {results.map((item, index) => (
                            <div
                                key={index}
                                onMouseDown={() => handleSelection(index)}
                                ref={index === focusedIndex ? resultContainer : null}
                                style={{
                                    backgroundColor:
                                        index === focusedIndex ? 'rgba(0,0,0,0.1)' : ''
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
`}
        />
    );
}
