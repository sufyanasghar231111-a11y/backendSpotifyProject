import React, { useContext } from 'react'
import { RiChromeLine, RiCloseLargeFill, RiHome4Fill, RiHome5Line, RiPauseFill, RiPlayFill, RiSearchLine, RiSpotifyFill } from '@remixicon/react'
import {  UIHomeContex } from '../../../contextapi/HomeContext'
import { authProvider } from '../../../contextapi/AuthContext'
import Logout from '../Logout'
import { Link } from 'react-router-dom'
import NavSearch from './NavSearch'

function Nav() {
  let { user } = useContext(authProvider)
  let { setHidepro } = useContext(UIHomeContex)

  let fetchname = (user.username.trim().split(' ')[0][0] + user.username.trim().split(' ').pop()[0]).toUpperCase()



  return (
    <nav className='flex lg:px-10 px-5 md:px-7 max-sm:px-3.5  py-2  relative items-center z-150 justify-between gap-2 max-sm:gap-1'>
      <div className='flex items-center gap-6 max-sm:gap-2'>
        <RiSpotifyFill className='w-10 max-sm:w-6 max-sm:h-6 h-10' />
        <div className='flex  items-center gap-4 max-sm:gap-2'>
          <Link to='/' className='px-2 py-2 max-sm:px-1 max-sm:py-1 rounded-full bg-[#282828]'><RiHome4Fill className='lg:w-8 md:w-6 w-5 h-5 lg:h-8 md:h-6 max-sm:w-5 max-sm:h-5 text-white' /></Link>
          <NavSearch />
        </div>
      </div>
      <div onClick={() => { setHidepro(prev => !prev) }} className=' bg-red-400 overflow-hidden  flex items-center justify-center relative cursor-pointer  font-semibold rounded-full max-sm:w-5 max-sm:text-[9px] max-sm:h-5 w-9 h-9'>
        <span className='absolute z-0 text-white   '>
          {fetchname}
        </span>
        {user?.pfp &&
          (
            <img src={user?.pfp} className='absolute inset-0 w-full h-full scale-110  object-cover z-10' alt="" />
          )
        }

      </div>
      <Logout />
    </nav>
  )
}

export default Nav