import { RiLoader4Line, RiSpotifyFill } from '@remixicon/react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authProvider, ProfileContext, UIContext } from '../../src/contextapi/AuthContext'
import Home from '../pages/Home'

function Register() {
  let { handleSumbit, emailreg, setEmailreg, setPasswordreg, passwordreg } = useContext(authProvider)
  const { setUsername, username } = useContext(ProfileContext)
  const { regValid, alreadyExist, loading } = useContext(UIContext)

  return (
    <div className='text-white'>
      <div className='flex items-center justify-center px-4 pt-0 lg:pt-3 md:pt-0 max-sm:pt-7'>
          <div className='w-full max-w-md flex justify-center  md:pt-4 pt-4 lg:pt-3 max-sm:pt-5'>
            <div className='text-center w-100 max-sm:w-70'>
              <h1 className='flex items-center justify-center'><RiSpotifyFill className='w-7 h-7 sm:w-10 sm:h-10' /></h1>
              <h1 className='py-3 max-sm:pt-1 font-extrabold text-3xl lg:text-5xl max-sm:text-3xl md:text-3xl leading-tight'>Sign up to <br /> start listening</h1>
              <form onSubmit={handleSumbit} className='text-start md:pt-0 pt-0 lg:pt-5 max-sm:pt-4'>
                <h1 className='pb-1 font-semibold max-sm:text-xs'>Username</h1>
                <input
                  required
                  type="name"
                  value={username}
                  minLength={2}
                  className={`w-full py-2.5 max-sm:py-1.5 max-sm:text-sm ${username !== '' && username.length < 2 ? 'mb-1 border-red-500' : 'mb-4 border-[#7C7C7C]'} max-sm:mb-2 px-3 border rounded`}
                  onChange={(elem) => { setUsername(elem.target.value) }}
                  placeholder='Enter name'
                />
                {username !== '' && username.length < 2 && (
                  <p className='text-red-500 text-start text-xs mb-4'>
                    Name must be at least 2 letters
                  </p>
                )}

                <h1 className='pb-1 font-semibold max-sm:text-xs'>Email address</h1>
                <input required type="email" value={emailreg} className={`w-full py-2.5 max-sm:py-1.5 max-sm:text-sm mb-4 max-sm:mb-2 px-3 border ${alreadyExist ? "border-red-500" : "border-[#7C7C7C]"} rounded`} onChange={(elem) => { setEmailreg(elem.target.value) }} placeholder='name@domain.com' />
                <h1 className='pb-1 font-semibold max-sm:text-xs'>Password</h1>
                <input required type="password" value={passwordreg} className={`w-full py-2.5 max-sm:py-1.5 max-sm:text-sm ${alreadyExist ? 'mb-0 border-red-500' : 'mb-3 border-[#7C7C7C]'} px-3 border  rounded`} onChange={(elem) => { setPasswordreg(elem.target.value) }} placeholder='Enter password' />
                
                {passwordreg !== '' && passwordreg.length !== 8 && (
                  <p className='text-red-500 text-start text-xs mb-4'>
                    Passowrd must contain 8 digits
                  </p>
                )}
                {alreadyExist && (
                  <div className='text-sm text-red-500 text-start mb-3'>
                    User Already Exist
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading || username.length < 2}
                  className={`w-full h-12  rounded-full
                  ${regValid && !loading && username.length >= 2 ? 'bg-[#2beb6e] text-black cursor-pointer opacity-100' : 'cursor-not-allowed bg-[#2beb6e] text-black opacity-75'}
               font-bold flex items-center justify-center`}
                >
                  {loading ? (
                    <RiLoader4Line size={22} className="animate-spin" />
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>
              <div className='pt-3 max-sm:pt-4'>
                <h1 className='text-[#A9B3B3] max-sm:text-xs' >Already have an account?</h1>
                <Link to='/login' className='font-bold'>Log in</Link>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Register