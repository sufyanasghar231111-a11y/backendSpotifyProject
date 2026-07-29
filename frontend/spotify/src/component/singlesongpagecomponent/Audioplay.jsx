import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { authHome } from '../../contextapi/HomeContext'
import { RiAddCircleLine, RiCheckLine, RiHeartFill, RiPauseFill, RiPlayFill, RiPlayListAddLine, RiPlayListLine } from '@remixicon/react'
import { LibraryContext } from '../../contextapi/AuthContext'
import { UIPlaylistContext } from '../../contextapi/PlaylistContext'
import { fetch } from '../../api/playlistApi'
import RightSidePlayComponent from './RightSidePlayComponent';

const Audioplay = () => {
  let { id } = useParams()
  let { fav, data, setData } = useContext(authHome)
  let { library } = useContext(LibraryContext)


  async function fetchSingleMusic() {
    try {
      const res = await fetch(id)
      setData(res.data.detail)
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {

    fetchSingleMusic()
  }, [])


  const isFav = fav?.favorite?.some(user =>
    user.type === 'music' && user.item._id === data?._id
  )

  const deleteId = fav?.favorite?.find(user =>
    user.type === 'music' && user.item._id === data?._id
  )

  const lib = library.some(user =>
    user.music.some(song => song._id === data?._id)
  )

  return (
    <>
      <div className='relative  h-[70vh] w-[60%] '>

        <div className='w-full h-full'>
          <img
            src={data?.image}
            className='w-full h-full object-cover'
          />

        </div>

        <div className='absolute inset-0 bg-black/30'></div>
      </div>

      <RightSidePlayComponent isFav={isFav} lib={lib} deleteId={deleteId} />

    </>
  )
}


export default Audioplay



