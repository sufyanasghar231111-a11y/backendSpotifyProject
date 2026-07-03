import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { authProvider } from '../contextapi/AuthContext'
import { createfav, deletefav, favGet } from '../api/favApi'



export const authHome = createContext()
export const UIHomeContex=createContext()
export const refContext=createContext()

const HomeContext = ({ children }) => {
  let [hidepro, setHidepro] = useState(false)
  let [hide, setHide] = useState(true)
  let [data, setData] = useState([])

  let silderRef = useRef(null)
  let [fav, setFav] = useState([])
  
  let { user, authReady } = useContext(authProvider)
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
      const res = await favGet()
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
      await createfav(favoriteId)
      fetchFav()
    }
    catch (err) {
      console.log(err);
    }
  }, [fetchFav])


  const deletemusic = useCallback(async (favoriteId) => {
    try {
      await deletefav(favoriteId)
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




  const valueMusic = useMemo(() => ({
    fav, setFav, createFav, deletemusic, data, setData
  }), [ fav,  createFav, deletemusic, data])

  const uiValue=useMemo(()=>({
    hide,setHide,hidepro,setHidepro,hideClose,setHideClose
  }),[hide, hidepro,hideClose])

  const value =useMemo(()=>({
    rightRef, silderRef, leftRef
  }),[silderRef, rightRef, leftRef])

  return (
    <authHome.Provider value={valueMusic}>
      <UIHomeContex.Provider value={uiValue}>
        <refContext.Provider value={value}>
      {children}
        </refContext.Provider>
      </UIHomeContex.Provider>
    </authHome.Provider>
  )
}

export default HomeContext
