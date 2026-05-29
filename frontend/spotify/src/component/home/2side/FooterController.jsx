import React, { useContext } from 'react'
import { authHome } from '../../contextapi/HomeContext'
import { authControl } from '../../contextapi/AudioControl'

function FooterController() {
    let {  music } = useContext(authHome)
      let { playing, currentTime, duration, handleSeek } = useContext(authControl)

      let currentId=music.find(elem=>
        elem._id===playing
      )

      if(!currentId) return null
  return (
  <div className='flex items-center gap-25 pt-5 justify-between'>
             
                      <div className='-pt-10 flex items-center justify-center gap-2'>
                        <div className='w-15 h-15 rounded-full  overflow-hidden'>
                          <img className='w-full h-full object-cover' src={currentId.image} alt="" />
                        </div>
                        <div>
                        <h1 className='text-green-500 font-mono'>{currentId.title}</h1>
                        <h1 className='text-sm text-[#807f7f] font-mono'>{currentId.artist?.username}</h1>
                        </div>
                      </div>
                      <div className='flex items-center justify-center gap-3'>
                        <h1 className='text-xs font-mono text-gray-200 w-12 text-right select-none'>{Math.floor((currentTime[playing] || 0) / 60)}: {String(Math.floor((currentTime[playing] || 0)) % 60).padStart(2, '0')}</h1>
                        <input type="range" name="music" className='h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400' onChange={(e) => { handleSeek(e, playing) }} value={currentTime[playing] || 0} min='0' max={duration[playing] || 0} />
                        <h1 className='text-xs font-mono text-gray-200 w-12 text-right select-none'>{Math.floor((duration[playing] || 0) / 60)}: {String(Math.floor((duration[playing] || 0)) % 60).padStart(2, '0')}</h1>
                      </div>
                      
                    
            </div>
  )
}

export default FooterController