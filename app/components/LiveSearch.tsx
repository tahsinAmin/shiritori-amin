import React from 'react'

const LiveSearch = () => {
    return (
        <div className='h-screen flex items-center justify-center'>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    className='w-[600px] px-5 py-3 text-lg rounded-full border-2 border-gray-500 focus:border-gray-700 outline-none transition' />
            </div>
        </div>
    )
}

export default LiveSearch