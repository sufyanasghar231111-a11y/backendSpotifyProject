import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { authProvider } from './AuthContext'



export const authHome = createContext()

const HomeContext = ({ children }) => {
  let [hidepro, setHidepro] = useState(false)
  let [hide, setHide] = useState(true)
  let [data, setData] = useState([])

  let silderRef = useRef(null)
  let [fav, setFav] = useState([])
  let [separate, setSeparate] = useState({})
  let { user, authReady, handleGetPlayList } = useContext(authProvider)
  let [hideClose, setHideClose] = useState(false)
  

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
    hidepro, setHidepro, hide, rightRef, silderRef, leftRef, setHide, patchApi, fav, setFav, createFav, deletemusic, data, setData, separate, setSeparate, deleteApi, hideClose, setHideClose
  }), [hidepro, hide, silderRef, fav, rightRef, leftRef, createFav, deletemusic, patchApi, data, separate, deleteApi, hideClose])

  return (
    <authHome.Provider value={value}>
      {children}
    </authHome.Provider>
  )
}

export default HomeContext
