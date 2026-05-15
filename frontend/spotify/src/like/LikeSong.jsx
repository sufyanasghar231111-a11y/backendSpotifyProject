import { RiHeartFill, RiPauseFill, RiPlayFill } from '@remixicon/react'
import React, { useContext } from 'react'
import { authHome } from '../component/contextapi/HomeContext'
import Input from './Input'
import { authControl } from '../component/contextapi/AudioControl'

const LikeSong = () => {
  let { playing, playRef, audioRef, setPlaying, loaderTime, handleTime, duration, currentTime ,handleSeek} = useContext(authControl)
  let { fav,deletemusic } = useContext(authHome)

  return (
    <div>
      <div>
        <div className='w-full max-sm:w-full ml-auto sticky rounded-lg overflow-hidden h-[76vh] flex flex-col'>

          {/* HEADER */}
          <div className='w-full flex gap-3 bg-[#2C1F54] sticky p-6 px-7'>
            <div className='flex gap-6 items-center'>

              <div className='w-40 flex items-center justify-center bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] rounded h-40'>
                <RiHeartFill className='text-white w-20 h-20' />
              </div>

              <div>
                <h1 className='text-7xl font-extrabold'>Liked Songs</h1>
                <h1 className='text-xl font-semibold'>
                  {fav?.[0]?.user?.username}
                </h1>
              </div>

            </div>
          </div>

          {/* LIST */}
          <div className='h-full relative px-8 max-sm:px-3 py-6 bg-gradient-to-b from-[#1a1a1a] to-[#282828] overflow-y-auto'>
            {/* Header */}
            <div className=' top-0 z-10 px-4 pt-6 pb-4 flex items-center justify-between bg-gradient-to-r from-[#1a1a1a]/95 to-[#282828]/95 backdrop-blur-sm border-b border-white/10'>
              <div className='flex items-center gap-6'>
                <div className='w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20'>
                  <span className='text-white font-bold text-lg'>#</span>
                </div>
                <div>
                  <h1 className='text-xl font-bold text-white'>Favorites</h1>
                  <p className='text-xs text-white/50'>Saved tracks</p>
                </div>
              </div>
              <div className='flex items-center gap-4 text-white/60'>
                <span className='text-sm font-medium'>Duration</span>
                <div className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200 cursor-pointer'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z' />
                  </svg>
                </div>
              </div>
            </div>

            {/* Music List */}
            <div className='space-y-2 pt-4'>
              {fav?.map((item) =>
                item.favorite?.map((music, index) => (

                  <div
                    key={music._id}
                    className='group flex items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10'
                  >
                    {/* Index/Play Button */}
                    <div className='relative flex-shrink-0 w-12 h-12'>
                      <span className='absolute inset-0 max-sm:hidden flex items-center justify-center text-white/60 font-bold text-lg group-hover:scale-0 transition-all duration-300 z-10'>
                        {index + 1}
                      </span>
                      <button
                        onClick={() => playRef(music?._id)}
                        className='absolute inset-0 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl scale-0 max-sm:scale-100 group-hover:scale-100 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 active:scale-95' >
                        {playing === music._id ? (
                          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z' clipRule='evenodd' />
                          </svg>
                        ) : (
                          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z' clipRule='evenodd' />
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
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9wl5xfVuzRmBNbqj8mKwsqAKwptQPO3LE7Q&s"
                            alt=""
                          />
                          {playing === music._id && (
                            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent animate-pulse' />
                          )}
                        </div>
                        <div className='min-w-0 flex-1'>
                          <h3 className='font-bold text-white text-sm truncate group-hover:text-purple-400 transition-colors'>
                            {music.title}
                          </h3>
                          <p className='text-xs text-white/60 truncate'>{music.artist?.username}</p>
                        </div>
                      </div>
                    </div>

                    {/* Duration & Controls */}
                    <div className='flex items-center gap-4'>
                      <span className='text-sm text-white/60 font-medium min-w-[40px] text-center'>
                        {Math.floor((duration[music._id] || 0) / 60)}:{String(Math.floor((duration[music._id] || 0) % 60)).padStart(2, '0')}
                      </span>

                      {playing === music._id && (
                        
                        <Input key={music._id} duration={duration} handleTime={handleTime} handleSeek={handleSeek} currentTime={currentTime}  music={music} />
                      )}

                      {/* Delete/Like Button */}
                      <button
                        onClick={() => deletemusic(music._id)}
                        className='p-2 rounded-xl bg-white/10 hover:bg-red-500/20 hover:border-red-500/30 border border-transparent hover:border-red-500/50 transition-all duration-200 group/like'
                        title='Remove from favorites'
                      >
                        <svg className='w-5 h-5 text-red-400 group-hover/like:text-red-500 group-hover/like:scale-110 transition-all duration-200' fill='currentColor' viewBox='0 0 20 20'>
                          <path fillRule='evenodd' d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z' clipRule='evenodd' />
                        </svg>
                      </button>
                    </div>

                    {/* Audio Element - Hidden */}
                    <audio
                      ref={(el) => {
                        if (!audioRef.current) audioRef.current = {};
                        if (el) audioRef.current[music._id] = el;
                        else delete audioRef.current[music._id];
                      }}
                      onEnded={() => {
                        setPlaying(null);
                        currentTime(0);
                        duration(0);
                      }}
                      onLoadedMetadata={() => loaderTime(music._id)}
                      onTimeUpdate={() => handleTime(music._id)}
                      src={music?.uri}
                      preload='metadata'
                      className='hidden'
                    />

                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default LikeSong
