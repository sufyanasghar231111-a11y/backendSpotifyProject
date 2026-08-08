import React, { useContext } from 'react'
import { musciControl } from '../../contextapi/MusicControllerContext'
import { audioContext, audioTimeContext } from '../../contextapi/AudioProvider'
import { Link } from 'react-router-dom'
import { RiMusicLine, RiPauseFill, RiPlayFill, RiSkipLeftFill, RiSkipRightFill } from '@remixicon/react'
import PlayButton from '../rightsidecomponents/PlayButton'
import { authRecent } from '../../contextapi/RecentRoute'
import { authSearchBar } from '../../contextapi/SearchSeparateContext'
function FooterController() {
  const { handleSeek, playing, currentSong, setQueue, queue } = useContext(audioContext)
  const { currentTime, duration } = useContext(audioTimeContext)
  const { control, patchMusicPlaying, playRef } = useContext(musciControl)
  const { update } = useContext(authRecent)
  const { handlePrevSong, handleNextSong } = useContext(authSearchBar)

  return (

    <>
      {
        control.map((elem) => {

          return <div key={elem._id} className='flex items-center justify-center w-full gap-30 max-[500px]:gap-4 lg:gap-40   px-3 pt-5 max-sm:pt-2 '>
            <div className='-pt-10 flex items-center justify-center gap-2'>
              <div className='w-13 h-13 max-sm:w-8 max-sm:h-8 rounded-lg  overflow-hidden bg-gradient-to-br relative from-[#3c17f5] via-[#8879ff] to-[#d7fff5]'>
                <div className='w-full h-full flex items-center justify-center absolute z-100'>
                  <RiMusicLine />
                </div>
                {
                  elem.music?.image && (
                    <img className='w-full h-full object-cover absolute z-120' src={elem.music?.image} alt="" />
                  )
                }
              </div>
              <div>
                <Link to={`/detail/${elem.music?._id}`}>
                  <div className='text-green-500  font-mono'>{elem.music?.title}</div>
                </Link>
                <h1 className='text-sm text-[#807f7f] max-sm:text-xs font-mono'>{elem.music?.artist?.username}</h1>
              </div>
            </div>
            <div className='flex flex-col gap-2 max-sm:gap-2 items-center'>
              <div className='flex items-center gap-3'>
                <div onClick={handlePrevSong}>
                  <RiSkipLeftFill className={`${queue.length > 1 ? 'opacity-100 cursor-pointer' : 'opacity-30'}`} />
                </div>
                <div onClick={() => {
                  playRef(elem.music)
                  setQueue(control)
                  update(elem.music._id)
                  patchMusicPlaying(elem.music._id)
                }} className='
              flex items-center justify-center
              rounded-full hover:bg-green-600 bg-green-500
              p-1
              '>
                  {
                    currentSong === elem.music?._id && playing ? (<RiPauseFill className=' w-4 h-4' />) : (<RiPlayFill className=' w-4 h-4' />)
                  }
                </div>
                <div onClick={handleNextSong}>
                  <RiSkipRightFill className={`${queue.length > 1 ? 'opacity-100 cursor-pointer' : 'opacity-30'}`} />
                </div>
              </div>
              <div className='flex items-center justify-center gap-3 max-sm:gap-1'>
                <h1 className='text-xs max-sm:text-[9px] font-mono text-gray-200 w-12 max-sm:w-9 text-right select-none'>{Math.floor((currentTime || elem.currentTime || 0) / 60)} :  {String(Math.floor((currentTime || elem.currentTime || 0)) % 60).padStart(2, '0')}</h1>
                <input type="range" name="music" className='h-1 bg-gray-600 max-sm:w-20 rounded-lg appearance-none cursor-pointer accent-green-500  hover:accent-green-400 ' onChange={(e) => { handleSeek(e) }} value={currentTime || elem.currentTime || 0} min='0' max={duration || elem.duration || 0} />
                <h1 className='text-xs max-sm:text-[9px] font-mono text-gray-200 w-12 max-sm:w-9  max-sm text-right select-none'>{Math.floor((duration || elem.duration || 0) / 60)}: {String(Math.floor((duration || elem.duration || 0)) % 60).padStart(2, '0')}</h1>
              </div>
            </div>
          </div>
        })
      }

    </>


  )
}

export default FooterController