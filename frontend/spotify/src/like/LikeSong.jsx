import { RiHeartFill, RiPauseFill, RiPlayFill } from '@remixicon/react'
import React, { useContext } from 'react'
import { authHome } from '../contextapi/HomeContext'
import Input from '../like/Input'
import { authRecent } from '../contextapi/RecentRoute'
import { musciControl } from '../contextapi/MusicControllerContext'
import { audioContext } from '../contextapi/AudioProvider'
import { Link, Navigate } from 'react-router-dom'
import LikedPlaylist from './LikedPlaylist'
import LikedSong from './LikedSong'

const LikeSong = () => {
  
  let { fav, deletemusic } = useContext(authHome)

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
                <div className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200 cursor-pointer'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z' />
                  </svg>
                </div>
              </div>
            </div>

            {/* Music List */}
            <div className='space-y-2 pt-4'>
              {fav?.favorite?.map((music, index) => {
                return <>

                  {music.type === 'music' && (
                    <LikedSong key={music?.item?._id} music={music} index={index} />
                  )}

                  {music.type === "playlist" && (
                   <LikedPlaylist key={music?.item?._id} music={music} index={index} />
                  )}

                  {
                    music.type === 'album' && (
                      <div>album</div>
                    )
                  }
                </>

              })
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default LikeSong
