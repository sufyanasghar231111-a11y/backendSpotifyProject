import { RiSpotifyFill } from '@remixicon/react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authProvider } from '../contextapi/AuthContext'
import Home from '../home/Home'

function Register() {
  let {handleSumbit,emailreg,setEmailreg,setPasswordreg,passwordreg,setUsername,username,user}=useContext(authProvider)

  return (
    <div className='text-white'>
      {
        user? (<Home />):(<div className='flex items-center justify-center pt-5'>
      <div className='w-100   flex justify-center pt-7'>
        <div className='text-center'>
          <h1 className='flex items-center justify-center'><RiSpotifyFill className='w-10 h-10' /></h1>
          <h1 className='py-3 font-extrabold text-5xl'>Sign up to <br /> start listening</h1>
          <form onSubmit={handleSumbit} className='text-start pt-5'>
            <h1 className='pb-1 font-semibold'>Username</h1>
            <input type="text" value={username} className='w-full py-2.5 mb-4 px-3  border border-[#7C7C7C] rounded' onChange={(elem)=>{setUsername(elem.target.value)}} placeholder='Enter name'  />
            <h1 className='pb-1 font-semibold'>Email address</h1>
            <input type="email" value={emailreg} className='w-full py-2.5 mb-4 px-3  border border-[#7C7C7C] rounded' onChange={(elem)=>{setEmailreg(elem.target.value)}} placeholder='name@domain.com'  />
            <h1 className='pb-1 font-semibold'>Password</h1>
            <input type="text" value={passwordreg} className='w-full py-2.5 mb-4 px-3  border border-[#7C7C7C] rounded' onChange={(elem)=>{setPasswordreg(elem.target.value)}} placeholder='Enter password'  />
            <button className='w-full bg-[#2beb6e] rounded-full py-3 cursor-pointer hover:scale-101 font-bold text-black'>Continue</button>
          </form>
          <div className='pt-5'>
            <h1 className='text-[#A9B3B3] '>Already have an account?</h1>
            <Link to='/' className='font-bold'>Log in</Link>
          </div>
        </div>
        </div>
      </div>)
      }
       
    </div>
  )
}

export default Register