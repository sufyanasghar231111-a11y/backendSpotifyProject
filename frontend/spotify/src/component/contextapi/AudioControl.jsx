import React, { createContext, useCallback, useMemo, useRef, useState } from 'react'

export const authControl=createContext()
const AudioControl = ({children}) => {

    const  audioRef = useRef({})

    let [currentTime, setCurrentTime]=useState(0)
      let [duration, setDuration]=useState(0)
        let [playing, setPlaying] = useState(null)
        let lastUpdateRed=useRef(0)

     const  playRef = useCallback((id)=> {
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
  },[playing])

      const handleTime= useCallback((id) =>{
        const now =Date.now()
        if(now-lastUpdateRed.current<300) return;
        lastUpdateRed.current=now
    let audio=audioRef.current[id]
    if(!audio) return 
      setCurrentTime((prev) => ({
    ...prev,
    [id]: audio.currentTime
  }))
  },[])

  const  loaderTime= useCallback((id)=>{
    let audio=audioRef.current[id]
    if(!audio) return 
     setDuration((prev) => ({
    ...prev,
    [id]: audio.duration
  }))
  },[])

  const  handleSeek= useCallback((e, id)=>{
    let audio=audioRef.current[id]
    if(!audio) return 

     audio.currentTime = e.target.value
     setCurrentTime((prev) => ({
    ...prev,
    [id]: Number(e.target.value)
  }))
  },[])


  const value=useMemo(()=>({
    handleSeek,handleTime,loaderTime,playing,setCurrentTime,setDuration,setPlaying,currentTime,duration,playRef,audioRef
  }),[handleSeek, handleTime,loaderTime,playRef,duration,currentTime,playing,audioRef])

  return (
    <authControl.Provider value={value}>
      {children}
    </authControl.Provider>
  )
}


export default AudioControl
