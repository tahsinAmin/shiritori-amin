import React from 'react'

interface Props<T> {
    results: T[]
}

const LiveSearch = ({ results }: Props<T>) => {
    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='relative'>
                <input
                    type="text"
                    placeholder="Search..."
                    className='w-[600px] px-5 py-3 text-lg rounded-full border-2 border-gray-500 focus:border-gray-700 outline-none transition' />

                {/* Search results container */}
                <div className='absolute mt-1 w-full p-2 bg-white shadow-lg rounded bl rounded-br max-h-36 overflow-y-auto'>
                    {results.map((item, index) => (
                        <div key={index}
                            className='cursor-pointer hover:bg-black hover:bg-opacity-10 p-2'>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LiveSearch