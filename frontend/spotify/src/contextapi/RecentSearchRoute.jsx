import axios from 'axios';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export const authSearch=createContext()
const RecentSearchRoute = ({children}) => {

    const [getSearch, setGetSearch]=useState([])
    const [musicresults, setMusicResults] = useState([])
    const [albumresults, setAlbumResults] = useState([])
    const [visibleresults, setVisibleResults]=useState([])
     const [skeletonLoader, setSkeletonLoader] = useState(false)

    const getRecentSearch = useCallback(async () => {
      try{
        const res=await axios.get('http://localhost:3000/api/search/getSearch', {withCredentials:true})
        setGetSearch(res.data.getSearchItem)
      }
      catch(err){
        console.log(err);
      }
    }, [])

    useEffect(()=>{
        getRecentSearch()
    },[])

    const patchRecentSearch = useCallback(async (id) => {
      try{
      await axios.patch(`http://localhost:3000/api/search/songSearch/${id}`, {}, {withCredentials:true})
        
        await getRecentSearch()
      }
      catch(err){
        console.log(err);
      }
    }, [getRecentSearch])

    const patchAlbumRecentSearch = useCallback(async (id) => {
      try{
      await axios.patch(`http://localhost:3000/api/search/albumSearch/${id}`, {}, {withCredentials:true})
        
        await getRecentSearch()
      }
      catch(err){
        console.log(err);
      }
    }, [getRecentSearch])
    
    const patchPlaylistRecentSearch=useCallback(async (id)=>{
      try{
      await axios.patch(`http://localhost:3000/api/search/playlistSearch/${id}`, {}, {withCredentials:true})
        
        await getRecentSearch()
      }
      catch(err){
        console.log(err);
      }
    },[getRecentSearch])

    const deleteRecentSearch = useCallback(async (id) => {
      try{
      await axios.delete(`http://localhost:3000/api/search/deleteSearch/${id}`, {withCredentials:true})
        
        await getRecentSearch()
      }
      catch(err){
        console.log(err);
      }
    }, [getRecentSearch])

   

  const value = useMemo(() => ({
    getSearch,
    patchRecentSearch,
    deleteRecentSearch,
    patchAlbumRecentSearch,
    getRecentSearch,
    albumresults,
    setAlbumResults,
    musicresults,
    setMusicResults,
    skeletonLoader,
    setSkeletonLoader,
    visibleresults, setVisibleResults,
    patchPlaylistRecentSearch
  }), [getSearch, patchRecentSearch, deleteRecentSearch, patchAlbumRecentSearch, getRecentSearch, albumresults, musicresults, skeletonLoader,visibleresults,patchPlaylistRecentSearch])

  return (
    <authSearch.Provider value={value}>
      {children}
    </authSearch.Provider>
  )
}

export default RecentSearchRoute