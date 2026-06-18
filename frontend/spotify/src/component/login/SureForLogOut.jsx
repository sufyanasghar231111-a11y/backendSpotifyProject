import React, { useContext } from 'react'
import {  LogoutContext } from '../../contextapi/AuthContext'

const SureForLogOut = () => {
    const {handleLogout,user}=useContext(LogoutContext)
    
    const {hideSure, setHideSure}=useContext(LogoutContext)
    
    
  return (
    <>
        {
            hideSure && (
        <>
        <div onClick={()=>{setHideSure(false)}} className='w-full h-full cursor-pointer absolute inset-0  bg-black/60 z-100 '></div>
        <div className='w-full h-full absolute z-101 flex items-center justify-center  '>
            <div className='bg-[#212121] w-96 flex  p-10 text-center  flex-col   rounded-2xl'>
                <h1 className='text-2xl font-semibold'>Are you sure you <br /> want to log out?</h1>
                <h1 className='pt-4 text-lg'>Log out of Spotify as <br /> {user?.email}?</h1>
                <div className='flex flex-col gap-3 pt-5'>
                    <button onClick={handleLogout} className='py-2.5 w-full rounded-full bg-green-500 cursor-pointer hover:bg-green-600'>Log out</button>
                    <button onClick={()=>{setHideSure(false)}} className='py-2.5 w-full rounded-full bg-black cursor-pointer hover:bg-gray-400'>Cancel</button>
                </div>
            </div>
        </div>
        </>
            )
        }
    </>
  )
}

export default SureForLogOut
