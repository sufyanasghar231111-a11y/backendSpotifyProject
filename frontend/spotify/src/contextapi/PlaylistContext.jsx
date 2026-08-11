/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { deleteplaylist, deleteUserPlaylist, getplaylist, patchplaylist, postplaylist } from '../api/playlistApi'
import { resetContext } from './resetPasswordContext'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { adminContext } from './AdminContext';

// eslint-disable-next-line react-refresh/only-export-components
export const authPlaylist = createContext()
// eslint-disable-next-line react-refresh/only-export-components
export const UIPlaylistContext = createContext()
const PlaylistContext = ({ children }) => {
 
  const [getPlayList, setGetPlayList] = useState([])
  const [create, setCreate] = useState([])
  const [name, setName] = useState('')
  const [hideplay, setHidePlay] = useState(false)
  const [hideplaylist, setHidePlaylist] = useState(false)
  const [hideAlbumPlaylist, setHideAlbumPlaylist] = useState(false)
  const [hideExtra, setHideExtra] = useState(false)
  const [detailData, setDetailData] = useState({})
  const [separate, setSeparate] = useState({})
  const [visibleParticular, setVisibleParticular] = useState([])
  const { authReady } = useContext(resetContext)
  const [otherArtist, setOtherArtist] = useState([])
  const { user } = useContext(adminContext)
  const navigate = useNavigate()

  const handleGetPlayList = useCallback(async () => {
    try {
      
      const res = await getplaylist()
      setGetPlayList(res.data.particular || [])

    }
    catch (e) {
      console.log(e);
    }
    
  }, [])


  useEffect(() => {
    if (!authReady || !user) return;
    handleGetPlayList();
  }, [authReady, user, handleGetPlayList]);



  async function handleCreatePlaylist() {
    try {

      const res = await postplaylist(name)
      setCreate(res.data.createPlaylist)
      await handleGetPlayList()
      setHidePlay(false)
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

  const deleteCompletePlaylist = async (id) => {
    try {
      await deleteUserPlaylist(id)
      navigate('/')
      await handleGetPlayList()

    }
    catch (err) {
      console.log(err);
    }
  }

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
    setVisibleParticular,
    deleteCompletePlaylist,
    otherArtist, setOtherArtist
  }), [detailData, create, getPlayList, handleGetPlayList, handleCreatePlaylist, patchApi, deleteApi, visibleParticular, deleteCompletePlaylist, otherArtist])


  const uiValue = useMemo(() => ({
    hideAlbumPlaylist,
    setHideAlbumPlaylist,
    
    hideplaylist,
    setHidePlaylist,
    hideplay,
    setHidePlay,
    hideExtra, setHideExtra
  }), [hideAlbumPlaylist, hideplaylist, hideplay, hideExtra])

  return (
    <authPlaylist.Provider value={value}>
      <UIPlaylistContext.Provider value={uiValue}>
        {children}
      </UIPlaylistContext.Provider>
    </authPlaylist.Provider>
  )
}

export default PlaylistContext
