/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { deleteplaylist, getplaylist, patchplaylist, postplaylist } from '../api/playlistApi'
import { resetContext } from './resetPasswordContext'

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
    const [visibleParticular,setVisibleParticular]=useState([])
    const {authReady}=useState(resetContext)
    
    const handleGetPlayList = useCallback(async () => {
      try {
        setPlaylistLoader(true)
        await new Promise((resolve) => setTimeout(resolve, 500));
        const res = await getplaylist()
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
      
    }, []);

  

    
    async function handleCreatePlaylist() {
        try {

            const res = await postplaylist(name)
            setCreate(res.data.createPlaylist)
            await handleGetPlayList()
        }
        catch (err) {
            console.log(err);
        }
    }

      const patchApi = useCallback(async (id, dataId) => {
        try {
           await patchplaylist(id, dataId)
          await handleGetPlayList()
        }
        catch (err) {
          console.log(err);
        }
      }, [])
    
      const deleteApi = useCallback(async (id, dataId) => {
        try {
           await deleteplaylist(id, dataId)
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
      separate,
      setSeparate,
      visibleParticular,
      setVisibleParticular
    }), [ detailData, create, getPlayList, handleGetPlayList, handleCreatePlaylist, patchApi, deleteApi,visibleParticular])


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
