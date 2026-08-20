import React, { createContext, useEffect, useState } from 'react'
import axios from "axios";
import { demoApi } from '../api/playlistApi';
// eslint-disable-next-line react-refresh/only-export-components
export const demoContext = createContext()
const DemoContext = ({children}) => {
    const [musicData, setMusicData] = useState([])
    const [albumData, setAlbumData] = useState([])
    const [playlistData, setPlaylistData] = useState([])
    const [loader, setLoader] = useState(true)
    const [loginPopup, setLoginPopup] = useState(false)
    const [demoInput, setDemoInput ] = useState('')
    
    const getData = async ()=>{
        try{
            setLoader(true)
            const res= await demoApi()
            setMusicData(res.data.music) 
            setAlbumData(res.data.album)
            setPlaylistData(res.data.playlist)
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoader(false)
        }
    }

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getData()
    },[])

  return (
    <demoContext.Provider value={{musicData, albumData ,playlistData, loader, loginPopup, setLoginPopup, demoInput, setDemoInput }}>
        {children}
    </demoContext.Provider>
  )
}

export default DemoContext