import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { authHome } from '../contextapi/HomeContext'

const LikedPlaylist = ({ music, index }) => {
    const { deletemusic } = useContext(authHome)
    return (
        <Link to={`/visible/${music.item?._id}`}>
            <div
                key={music?.item?._id}
                className="group flex items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer"
            >
                {/* Index */}
                <div className="w-12 flex justify-center text-white/60 font-bold text-lg">
                    {index + 1}
                </div>

                {/* Playlist Info */}
                <div className="flex-1 min-w-0 px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src=''
                                alt={music?.item?.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-white text-sm truncate">
                                {music?.item?.name}
                            </h3>

                            <p className="text-xs text-white/60 truncate">
                                Playlist • {music?.item?.music?.length || 0} songs
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => deletemusic(music._id)}
                    className='p-2 rounded-xl bg-white/10 hover:bg-red-500/20 hover:border-red-500/30 border border-transparent hover:border-red-500/50 transition-all duration-200 group/like'
                    title='Remove from favorites'
                >
                    <svg
                        className='w-5 h-5 text-red-400 group-hover/like:text-red-500 group-hover/like:scale-110 transition-all duration-200'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                    >
                        <path
                            fillRule='evenodd'
                            d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                            clipRule='evenodd'
                        />
                    </svg>
                </button>
            </div>
        </Link>
    )
}

export default LikedPlaylist