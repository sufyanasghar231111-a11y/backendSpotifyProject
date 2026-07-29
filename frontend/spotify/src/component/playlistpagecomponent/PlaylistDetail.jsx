import React, { useContext } from 'react'
import { UIPlaylistContext } from '../../contextapi/PlaylistContext'
import { RiPlayFill, RiShuffleLine } from '@remixicon/react'

const PlaylistDetail = () => {
    
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { setHideExtra } = useContext(UIPlaylistContext)
  return (
    <div className='flex px-8 pt-2  items-center gap-5' >
          <div className='
              flex items-center justify-center
              w-14 h-14 rounded-full hover:bg-green-600 bg-green-500
              opacity-100
              transition-all duration-300 ease-out shadow-lg'>
            <RiPlayFill className='text-black w-7 h-7' />
          </div>
          <div className='w-12 h-12 flex items-center justify-center cursor-pointer'>
            <RiShuffleLine className='w-8 h-8 text-[#AEA7A7] hover:text-[#d8d2d2] hover:scale-105' />
          </div>
          <svg onClick={() => { setHideExtra(true) }} className='w-8 h-8 text-[#aea7a7] hover:text-[#d8d2d2] cursor-pointer hover:scale-105 ' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z' />
          </svg>
          
        </div>
  )
}

export default PlaylistDetail