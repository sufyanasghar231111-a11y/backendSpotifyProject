import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { authProvider } from './AuthContext'
import { authSearch } from './RecentSearchRoute'



export const authHome = createContext()

const HomeContext = ({ children }) => {
  let [hidepro, setHidepro] = useState(false)
  let [hide, setHide] = useState(true)
  let [music, setMusic] = useState([])
  let [album, setAlbum] = useState([])
  let [data, setData] = useState([])
  let [searchMusic, setSearchMusic] = useState([])
  let [searchAlbum, setSearchAlbum] = useState([])
  let [Issearch, setIssearch] = useState(false)

  let silderRef = useRef(null)

  const [page, setPage] = useState(1)
  let [fav, setFav] = useState([])
  let [separate, setSeparate] = useState({})
  let { user, authReady, handleGetPlayList } = useContext(authProvider)
  let [searchinput, setSearchinput] = useState('')
  let [loader, setLoader] = useState(false)

  let [skeletonLoader, setSkeletonLoader] = useState(false)
  let [hideClose, setHideClose] = useState(false)
  let { getRecentSearch } = useContext(authSearch)

  //slider
  const rightRef = useCallback(() => {
    silderRef.current.scrollBy({
      left: 300,
      behavior: 'smooth'
    })
  }, [])

  const leftRef = useCallback(() => {
    silderRef.current.scrollBy({
      left: -300,
      behavior: 'smooth'
    })
  }, [])
  //fetchdata
  let requestRef=useRef(0)
  

  useEffect(() => {
    if(searchinput.trim().length<2){
      setSearchMusic([])
      setSearchAlbum([])
    }
    const timer = setTimeout( async() => {
      
    const currentRef=++requestRef.current
    setLoader(true)

    
    try {

      let res = await axios.get(`http://localhost:3000/api/creator/getmusicalbum?page=${page}&search=${searchinput}`)
      if(currentRef !==requestRef.current) return
      if (searchinput.trim()) {
        setSearchMusic(res.data.music)
        setSearchAlbum(res.data.album)
        setIssearch(true)
      }
      else {
        setMusic(res.data.music)
        setAlbum(res.data.album)
        setIssearch(false)
      }
    }
    catch (err) {
      console.log(err);
    }
    finally {
      if(currentRef ===requestRef.current){
        setLoader(false)
      }
    }

  
    }, searchinput.trim()? 600:0)
    return () => clearTimeout(timer)

  }, [page, searchinput])

 

  const fetchFav = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/getUserFavorite", { withCredentials: true })
      setFav(res.data.getUserFavoritesMusic)
    }
    catch (err) {
      console.log(err);
    }
  }, [])

  useEffect(() => {
    if (!authReady || !user) return
    fetchFav()

  }, [authReady, user])

  const createFav = useCallback(async (favoriteId) => {

    try {
      await axios.patch(`http://localhost:3000/api/user/fav/${favoriteId}`, {}, { withCredentials: true })
      fetchFav()
    }
    catch (err) {
      console.log(err);
    }
  }, [fetchFav])


  const deletemusic = useCallback(async (favoriteId) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/deleteFav/${favoriteId}`, { withCredentials: true })
      setFav((prev) =>
        prev.map((elem) => ({
          ...elem,
          favorite: elem.favorite.filter(item =>
            item._id !== favoriteId
          )
        }))
      )

    }
    catch (err) {
      console.log(err);
    }
  }, [])


  // playlist patchapi for push and pull for delete api


  const patchApi = useCallback(async (id, dataId) => {
    try {
      const res = await axios.patch(`http://localhost:3000/api/user/updateMusic/${id}/${dataId}`, {}, { withCredentials: true }
      )
      setSeparate(res.data.update)
      await handleGetPlayList()
    }
    catch (err) {
      console.log(err);
    }
  }, [])

  const deleteApi = useCallback(async (id, dataId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/user/deleteMusic/${id}/${dataId}`, { withCredentials: true })
      setSeparate(res.data.deleteParticularMusic)
      await handleGetPlayList()
    }
    catch (err) {
      console.log(err);

    }
  }, [])

  const patchText = useCallback(async () => {
    try {
      await axios.patch(`http://localhost:3000/api/search/recenttext`, { text: searchinput }, { withCredentials: true })
      await getRecentSearch()
    }
    catch (err) {
      console.log(err);
    }

  }, [searchinput])



  const value = useMemo(() => ({
    hidepro, setHidepro, hide, rightRef, silderRef, leftRef, setHide, music, setMusic, page, patchApi, setPage, album, fav, setFav, createFav, deletemusic, data, setData, separate, setSeparate, deleteApi, searchinput, setSearchinput, searchMusic, Issearch, setIssearch, loader, searchAlbum, skeletonLoader, setSkeletonLoader, hideClose, setHideClose, patchText, setLoader
  }), [hidepro, hide, silderRef, music, page, album, fav, rightRef, leftRef, createFav, deletemusic, patchApi, data, separate, deleteApi, searchinput, searchMusic, Issearch, loader, searchAlbum, skeletonLoader, hideClose, patchText])

  return (
    <authHome.Provider value={value}>
      {children}
    </authHome.Provider>
  )
}

export default HomeContext
