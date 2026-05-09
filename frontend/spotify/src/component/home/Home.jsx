import React, { useContext } from 'react'
import { authProvider } from '../contextapi/AuthContext'
import { RiChromeLine, RiHome4Fill, RiHome5Line, RiSearchLine, RiSpotifyFill } from '@remixicon/react'
import { Link } from 'react-router-dom'
import {authHome} from '../contextapi/HomeContext'
import Logout from './Logout'

function Home() {
  let {user}=useContext(authProvider)

  let {hidepro, setHidepro}=useContext(authHome)
  
  return (
    <div className='w-full px-10 py-5  relative'>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-6'>
       <RiSpotifyFill className='w-10 h-10' />
       <div className='flex items-center gap-4'>
       <Link to='/' className='px-2 py-2 rounded-full bg-[#282828]'><RiHome4Fill  className='w-8 h-8 text-white' /></Link>
       <div className='w-100 flex bg-[#282828] items-center gap-2 px-2.5  py-3 rounded-full'>
        <div>
          <RiSearchLine className='text-[#898881]' />
        </div>
       <input type="text" className='outline-0 rounded-full w-full px-1.5 ' placeholder='What you want to play? ' />
       <div className='border-l  px-2 border-[#706e6e]'>
        <RiChromeLine className='text-[#898881]' />
       </div>
       </div>
       </div>
        </div>
        <div className=''>
          <div onClick={()=>{setHidepro(prev => !prev)}} className=' bg-red-400 cursor-pointer flex items-center justify-center font-semibold rounded-full w-9 h-9'>
            S
          </div>
        
         
        </div>
      </div>
      
        

          <Logout />
        
      
    </div>
  )
}

export default Home