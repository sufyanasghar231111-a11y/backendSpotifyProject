import React, { useContext } from 'react'
import {  RiLoader4Line, RiLoaderLine, RiSpotifyFill } from "@remixicon/react";
import { Link } from 'react-router-dom';
import { authProvider } from '../contextapi/AuthContext';
import Home from '../home/Home';
import Admin from '../admin/Admin';

function Login() {
  let {handleLogin,login,handleChange,user,loading}=useContext(authProvider)
  // localStorage.clear()
  
  return (
    <div className='w-full bg-[#121212] text-white'>
      {
        user ? (<Home />):(
        <div className='flex items-center justify-center pt-17'>
      <div className='w-100   flex justify-center pt-7'>
        <div className='text-center'>
          <h1 className='flex items-center justify-center'><RiSpotifyFill className='w-10 h-10' /></h1>
          <h1 className='py-3 font-bold text-5xl'>Welcome back</h1>
          <form onSubmit={handleLogin} className='text-start pt-5'>
            <h1 className='pb-2 font-semibold'>Email</h1>
            <input name='email' type="text" value={login.email} onChange={handleChange} className='w-full py-2.5 mb-4 px-3  border border-[#7C7C7C] rounded' placeholder='Enter your Email'   />
            <h1 className='pb-2 font-semibold'>Password</h1>
            <input name='password' type="text" value={login.password} onChange={handleChange} className='w-full py-2.5 mb-4 px-3  border border-[#7C7C7C] rounded' placeholder='Enter your Password'     />
            {
              loading ? (
                <button disabled={loading} className='w-full bg-[#2beb6e] rounded-full py-3 flex items-center opacity-75 cursor-not-allowed justify-center  hover:scale-101 font-bold text-black'><RiLoader4Line className='rotate' /></button>
              ) : (<button  className='w-full bg-[#2beb6e] rounded-full py-3 flex items-center justify-center cursor-pointer hover:scale-101 font-bold text-black'>Continue</button>)
            }
            
          </form>
          <div className='pt-10'>
            <h1 className='text-[#A9B3B3] '>Don’t have an account?</h1>
            <Link to='/register' className='font-bold'>Register</Link>
          </div>
        </div>
        </div>
      </div>)
      }

     
        
    </div>
  )
}

export default Login