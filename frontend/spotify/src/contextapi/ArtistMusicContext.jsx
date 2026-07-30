import React, { createContext, useContext, useEffect, useState } from 'react'
import { updateArtistMusic } from '../api/artistMusic'
import { QueryClient } from '@tanstack/react-query'
import { authSearchBar } from './SearchSeparateContext'
import { authHome } from './HomeContext'

// eslint-disable-next-line react-refresh/only-export-components
export const musicContext = createContext()
const ArtistMusicContext = ({ children }) => {
  const [musicEditPopup, setMusicEditPopup] = useState(false)
  const { getAlbumPlaylistMusic } = useContext(authSearchBar)
  const [thumbNail, setThumbNail] = useState('')
  const [title, setTitle] = useState('')
  const [musicPreview, setMusicPreview] = useState(null)
  const { data } = useContext(authHome)


  useEffect(() => {
    if (data?.title) {
      setTitle(data?.title)
    }
  }, [data])

  const updateMusic = async (id) => {
    try {

      const formData = new FormData()
      formData.append('image', thumbNail)
      formData.append('title', title)

      await updateArtistMusic(id, formData)

      await getAlbumPlaylistMusic()
    }
    catch (err) {
      console.log(err);
    }
  }



  return (
    <musicContext.Provider value={{ musicEditPopup, setMusicEditPopup, updateMusic, setTitle, setThumbNail, title, thumbNail, musicPreview, setMusicPreview }}>
      {children}
    </musicContext.Provider>
  )
}

export default ArtistMusicContext