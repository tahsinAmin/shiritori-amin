'use client'
import React from 'react'
import Link from 'next/link'
import Shiritori from '../components/shiritori'

const page = () => {
    return (
        <div>
            <header>
                <Link href="/">Documentation</Link>
            </header>
            <Shiritori />
        </div>
    )
}

export default page