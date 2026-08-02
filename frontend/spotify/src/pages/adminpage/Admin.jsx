import React from 'react'
import Login from '../Login'
import { LogoutContext } from '../../contextapi/AuthContext'
import AdminNav from '../../component/adminPageComponent/dashBoardpageComponent/AdminNav'
import DashBoardLeft from '../../component/adminPageComponent/dashBoardpageComponent/DashBoardLeft'
import DashBoardRight from '../../component/adminPageComponent/dashBoardpageComponent/DashBoardRight'
import DashBoardMid from '../../component/adminPageComponent/dashBoardpageComponent/DashBoardMid'
import { Outlet } from 'react-router-dom'

function Admin() {
  return (
    <div className='text-white px-7 py-4'>
      <AdminNav />
      <div className='flex  justify-center  gap-3'>
        <DashBoardLeft />
        <Outlet />
        <DashBoardMid />
        <DashBoardRight />
      </div>
    </div>
  )
}

export default Admin