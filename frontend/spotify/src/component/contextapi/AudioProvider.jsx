import React, { createContext, useRef, useState } from 'react'

export const audioContext = createContext()
const AudioProvider = ({ children }) => {
  let [playing, setPlaying] = useState(null)
  const audioRef = useRef(null)
  let lastUpdateRef =useRef(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  function playRef(song) {
    let audio=audioRef.current
    if(!audio) return
    let newSrc=song.uri
    let sameSong=audio.src.includes(newSrc)
      if(sameSong){
        if(audio.paused){
          audio.play()
        }
        else{
          audio.pause()
        }
        return
      }
    
    audio.src = newSrc
    audio.load()
    audio.play()
    setPlaying(song?._id)
  }

  const pauseSong = () => {
    audioRef.current.pause();
    setPlaying(false);
  };

  function handleTime(){
    let audio=audioRef.current

    if(!audio) return 

    let now=Date.now()
    if(now - lastUpdateRef.current>500){
      setCurrentTime(audio.currentTime)
      lastUpdateRef.current=now
    }
  }

  function loader(){
    setDuration(audioRef.current.duration)
  }

  function handleSeek(e){
    let value=Number(e.target.value)
    setCurrentTime(value)
    audioRef.current.currentTime=value
  }



  return (
    <audioContext.Provider value={{ playing, setPlaying, audioRef, playRef, pauseSong,handleSeek,currentTime,duration }}>
      {children}
      <audio ref={audioRef} onTimeUpdate={handleTime} onLoadedMetadata={loader}  />
    </audioContext.Provider>
  )
}

export default AudioProvider
