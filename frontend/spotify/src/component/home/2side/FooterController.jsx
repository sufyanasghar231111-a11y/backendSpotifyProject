import React, { useContext } from 'react'
import { musciControl } from '../../../contextapi/MusicControllerContext'
import { audioContext } from '../../../contextapi/AudioProvider'
import {Link} from 'react-router-dom'
function FooterController() {
  const  { handleSeek } = useContext(audioContext)
  const  {control}=useContext(musciControl)  
  

  return (
    
      <> 
      {
        control.map((elem)=>{
          
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
        <div className=' -pb-5'>
          h
        </div>
      <div className='flex items-center justify-center gap-3'>
        <h1 className='text-xs font-mono text-gray-200 w-12 text-right select-none'>{Math.floor((elem.currentTime)/60)} :  {String(Math.floor((elem.currentTime)) % 60).padStart(2, '0')}</h1>
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