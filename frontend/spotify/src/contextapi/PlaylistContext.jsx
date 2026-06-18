import axios from 'axios'
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export const authPlaylist = createContext()
export const UIPlaylistContext=createContext()
const PlaylistContext = ({ children }) => {
    let [playlistLoader, setPlaylistLoader] = useState(false)
    let [getPlayList, setGetPlayList] = useState([])
    let [create, setCreate] = useState([])
    let [name, setName] = useState('')
    let [hideplay, setHidePlay] = useState(false)
    let [hideplaylist, setHidePlaylist] = useState(false)
    let [hideAlbumPlaylist, setHideAlbumPlaylist] = useState(false)
    let [detailData, setDetailData] = useState({})

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      deleteApi
    }), [ detailData, create, getPlayList, handleGetPlayList, handleCreatePlaylist, patchApi, deleteApi])


    const uiValue=useMemo(()=> ({
      hideAlbumPlaylist,
      setHideAlbumPlaylist,
      setPlaylistLoader,
      playlistLoader,
      hideplaylist,
      setHidePlaylist,
      hideplay,
      setHidePlay,
    }),[hideAlbumPlaylist,playlistLoader,hideplaylist,hideplay])

    return (
      <authPlaylist.Provider value={value}>
        <UIPlaylistContext.Provider value={uiValue}>
        {children}
        </UIPlaylistContext.Provider>
      </authPlaylist.Provider>
    )
}

export default PlaylistContext
