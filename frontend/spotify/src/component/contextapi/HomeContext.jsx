import React, { createContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'

export const authHome = createContext()

const HomeContext = ({ children }) => {
  let [hidepro, setHidepro] = useState(false)
  let [hide, setHide] = useState(true)
  let [music, setMusic] = useState([])
  let silderRef = useRef(null)
  let audioRef = useRef(null)
  let [playing, setPlaying] = useState(null)
  const [page, setPage] = useState(1)
  const [albumFetch, setAlbumFetch] = useState([])
  let [fav, setFav] = useState([])
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
  function playRef(id) {
    let audio = audioRef.current
    if (!audio) return null

    if (playing === id) {
      if (audio.paused) {
        audio.play()
        setPlaying(true)
      }
      else {
        audio.pause()
        setPlaying(false)
      }
    }
    else {
      const song = music.find(elem => elem._id === id)
      if(!song){
        audio.pause()
        setPlaying(null)
        return 
      }
      audio.src = song.uri;
        setTimeout(()=>{
         audio.play()
      },0)
      setPlaying(song._id);

    }
  }

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
      fetchFav()
      setPlaying(null);
      if(audioRef.current){
        audioRef.current.pause();
      }
    }
    catch(err){
      console.log(err);
    }
  }

 

  return (
    <authHome.Provider value={{ hidepro, setHidepro, hide, rightRef, silderRef, leftRef, setHide, playing, setPlaying, audioRef, playRef, music, setMusic, page, setPage, albumFetch, fav, setFav, createFav,deletemusic }}>
      {children}
    </authHome.Provider>
  )
}

export default HomeContext
