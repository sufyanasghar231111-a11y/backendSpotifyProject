import React, {  useEffect, useState } from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { OtpSession } from '../api/authApi'
import LoadingAnimation from '../component/homepagecomponent/LoadingAnimation'

const ProtectedOtpRoute = () => {
  
  const [allowed, setAllowed] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    const otpVerifySession = async () =>{
      try{
         await OtpSession()
         setAllowed(true)
      }
      catch(err){
        setAllowed(false)
      }
      finally{
        setLoading(false)
      }
    }
    otpVerifySession()
  },[])

  if(loading){
    return <LoadingAnimation />
  }

  if(!allowed){
    return <Navigate to='/register' replace />
  }



  return <Outlet />
}

export default ProtectedOtpRoute