import React, { createContext, useRef, useState } from 'react'

export const audioContext=createContext()
const AudioProvider = ({children}) => {
     let [playing, setPlaying] = useState(null)
     const  audioRef = useRef(null)
     function playRef (song){
        audioRef.current.src=song.uri
        audioRef.current.play()
        setPlaying(song?._id)
     }
     const pauseSong = () => {
  audioRef.current.pause();
  setPlaying(null);
};
  return (
    <audioContext.Provider value={{playing, setPlaying,audioRef,playRef,pauseSong}}>
      {children}

      <audio ref={audioRef} />
    </audioContext.Provider>
  )
}

export default AudioProvider
