import { RiCloseLine, RiNotificationLine, RiSearchLine, RiSpotifyFill } from '@remixicon/react'
import React, { useContext } from 'react'
import { LogoutContext } from '../../../contextapi/AuthContext'
import { adminContext, adminUiContext } from '../../../contextapi/AdminContext'
import AdminNotificationModal from '../../../modals/adminmodal/AdminNotificationModal'
import { requestContext } from '../../../contextapi/UserRequest'
import AdminPfpModal from '../../../modals/adminmodal/AdminPfpModal'
import UserNames from '../../../utils/UserNames'

const AdminNav = () => {
    
    const { setAdminNotification, setAdminProfileModal } = useContext(adminUiContext)
    const { user } = useContext(adminContext)
    const { getRequests } = useContext(requestContext)
    const pending = (getRequests.filter(elem => elem.requestStatus === 'Pending' && !elem.isChecked)).length


    return (
        <nav className='fixed px-7 py-4 top-0 z-300 backdrop-blur-lg w-full '>
            <div className='flex items-center justify-between w-full '>
                <div className='flex items-center justify-center gap-30'>
                    <div className='flex items-center justify-center gap-3'>
                        <RiSpotifyFill className='text-green-500 w-12 h-12' />
                        <div>
                            <h1 className='text-sm  font-semibold'>Admin Panel</h1>
                            <h1 className='text-[10px] text-[#999999]'>Music Platform</h1>
                        </div>
                        
                    </div>
                    <div className='flex items-center justify-center gap-4 border rounded border-[#636363] py-2.5 px-4 w-110'>
                        <RiSearchLine />
                        <input type="text" className='w-full h-full outline-0' placeholder='Search for users, artists, songs, albums....' />
                        <button className='px-2 py-0.5 bg-white/10 rounded font-semibold cursor-point text-sm '>Search</button>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-10 relative'>
                    <AdminNotificationModal />
                    <div className='  relative' onClick={() => { setAdminNotification(prev => !prev)
                        setAdminProfileModal(false)
                     }}>
                        {
                            pending > 0 && (
                                <div className="absolute -right-2 -top-1 min-w-5 h-5 px-1 bg-green-500 rounded-full flex items-center justify-center text-[10px] font-semibold text-white leading-none">
                                    {pending > 99 ? "99+" : pending}
                                </div>
                            )
                        }
                        <RiNotificationLine className='w-6 h-6 cursor-pointer' />
                    </div>
                    <div className='flex items-center justify-center gap-3 relative'>
                        <div onClick={() => { setAdminProfileModal(prev => !prev)
                            setAdminNotification(false)
                         }} className='w-10 h-10 rounded-full overflow-hidden relative cursor-pointer'>
                            <div className=' absolute z-39 w-full h-full flex items-center bg-green-500 justify-center'>
                                <UserNames user={user?.username} />
                            </div>
                            {
                                user?.pfp && (
                                    <img src={user.pfp} alt="" className=' absolute z-30 w-full h-full object-cover' />
                                )
                            }
                        </div>
                        <AdminPfpModal />
                        <div>
                            <h1 className='text-sm  font-semibold'>{user.username}</h1>
                            <h1 className='text-[10px] text-[#999999]'>Super Admin</h1>
                        </div>
                    </div>

                </div>

            </div>
        </nav>
    )
}

export default AdminNav