import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const musciControl=createContext()
function MusicControllerContext({children}) {
    let [control,setControl]=useState([])
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
            await axios.patch(`http://localhost:3000/api/current/patchcurr/${id}`, {}, {withCredentials:true})
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