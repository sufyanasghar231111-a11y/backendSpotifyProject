import React, { useContext } from 'react'
import Login from '../Login'
import { LogoutContext } from '../../contextapi/AuthContext'
import AdminNav from '../../component/adminPageComponent/dashBoardpageComponent/AdminNav'
import DashBoardLeft from '../../component/adminPageComponent/dashBoardpageComponent/DashBoardLeft'
import DashBoardRight from '../../component/adminPageComponent/dashBoardpageComponent/DashBoardRight'
import { Outlet, useLocation } from 'react-router-dom'
import SureForLogOut from '../../modals/SureForLogOut'

function Admin() {
 
  let location = useLocation()
  return (
    <div className='text-white '>
      <SureForLogOut />
      <AdminNav />
      <div className='flex  justify-start  pt-16 '>
        <DashBoardLeft />
        <Outlet />
        {
          location.pathname === '/admin' && (<DashBoardRight />)
        }
        
      </div>
    </div>
  )
}

export default Admin