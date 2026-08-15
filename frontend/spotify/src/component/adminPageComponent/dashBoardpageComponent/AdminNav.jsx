import { RiCloseLine, RiMenu2Line, RiNotificationLine, RiSearchLine, RiSpotifyFill } from '@remixicon/react'
import React, { useContext } from 'react'
import { LogoutContext } from '../../../contextapi/AuthContext'
import { adminContext, adminUiContext } from '../../../contextapi/AdminContext'
import AdminNotificationModal from '../../../modals/adminmodal/AdminNotificationModal'
import { requestContext } from '../../../contextapi/UserRequest'
import AdminPfpModal from '../../../modals/adminmodal/AdminPfpModal'
import UserNames from '../../../utils/UserNames'
import { UIHomeContex } from '../../../contextapi/HomeContext'

const AdminNav = () => {

    const { setAdminNotification, setAdminProfileModal } = useContext(adminUiContext)
    const { user } = useContext(adminContext)
    const { getRequests } = useContext(requestContext)
    const pending = (getRequests.filter(elem => elem.requestStatus === 'Pending' && !elem.isChecked)).length
    const { setHide } = useContext(UIHomeContex)


    return (
        <nav className='fixed px-4 sm:px-7 z-[400]  py-2 sm:py-4 top-0 backdrop-blur-lg w-full'>
            <div className='flex items-center justify-between w-full gap-2'>
                <div className='flex items-center min-w-0 gap-3 sm:gap-6 lg:gap-10'>
                    <div className='flex items-center gap-2 sm:gap-3 shrink-0'>
                        {/* Hamburger: only needed on smaller screens to toggle sidebar */}
                        <button
                            className='md:hidden flex items-center justify-center'
                            onClick={() => { setHide(prev => !prev) }}
                            aria-label='Toggle menu'
                        >
                            <RiMenu2Line className='w-5 h-5' />
                        </button>

                        <RiSpotifyFill className='text-green-500 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 shrink-0' />

                        <div className='max-sm:hidden'>
                            <h1 className='text-xs sm:text-sm font-semibold leading-tight'>Admin Panel</h1>
                            <h1 className='text-[8px] sm:text-[10px] text-[#999999] leading-tight'>Music Platform</h1>
                        </div>
                    </div>

                    {/* Search bar: shrinks and drops the button label on small screens */}
                    <div className='flex items-center gap-2 sm:gap-4 border rounded border-[#636363] py-1.5 sm:py-2.5 px-3 sm:px-4 w-full max-w-[140px] xs:max-w-[200px] sm:max-w-[320px] lg:max-w-[440px]'>
                        <RiSearchLine className='w-4 h-4 shrink-0' />
                        <input
                            type="text"
                            className='w-full min-w-0 text-xs sm:text-sm outline-0 bg-transparent'
                            placeholder='Search...'
                        />
                        <button className='hidden sm:inline-block px-2 py-0.5 bg-white/10 rounded font-semibold text-sm shrink-0'>
                            Search
                        </button>
                    </div>
                </div>

                <div className='flex items-center gap-3 sm:gap-6 lg:gap-10 relative shrink-0'>
                    <AdminNotificationModal />
                    <div
                        className='relative cursor-pointer'
                        onClick={() => {
                            setAdminNotification(prev => !prev)
                            setAdminProfileModal(false)
                        }}
                    >
                        {pending > 0 && (
                            <div className="absolute -right-2 -top-1 min-w-4 h-4 sm:min-w-5 sm:h-5 px-1 bg-green-500 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-semibold text-white leading-none">
                                {pending > 99 ? "99+" : pending}
                            </div>
                        )}
                        <RiNotificationLine className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer' />
                    </div>

                    <div className='flex items-center gap-2 sm:gap-3 relative'>
                        <div
                            onClick={() => {
                                setAdminProfileModal(prev => !prev)
                                setAdminNotification(false)
                            }}
                            className='w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden relative cursor-pointer shrink-0'
                        >
                            <div className='absolute z-[39] w-full h-full flex items-center bg-green-500 justify-center'>
                                <UserNames user={user?.username} />
                            </div>
                            {user?.pfp && (
                                <img src={user.pfp} alt="" className='absolute z-40 w-full h-full object-cover' />
                            )}
                        </div>
                        <AdminPfpModal />

                        {/* Hide name/role on very small screens to save space */}
                        <div className='hidden sm:block'>
                            <h1 className='text-sm font-semibold leading-tight'>{user.username}</h1>
                            <h1 className='text-[10px] text-[#999999] leading-tight'>Super Admin</h1>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default AdminNav