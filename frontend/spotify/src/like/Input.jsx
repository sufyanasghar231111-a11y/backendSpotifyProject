import React, { useContext } from 'react'
import { authHome } from '../component/contextapi/HomeContext'

const Input = ({music}) => {
    let {currentTime,duration,handleSeek}=useContext(authHome)
  return (
    <div>
       <div className='flex items-center gap-2'>
        <input type="range" min='0' onChange={(e)=>{handleSeek(e,music._id)}} value={currentTime[music._id] || 0} max={duration[music._id]|| 0} />
        
        <h1>{Math.floor(currentTime[music._id] || 0)}s</h1>
      </div>
    </div>
  )
}

export default Input
