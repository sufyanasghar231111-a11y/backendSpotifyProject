import React from 'react'
import { useContext } from 'react'
import { authProvider } from '../contextapi/AuthContext'

const OtpPage = () => {
  const {handleOtp, otp,handleOtpChange}=useContext(authProvider)
  return (
    <div className='text-white'>
      <form onSubmit={handleOtp}>
      <input name='email' type="email" value={otp.email} onChange={handleOtpChange} placeholder='enter otp' />
      <input name='otpHash' type="text" value={otp.otpHash} onChange={handleOtpChange} placeholder='enter otp' />
      <button>submit</button>
      </form>
    </div>
  )
}

export default OtpPage
