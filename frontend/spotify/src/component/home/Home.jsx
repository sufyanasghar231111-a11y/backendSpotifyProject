import React, { useContext } from 'react'
// import { authProvider } from '../contextapi/AuthContext'
import { RiChromeLine, RiHome4Fill, RiHome5Line, RiSearchLine, RiSpotifyFill } from '@remixicon/react'
import { Link } from 'react-router-dom'
import {authHome} from '../contextapi/HomeContext'
import Logout from './Logout'
import Left from './2side/Left'
import Right from './2side/Right'

function Home() {
  // let {user}=useContext(authProvider)

  let { setHidepro}=useContext(authHome)
  
  return (
    <div className='w-full  '>
      <div className='flex lg:px-10 px-5 md:px-7 max-sm:px-3.5  py-2  relative items-center justify-between gap-2 max-sm:gap-1'>
        <div className='flex items-center gap-6 max-sm:gap-2'>
       <RiSpotifyFill className='w-10 max-sm:w-6 max-sm:h-6 h-10' />
       <div className='flex items-center gap-4 max-sm:gap-2'>
       <Link to='/' className='px-2 py-2 max-sm:px-1 max-sm:py-1 rounded-full bg-[#282828]'><RiHome4Fill  className='lg:w-8 md:w-6 w-5 h-5 lg:h-8 md:h-6 max-sm:w-5 max-sm:h-5 text-white' /></Link>
       <div className='w-100 max-sm:w-50  flex bg-[#282828] items-center gap-2 max-sm:gap-1 px-2.5 max-sm:px-1 max-sm:py-1  py-3 rounded-full'>
        <div>
          <RiSearchLine className='text-[#898881] max-sm:w-4 max-sm:h-4' />
        </div>
       <input type="text" className='outline-0 rounded-full max-sm:text-sm w-full px-1.5 ' placeholder='What you want to play? ' />
       <div className='border-l  px-2 border-[#706e6e]'>
        <RiChromeLine className='text-[#898881] max-sm:w-4 max-sm:h-4' />
       </div>
       </div>
       </div>
        </div>
          <div onClick={()=>{setHidepro(prev => !prev)}} className=' bg-red-400 cursor-pointer flex items-center justify-center font-semibold rounded-full max-sm:w-5 max-sm:text-[9px] max-sm:h-5 w-9 h-9'>
            S
          </div>  
          <Logout />
      </div>
      <div className='flex relative px-2 gap-3 justify-between w-full'>
        <Left />
      <Right />
      </div>
    </div>
  )
}

export default Home