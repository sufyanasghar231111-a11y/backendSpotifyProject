import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { authProvider } from './AuthContext'



export const authHome = createContext()

const HomeContext = ({ children }) => {
  let [hidepro, setHidepro] = useState(false)
  let [hide, setHide] = useState(true)
  let [music, setMusic] = useState([])
  let [data, setData] = useState([])
  let [searchMusic, setSearchMusic] = useState([])
  let [Issearch, setIssearch] = useState(false)

  let silderRef = useRef(null)

  const [page, setPage] = useState(1)
  const [albumFetch, setAlbumFetch] = useState([])
  let [fav, setFav] = useState([])
  let [separate, setSeparate] = useState({})
  let { user, authReady, handleGetPlayList } = useContext(authProvider)
  let [searchinput, setSearchinput] = useState('')
  let [loader, setLoader] = useState(false)

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
  async function fetchData() {
    try {
      setLoader(true)

      let res = await axios.get(`http://localhost:3000/api/creator/getMusic?page=${page}&search=${searchinput}`)
      if (searchinput.trim()) {
        setSearchMusic(res.data.music)
        setIssearch(true)
      }
      else {
        setMusic(res.data.music)
        setIssearch(false)
      }
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData()
    }, 300)
    return () => clearInterval(timer)
  }, [page, searchinput])



  async function album() {
    try {
      const res = await axios.get('http://localhost:3000/api/creator/allAlbum')
      setAlbumFetch(res.data.album)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    album()
  }, [])


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

  const value = useMemo(() => ({
    hidepro, setHidepro, hide, rightRef, silderRef, leftRef, setHide, music, setMusic, page, patchApi, setPage, albumFetch, fav, setFav, createFav, deletemusic, data, setData, separate, setSeparate, deleteApi, searchinput, setSearchinput, searchMusic, Issearch, setIssearch, loader
  }), [hidepro, hide, silderRef, music, page, albumFetch, fav, rightRef, leftRef, createFav, deletemusic, patchApi, data, separate, deleteApi, searchinput, searchMusic, Issearch, loader])

  return (
    <authHome.Provider value={value}>
      {children}
    </authHome.Provider>
  )
}

export default HomeContext
