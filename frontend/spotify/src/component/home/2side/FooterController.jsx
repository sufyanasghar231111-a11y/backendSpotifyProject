import React, { useContext } from 'react'
import { musciControl } from '../../../contextapi/MusicControllerContext'
import { audioContext } from '../../../contextapi/AudioProvider'
import { Link } from 'react-router-dom'
import { RiPauseFill, RiPlayFill, RiSkipLeftFill, RiSkipRightFill } from '@remixicon/react'
import PlayButton from '../../rightside/PlayButton'
import { authRecent } from '../../../contextapi/RecentRoute'
import { authSearchBar } from '../../../contextapi/SearchSeparateContext'
function FooterController() {
  const { handleSeek, playing, currentSong } = useContext(audioContext)
  const { control, patchMusicPlaying, playRef } = useContext(musciControl)
  const { update } = useContext(authRecent)
  const { handlePrevSong, handleNextSong } = useContext(authSearchBar)


  return (

    <>
      {
        control.map((elem) => {

          return <div key={elem._id} className='flex  gap-40 pt-5 '>
            <div className='-pt-10 flex items-center justify-center gap-2'>
              <div className='w-13 h-13 rounded-lg  overflow-hidden'>
                <img className='w-full h-full object-cover' src={elem.music?.image} alt="" />
              </div>
              <div>
                <Link to={`/detail/${elem.music?._id}`}>
                  <div className='text-green-500 font-mono'>{elem.music?.title}</div>
                </Link>
                <h1 className='text-sm text-[#807f7f] font-mono'>{elem.music?.artist?.username}</h1>
              </div>
            </div>
            <div className='flex flex-col gap-2 items-center'>
              <div className='flex items-center gap-3'>
                <div onClick={handlePrevSong}>
                  <RiSkipLeftFill />
                </div>
                <div onClick={() => {
                  playRef(elem.music)
                  update(elem.music._id)
                  patchMusicPlaying(elem.music._id)
                }} className='
              flex items-center justify-center
              rounded-full hover:bg-green-600 bg-green-500
              p-1
              '>
                  {
                    currentSong === elem.music._id && playing ? (<RiPauseFill className=' w-4 h-4' />) : (<RiPlayFill className=' w-4 h-4' />)
                  }
                </div>
                <div onClick={handleNextSong}>
                  <RiSkipRightFill />
                </div>
              </div>
              <div className='flex items-center justify-center gap-3'>
                <h1 className='text-xs font-mono text-gray-200 w-12 text-right select-none'>{Math.floor((elem.currentTime) / 60)} :  {String(Math.floor((elem.currentTime)) % 60).padStart(2, '0')}</h1>
                <input type="range" name="music" className='h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500  hover:accent-green-400 ' onChange={(e) => { handleSeek(e) }} value={elem.currentTime} min='0' max={elem.duration} />
                <h1 className='text-xs font-mono text-gray-200 w-12 text-right select-none'>{Math.floor((elem.duration) / 60)}: {String(Math.floor((elem.duration)) % 60).padStart(2, '0')}</h1>
              </div>
            </div>
          </div>
        })
      }

    </>


  )
}

export default FooterController