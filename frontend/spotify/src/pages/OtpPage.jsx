import React, { useContext, useState } from 'react'
import { authProvider, UIContext } from '../contextapi/AuthContext'
import { RiLoader4Line, RiSpotifyFill } from '@remixicon/react'

const OtpPage = () => {
  const { handleOtp, otp, handleOtpChange } = useContext(authProvider)
  const { otploading, valid } = useContext(UIContext)
 

  

  

  return (
    <div className='min-h-screen bg-[#090909] flex items-center justify-center px-4 text-white'>

      <div className='w-full max-w-md bg-[#121212] rounded-2xl p-8 border border-white/5 shadow-2xl'>

        {/* Logo */}
        <div className='flex justify-center mb-6'>
          <RiSpotifyFill
            size={45}
            className='text-[#2beb6e]'
          />
        </div>

        {/* Heading */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold mb-2'>
            Verify OTP
          </h1>

          <p className='text-gray-400 text-sm'>
            Enter the OTP sent to your email
          </p>
        </div>

        <form onSubmit={handleOtp}>

          {/* Email */}
          <div className='mb-5'>
            <label className='block text-sm font-medium text-gray-300 mb-2'>
              Email
            </label>

            <input
              name='email'
              type='email'
              value={otp.email}
              onChange={handleOtpChange}
              placeholder='Enter your email'
              className='w-full bg-[#1d1d1d] border border-gray-700 rounded-xl px-4 py-3 outline-none transition focus:border-[#2beb6e] focus:ring-1 focus:ring-[#2beb6e]'
            />
          </div>

          {/* OTP */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-300 mb-2'>
              OTP
            </label>

            <input
              name='otpHash'
              type='text'
              inputMode='numeric'
              maxLength={6}
              value={otp.otpHash}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  handleOtpChange(e)
                }
              }}
              placeholder='Enter 6-digit OTP'
              className='w-full bg-[#1d1d1d] border border-gray-700 rounded-xl px-4 py-3 text-center text-xl tracking-[0.6em] font-semibold outline-none transition focus:border-[#2beb6e] focus:ring-1 focus:ring-[#2beb6e]'
            />

            {otp.otpHash !== '' && otp.otpHash.length !== 6 && (
              <p className='text-red-500 text-xs mt-2'>
                OTP must contain 6 digits
              </p>
            )}
          </div>

          {/* Button */}
          <button
            disabled={!valid || otploading}
            type='submit'
            className={`w-full rounded-full py-3 flex items-center justify-center font-bold transition ${
              valid && !otploading
                ? 'bg-[#2beb6e] text-black hover:scale-[1.01] cursor-pointer'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {otploading ? (
              <RiLoader4Line
                size={22}
                className='animate-spin'
              />
            ) : (
              'Verify OTP'
            )}
          </button>

        </form>

        <p className='text-center text-gray-500 text-xs mt-6'>
          OTP expires after a few minutes
        </p>

      </div>

    </div>
  )
}

export default OtpPage