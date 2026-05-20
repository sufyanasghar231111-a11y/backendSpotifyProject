import React, { useContext } from 'react'
import { authProvider } from './AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    let {user}=useContext(authProvider)
   
  return  user? <Outlet /> : <Navigate to='/' replace />
}

export default ProtectedRoute
