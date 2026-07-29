import { RiAddCircleLine, RiMoreLine, RiPlayCircleFill } from '@remixicon/react'
import React from 'react'

const MusicSearch = ({elem, selected}) => {
    return (
        <div key={elem._id} className={`flex  cursor-pointer ${selected === elem._id ? 'bg-[#1F1F1F] hover:bg-[#141414]' : 'hover:bg-[#1F1F1F]'} px-4 py-3 rounded-lg items-center justify-between `}>
            <div className='flex items-center gap-4'>
                <div className=' rounded-lg w-20 h-20 overflow-hidden'><img className='w-full h-full object-cover' src={elem.image} alt="" /></div>
                <div>
                    <h1 className='text-[24px] font-bold'>{elem.title}</h1>
                    <h1 className='text-sm'>song . {elem.artist?.username}</h1>
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <RiMoreLine className='text-[#a1a0a0] w-5 h-5 hover:scale-107 cursor-pointer' />
                <RiAddCircleLine className='text-[#a1a0a0] w-5 h-5 cursor-pointer hover:scale-105' />
                <button className='cursor-pointer hover:-translate-y-0.5 transition-all duration-200'><RiPlayCircleFill className='w-15 text-green-500 h-15' /></button>
            </div>
        </div>
    )
}

export default MusicSearch