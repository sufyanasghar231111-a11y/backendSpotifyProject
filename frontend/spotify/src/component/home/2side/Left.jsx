import { RiAddLine } from '@remixicon/react'
import React from 'react'

const Left = () => {
  return (
    <div className='w-[30%]  overflow-hidden max-sm:fixed max-sm:z-30 max-sm:w-[50%]   sticky h-[76vh] left-0   rounded bg-[#282828]  '>
       <header className=' py-3 px-3 bg-[#1a1a1a]  sticky top-0 z-10 '>
        <div className='flex items-center justify-between'>
        <h1 className='font-semibold'>Your Library</h1>
        <button className='bg-white/10 rounded-full px-3 py-1.5 font-semibold flex items-center gap-2 cursor-pointer'> <RiAddLine />  Create</button>
        </div>
        <div className='pt-5'>
            <button className='bg-white/10 rounded-full px-4 py-1 font-semibold   cursor-pointer'>Playlist</button>
        </div>
       </header>
       <div className='h-[60vh]  overflow-y-auto '>
        <div className=' flex items-center px-4 py-2'>
            <div className='flex items-center gap-3'>
                <div className='border rounded w-15 h-15 bg-white'>
                </div>
                <div>
                    <h1 className='font-semibold'>Liked Songs</h1>
                    <h1 className='text-sm'>playlist . 5 songs</h1>
                </div>
            </div>
        </div>
       </div>

    </div>
  )
}

export default Left
