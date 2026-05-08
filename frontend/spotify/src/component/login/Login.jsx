import React from 'react'
import {  RiSpotifyFill } from "@remixicon/react";
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='w-full bg-[#121212] text-white'>
        <div className='flex items-center justify-center pt-17'>
      <div className='w-100   flex justify-center pt-7'>
        <div className='text-center'>
          <h1 className='flex items-center justify-center'><RiSpotifyFill className='w-10 h-10' /></h1>
          <h1 className='py-3 font-bold text-5xl'>Welcome back</h1>
          <div className='text-start pt-5'>
            <h1 className='pb-2 font-semibold'>Email</h1>
            <input type="text" className='w-full py-2.5 mb-4 px-3  border border-[#7C7C7C] rounded'   />
            <h1 className='pb-2 font-semibold'>Password</h1>
            <input type="text" className='w-full py-2.5 mb-4 px-3  border border-[#7C7C7C] rounded'   />
            <button className='w-full bg-[#2beb6e] rounded-full py-3 cursor-pointer hover:scale-101 font-bold text-black'>Continue</button>
          </div>
          <div className='pt-10'>
            <h1 className='text-[#A9B3B3] '>Don’t have an account?</h1>
            <Link to='/register' className='font-bold'>Register</Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Login