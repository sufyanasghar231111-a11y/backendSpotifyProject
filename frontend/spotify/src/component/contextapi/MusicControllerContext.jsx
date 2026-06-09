import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { audioContext } from './AudioProvider';

export const musciControl=createContext()
function MusicControllerContext({children}) {
    let [control,setControl]=useState([])
    let {audioRef, playing}=useContext(audioContext)


    async function getMusicPlaying() {
        try{
            const res=await axios.get('http://localhost:3000/api/current/getcurr', {withCredentials:true})
            setControl(res.data.getCurrentPlaying)
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getMusicPlaying()
    },[])

    async function patchMusicPlaying(id) {

        try{
             const audio=audioRef.current
              if (!audio) return;
             const time=audio.currentTime
            await axios.patch(`http://localhost:3000/api/current/patchcurr/${id}`, {
                currentTime:time
            }, {withCredentials:true})
            await getMusicPlaying()
        }
        catch(err){
            console.log(err);
        }
    }

 

  return (
    <musciControl.Provider value={{control,patchMusicPlaying,getMusicPlaying}}>
        {children}
    </musciControl.Provider>
  )
}

export default MusicControllerContext