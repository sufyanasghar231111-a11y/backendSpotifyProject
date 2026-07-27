import { RiArrowLeftSLine, RiArrowRightSLine, RiPauseFill, RiPlayFill } from '@remixicon/react'
import React, { useContext, useEffect } from 'react'
import HomeContext, {  UIHomeContex } from '../../contextapi/HomeContext'
import Album from '../../component/home/Album'

import { Link, Outlet, useLocation } from 'react-router-dom'
import RightsideMusic from '../../component/rightside/RightsideMusic'
import { authSearchBar } from '../../contextapi/SearchSeparateContext'
import HideExtraDetail from '../../like/HideExtraDetail'
import { UIPlaylistContext } from '../../contextapi/PlaylistContext'
import { notificationContext } from '../../contextapi/UserRequest'


const Right = () => {
  const { setHide } = useContext(UIHomeContex)
  const {setPage}   =useContext(authSearchBar)
  const {setHideExtra}=useContext(UIPlaylistContext)
  const {setNotificationpopup} =useContext(notificationContext)
  
  
  let location = useLocation()
  useEffect(() => {
    setPage(1)
    setHideExtra(false)
    setNotificationpopup(false)
  }, [location.pathname])


  return (
    <div className='w-[70%] max-sm:w-full relative ml-auto  rounded-lg overflow-hidden h-[76vh]'>
      <HideExtraDetail />
      <Outlet />
      {location.pathname === '/' && (
          <>
            <div className='w-full flex gap-3 bg-[#282828]  sticky p-6 px-7 '>
              <button className='md:hidden' onClick={() => { setHide(false) }}>show</button>
              <button className='px-4 py-1.5 rounded-full text-sm font-semibold bg-white text-black cursor-pointer'>All</button>
              <button className='px-4 py-1.5 rounded-full text-sm  font-semibold backdrop-blur-2xl bg-white/10 cursor-pointer'>Music</button>
            </div>
           <RightsideMusic />
          </>
      )}
    </div>
  )
}


export default Right
