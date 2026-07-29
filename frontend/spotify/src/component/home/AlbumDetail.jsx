import { RiHeartFill, RiPauseFill, RiPlayFill } from '@remixicon/react'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { authHome } from '../../contextapi/HomeContext'
import AlbumToPlaylist from '../../like/AlbumToPlaylist'
import { authPlaylist } from '../../contextapi/PlaylistContext'
import AlbumMain from '../albumpagecomponent/AlbumMain'

const AlbumDetail = () => {
  let { id } = useParams()
  let { fav } = useContext(authHome)

  let {detailData, setDetailData}=useContext(authPlaylist)
  async function detail() {
    try {
      let res = await axios.get(`http://localhost:3000/api/creator/allAlbum/${id}`)
      setDetailData(res.data.detailFetch)
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    detail()
  }, [])

  return (
    <div className='w-full max-sm:w-full ml-auto sticky rounded-lg overflow-hidden h-[76vh]'>

      <div className={`w-full flex gap-3 bg-gradient-to-br $ from-[#4e4e4e] via-[#363636] to-[#252525]  sticky p-6 px-7 `}>
        <div className='flex gap-6 items-center'>
          <div className=' bg-[#1A1A1A] w-45 rounded h-45'>
            <img src='https://i.scdn.co/image/ab67616d0000b2736fd2559f0879066633e56c42' alt="" />
          </div>
          <div>
            <h1 className='text-sm'>Public Playlist</h1>
            <h1 className='text-7xl font-extrabold'>{detailData.title}</h1>
            <h1 className='text-xl pt-4 font-semibold'>{detailData.artist?.username}</h1>
          </div>
        </div>
      </div>
      <div className='h-[65vh] relative px-8 max-sm:px-3 py-3 bg-[#282828]   overflow-y-auto '>
        <div className='px-3 pt-9 pb-2 border-white/10 border-b'>
          <div className='flex items-center gap-10'>
            <h1> #</h1>
            <h1>Title</h1>
          </div>
        </div>
        <div className='pt-3'>
          {
            detailData.album?.map((elem, index) => {
              const isFav = fav?.favorite?.some(song => song.type === 'music' && song.item?._id === elem?._id)
              return <AlbumMain index={index} key={elem._id} isFav={isFav} elem={elem} />
            })
          }

        </div>
      </div>

    </div>
  )
}

export default AlbumDetail
