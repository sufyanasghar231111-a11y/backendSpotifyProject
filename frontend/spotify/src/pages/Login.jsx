import React, { useContext } from 'react'
import { RiLoader4Line, RiLoaderLine, RiSpotifyFill, RiUserUnfollowLine } from "@remixicon/react";
import { Link, Navigate } from 'react-router-dom';
import { authProvider, UIContext } from '../../src/contextapi/AuthContext'
import Home from './Home';
import Admin from './adminpage/Admin';
import Artist from '../pages/Artist'

function Login() {
  const { handleLogin, handleChange, login } = useContext(authProvider)
  const { loading, loginValid, wrongPassword } = useContext(UIContext)


  return (
    <div className='w-full  text-white'>
      <div className='flex items-center justify-center lg:pt-17 md:pt-0 pt-0 max-sm:pt-10'>
        <div className='w-100 max-sm:w-full  flex justify-center pt-7 max-sm:pt-7'>
          <div className='text-center'>
            <h1 className='flex items-center justify-center'><RiSpotifyFill className='w-10 max-sm:w-8 max-sm:h-8  h-10' /></h1>
            <h1 className='py-3 max-sm:py-3 font-bold text-4xl lg:text-5xl max-sm:text-3xl md:text-4xl'>Welcome back</h1>
            <form
              onSubmit={handleLogin}
              className="w-full flex flex-col"
            >
              <div className="w-full mb-5 pt-4 max-sm:mb-3">
                <label className="block text-start text-sm font-semibold text-white mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={login.email}
                  placeholder="Enter your email"
                  required
                  className={`w-full h-12 bg-[#242424] ${wrongPassword ? 'border-red-500':"border-[#3a3a3a]"} border 
                 rounded-lg px-4 text-white outline-none
                 focus:border-[#1DB954]`}
                />
              </div>

              <div className="w-full mb-2">
                <label className="block text-start text-sm font-semibold text-white mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className={`w-full max-sm:w-65 h-12 bg-[#242424] ${wrongPassword ? 'border-red-500':'border-[#3a3a3a]'} border 
                 rounded-lg px-4 text-white outline-none
                 focus:border-[#1DB954]`}
                />
                {login.password !== '' && login.password.length !== 8 && (
                  <p className='text-red-500 text-start text-xs mt-2'>
                    Passowrd must contain 8 digits
                  </p>
                )}

                {wrongPassword && (
                  <div className='text-red-500 text-xs text-start'>
                    User not found
                  </div>
                )}
              </div>

              <div className="w-full flex justify-end mb-6">
                <Link
                  to="/forget-password"
                  className="text-sm text-gray-300 hover:text-white underline"
                >
                  Forget Password
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full h-12  rounded-full
                  ${loginValid && !loading ? 'bg-[#2beb6e] text-black cursor-pointer opacity-100' : 'cursor-not-allowed bg-[#2beb6e] text-black opacity-75'}
               font-bold flex items-center justify-center`}
              >
                {loading ? (
                  <RiLoader4Line size={22} className="animate-spin" />
                ) : (
                  "Continue"
                )}
              </button>
            </form>
            <div className='pt-10 max-sm:pt-6'>
              <h1 className='text-[#A9B3B3] '>Don’t have an account?</h1>
              <Link to='/register' className='font-bold '>Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login