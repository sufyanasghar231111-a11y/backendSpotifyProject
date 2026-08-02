import React, { useContext } from 'react'
import { adminContext } from '../contextapi/AdminContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    let {user}=useContext(adminContext)
   
  return  user.role ==='artist' || user.role === 'user' ? <Outlet /> : <Navigate to='/login' replace />
}

export default ProtectedRoute
