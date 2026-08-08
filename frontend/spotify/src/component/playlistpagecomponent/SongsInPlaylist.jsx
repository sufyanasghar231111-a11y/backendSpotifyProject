import React, { useContext } from 'react'
import { musciControl } from '../../contextapi/MusicControllerContext'
import { authRecent } from '../../contextapi/RecentRoute'
import { audioContext } from '../../contextapi/AudioProvider'
import ToggleButton from './ToggleButton'
import { RiMusic2Line } from '@remixicon/react'

const SongsInPlaylist = ({favId, deleteId, music, index, separate}) => {
     const { playing, currentSong, setQueue } = useContext(audioContext)
      const { update } = useContext(authRecent)
      const { patchMusicPlaying, playRef } = useContext(musciControl)
  return (
    <div key={music._id}
              className='group flex items-center p-3 md:p-3 max-sm:p-1.5  lg:p-4 rounded lg:rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10'>
              <div className='relative flex-shrink-0 w-12 max-sm:w-10 h-12 max-sm:h-10'>
                <span className='absolute inset-0 max-sm:hidden flex items-center justify-center text-white/60 font-bold text-lg group-hover:scale-0 transition-all duration-300 z-10'>
                  {index + 1}
                </span>
                <button
                  onClick={() => {
                    playRef(music)
                    setQueue(separate?.music)
                    update(music?._id)
                    patchMusicPlaying(music._id)
                  }}
                  className='absolute inset-0 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 rounded lg:rounded-xl scale-0 max-sm:scale-100 group-hover:scale-100 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 active:scale-95' >
                  {currentSong === music?._id && playing ? (
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
                  <div className='relative w-14 max-sm:w-10 h-14 max-sm:h-10 rounded lg:rounded-2xl overflow-hidden shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300'>
                  {
                    music.image && (
                      <img
                        className='w-full h-full object-cover absolute z-40'
                        src={music.image}
                        alt={music.title}
                      />
                    )
                  }
                  <div className='w-full h-full absolute z-39 flex items-center justify-center bg-green-500'>
                    <RiMusic2Line />
                  </div>

                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent animate-pulse' />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <h3 className='font-bold text-white max-sm:text-[10px] text-xs md:text-xs lg:text-sm truncate group-hover:text-purple-400 transition-colors'>
                      {music.title}
                    </h3>
                    <p className='text-xs text-white/60 truncate'>test</p>
                  </div>
                </div>
              </div>

              {/* Duration & Controls */}
              <div className='flex items-center gap-4'>
                <span className='text-sm text-white/60 font-medium min-w-[40px] text-center'>
                  {/* {Math.floor((duration[music._id] || 0) / 60)}:{String(Math.floor((duration[music._id] || 0) % 60)).padStart(2, '0')} */}
                </span>

                {/* Delete/Like Button */}
                <ToggleButton favId={favId} deleteId={deleteId} music={music} />
              </div>
            </div>
  )
}

export default SongsInPlaylist