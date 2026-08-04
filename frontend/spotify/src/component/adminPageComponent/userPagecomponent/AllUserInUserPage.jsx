import React from 'react'
import { Search, MoreVertical } from 'lucide-react'

const users = [
    { name: 'John Doe', handle: '@johndoe', email: 'john.doe@gmail.com', role: 'User', status: 'Active', joined: '12 May 2024', active: '2 min ago', img: 'https://i.pravatar.cc/40?img=12' },
    { name: 'Sarah Smith', handle: '@sarahmusic', email: 'sarah.smith@gmail.com', role: 'User', status: 'Active', joined: '11 May 2024', active: '15 min ago', img: 'https://i.pravatar.cc/40?img=47' },
    { name: 'Mike Johnson', handle: '@mikebeatz', email: 'mike.johnson@gmail.com', role: 'User', status: 'Active', joined: '10 May 2024', active: '1 hour ago', img: 'https://i.pravatar.cc/40?img=13' },
]


const statusStyles = {
    Active: { dot: 'bg-emerald-400', text: 'text-emerald-400' },
    Banned: { dot: 'bg-red-400', text: 'text-red-400' },
    Inactive: { dot: 'bg-amber-400', text: 'text-amber-400' },
}

// Shared column widths so the header row and each data row line up
const gridCols = 'grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_0.5fr]'

const AllUserInUserPage = () => {
    return (
        <div className='w-full bg-[#141414] rounded-xl border mt-4 border-[#232323] p-4'>
            {/* Toolbar */}
            <div className='relative w-64 mb-4'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500' />
                <input
                    type='text'
                    placeholder='Search users...'
                    className='w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-600'
                />
            </div>

            {/* List (no <table>, just divs) */}
            <div className='overflow-x-auto'>
                <div className='min-w-[800px]'>
                    {/* Header row */}
                    <div className={`grid ${gridCols} text-left text-gray-500 border-b border-[#232323] text-sm`}>
                        <div className='py-3 px-2 font-medium'>User</div>
                        <div className='py-3 px-2 font-medium'>Email</div>
                        <div className='py-3 px-2 font-medium'>Role</div>
                        <div className='py-3 px-2 font-medium'>Status</div>
                        <div className='py-3 px-2 font-medium'>Joined</div>
                        <div className='py-3 px-2 font-medium'>Last Active</div>
                        <div className='py-3 px-2 font-medium text-right'>Actions</div>
                    </div>

                    {/* Data rows */}
                    {users.map((u) => (
                        <div
                            key={u.handle}
                            className={`grid ${gridCols} items-center border-b border-[#1e1e1e] hover:bg-[#1a1a1a]/60 text-sm`}
                        >
                            <div className='py-3 px-2'>
                                <div className='flex items-center gap-3'>
                                    <img src={u.img} alt={u.name} className='w-8 h-8 rounded-full object-cover' />
                                    <div>
                                        <p className='text-gray-200 font-medium leading-tight'>{u.name}</p>
                                        <p className='text-gray-500 text-xs leading-tight'>{u.handle}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='py-3 px-2 text-gray-400'>{u.email}</div>

                            <div className='py-3 px-2'>
                                <span className={`px-2 py-1 rounded-md text-xs font-medium`}>
                                    {u.role}
                                </span>
                            </div>

                            <div className='py-3 px-2'>
                                <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${statusStyles[u.status].text}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${statusStyles[u.status].dot}`} />
                                    {u.status}
                                </span>
                            </div>

                            <div className='py-3 px-2 text-gray-400'>{u.joined}</div>
                            <div className='py-3 px-2 text-gray-400'>{u.active}</div>

                            <div className='py-3 px-2 text-right'>
                                <button className='text-gray-500 hover:text-gray-300 p-1'>
                                    <MoreVertical className='w-4 h-4' />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllUserInUserPage