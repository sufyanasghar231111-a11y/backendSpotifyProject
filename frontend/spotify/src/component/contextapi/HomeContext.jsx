import React, { createContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'

export const authHome=createContext()

const HomeContext = ({children}) => {
    let [hidepro, setHidepro]=useState(false)
    let [hide, setHide]=useState(true)
    let [music, setMusic]=useState([

   ])
    let silderRef=useRef(null)
      let audioRef=useRef(null)
    let [playing,setPlaying]=useState(null)

    //slider
     function rightRef(){
    silderRef.current.scrollBy({
      left:300,
      behavior:'smooth'
    })
  }
  function leftRef(){
    silderRef.current.scrollBy({
      left:-300,
      behavior:'smooth'
    })
  }
  //fetchdata
   async function fetchData(){
    try{
      let res=await axios.get('http://localhost:3000/api/creator/getMusic')
      setMusic(res.data.music)
    }

    catch(err){
      console.log(err);
    }
   }

   useEffect(()=>{
    fetchData()
   },[])

   //playsong
  function playRef(id){
    let audio=audioRef.current
    if(!audio) return null

    if(playing === id){
      if(audio.paused){
        audio.play()
        setPlaying(true)
      }
      else{
        audio.pause()
        setPlaying(false)
      }
    }
    else{
    const song=music.find(elem => elem._id===id)
audio.src = song.uri;
audio.play();
setPlaying(song._id);

    }
  }


  return (
    <authHome.Provider value={{hidepro, setHidepro,hide,rightRef, silderRef,leftRef, setHide,playing,setPlaying,audioRef,playRef,music, setMusic}}>
      {children}
    </authHome.Provider>
  )
}

export default HomeContext
