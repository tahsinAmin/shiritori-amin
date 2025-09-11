'use client';

import React from 'react'
import LiveSearch from '../components/LiveSearch'

interface Props { }

const profiles = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'John Smith' },
    { id: 4, name: 'Jane Smith' },
    { id: 5, name: 'Hannah' },
    { id: 6, name: 'Heather' },
    { id: 7, name: 'Helen' },
    { id: 8, name: 'Gabriele' },
    { id: 9, name: 'Anne Teak' },
    { id: 10, name: 'Addie Minstra' },
    { id: 11, name: 'Anne Ortha' },
]

const page = () => {
    return (
        <LiveSearch results={profiles} renderItem={(item) => <p>{item.name}</p>} />
    )
}

export default page