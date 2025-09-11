'use client';
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