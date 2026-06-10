import React, { useContext } from 'react'

import { authRecent } from '../contextapi/RecentRoute'
import { musciControl } from "../contextapi/MusicControllerContext";
import { audioContext } from "../contextapi/AudioProvider";
import { RiArrowLeftSLine, RiArrowRightSLine, RiPauseFill, RiPlayFill } from '@remixicon/react'
import { Link } from 'react-router-dom'
import { authHome } from '../contextapi/HomeContext'
const RightSideMusicPlay = () => {
  let { music } = useContext(authHome)
  let { update } = useContext(authRecent)
  let { patchMusicPlaying ,playRef} = useContext(musciControl)
  let { playing,currentSong } = useContext(audioContext)

  
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

            <div onClick={()=>{playRef(item)
              update(item._id)
              patchMusicPlaying(item._id)
             }} className='absolute bottom-3 right-3
              flex items-center justify-center
              w-12 h-12 rounded-full hover:bg-green-600 bg-green-500
              opacity-0 translate-y-4
              group-hover:translate-y-0
              group-hover:opacity-100
              transition-all duration-300 ease-out shadow-lg'>
              {
                currentSong === item._id && playing ? (<RiPauseFill   className='text-black w-7 h-7' />) : (<RiPlayFill  className='text-black w-7 h-7' />)
              }
            </div>
          </div>
          <div>
            <h1 className='font-semibold hover:underline w-fit'>
              {item.title}
            </h1>
            <h1 className='pt-1 text-sm font-semibold text-[#bebebe] hover:underline w-fit'>
              {item.artist?.username}
            </h1>
          </div>
        </div>
      ))}
    </>
  )
}

export default React.memo(RightSideMusicPlay)
