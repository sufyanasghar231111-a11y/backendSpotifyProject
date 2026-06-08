import { RiArrowLeftSLine, RiArrowRightSLine, RiPauseFill, RiPlayFill } from '@remixicon/react'
import React, { useContext, useEffect } from 'react'
import HomeContext, { authHome } from '../../contextapi/HomeContext'
import Album from '../Album'

import { Link, Outlet, useLocation } from 'react-router-dom'
import RightsideMusic from '../../rightside/RightsideMusic'


const Right = () => {
  let { setHide, setPage } = useContext(authHome)

  let location = useLocation()
  useEffect(() => {
    setPage(1)
  }, [location.pathname])


  return (
    <div className='w-[70%] max-sm:w-full ml-auto  rounded-lg overflow-hidden h-[76vh]'>
      <Outlet />
      
          <>
            <div className='w-full flex gap-3 bg-[#282828]  sticky p-6 px-7 '>
              <button className='md:hidden' onClick={() => { setHide(false) }}>show</button>
              <button className='px-4 py-1.5 rounded-full text-sm font-semibold bg-white text-black cursor-pointer'>All</button>
              <button className='px-4 py-1.5 rounded-full text-sm  font-semibold backdrop-blur-2xl bg-white/10 cursor-pointer'>Music</button>
            </div>
           <RightsideMusic />
          </>
        
      

    </div>
  )
}


export default Right
