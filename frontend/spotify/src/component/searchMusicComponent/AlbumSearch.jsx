import { RiAddCircleLine, RiAlbumFill, RiAlbumLine, RiMoreLine, RiMusicLine } from '@remixicon/react'
import React from 'react'
import { Link } from 'react-router-dom'

const AlbumSearch = ({ elem, selected }) => {
    return (
        <div
            key={elem._id}
            className={`flex ${selected === elem._id ? 'bg-[#1F1F1F] hover:bg-[#141414]' : 'hover:bg-[#1F1F1F]'} cursor-pointer px-2 sm:px-4 py-2 sm:py-3 rounded-lg items-center justify-between gap-2`}
        >
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                <div className="rounded-lg w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 overflow-hidden relative flex-shrink-0">
                    <div className='bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] w-full h-full absolute z-39 flex items-center justify-center'>
                        <RiAlbumLine className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10' />
                    </div>
                    {
                        elem?.image && (
                            <img
                                className="w-full h-full object-cover absolute z-40"
                                src={elem?.image}
                                alt={elem.title}
                            />
                        )
                    }
                </div>

                <div className='min-w-0'>
                    <h1 className="text-base sm:text-lg md:text-[24px] font-bold truncate">{elem.title}</h1>
                    <h1 className="text-xs sm:text-sm text-gray-400 truncate">
                        Album • {elem.album?.length || 0} songs
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <RiAddCircleLine className="hidden sm:block text-[#a1a0a0] w-6 h-6 cursor-pointer hover:scale-110 transition" />
                <RiMoreLine className="hidden sm:block text-[#a1a0a0] w-6 h-6 cursor-pointer hover:scale-110 transition" />
                <Link to={`/albumdetail/${elem._id}`}>
                    <button className="text-xs sm:text-sm px-2 sm:px-3 py-1 border border-gray-600 rounded-full hover:border-white whitespace-nowrap">
                        View
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default AlbumSearch