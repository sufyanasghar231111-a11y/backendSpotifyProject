import { RiSpotifyFill } from '@remixicon/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className='text-white'>
       <div className='flex items-center justify-center pt-17'>
      <div className='w-100   flex justify-center pt-7'>
        <div className='text-center'>
          <h1 className='flex items-center justify-center'><RiSpotifyFill className='w-10 h-10' /></h1>
          <h1 className='py-3 font-extrabold text-5xl'>Sign up to <br /> start listening</h1>
          <div className='text-start pt-5'>
            <h1 className='pb-2 font-semibold'>Email address</h1>
            <input type="text" className='w-full py-2.5 mb-4 px-3  border border-[#7C7C7C] rounded' placeholder='name@domain.com'  />
            <button className='w-full bg-[#2beb6e] rounded-full py-3 cursor-pointer hover:scale-101 font-bold text-black'>Next</button>
          </div>
          <div className='pt-10'>
            <h1 className='text-[#A9B3B3] '>Already have an account?</h1>
            <Link to='/' className='font-bold'>Log in</Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Register