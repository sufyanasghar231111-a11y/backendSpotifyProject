import { RiHeartFill, RiPauseFill, RiPlayFill } from '@remixicon/react'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { authHome } from '../contextapi/HomeContext'
import { authProvider } from '../contextapi/AuthContext'
import AlbumToPlaylist from '../../like/AlbumToPlaylist'
import { audioContext } from '../contextapi/AudioProvider'
import { musciControl } from '../contextapi/MusicControllerContext'
import { authRecent } from '../contextapi/RecentRoute'

const AlbumDetail = () => {
  let { id } = useParams()
  let {setHideAlbumPlaylist}=useContext(authProvider)
  let { fav, createFav, deletemusic } = useContext(authHome)
  let {playRef, playing}=useContext(audioContext)
  let { patchMusicPlaying } = useContext(musciControl)
  let { update } = useContext(authRecent)
  let {detailData, setDetailData}=useContext(authProvider)
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
              const isFav = fav.some(user =>
                user.favorite.some(song => song._id === elem?._id))
              return <div key={elem._id} className='flex  group hover:bg-white/10 transition-all duration-300  py-3 px-2 rounded-lg w-full  gap-6'>

                <div className='relative'>
                  <span className=' group-hover:scale-0  scale-100 absolute top-3 transition-all duration-300 '>{index + 1}</span>
                  <span onClick={()=>{playRef(elem)}} className=' group-hover:scale-100 scale-0  absolute top-3.5 -left-1 transition-all duration-300'>{
                    playing === elem._id ? (<RiPauseFill  className='text-white cursor-pointer w-5 h-5' />) : (<RiPlayFill onClick={()=>{
                      update(elem._id)
                  patchMusicPlaying(elem._id)
                    }} className='text-white cursor-pointer w-5 h-5' />)
                  }</span>
                </div>
                <div className='flex items-center justify-between w-full'>
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 border rounded overflow-hidden'>
                      <img className='w-full h-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9wl5xfVuzRmBNbqj8mKwsqAKwptQPO3LE7Q&s" alt="" />
                     
                    </div>
                    <div>
                      <h1 className='font-semibold'>{elem.title}</h1>
                      <h1 className='text-sm text-white/60 '>{detailData.artist?.username}</h1>
                    </div>
                  </div>
                  <div className='flex items-center gap-6'>
                    <button onClick={()=>{setHideAlbumPlaylist(true)}}>Add To Playlist</button>
                    
                    {
                      isFav ? (<button onClick={() => { deletemusic(elem?._id) }} className={`w-12 h-12 flex items-center justify-center rounded-full  border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer`}>
                        <RiHeartFill className='text-red-500 cursor-pointer w-5 h-5' />
                      </button>)
                        :
                        (<button onClick={() => { createFav(elem?._id) }} className={`w-12 h-12 flex items-center justify-center rounded-full  border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer`}>
                          <RiHeartFill className='text-white cursor-pointer w-5 h-5' />
                        </button>)
                    }
                  </div>
                </div>
              </div>
            })
          }

        </div>
      </div>

    </div>
  )
}

export default AlbumDetail
