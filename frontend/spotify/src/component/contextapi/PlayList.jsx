import React, { createContext, useEffect, useState } from 'react'

import axios from 'axios'

export const authPlay=createContext()
const PlayList = ({children}) => {
    let [getPlayList, setGetPlayList]=useState([])
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

  return (
    <authPlay.Provider value={{getPlayList}}>
      {children}
    </authPlay.Provider>
  )
}

export default PlayList
