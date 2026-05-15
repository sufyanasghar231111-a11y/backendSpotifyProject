import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { authHome } from '../contextapi/HomeContext'
import { RiHeartFill, RiPauseFill, RiPlayFill } from '@remixicon/react'
import Input from '../../like/Input'
import { authControl } from '../contextapi/AudioControl'
const Detail = () => {

  let { id } = useParams()
  let { createFav, deletemusic , fav} = useContext(authHome)
  let { playing, playRef, audioRef,loaderTime,handleSeek,handleTime,currentTime ,duration, setPlaying}=useContext(authControl)
  let [data, setData] = useState([])
  async function fetchSingleMusic() {
    try {
      const res = await axios.get(`http://localhost:3000/api/creator/singleMusic/${id}`)
      setData(res.data.detail)
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchSingleMusic()
  }, [])


  const music = {
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop',

  }
const isFav = fav.some(user =>
  user.favorite.some(song => song._id === data?._id)
)
 
console.log(data);


  return (
    <div className='text-white '>
      <div className=' bg-[#1A1A1A] text-white flex items-center justify-between px-3 py-5'>
        <div className='relative  h-[70vh] w-[60%] '>
          <div className='w-full h-full'>
          <img
            src={music.cover}
            className='w-full h-full object-cover'
          />

          </div>
          <audio ref={(el)=>{
            if(!audioRef?.current){
              audioRef.current={}
            }

            if(el){
              audioRef.current[data._id]=el
            }
            else{
              delete audioRef.current[data._id]
            }
          }} src={data?.uri}  onTimeUpdate={()=>{handleTime(data._id)}} onLoadedMetadata={()=>{loaderTime(data._id)}} onEnded={()=>{setPlaying(null)
            currentTime(0)
            duration(0)
          }}  preload='metadata'
                       className='w-full h-full' />
          <div className='absolute inset-0 bg-black/30'></div>
        </div>


        <div className='px-8 py-2 flex flex-col w-[40%] justify-center'>
          <p className='text-sm uppercase tracking-[4px] text-gray-400'>
            Now Playing
          </p>
          <h1 className='text-4xl md:text-5xl font-bold mt-3'>
            {data?.title}
          </h1>
          <p className='text-xl text-gray-300 mt-3'>{data.artist?.username}</p>
          
          <button onClick={() => { playRef(data?._id) }} className='w-fit px-4 mt-4  py-4 flex items-center justify-center  rounded-full bg-green-500 hover:bg-green-400 transition-all duration-300 font-semibold text-black cursor-pointer'>
            {playing === data?._id ? (<RiPauseFill className='text-white cursor-pointer w-7 h-7' />) : (<RiPlayFill className='text-white cursor-pointer w-7 h-7' />)
            }
          </button>
          <div className='flex gap-2 mt-8'>
            {
              isFav ? ( <button  onClick={() => { deletemusic(data?._id) }}  className={`w-12 h-12 flex items-center justify-center rounded-full  border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer`}>
             <RiHeartFill className='text-red-500 cursor-pointer w-5 h-5' />
            </button>)
            :
            ( <button onClick={() => { createFav(data?._id) }}  className={`w-12 h-12 flex items-center justify-center rounded-full  border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer`}>
              <RiHeartFill className='text-white cursor-pointer w-5 h-5' />
            </button>)
            }

            <button className='px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer'>
              Add Playlist
            </button>
          </div>
          <div className='mt-3 space-y-4 text-gray-400'>
            <div className='flex justify-between border-b border-white/10 pb-2'>
              <span>Duration</span>
              <span>{Math.floor((duration[data._id]||0)/60)}: {String(Math.floor((duration[data._id] || 0) )%60).padStart(2, '0')}</span>
            </div>
          </div>
          <div className='flex items-center gap-2 justify-center pt-10'>
          <input type="range" onChange={(e)=>{handleSeek(e, data?._id)}} value={currentTime[data._id] || 0} min='0' max={duration[data._id] || 0}  />
          <h1>{Math.floor((currentTime[data._id] || 0)/60)}: {String(Math.floor((currentTime[data._id] || 0) %60)).padStart(2, '0')}s</h1>
          </div>
            
        </div>
      </div>
    </div>
  )
}

export default Detail
