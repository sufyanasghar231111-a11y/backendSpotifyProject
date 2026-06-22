/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const authPlaylist = createContext()
// eslint-disable-next-line react-refresh/only-export-components
export const UIPlaylistContext=createContext()
const PlaylistContext = ({ children }) => {
    const [playlistLoader, setPlaylistLoader] = useState(false)
    const [getPlayList, setGetPlayList] = useState([])
    const [create, setCreate] = useState([])
    const [name, setName] = useState('')
    const [hideplay, setHidePlay] = useState(false)
    const [hideplaylist, setHidePlaylist] = useState(false)
    const [hideAlbumPlaylist, setHideAlbumPlaylist] = useState(false)
    const [hideExtra,setHideExtra]=useState(false)
    const [detailData, setDetailData] = useState({})
    const  [separate, setSeparate] = useState({})

    const handleGetPlayList = useCallback(async () => {
      try {
        setPlaylistLoader(true)
        await new Promise((resolve) => setTimeout(resolve, 500));
        const res = await axios.get('http://localhost:3000/api/user/particularUserPlaylist', { withCredentials: true })
        setGetPlayList(res.data.particular || [])
      }
      catch (e) {
        console.log(e);
      }
      finally {
        setPlaylistLoader(false)
      }
    }, [])


    useEffect(() => {
      handleGetPlayList();
    }, [handleGetPlayList]);

    const updateVisibility = async (id)=>{
      try{
        const res=await axios.patch(`http://localhost:3000/api/user/visible/${id}`, {}, {withCredentials:true})
        setSeparate(res.data.visible)
        
        await handleGetPlayList()
        
      }
      catch(err){
        console.log(err);
        
      }
    }

    
    async function handleCreatePlaylist() {
        try {

            const res = await axios.post('http://localhost:3000/api/user/playlist', { name }, { withCredentials: true })
            setCreate(res.data.createPlaylist)
            await handleGetPlayList()
        }
        catch (err) {
            console.log(err);
        }
    }

      const patchApi = useCallback(async (id, dataId) => {
        try {
           await axios.patch(`http://localhost:3000/api/user/updateMusic/${id}/${dataId}`, {}, { withCredentials: true }
          )
          await handleGetPlayList()
        }
        catch (err) {
          console.log(err);
        }
      }, [])
    
      const deleteApi = useCallback(async (id, dataId) => {
        try {
           await axios.delete(`http://localhost:3000/api/user/deleteMusic/${id}/${dataId}`, { withCredentials: true })
          await handleGetPlayList()
        }
        catch (err) {
          console.log(err);
    
        }
      }, [])
    
    const value = useMemo(() => ({
      detailData,
      setDetailData,
      setName,
      setGetPlayList,
      create,
      getPlayList,
      handleGetPlayList,
      handleCreatePlaylist,
      patchApi,
      deleteApi,
      updateVisibility,
      separate,
      setSeparate
    }), [ detailData, create, getPlayList, handleGetPlayList, handleCreatePlaylist, patchApi, deleteApi,updateVisibility])


    const uiValue=useMemo(()=> ({
      hideAlbumPlaylist,
      setHideAlbumPlaylist,
      setPlaylistLoader,
      playlistLoader,
      hideplaylist,
      setHidePlaylist,
      hideplay,
      setHidePlay,
      hideExtra,setHideExtra
    }),[hideAlbumPlaylist,playlistLoader,hideplaylist,hideplay,hideExtra])

    return (
      <authPlaylist.Provider value={value}>
        <UIPlaylistContext.Provider value={uiValue}>
        {children}
        </UIPlaylistContext.Provider>
      </authPlaylist.Provider>
    )
}

export default PlaylistContext
