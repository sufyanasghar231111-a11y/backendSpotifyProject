import React, { useContext } from 'react'
import { authHome } from '../contextapi/HomeContext'
import { authControl } from '../contextapi/AudioControl'
import { authProvider } from '../contextapi/AuthContext'
import { authRecent } from '../contextapi/RecentRoute'
import { RiArrowLeftSLine, RiArrowRightSLine, RiPauseFill, RiPlayFill } from '@remixicon/react'
import { Link } from 'react-router-dom'
import Album from '../home/Album'
import RecentPlay from '../recentactivity/RecentPlay'


const RightsideMusic = () => {
      let { rightRef, leftRef, silderRef, music } = useContext(authHome)
      let { setHideControl } = useContext(authProvider)
      let { playing, setPlaying, audioRef, playRef, loaderTime, handleTime, currentTime, duration } = useContext(authControl)
      let {update}=useContext(authRecent)
  return (
     <div className='h-[65vh] relative px-8 max-sm:px-3 py-3 bg-[#282828]   overflow-y-auto '>

              <h1 className='text-sm font-semibold text-[#bbb]'>Inspired by your recent activity</h1>
              <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold'>Music</h1>
                <Link to='showall' className='font-semibold text-[#a5a5a5]  hover:border-b'>Show all</Link>
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
                          src={item.image}
                          alt=''
                        />
                      </Link>
                      <audio ref={(el) => {
                        if (!audioRef.current) {
                          audioRef.current = {}
                        }
                        if (audioRef.current) {
                          audioRef.current[item._id] = el
                        }
                        else {
                          delete audioRef.current[item._id]
                        }
                      }} onEnded={() => {
                        setPlaying(null)
                        currentTime(0)
                        duration(0)
                      }} onTimeUpdate={() => { handleTime(item._id) }} onLoadedMetadata={() => { loaderTime(item._id) }} src={item.uri} type='audio/mp3' controls className='w-full mt-2' />
                      <div  onClick={() => { playRef(item._id)
                        update(item._id)
                       }} className='absolute bottom-3 right-3
              flex items-center justify-center
              w-12 h-12 rounded-full hover:bg-green-600 bg-green-500
              opacity-0 translate-y-4
              group-hover:translate-y-0
              group-hover:opacity-100
              transition-all duration-300 ease-out shadow-lg'>
                        {
                          playing === item._id ? (<RiPauseFill onClick={() => { setHideControl(true) }} className='text-black w-7 h-7' />) : (<RiPlayFill onClick={() => { setHideControl(false) }} className='text-black w-7 h-7' />)
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
        flex items-center justify-center' >
                <RiArrowRightSLine />
              </button>
              <div className='pt-10 px-2'>
                <Album />
              </div>
              <div className='pt-10 px-2 '>
                <RecentPlay />
              </div>
            </div>
  )
}

export default RightsideMusic
