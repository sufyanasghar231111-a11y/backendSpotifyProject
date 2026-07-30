import React, { createContext, useContext, useEffect, useState } from 'react'
import { updateArtistMusic } from '../api/artistMusic'
// removed unused import
import { authSearchBar } from './SearchSeparateContext'
import { authHome } from './HomeContext'

// eslint-disable-next-line react-refresh/only-export-components
export const musicContext = createContext()
const ArtistMusicContext = ({ children }) => {
  const [musicEditPopup, setMusicEditPopup] = useState(false)
  const { getAlbumPlaylistMusic, setMusic } = useContext(authSearchBar)
  const [thumbNail, setThumbNail] = useState('')
  const [title, setTitle] = useState('')
  const [musicPreview, setMusicPreview] = useState(null)
  const { data, setData } = useContext(authHome)


  useEffect(() => {
    if (data?.title) {
      setTitle(data?.title)
    }
  }, [data])

  const updateMusic = async (id) => {
    try {
      const formData = new FormData()
      if (thumbNail) formData.append('image', thumbNail)
      formData.append('title', title)

      const res = await updateArtistMusic(id, formData)


      // update currently viewed music data so UI reflects changes immediately
      if (data?._id === id) {
        setData(prev => ({ ...prev, title: res.data.updatemusic.title, image: res.data.updatemusic.image }))
      }

      setMusicEditPopup(false)
    }
    catch (err) {
      console.log(err)
    }
  }



  return (
    <musicContext.Provider value={{ musicEditPopup, setMusicEditPopup, updateMusic, setTitle, setThumbNail, title, thumbNail, musicPreview, setMusicPreview }}>
      {children}
    </musicContext.Provider>
  )
}

export default ArtistMusicContext