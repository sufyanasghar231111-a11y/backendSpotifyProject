import React, { useContext } from 'react'
import {  UIHomeContex } from '../../contextapi/HomeContext'
import { RiCheckFill } from '@remixicon/react'
import { authProvider, LogoutContext } from '../../contextapi/AuthContext'
import { Link } from 'react-router-dom'

const Logout = () => {
    let {hidepro,setHidepro}=useContext(UIHomeContex)
    let {setHideSure}=useContext(LogoutContext)
    const {user}=useContext(authProvider)    

  return (
      <div className={`bg-[#1a1a1a]   ${hidepro  ? ' opacity-100 pointer-events-auto  translate-y-0 h-80 p-1 z-40 ' : ' pointer-events-none  opacity-0 -translate-y-2  h-0 p-0 border-0' } right-12 top-16   duration-300 rounded absolute   w-60  transition-all ease-in-out `}>
        <div className='font-semibold text-sm text-[#bdbdbd] text-left w-full'>
          <Link to={`/profile/${user?._id}`}>
        <button onClick={()=>{setHidepro(false)}} className='hover:bg-white/10 w-full py-2 px-3 text-left cursor-pointer' >Profile</button>
          </Link>
        <button onClick={()=>{setHideSure(true)
          setHidepro(false)
        }} className='hover:bg-white/10 hover:border-white/10 w-full py-2 px-3 cursor-pointer text-left border-b border-[#525151]' >Log out</button>
        <div className='p-4'>
          <h1 className='text-lg text-white'>Your Updates</h1>
        </div>
        <div className='flex items-center flex-col text-center justify-center pt-3 px-3 pb-6'>
          <RiCheckFill className='w-9 h-9 text-white' />
          <h1 className='text-white'>You’re all caught up</h1>
          <h1 className='pt-2 text-[11px]'>Watch this space for news on your followers, playlists, events and more.</h1>
        </div>
        </div>
          </div>
  )
}

export default Logout
