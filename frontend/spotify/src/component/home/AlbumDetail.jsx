import { RiHeartFill, RiPauseFill, RiPlayFill } from '@remixicon/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { authHome } from '../contextapi/HomeContext'
import { authControl } from '../contextapi/AudioControl'

const AlbumDetail = () => {
  let { id } = useParams()
  let { fav, createFav, deletemusic } = useContext(authHome)
  let {playRef, playing, audioRef, setPlaying}=useContext(authControl)
  let [detailData, setDetailData] = useState({})
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

      <div className='w-full flex gap-3 bg-gradient-to-br from-[#4e4e4e] via-[#363636] to-[#252525]  sticky p-6 px-7 '>
        <div className='flex gap-6 items-center'>
          <div className=' bg-[#1A1A1A] w-45 rounded h-45'>
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
                  <span onClick={() => { playRef(elem._id) }} className=' group-hover:scale-100 scale-0  absolute top-3.5 -left-1 transition-all duration-300'>{
                    playing === elem._id ? (<RiPauseFill className='text-white cursor-pointer w-5 h-5' />) : (<RiPlayFill className='text-white cursor-pointer w-5 h-5' />)
                  }</span>
                </div>
                <div className='flex items-center justify-between w-full'>
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 border rounded overflow-hidden'>
                      <img className='w-full h-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9wl5xfVuzRmBNbqj8mKwsqAKwptQPO3LE7Q&s" alt="" />
                      <audio onEnded={() => { setPlaying(null) }} className='w-full ' ref={(el) => {
                        if (!audioRef.current) {
                          audioRef.current = {}
                        }
                        if (audioRef.current) {
                          audioRef.current[elem._id] = el
                        }
                        else {
                          delete audioRef.current[elem._id]
                        }
                      }} src={elem.uri} controls />
                    </div>
                    <div>
                      <h1 className='font-semibold'>{elem.title}</h1>
                      <h1 className='text-sm text-white/60 '>{detailData.artist?.username}</h1>
                    </div>
                  </div>
                  <div>
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
