import React, { useContext } from 'react'
import { authHome } from '../contextapi/HomeContext'
import { RiPauseFill, RiPlayFill } from '@remixicon/react'

import { Link } from 'react-router-dom'

const ShowAll = () => {
  let {playing,setPlaying,audioRef,playRef,music}=useContext(authHome)  

  return (
    <div className='w-full bg-[#282828] px-5 py-4  h-[65vh] overflow-y-auto'>
        <h1 className='text-2xl font-bold'>Music </h1>
        <div className='flex flex-wrap'>
         {music.map((elem)=>{
          return   <div key={elem._id} className='shrink-0 rounded-lg group w-55  rounded-lgtransition-all duration-300 hover:bg-white/10 p-2 mt-5 cursor-pointer'>
       <div className='relative rounded-lg overflow-hidden w-full  h-50'>
        <Link to={`/detail/${elem._id}`} >
          <img
    className='w-full h-full object-cover rounded'
    src='https://i.scdn.co/image/ab67616d0000b2736fd2559f0879066633e56c42'
    alt=''/>
    </Link>
     <audio ref={audioRef}  src={elem.uri}  onEnded={()=>{setPlaying(null)}} type='audio/mp3' controls className='w-full mt-2' />
       <div onClick={()=>{playRef(elem._id)}} className='absolute bottom-3 right-3
              flex items-center justify-center
              w-12 h-12 rounded-full hover:bg-green-600 bg-green-500
              opacity-0 translate-y-4
              group-hover:translate-y-0
              group-hover:opacity-100
              transition-all duration-300 ease-out shadow-lg'>
                {
                  playing === elem._id ? (<RiPauseFill className='text-black w-7 h-7' />):(<RiPlayFill className='text-black w-7 h-7' />)
                }
              </div>
        </div>
              <div>
              <h1 className='font-semibold hover:underline w-fit'>
                 {elem.title}
              </h1>
              <h1 className='pt-1 text-sm font-semibold text-[#bebebe] hover:underline w-fit'>
                {elem.artist.username}
              </h1>
            </div>
      </div>
          
         })} 
      </div>
      <div className='flex py-3 gap-3 justify-center'>
      <button className='px-2 py-2 rounded-lg bg-[#4b4a4a] cursor-pointer'>Prev</button>
      <button className='px-2 py-2 rounded-lg bg-[#4b4a4a] cursor-pointer'>Next</button>
      </div>
       </div>
  )
}

export default ShowAll
