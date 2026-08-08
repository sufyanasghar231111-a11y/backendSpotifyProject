import { RiPlayListLine } from '@remixicon/react'
import React from 'react'
import { Link } from 'react-router-dom'

const VisibleShowall = ({ elem }) => {
    return (
        <div className="group w-[200px] max-sm:w-[70%]  rounded-lg p-2 transition-all duration-300 hover:bg-white/10 cursor-pointer">
            <div className="w-full aspect-square rounded-lg overflow-hidden">
                <Link to={`/visible/${elem._id}`}>
                    {elem.playlistPic ? (
                        <img
                            className="w-full h-full object-cover"
                            src={elem.playlistPic}
                            alt=""
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5]">
                            <RiPlayListLine className="w-16 h-16" />
                        </div>
                    )}
                </Link>
            </div>

            <div className="mt-2">
                <h1 className="font-semibold truncate hover:underline">
                    {elem.name}
                </h1>

                <p className="text-sm text-[#b3b3b3] truncate">
                    {elem.user?.username}
                </p>
            </div>
        </div>
    )
}

export default VisibleShowall