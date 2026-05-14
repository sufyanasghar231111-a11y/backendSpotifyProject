import { RiHeartFill, RiPauseFill, RiPlayFill } from '@remixicon/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { authHome } from '../contextapi/HomeContext'

const AlbumDetail = () => {
  let { id } = useParams()
  let { playRef, playing, audioRef, setPlaying} = useContext(authHome)
  let [detailData, setDetailData] = useState({})
  async function detail() {
    try {
      let res = await axios.get(`http://localhost:3000/api/creator/allAlbum/${id}`)
      setDetailData(res.data.detailFetch)
      console.log(res.data.detailFetch);

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

      <div className='w-full flex gap-3 bg-[#282828]  sticky p-6 px-7 '>
        <div className='flex gap-6 items-center'>

          <div className='border w-30 rounded h-30'>
          </div>
          <div>
            <h1 className='text-5xl font-bold'>{detailData.title}</h1>
            <h1 className='text-xl font-semibold'>{detailData.artist?.username}</h1>
          </div>
        </div>
      </div>
      <div className='h-[65vh] relative px-8 max-sm:px-3 py-3 bg-[#282828]   overflow-y-auto '>

        <div className='flex gap-3'>
          <button className='px-4 py-1.5 rounded-full bg-red-500 font-semibold cursor-pointer'>Add To Favorites</button>
          <button className='px-4 py-1.5 rounded-full bg-green-500 font-semibold cursor-pointer'>Add To Playlist</button>
        </div>
        <div className='px-3 pt-9 pb-2 border-white/10 border-b'>
          <div className='flex items-center gap-10'>
            <h1> #</h1>
            <h1>Title</h1>
          </div>
        </div>
        <div className='pt-3'>
          {
            detailData.album?.map((elem, index) => {
              // console.log(elem);
              
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
                    <audio  onEnded={() => { setPlaying(null) }} className='w-full ' ref={(el)=>{
                      if(!audioRef.current){
                        audioRef.current={}
                      }
                      if(audioRef.current){
                        audioRef.current[elem._id]=el
                      }
                      else{
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
