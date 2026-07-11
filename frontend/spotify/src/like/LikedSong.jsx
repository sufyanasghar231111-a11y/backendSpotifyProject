import React, { useContext } from 'react'
import { authHome } from '../contextapi/HomeContext'
import { authRecent } from '../contextapi/RecentRoute'
import { musciControl } from '../contextapi/MusicControllerContext'
import { audioContext } from '../contextapi/AudioProvider'

const LikedSong = ({ music, index }) => {
    const  { update } = useContext(authRecent)
      const  { patchMusicPlaying, playRef } = useContext(musciControl)
      const  { playing, currentSong } = useContext(audioContext)
    const { deletemusic } = useContext(authHome)
    return (
        <div
            key={music?.item._id}
            className='group flex items-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10'
        >
            {/* Index / Play Button */}
            <div className='relative flex-shrink-0 w-12 h-12'>
                <span className='absolute inset-0 max-sm:hidden flex items-center justify-center text-white/60 font-bold text-lg group-hover:scale-0 transition-all duration-300 z-10'>
                    {index + 1}
                </span>

                <button
                    onClick={() => {
                        playRef(music?.item)
                        patchMusicPlaying(music?.item._id)
                        update(music?.item._id)
                    }}
                    className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        w-10 h-10 rounded-full bg-[#1DB954]
        flex items-center justify-center
        scale-0 max-sm:scale-100 group-hover:scale-100
        transition-all duration-300
        shadow-lg hover:bg-[#1ED760]
        active:scale-95'
                >
                    {currentSong === music?.item?._id && playing ? (
                        <svg
                            className='w-5 h-5 text-white'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                        >
                            <rect x='6' y='5' width='4' height='14' rx='1' />
                            <rect x='14' y='5' width='4' height='14' rx='1' />
                        </svg>
                    ) : (
                        <svg
                            className='w-6 h-6 text-white ml-0.5'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                        >
                            <path d='M8 5.5v13l10-6.5z' />
                        </svg>
                    )}
                </button>
            </div>

            {/* Music Info */}
            <div className='flex-1 min-w-0 px-4'>
                <div className='flex items-center gap-3'>
                    <div className='relative w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300'>
                        <img
                            className='w-full h-full object-cover'
                            src={music?.item.image}
                            alt={music?.item.title}
                        />

                        {currentSong === music?.item?._id && playing && (
                            <div className='absolute inset-0 bg-black/25 flex items-end justify-center pb-1'>
                                <div className='flex items-end gap-[2px] h-4'>
                                    <span className='w-[2px] h-2 bg-white rounded-full animate-pulse'></span>
                                    <span className='w-[2px] h-4 bg-white rounded-full animate-pulse'></span>
                                    <span className='w-[2px] h-3 bg-white rounded-full animate-pulse'></span>
                                    <span className='w-[2px] h-4 bg-white rounded-full animate-pulse'></span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='min-w-0 flex-1'>
                        <h3
                            className={`font-bold text-sm truncate transition-colors ${currentSong === music?.item?._id
                                ? 'text-[#1DB954]'
                                : 'text-white group-hover:text-purple-400'
                                }`}
                        >
                            {music?.item.title}
                        </h3>

                        <p className='text-xs text-white/60 truncate'>
                            {music?.item?.artist?.username}
                        </p>
                    </div>
                </div>
            </div>

            {/* Duration & Controls */}
            <div className='flex items-center gap-4'>
                <span className='text-sm text-white/60 font-medium min-w-[40px] text-center'>
                    {/* {Math.floor((duration[music._id] || 0) / 60)}:
        {String(Math.floor((duration[music._id] || 0) % 60)).padStart(2, '0')} */}
                </span>

                {/* Favorite / Delete */}
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
        </div>
    )
}

export default LikedSong