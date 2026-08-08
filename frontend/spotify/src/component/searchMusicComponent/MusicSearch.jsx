import { RiAddCircleLine, RiMoreLine, RiPlayCircleFill } from '@remixicon/react'
import React from 'react'

const MusicSearch = ({ elem, selected }) => {
    return (
        <div
            key={elem._id}
            className={`flex cursor-pointer ${selected === elem._id ? 'bg-[#1F1F1F] hover:bg-[#141414]' : 'hover:bg-[#1F1F1F]'
                } px-2 sm:px-4 py-2 sm:py-3 rounded-lg items-center justify-between gap-2`}
        >
            <div className='flex items-center gap-2 sm:gap-4 min-w-0 flex-1'>
                <div className='rounded-lg w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 overflow-hidden flex-shrink-0'>
                    <img className='w-full h-full object-cover' src={elem.image} alt="" />
                </div>
                <div className='min-w-0'>
                    <h1 className='text-base sm:text-lg md:text-[24px] font-bold truncate'>{elem.title}</h1>
                    <h1 className='text-xs sm:text-sm text-[#a1a0a0] truncate'>song . {elem.artist?.username}</h1>
                </div>
            </div>
            <div className='flex items-center gap-2 sm:gap-3 flex-shrink-0'>
                <RiMoreLine className='hidden sm:block text-[#a1a0a0] w-5 h-5 hover:scale-107 cursor-pointer' />
                <RiAddCircleLine className='hidden sm:block text-[#a1a0a0] w-5 h-5 cursor-pointer hover:scale-105' />
                <button className='cursor-pointer hover:-translate-y-0.5 transition-all duration-200'>
                    <RiPlayCircleFill className='w-9 h-9 sm:w-11 sm:h-11 md:w-15 md:h-15 text-green-500' />
                </button>
            </div>
        </div>
    )
}

export default MusicSearch