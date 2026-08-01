import { RiAddCircleLine, RiAlbumFill, RiAlbumLine, RiMoreLine, RiMusicLine } from '@remixicon/react'
import React from 'react'
import { Link } from 'react-router-dom'

const AlbumSearch = ({ elem, selected }) => {
    return (
        <div
            key={elem._id}
            className={`flex ${selected === elem._id ? 'bg-[#1F1F1F] hover:bg-[#141414]' : 'hover:bg-[#1F1F1F]'} cursor-pointer px-4 py-3 rounded-lg items-center justify-between`}
        >
            <div className="flex items-center gap-4">
                <div className="rounded-lg w-20 h-20 overflow-hidden relative">
                    <div className='bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] w-full h-full absolute z-100 flex items-center justify-center' >
                        <RiAlbumLine className=' w-10 h-10' />
                    </div>
                    {
                        elem?.image && (
                            <img
                                className="w-full h-full object-cover absolute z-111"
                                src={elem?.image}
                                alt={elem.title}
                            />
                        )
                    }
                </div>

                <div>
                    <h1 className="text-[24px] font-bold">{elem.title}</h1>
                    <h1 className="text-sm text-gray-400">
                        Album • {elem.album?.length || 0} songs
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-4">

                <RiAddCircleLine className="text-[#a1a0a0] w-6 h-6 cursor-pointer hover:scale-110 transition" />

                <RiMoreLine className="text-[#a1a0a0] w-6 h-6 cursor-pointer hover:scale-110 transition" />
                <Link to={`/albumdetail/${elem._id}`}>

                    <button className="text-sm px-3 py-1 border border-gray-600 rounded-full hover:border-white">
                        View
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default AlbumSearch