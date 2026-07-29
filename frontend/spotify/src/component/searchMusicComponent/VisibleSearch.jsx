import { RiAddCircleLine, RiMoreLine } from '@remixicon/react'
import React from 'react'
import { Link } from 'react-router-dom'

const VisibleSearch = ({ elem, selected }) => {
    return (
        <div
            key={elem._id}
            className={`flex ${selected === elem._id ? 'bg-[#1F1F1F] hover:bg-[#141414]' : 'hover:bg-[#1F1F1F]'} cursor-pointer px-4 py-3 rounded-lg items-center justify-between`}
        >
            <div className="flex items-center gap-4">
                <div className="rounded-lg w-20 h-20 overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn2nmWoa-66Yo5xylQwIiAxtvMrK2pB2l4CA&s'
                        alt={elem.name}
                    />
                </div>
                <div>
                    <h1 className="text-[24px] font-bold">{elem.name}</h1>
                    <h1 className="text-sm text-gray-400">
                        playlist. <span className='text-green-500'>{elem.music.length} songs</span>
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <RiAddCircleLine className="text-[#a1a0a0] w-6 h-6 cursor-pointer hover:scale-110 transition" />
                <RiMoreLine className="text-[#a1a0a0] w-6 h-6 cursor-pointer hover:scale-110 transition" />
                <Link to={`/visible/${elem._id}`} >
                    <button className="text-sm px-3 py-1 border border-gray-600 rounded-full hover:border-white">
                        View
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default VisibleSearch