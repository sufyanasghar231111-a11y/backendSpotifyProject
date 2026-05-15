import React, { createContext, useRef, useState } from 'react'

export const authControl=createContext()
const AudioControl = ({children}) => {

    const  audioRef = useRef({})

    let [currentTime, setCurrentTime]=useState(0)
      let [duration, setDuration]=useState(0)
        let [playing, setPlaying] = useState(null)

     function playRef(id) {
    let audio = audioRef.current[id]
    if (!audio) return null

    if(playing && playing !== id){
      let prev =audioRef.current[playing]
      if(prev){
        prev.pause()
        prev.currentTime=0
      }
    }

    if (playing === id) {
      if (audio.paused) {
        audio.play()
        setPlaying(true)
      }
      else {
        audio.pause()
        setPlaying(false)
      }
    }
    else {
        Object.entries(audioRef.current).forEach(([key, audio]) => {
       if (audio && key !== id) {
       audio.pause();
       audio.currentTime=0
      }
  });
         audio.play()
      setPlaying(id);

    }
  }

      function handleTime(id){
    let audio=audioRef.current[id]
    if(!audio) return 
      setCurrentTime((prev) => ({
    ...prev,
    [id]: audio.currentTime
  }))
  }

  function loaderTime(id){
    let audio=audioRef.current[id]
    if(!audio) return 
     setDuration((prev) => ({
    ...prev,
    [id]: audio.duration
  }))
  }

  function handleSeek(e, id){
    let audio=audioRef.current[id]
    if(!audio) return 

     audio.currentTime = e.target.value
     setCurrentTime((prev) => ({
    ...prev,
    [id]: Number(e.target.value)
  }))
  }

  return (
    <authControl.Provider value={{handleSeek,handleTime,loaderTime,playing,setCurrentTime,setDuration,setPlaying,currentTime,duration,playRef,audioRef}}>
      {children}
    </authControl.Provider>
  )
}

export default AudioControl
