import React, { useContext } from 'react'
import { adminContext, adminUiContext } from '../../../contextapi/AdminContext'
import { RiArrowLeftLine, RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react'
import {adminCountContext} from '../../../contextapi/AdminCountContext'

const PaginationInUserDashBoard = () => {
    const { adminPage, setAdminPage } = useContext(adminUiContext)
        const { totalUsersData } = useContext(adminContext)
        const {totalUser} =useContext(adminCountContext)
        const totalPage = Math.ceil(totalUsersData.length/8)
  return (
      <div className='pt-3'>
            <div className=' flex items-center justify-between'>
                <div className='text-[12px] text-gray-400'>
                    Showing 1 to {totalUsersData.length} of {totalUser} users
                </div>
                <div className='flex items-center gap-3'>
                    <button disabled={adminPage === 1 } onClick={()=>{setAdminPage(prev => prev - 1)}} className={`border border-zinc-600 px-2 py-1.5  ${adminPage === 1 ? 'hover:border-gray-400 opacity-50 cursor-not-allowed':'hover:border-green-400 opacity-100 cursor-pointer'} transition-all duration-200  rounded-lg`}>
                        <RiArrowLeftSLine className='w-4 h-4' />
                    </button>
                    {[1,2,3].map((page) => (
                    <button key={page} disabled={page > totalPage} onClick={()=>{setAdminPage(page)}} className={`border border-zinc-600  rounded-lg px-2.5 hover:border-green-400 ${adminPage === page ? 'hover:border-green-400 cursor-pointer  opacity-100':'hover:border-gray-400 cursor-not-allowed  opacity-50'} transition-all duration-200 py-0.5`}>
                        {page}
                    </button>
                    ))}
                    
                    .....
                    <button disabled={totalUsersData.length< 8 } onClick={()=>{setAdminPage(prev => prev + 1)}} className={`border border-zinc-600 ${totalUsersData.length< 8  ? 'hover:border-gray-400 cursor-not-allowed  opacity-50':'hover:border-green-400 cursor-pointer  opacity-100'}  px-2 py-1.5  transition-all duration-200 rounded-lg`}>
                        <RiArrowRightSLine className='w-4 h-4' />
                    </button>
                </div>
            </div>
        </div>
  )
}

export default PaginationInUserDashBoard