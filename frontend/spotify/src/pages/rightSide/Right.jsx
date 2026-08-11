import { RiArrowLeftSLine, RiArrowRightSLine, RiMenu2Line, RiPauseFill, RiPlayFill } from '@remixicon/react'
import React, { useContext, useEffect } from 'react'
import HomeContext, {  UIHomeContex } from '../../contextapi/HomeContext'

import { Link, Outlet, useLocation } from 'react-router-dom'
import RightsideMusic from '../../component/rightsidecomponents/RightsideMusic'
import { authSearchBar } from '../../contextapi/SearchSeparateContext'
import HideExtraDetail from '../../modals/HideExtraDetail'
import { UIPlaylistContext } from '../../contextapi/PlaylistContext'
import { notificationContext } from '../../contextapi/UserRequest'
import { adminContext } from '../../contextapi/AdminContext'
import { CreateAlbumContext, CreateSongContext } from '../../contextapi/ArtistMusicContext'
import RightSideSkeletonLoader from '../../modals/RightSideSkeletonLoader'


const Right = () => {
  
  const {setPage, musicLoader}   =useContext(authSearchBar)
  const {setHideExtra}=useContext(UIPlaylistContext)
  const {setNotificationpopup} =useContext(notificationContext)
  const {user} = useContext(adminContext)
  const {musicCreateModal, setMusicCreateModal} = useContext(CreateSongContext) 
  const { setAlbumCreateModal, albumCreateModal } = useContext(CreateAlbumContext)
  
  let location = useLocation()
  useEffect(() => {
    setPage(1)
    setHideExtra(false)
    setNotificationpopup(false)
  }, [location.pathname, setHideExtra, setNotificationpopup, setPage])


  return (
    <div className='w-[70%] max-sm:w-full relative ml-auto  rounded-lg overflow-hidden h-[76vh]'>
      {
        musicLoader && <RightSideSkeletonLoader />
      }
      
      <HideExtraDetail />
      <Outlet />
      {location.pathname === '/' && (
          <>
            <div className='w-full flex gap-3 items-center bg-[#282828]  sticky p-6 max-sm:py-4  max-sm:px-4 '>
              
              <button className='px-4  max-sm:text-[10px] py-1.5 rounded-full text-sm font-semibold bg-white text-black cursor-pointer'>All</button>
             { user?.role === 'artist' &&(
                <button onClick={()=>{setMusicCreateModal(true)}} className={`px-4 max-sm:text-[10px] py-1.5 rounded-full text-sm  font-semibold backdrop-blur-2xl ${musicCreateModal? 'bg-white text-black':'bg-white/10 text-white'}  cursor-pointer`}>Create Music</button>
              )}

             { user?.role === 'artist' &&(
                <button onClick={()=>{setAlbumCreateModal(true)}}  className={`px-4 py-1.5 max-sm:text-[10px] rounded-full text-sm  font-semibold backdrop-blur-2xl ${albumCreateModal ? 'bg-white text-black':'bg-white/10 text-white'}  cursor-pointer`}>Create Album</button>
              )}
            </div>
           <RightsideMusic />
          </>
      )}
    </div>
  )
}


export default Right
