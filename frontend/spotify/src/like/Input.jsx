import React from 'react'

const Input = ({handleSeek,music,currentTime,duration}) => {
  return (
    <div>
       <div>
        <input type="range" min='0' onChange={(e)=>{handleSeek(e,music._id)}} value={currentTime[music._id] || 0} max={duration[music._id]|| 0} />
        <h1>{Math.floor(duration[music._id]|| 0)}s</h1>
        <h1>{Math.floor(currentTime[music._id] || 0)}s</h1>
      </div>
    </div>
  )
}

export default Input
