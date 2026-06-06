import React, { useContext } from 'react'

import { authControl } from '../contextapi/AudioControl'
import { authProvider } from '../contextapi/AuthContext'
import { authRecent } from '../contextapi/RecentRoute'
import { RiArrowLeftSLine, RiArrowRightSLine, RiPauseFill, RiPlayFill } from '@remixicon/react'
import { Link } from 'react-router-dom'
import { authHome } from '../contextapi/HomeContext'
const RightSideMusicPlay = () => {
    let { setHideControl } = useContext(authProvider)
    let { playing, setPlaying, audioRef, playRef, loaderTime, handleTime, currentTime, duration } = useContext(authControl)
    let { update } = useContext(authRecent)
    let {music}=useContext(authHome)
    return (
      <>
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
                          alt={item.title}
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
                        
                       }} className='absolute bottom-3 right-3
              flex items-center justify-center
              w-12 h-12 rounded-full hover:bg-green-600 bg-green-500
              opacity-0 translate-y-4
              group-hover:translate-y-0
              group-hover:opacity-100
              transition-all duration-300 ease-out shadow-lg'>
                        {
                          playing === item._id ? (<RiPauseFill onClick={() => { setHideControl(true) }} className='text-black w-7 h-7' />) : (<RiPlayFill  onClick={() => { setHideControl(false)
                            update(item._id)
                           }} className='text-black w-7 h-7' />)
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
      </>
    )
}

export default React.memo(RightSideMusicPlay)
