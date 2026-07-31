import React, { createContext, useContext, useEffect, useState } from 'react'
import { deleteThumbnail, updateArtistMusic } from '../api/artistMusic'
// removed unused import
import { authSearchBar } from './SearchSeparateContext'
import { authHome } from './HomeContext'
import { authPlaylist } from './PlaylistContext'
import { albumArtist, deleteAlbumThumbNail } from '../api/albumApi'

// eslint-disable-next-line react-refresh/only-export-components
export const musicContext = createContext()
// eslint-disable-next-line react-refresh/only-export-components
export const albumContext = createContext()
const ArtistMusicContext = ({ children }) => {

  // music Context states and context
  const [musicEditPopup, setMusicEditPopup] = useState(false)
  const { getAlbumPlaylistMusic } = useContext(authSearchBar)
  const [thumbNail, setThumbNail] = useState(0)
  const [title, setTitle] = useState('')
  const [musicPreview, setMusicPreview] = useState(null)
  const { data, setData } = useContext(authHome)

  // Album Context states and context
  const [albumEditModal, setAlbumEditModal] = useState(false)
  const [albumImage, setAlbumImage] = useState(0)
  const [albumName, setAlbumName] = useState('')
  const [albumPreview, setAlbumPreview] = useState(null)
  const { detailData, setDetailData } = useContext(authPlaylist)
  

  useEffect(() => {
    if (data?.title) {
      setTitle(data?.title)
    }
  }, [data])

  useEffect(() => {
    if (detailData?.title) {
      setAlbumName(detailData?.title)
    }
  }, [detailData])

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

      await getAlbumPlaylistMusic()
      setMusicEditPopup(false)
    }
    catch (err) {
      console.log(err)
    }
  }

  const updateArtistAlbum = async (id) => {
    try {
      const formData = new FormData()
      if (albumImage) formData.append('image', albumImage)
      formData.append('title', albumName)

      const res = await albumArtist(id, formData)


      // update currently viewed music data so UI reflects changes immediately
      if (detailData?._id === id) {
        setDetailData(prev => ({ 
          ...prev,
           title: res.data.updatealbum?.title,
            image: res.data.updatealbum?.image
           }))
      }

      await getAlbumPlaylistMusic()
      setAlbumEditModal(false)
    }
    catch (err) {
      console.log(err)
    }
  }

  const deleteMusicPic = async (id) => {
    try{
      const res = await deleteThumbnail(id)
      setData(prev => ({
        ...prev,
        image:res.data.deleteThumbnail.image
      }))
      await getAlbumPlaylistMusic()
    }
    catch(err){
      console.log(err);
    }
  }

  const deleteAlbumPic = async (id) => {
    try{
      const res = await deleteAlbumThumbNail(id)
      setDetailData(prev => ({
        ...prev ,
        image:res.data.deleteThumbnail.image
      }))
       await getAlbumPlaylistMusic()
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <musicContext.Provider value={{ musicEditPopup, setMusicEditPopup, updateMusic, setTitle, setThumbNail, title, thumbNail, musicPreview, setMusicPreview, deleteMusicPic }}>
      <albumContext.Provider value={{ albumEditModal, setAlbumEditModal, albumName, setAlbumName, albumImage, setAlbumImage, albumPreview, setAlbumPreview, updateArtistAlbum, deleteAlbumPic }}>
        {children}
      </albumContext.Provider>
    </musicContext.Provider>
  )
}

export default ArtistMusicContext