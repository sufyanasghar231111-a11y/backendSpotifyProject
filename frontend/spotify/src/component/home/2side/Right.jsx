import { RiArrowLeftSLine, RiArrowRightSLine, RiPauseFill, RiPlayFill } from '@remixicon/react'
import React, { useContext, useEffect } from 'react'
import HomeContext, { authHome } from '../../contextapi/HomeContext'
import Album from '../Album'

import { Link, Outlet, useLocation } from 'react-router-dom'

const Right = () => {
   let {setHide,rightRef,leftRef,silderRef,playing,setPlaying,audioRef,playRef,music,setPage}=useContext(authHome)
  
    let location=useLocation()
    useEffect(()=>{
      setPlaying(null)
      setPage(1)
    },[location.pathname])
    
    
  return (
    <div className='w-[70%] max-sm:w-full ml-auto sticky rounded-lg overflow-hidden h-[76vh]'>
      <Outlet />
      
          { location?.pathname === '/' &&(
              <>
      <div className='w-full flex gap-3 bg-[#282828]  sticky p-6 px-7 '>
        <button className='md:hidden' onClick={()=>{setHide(false)}}>show</button>
      <button className='px-4 py-1.5 rounded-full text-sm font-semibold bg-white text-black cursor-pointer'>All</button>
      <button className='px-4 py-1.5 rounded-full text-sm  font-semibold backdrop-blur-2xl bg-white/10 cursor-pointer'>Music</button>
      </div>
                 <div className='h-[65vh] relative px-8 max-sm:px-3 py-3 bg-[#282828]   overflow-y-auto '>
        <div className=' '>
          <h1 className='text-sm font-semibold text-[#bbb]'>Inspired by your recent activity</h1>
          <div className='flex items-center justify-between'>
       <h1  className='text-2xl font-bold'>Music</h1>
       <Link  to='/showall' className='font-semibold text-[#a5a5a5] hover:border-b'>Show all</Link>
          </div>
        <button 
        onClick={leftRef}
        className={` cursor-pointer absolute  hover:bg-black/90  left-2  top-1/2 -translate-y-1/2 z-40
        w-10 h-10 rounded-full bg-black/70 text-white
        flex items-center justify-center`}>

        <RiArrowLeftSLine />
      </button>
       <div ref={silderRef} className='flex   overflow-x-auto scroll'>
        {music.map((item) => (
          <div
            key={item._id}
            className='shrink-0 group w-44 rounded-lg
            transition-all duration-300 hover:bg-white/10
            p-2 mt-5 cursor-pointer'>

            <div className='relative rounded-lg overflow-hidden w-full h-40'>
              <Link to={`/detail/${item._id}`}>
              
                <img 
    className='w-full h-40 object-cover rounded'
    src='https://i.scdn.co/image/ab67616d0000b2736fd2559f0879066633e56c42'
    alt=''
    />
    </Link>
               <audio ref={(el)=>{
                if(!audioRef.current){
                  audioRef.current={}
                }
                if(audioRef.current){
                  audioRef.current[item._id]=el
                }
                else{
                  delete audioRef.current[item._id]
                }
               }} onEnded={()=>{setPlaying(null)}} src={item.uri} type='audio/mp3' controls className='w-full mt-2' /> 
              <div onClick={()=>{playRef(item._id)}} className='absolute bottom-3 right-3
              flex items-center justify-center
              w-12 h-12 rounded-full hover:bg-green-600 bg-green-500
              opacity-0 translate-y-4
              group-hover:translate-y-0
              group-hover:opacity-100
              transition-all duration-300 ease-out shadow-lg'>
                {
                  playing === item._id ? (<RiPauseFill className='text-black w-7 h-7' />):(<RiPlayFill className='text-black w-7 h-7' />)
                }
              </div>
            </div>
            <div>
              <h1 className='font-semibold hover:underline w-fit'>
                {item.title}
              </h1>
              <h1 className='pt-1 text-sm font-semibold text-[#bebebe] hover:underline w-fit'>
                {item.artist.username}
              </h1>
            </div>
          </div>
        ))}
      
       </div>
        <button
        onClick={rightRef}
        className='absolute cursor-pointer hover:bg-black/90 right-2 max-sm:right-0  top-1/2 -translate-y-1/2 z-20
        w-10 h-10 rounded-full bg-black/70 text-white
        flex items-center justify-center'
      >
          <RiArrowRightSLine />
      </button>
       <div className='pt-10 px-2'>
        <Album />
       </div>
       </div>
        </div>
        </>
)
}
      </div>
   

  )
}

export default Right
