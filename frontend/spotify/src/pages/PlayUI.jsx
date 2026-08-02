import { RiHeartFill, RiPlayListLine, RiPlayFill, RiShuffleLine, RiPencilLine } from '@remixicon/react'
import React, { useContext, useEffect } from 'react'

import Input from '../like/Input'
import { authHome } from '../contextapi/HomeContext'
import { Link, useLocation, useParams } from 'react-router-dom'
import { authPlaylist, UIPlaylistContext } from '../contextapi/PlaylistContext'
import { handleSingle, singlevisible } from '../api/recentSearch'
import { adminContext } from '../contextapi/AdminContext'
import PlaylistUpdate from '../component/playlistpagecomponent/PlaylistUpdate'
import PlaylistDetail from '../component/playlistpagecomponent/playlistDetail'
import ToggleButton from '../component/playlistpagecomponent/ToggleButton'
import SongsInPlaylist from '../component/playlistpagecomponent/SongsInPlaylist'


const PlayUI = () => {

  const { fav } = useContext(authHome)
  const { separate, setSeparate } = useContext(authPlaylist)
  const { user } = useContext(adminContext)
  const { id } = useParams()
  const location = useLocation()

  async function handleSeparate() {
    try {

      const res = await singlevisible(id)
      setSeparate(res.data.getSinglePlaylist)
    }
    catch (err) {
      console.log(err);
    }
  }

  async function handleSingleVisible() {
    try {
      const res = await handleSingle(id)
      setSeparate(res.data.singleVisible)
    }
    catch (err) {
      console.log(err);

    }
  }

  useEffect(() => {
    if (location.pathname.startsWith('/visible')) {
      handleSingleVisible()
    }
    else {
      handleSeparate()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, location.pathname])

  const isOwn = !id || user?._id === separate?.user?._id


  return (
    <div className='w-full max-sm:w-full ml-auto  sticky rounded-lg overflow-hidden h-[76vh] flex flex-col'>

      <header className='w-full flex flex-col gap-3 bg-[#2C1F54] sticky p-6 px-7'>
        <div className='flex gap-6 items-center'>
          <PlaylistUpdate isOwn={isOwn} separate={separate} />
          <div>
            <h1 className='text-sm font-semibold'>
              {separate?.visibility} Playlist
            </h1>
            <Link to={`/profile/${separate?.user?._id}`}>
              <h1 className='text-8xl font-extrabold'>{separate?.name}</h1>
            </Link>
            <h1 className='font-bold pt-4'>{separate?.user?.username} <span className='text-[#b9b6b6]'>. {separate?.music?.length} songs</span> </h1>
          </div>
        </div>

      </header>
      <main className='h-full relative  max-sm:px-3  bg-gradient-to-b from-[#1a1a1a] to-[#282828] overflow-y-auto'>
        {/* Play button shuffling and more component */}
        <PlaylistDetail />

        {/* Header */}
        <div className=' top-0 z-10 px-15 pt-2 pb-2 flex items-center justify-between  backdrop-blur-sm border-b border-white/10'>
          <div className='flex items-center gap-6'>
            <div className='px-3'>
              <span className='text-white font-bold text-[15px]'>#</span>
            </div>
            <div>
              <h1 className='text-xl font-bold text-white'>Title</h1>

            </div>
          </div>
          <div className='flex items-center gap-4 text-white/60'>
            <span className='text-sm font-medium'>Duration</span>
            <span>Liked</span>
          </div>
        </div>

        {/* Music List */}
        <div className='space-y-2 px-8 pt-4'>
          {separate?.music?.map((music, index) => {
            const favId = fav?.favorite?.some(
              song => song.type === 'music' && song.item?._id === music._id
            ) ?? false

            const deleteId = fav?.favorite?.find(
              item => item.type === 'music' && item.item?._id === music._id
            )
            return <SongsInPlaylist index={index}
              favId={favId}
              deleteId={deleteId}
              music={music}
              separate={separate}
            />
          })
          }

        </div>
      </main>
    </div>
  )
}

export default PlayUI
