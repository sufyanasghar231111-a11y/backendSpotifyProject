import React from 'react'
import { Link } from 'react-router-dom'

const AlbumShowall = ({ elem }) => {
    return (
        <div className="group w-[160px] max-sm:w-[46%] rounded-lg p-2 transition-all duration-300 hover:bg-white/10 cursor-pointer">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                <Link to={`/albumdetail/${elem._id}`}>
                    <img
                        className="w-full h-full object-cover"
                        src="https://i.scdn.co/image/ab67616d0000b2736fd2559f0879066633e56c42"
                        alt=""
                    />
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