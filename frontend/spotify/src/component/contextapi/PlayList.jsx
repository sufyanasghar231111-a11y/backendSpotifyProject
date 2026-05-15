import React, { createContext, useEffect, useState } from 'react'

import axios from 'axios'

export const authPlay=createContext()
const PlayList = ({children}) => {
    let [getPlayList, setGetPlayList]=useState([])
    let [create,setCreate]=useState([])
    let [name,setName]=useState('')
    let [hideplay,setHidePlay]=useState(false)
    
  async  function handleGetPlayList(){
        try{
            const res=await axios.get('http://localhost:3000/api/user/particularUserPlaylist', {withCredentials:true})            
            setGetPlayList(res.data.particular)
        }
        catch(e){
            console.log(e);
            
        }
    }

    useEffect(()=>{
        handleGetPlayList()
    },[])

    async function handleCreatePlaylist(){
        try{
            const res=await axios.post('http://localhost:3000/api/user/playlist', {name}, {withCredentials:true})
            setCreate(res.data.createPlaylist)
            await handleGetPlayList()
        }
        catch(err){
            console.log(err);
            
        }
    }

  return (
    <authPlay.Provider value={{getPlayList,handleCreatePlaylist,create,name,setName,hideplay,setHidePlay}}>
      {children}
    </authPlay.Provider>
  )
}

export default PlayList
