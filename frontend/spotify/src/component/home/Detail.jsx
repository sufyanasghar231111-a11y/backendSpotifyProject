import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { authHome } from '../contextapi/HomeContext'
import { RiPauseFill, RiPlayFill } from '@remixicon/react'
const Detail = () => {

  let {id}=useParams()
  let {playing,playRef,audioRef}=useContext(authHome)
  let [data,setData]=useState([])
  async function fetchSingleMusic(){
    try{
    const res=await axios.get(`http://localhost:3000/api/creator/singleMusic/${id}`) 
    setData(res.data.detail)
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchSingleMusic()
  },[])


  console.log(data);
  const music = {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop',
    audio:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    album: 'After Hours',
    duration: '3:22',
    release: '2020',
  }
  
  return (
    <div className='text-white '>
       <div className=' bg-[#1A1A1A] text-white flex items-center justify-center p-8'>
        <div className='relative  h-[65vh] w-[500px] '>
          <img
            src={music.cover}
            className='w-full h-full object-cover'
          />
          <audio ref={audioRef} src={data?.uri} className='w-full h-full' />
          <div className='absolute inset-0 bg-black/30'></div>
        </div>

        
        <div className='p-8 flex flex-col justify-center'>
          <p className='text-sm uppercase tracking-[4px] text-gray-400'>
            Now Playing
          </p>
          <h1 className='text-4xl md:text-5xl font-bold mt-3'>
            {data?.title}
          </h1>
          <p className='text-xl text-gray-300 mt-3'>{data.artist?.username}</p>
          <div className='mt-8 space-y-4 text-gray-400'>
            {/* <div className='flex justify-between border-b border-white/10 pb-2'>
              <span>Duration</span>
              <span></span>
            </div> */}
          </div>
          <div className='flex gap-4 mt-8'>
            <button onClick={()=>{playRef(data?._id)}} className='px-7  rounded-full bg-green-500 hover:bg-green-400 transition-all duration-300 font-semibold text-black cursor-pointer'>
             {playing === data?._id ? (<RiPauseFill className='text-white cursor-pointer w-7 h-7' />):(<RiPlayFill className='text-white cursor-pointer w-7 h-7' />)
                }
            </button>

            <button className='px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer'>
              Add Playlist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
