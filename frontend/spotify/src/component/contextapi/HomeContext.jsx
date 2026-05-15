import React, { createContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'

export const authHome = createContext()

const HomeContext = ({ children }) => {
  let [hidepro, setHidepro] = useState(false)
  let [hide, setHide] = useState(true)
  let [music, setMusic] = useState([])
  let silderRef = useRef(null)
  // const  audioRef = useRef({})
  // let [playing, setPlaying] = useState(null)
  const [page, setPage] = useState(1)
  const [albumFetch, setAlbumFetch] = useState([])
  let [fav, setFav] = useState([])
  // let [currentTime, setCurrentTime]=useState(0)
  // let [duration, setDuration]=useState(0)

  //slider
  function rightRef() {
    silderRef.current.scrollBy({
      left: 300,
      behavior: 'smooth'
    })
  }
  function leftRef() {
    silderRef.current.scrollBy({
      left: -300,
      behavior: 'smooth'
    })
  }
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

  //playsong
  // function playRef(id) {
  //   let audio = audioRef.current[id]
  //   if (!audio) return null

  //   if(playing && playing !== id){
  //     let prev =audioRef.current[playing]
  //     if(prev){
  //       prev.pause()
  //       prev.currentTime=0
  //     }
  //   }

  //   if (playing === id) {
  //     if (audio.paused) {
  //       audio.play()
  //       setPlaying(true)
  //     }
  //     else {
  //       audio.pause()
  //       setPlaying(false)
  //     }
  //   }
  //   else {
  //       Object.entries(audioRef.current).forEach(([key, audio]) => {
  //      if (audio && key !== id) {
  //      audio.pause();
  //      audio.currentTime=0
  //     }
  // });
  //        audio.play()
  //     setPlaying(id);

  //   }
  // }

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


  async function fetchFav() {
    try {
      const res = await axios.get("http://localhost:3000/api/user/getUserFavorite", { withCredentials: true })
      setFav(res.data.getUserFavoritesMusic)
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchFav()
  }, [])

  async function createFav(favoriteId) {
    try {
      await axios.patch(`http://localhost:3000/api/user/fav/${favoriteId}`, {}, { withCredentials: true })
      fetchFav()
    }
    catch (err) {
      console.log(err);
    }
  }

  async function deletemusic(favoriteId){
    try{
      await axios.delete(`http://localhost:3000/api/user/deleteFav/${favoriteId}`, {withCredentials:true})
      setFav((prev) =>
      prev.map((elem)=>({
        ...prev,
        favorite:elem.favorite.filter(item =>
          item._id !==favoriteId
        )
      }))
      )
      
    }
    catch(err){
      console.log(err);
    }
  }

  // function handleTime(id){
  //   let audio=audioRef.current[id]
  //   if(!audio) return 
  //     setCurrentTime((prev) => ({
  //   ...prev,
  //   [id]: audio.currentTime
  // }))
  // }

  // function loaderTime(id){
  //   let audio=audioRef.current[id]
  //   if(!audio) return 
  //    setDuration((prev) => ({
  //   ...prev,
  //   [id]: audio.duration
  // }))
  // }

  // function handleSeek(e, id){
  //   let audio=audioRef.current[id]
  //   if(!audio) return 

  //    audio.currentTime = e.target.value
  //    setCurrentTime((prev) => ({
  //   ...prev,
  //   [id]: Number(e.target.value)
  // }))
  // }

  return (
    <authHome.Provider value={{ hidepro, setHidepro, hide, rightRef, silderRef, leftRef, setHide, music, setMusic, page, setPage, albumFetch, fav, setFav, createFav,deletemusic }}>
      {children}
    </authHome.Provider>
  )
}

export default HomeContext
