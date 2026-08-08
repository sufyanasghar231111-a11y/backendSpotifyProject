import React, { useContext } from 'react'
import { UIPlaylistContext } from '../../contextapi/PlaylistContext'
import { RiPlayFill, RiShuffleLine } from '@remixicon/react'

const PlaylistDetail = () => {
    
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { setHideExtra } = useContext(UIPlaylistContext)
  return (
    <div className='flex px-8  pt-2  items-center gap-5' >
          <div className='
              flex items-center justify-center
              lg:w-14 max-sm:w-9 w-10 md:w-10 lg:h-14 max-sm:h-9 h-10 md:h-10 rounded-full hover:bg-green-600 bg-green-500
              opacity-100
              transition-all duration-300 ease-out shadow-lg'>
            <RiPlayFill className='text-black lg:w-7 max-sm:w-5 md:w-6 w-6 lg:h-7 max-sm:h-5 md:h-6 h-6 ' />
          </div>
          <div className='lg:w-14 max-sm:w-9 w-10 md:w-10 lg:h-14 max-sm:h-9 h-10 md:h-10 flex items-center justify-center cursor-pointer'>
            <RiShuffleLine className='lg:w-7 max-sm:w-5 md:w-6 w-6 lg:h-7 max-sm:h-5 md:h-6 h-6  text-[#AEA7A7] hover:text-[#d8d2d2] hover:scale-105' />
          </div>
          <svg onClick={() => { setHideExtra(true) }} className='lg:w-7 max-sm:w-5 md:w-6 w-6 lg:h-7 max-sm:h-5 md:h-6 h-6  text-[#aea7a7] hover:text-[#d8d2d2] cursor-pointer hover:scale-105 ' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z' />
          </svg>
          
        </div>
  )
}

export default PlaylistDetail