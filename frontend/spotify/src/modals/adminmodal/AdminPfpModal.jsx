import React, { useContext } from 'react'
import { adminUiContext } from '../../contextapi/AdminContext'
import { RiCheckFill } from '@remixicon/react'
import { LogoutContext } from '../../contextapi/AuthContext'

const AdminPfpModal = () => {
    const { adminProfileModal, setAdminProfileModal } = useContext(adminUiContext)
    const {  setHideSure } = useContext(LogoutContext)
    return (
        <div>
            <div className={`border border-zinc-800
  bg-[#141414] shadow-xl   ${adminProfileModal ? ' opacity-100 pointer-events-auto  translate-y-0 h-90 p-1 z-40 ' : ' pointer-events-none  opacity-0 -translate-y-2  h-0 p-0 border-0'} right-12 max-sm:right-5  max-sm:top-10 top-13   duration-300 rounded absolute   w-60  transition-all ease-in-out `}>
                <div className='font-semibold text-sm text-[#bdbdbd] text-left w-full'>
                    <button onClick={() => { setAdminProfileModal(false) }} className='hover:bg-white/10 w-full py-2 px-3 text-left cursor-pointer' >DashBoard</button>
                    <button onClick={() => { setAdminProfileModal(false) }} className='hover:bg-white/10 w-full py-2 px-3 text-left cursor-pointer' >Admin Profile</button>
                    <button onClick={() => { setAdminProfileModal(false) }} className='hover:bg-white/10 w-full py-2 px-3 text-left cursor-pointer' >Setting</button>
                    <button onClick={() => { setAdminProfileModal(false) }} className='hover:bg-white/10 w-full py-2 px-3 text-left cursor-pointer' >Notifications</button>
                    <button onClick={() => {
                        setHideSure(true)
                        setAdminProfileModal(false)
                    }} className='hover:bg-white/10 hover:border-white/10 w-full py-2 px-3 cursor-pointer text-left border-b border-[#525151]' >Logout</button>
                    <div className='p-4'>
                        <h1 className='text-lg text-white'>Your Updates</h1>
                    </div>
                    <div className='flex items-center flex-col text-center justify-center pt-3 px-3 pb-6'>
                        <RiCheckFill className='w-9 h-9 text-white' />
                        <h1 className='text-white'>You’re all caught up</h1>
                        <h1 className='pt-2 text-[11px]'>Watch this space for news on your followers, playlists, events and more.</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPfpModal