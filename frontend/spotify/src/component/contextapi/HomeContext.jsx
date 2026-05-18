import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { authProvider } from './AuthContext'
import { useParams } from 'react-router-dom'


export const authHome = createContext()

const HomeContext = ({ children }) => {
  let [hidepro, setHidepro] = useState(false)
  let [hide, setHide] = useState(true)
  let [music, setMusic] = useState([])
  let [data, setData] = useState([])
  let silderRef = useRef(null)
  let { id } = useParams()
   
 

  const [page, setPage] = useState(1)
  const [albumFetch, setAlbumFetch] = useState([])
  let [fav, setFav] = useState([])
  let { user, authReady } = useContext(authProvider)


  //slider
 const  rightRef = useCallback(()=> {
    silderRef.current.scrollBy({
      left: 300,
      behavior: 'smooth'
    })
  },[])

  const  leftRef = useCallback(()=> {
    silderRef.current.scrollBy({
      left: -300,
      behavior: 'smooth'
    })
  },[])
  //fetchdata
  async function fetchData() {
    try {
      let res = await axios.get(`http://localhost:3000/api/creator/getMusic?page=${page}`)
      setMusic(res.data.music)
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])

   async function fetchSingleMusic() {
    try {
      const res = await axios.get(`http://localhost:3000/api/creator/singleMusic/${id}`)
      setData(res.data.detail)
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchSingleMusic()
  }, [])


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


 const fetchFav = useCallback( async ()=>{
    try {
      const res = await axios.get("http://localhost:3000/api/user/getUserFavorite", { withCredentials: true })
      setFav(res.data.getUserFavoritesMusic)
    }
    catch (err) {
      console.log(err);
    }
  },[])

  useEffect(() => {
    if (!authReady || !user) return
    fetchFav()
    
  }, [authReady, user])

  const createFav = useCallback( async (favoriteId)=>{

    try {
      await axios.patch(`http://localhost:3000/api/user/fav/${favoriteId}`, {}, { withCredentials: true })
      fetchFav()
    }
    catch (err) {
      console.log(err);
    }
  },[fetchFav])
 

    const deletemusic = useCallback( async (favoriteId)=>{
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
  },[])

  const musicId=data._id

  const patchApi = useCallback( async (id)=>{
          try{
              const res=await axios.patch(`http://localhost:3000/api/user/updateMusic/${id}/${musicId}`, {withCredentials:true}
              )
              console.log(res);
              
          }
          catch(err){
              console.log(err);
          }
      },[])

  const value=useMemo(()=>({
    hidepro, setHidepro, hide, rightRef, silderRef, leftRef, setHide, music, setMusic, page,patchApi, setPage, albumFetch, fav, setFav, createFav, deletemusic , data, setData
  }),[hidepro,hide,silderRef,music,page,albumFetch,fav,rightRef,leftRef,createFav,deletemusic,patchApi,data])

  return (
    <authHome.Provider value={value}>
      {children}
    </authHome.Provider>
  )
}

export default HomeContext
