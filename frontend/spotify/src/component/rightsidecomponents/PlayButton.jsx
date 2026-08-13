import { RiPauseFill, RiPlayFill } from '@remixicon/react'
import React, { useContext } from 'react'
import { authRecent } from '../../contextapi/RecentRoute'
import { audioContext } from '../../contextapi/AudioProvider'
import { musciControl } from '../../contextapi/MusicControllerContext'
import { authSearchBar } from '../../contextapi/SearchSeparateContext'

const PlayButton = ({ item }) => {
  const { update } = useContext(authRecent)
  const { patchMusicPlaying, playRef } = useContext(musciControl)
  const { playing, currentSong, setQueue } = useContext(audioContext)
  const {music} = useContext(authSearchBar)
  return (
    <div onClick={(e) => {
      playRef(item)
      setQueue(music)
      update(item._id)
      patchMusicPlaying(item._id)
    }} className='absolute z-40 bottom-3 right-3
              flex items-center justify-center
              w-12 h-12 rounded-full hover:bg-green-600 bg-green-500
              opacity-0 translate-y-4
              group-hover:translate-y-0
              group-hover:opacity-100
              max-sm:opacity-100
              max-sm:bottom-7
              max-sm:right-4
              max-sm:w-8 max-sm:h-8
              transition-all duration-300 ease-out shadow-lg'>
      {
        currentSong === item._id && playing ? (<RiPauseFill className='text-black w-7 max-sm:w-6 max-sm:h-6 h-7' />) : (<RiPlayFill className='text-black max-sm:w-6 max-sm:h-6 w-7 h-7' />)
      }
    </div>
  )
}

export default PlayButton
