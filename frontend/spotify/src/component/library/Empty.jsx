import { RiSearchLine } from '@remixicon/react'
import React from 'react'

const Empty = () => {
  return (
    <div className='flex flex-col items-center justify-center py-14 text-center text-[#8a8a8a]'>
                                                <div className='w-16 h-16 rounded-full bg-[#1d1d1d] flex items-center justify-center text-2xl mb-4'>
                                                    <RiSearchLine />
                                                </div>
    
                                                <h1 className='text-white font-semibold text-lg'>
                                                    Start Searching
                                                </h1>
    
                                                <p className='text-sm mt-1 max-w-[260px]'>
                                                    Find your favorite songs, artists and playlists instantly.
                                                </p>
                                            </div>
  )
}

export default Empty
