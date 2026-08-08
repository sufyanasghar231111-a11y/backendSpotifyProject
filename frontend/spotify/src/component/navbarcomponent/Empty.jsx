import { RiSearchLine } from '@remixicon/react'
import React from 'react'

const Empty = () => {
    return (
        <div className='flex flex-col items-center justify-center py-14 max-sm:py-3 text-center text-[#8a8a8a]'>
            <div className='lg:w-16 md:w-14 md:h-14 w-15 h-15 max-sm:w-10 max-sm:h-10 lg:h-16 rounded-full bg-[#1d1d1d] flex items-center justify-center text-2xl mb-4'>
                <RiSearchLine />
            </div>

            <h1 className='text-white font-semibold lg:text-lg text-lg max-sm:text-sm'>
                Start Searching
            </h1>

            <p className='text-sm max-sm:text-xs max-sm:px-2 mt-1 max-w-[260px]'>
                Find your favorite songs, artists and playlists instantly.
            </p>
        </div>
    )
}

export default Empty
