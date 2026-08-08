import { RiAlbumLine } from '@remixicon/react'
import React from 'react'
import { Link } from 'react-router-dom'

const AlbumShowall = ({ elem }) => {
    return (
        <div className="group w-[200px] max-sm:w-[70%] rounded-lg p-2 transition-all duration-300 hover:bg-white/10 cursor-pointer">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                <Link to={`/albumdetail/${elem._id}`}>
                {
                    elem.image && (
                        <img
                            className="w-full h-full object-cover absolute z-40"
                            src={elem.image}
                            alt=""
                        />
                    )
                }
                <div className='z-39 bg-green-500 absolute w-full h-full flex items-center justify-center'>
                    <RiAlbumLine className='w-16 h-16' />
                </div>
                </Link>
            </div>

            <div className="mt-2">
                <h1 className="font-semibold truncate hover:underline">
                    {elem.title}
                </h1>

                <p className="text-sm text-[#b3b3b3] truncate">
                    {elem.artistName}
                </p>
            </div>
        </div>
    )
}

export default AlbumShowall