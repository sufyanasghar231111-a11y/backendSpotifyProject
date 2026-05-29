import React, { useContext } from 'react'
import { authControl } from '../../contextapi/AudioControl'
import { authHome } from '../../contextapi/HomeContext'
import { authProvider } from '../../contextapi/AuthContext'

function Footer() {
    
      let {hideControl } = useContext(authProvider)
      let {  music } = useContext(authHome)
      let { playing, currentTime, duration, handleSeek } = useContext(authControl)
  return (
    <div>
         <div className='flex items-center justify-center '>
        {
          hideControl ? (
            <div className='flex items-center gap-1 pt-8'>
              <h1 className='text-xs font-mono text-gray-400 w-12 text-right select-none'>00:00</h1>
              <input type="range" disabled className="cursor-not-allowed opacity-50 h-1.5 bg-gray-700 rounded-lg appearance-none " />
              <h1 className='text-xs font-mono text-gray-400 w-12 text-right select-none'>00:00</h1>

            </div>
          ) : (
            <div className='flex items-center gap-25 pt-5 justify-between'>
              {
                music.map((dataId) => {
                  return <>
                    {playing === dataId._id && (
                      <>
                      <div className='-pt-10 flex items-center justify-center gap-2'>
                        <div className='w-15 h-15 rounded-full  overflow-hidden'>
                          <img className='w-full h-full object-cover' src={dataId.image} alt="" />
                        </div>
                        <div>
                        <h1 className='text-green-500 font-mono'>{dataId.title}</h1>
                        <h1 className='text-sm text-[#807f7f] font-mono'>{dataId.artist?.username}</h1>
                        </div>
                      </div>
                      <div className='flex items-center justify-center gap-3'>
                        
                        <h1 className='text-xs font-mono text-gray-200 w-12 text-right select-none'>{Math.floor((currentTime[dataId._id] || 0) / 60)}: {String(Math.floor((currentTime[dataId._id] || 0)) % 60).padStart(2, '0')}</h1>
                        <input type="range" name="music" className='h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400' onChange={(e) => { handleSeek(e, dataId._id) }} value={currentTime[dataId._id] || 0} min='0' max={duration[dataId?._id] || 0} />
                        <h1 className='text-xs font-mono text-gray-200 w-12 text-right select-none'>{Math.floor((duration[dataId._id] || 0) / 60)}: {String(Math.floor((duration[dataId._id] || 0)) % 60).padStart(2, '0')}</h1>
                      </div>
                      
                      </>
                    )}
                  </>
                })
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Footer