import { RiNotificationLine, RiSearchLine, RiSpotifyFill } from '@remixicon/react'
import React from 'react'

const AdminNav = () => {
    return (
        <nav className='flex items-center justify-between'>
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
            <div className='flex items-center justify-center gap-10'>
                <div>
                    <RiNotificationLine className='w-4 h-4' />
                </div>
                <div className='flex items-center justify-center gap-3'>
                    <div className='w-10 h-10 rounded-full overflow-hidden border'>

                    </div>
                    <div>
                        <h1 className='text-sm  font-semibold'>Admin User</h1>
                        <h1 className='text-[10px] text-[#999999]'>Super Admin</h1>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default AdminNav