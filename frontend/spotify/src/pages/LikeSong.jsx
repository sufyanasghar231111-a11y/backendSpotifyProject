import { RiHeartFill, RiPauseFill, RiPlayFill } from '@remixicon/react'
import React, { useContext } from 'react'
import { authHome } from '../contextapi/HomeContext'
import Input from '../like/Input'
import { Link, Navigate } from 'react-router-dom'
import LikedPlaylist from '../component/likepagecomponent/LikedPlaylist'
import LikedSong from '../component/likepagecomponent/LikedSong'
import AllAlbumsongplaylist from '../component/likepagecomponent/AllAlbumsongplaylist'

const LikeSong = () => {
  const {fav} =useContext(authHome)
  return (
    <div>
      <div>
        <div className='w-full max-sm:w-full ml-auto sticky rounded-lg overflow-hidden h-[76vh] flex flex-col'>

          {/* HEADER */}
          <div className='w-full flex gap-3 bg-[#2C1F54] sticky p-6 px-7'>
            <div className='flex gap-6 items-center'>

              <div className='w-30 md:w-30 lg:w-40 max-sm:w-20  h-30 md:h-30 lg:h-40  max-sm:h-20 flex items-center justify-center bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] rounded '>
                <RiHeartFill className='text-white w-15  md:w-14 lg:w-20 max-sm:w-10 h-15 md:h-14 lg:h-20 max-sm:h-10' />
              </div>

              <div>
                <h1 className=' max-sm:text-2xl lg:text-7xl md:text-5xl text-5xl font-extrabold'>Liked Songs</h1>
                <h1 className='text-sm pt-5 max-sm:pt-2 font-semibold'>
                  {fav?.user?.username}
                </h1>
              </div>

            </div>
          </div>

          {/* LIST */}
          <div className='h-full relative px-8 max-sm:px-3  max-sm:py-3 lg:py-6 md:py-3 py-3 bg-gradient-to-b from-[#1a1a1a] to-[#282828] overflow-y-auto'>
            {/* Header */}
            <div className=' top-0 z-10 px-4 max-sm:pt-2 lg:pt-6 pt-3 md:pt-2 lg:pb-4 pb-2 max-sm:pb-1 md:pb-2 flex items-center justify-between bg-gradient-to-r from-[#1a1a1a]/95 to-[#282828]/95 backdrop-blur-sm border-b border-white/10'>
              <div className='flex items-center gap-6'>
                <div className='lg:w-10 md:w-6 w-6 max-sm:w-5  lg:h-10 md:h-6 h-6 max-sm:h-5  bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded flex items-center justify-center backdrop-blur-sm border border-white/20'>
                  <span className='text-white font-bold lg:text-lg max-sm:text-[10px] md:text-xs text-sm'>#</span>
                </div>
                <div>
                  <h1 className='lg:text-xl md:text-lg max-sm:text-sm  font-bold text-white'>Favorites</h1>
                  <p className='text-xs text-white/50'>Saved tracks</p>
                </div>
              </div>
              <div className='flex items-center gap-4 text-white/60'>
                
              </div>
            </div>

            {/* Music List */}
            <div className='space-y-2 pt-4'>
              <AllAlbumsongplaylist />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default LikeSong
