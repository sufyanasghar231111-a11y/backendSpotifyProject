import { RiPauseFill, RiPlayFill } from '@remixicon/react'
import React, { useContext } from 'react'
import { authRecent } from '../../contextapi/RecentRoute'
import { audioContext } from '../../contextapi/AudioProvider'
import { musciControl } from '../../contextapi/MusicControllerContext'

const PlayButton = ({item}) => {
    let { update } = useContext(authRecent)
  let { patchMusicPlaying ,playRef} = useContext(musciControl)
  let { playing,currentSong } = useContext(audioContext)
  return (
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
  )
}

export default PlayButton
