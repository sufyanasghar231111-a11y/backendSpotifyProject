import React from 'react'
import { useContext } from 'react'
import { authProvider } from './AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedOtpRoute = () => {
    const {otpBased}=useContext(authProvider)
    if(!otpBased){
        return <Navigate to='/register' replace />
    }
  return <Outlet />
}

export default ProtectedOtpRoute