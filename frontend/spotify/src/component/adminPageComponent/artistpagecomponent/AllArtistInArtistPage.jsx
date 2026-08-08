import React, { useContext } from 'react'
import { adminContext, bannedUserContext } from '../../../contextapi/AdminContext'
import { Search, MoreVertical } from 'lucide-react'
import { timeAgo } from '../../../utils/TimeAgo'
import UserNames from '../../../utils/UserNames'
import PaginationInArtistDashBoard from './PaginationInArtistDashBoard'

const gridCols = 'md:grid-cols-[2fr_2.5fr_1fr_1fr_1fr_1fr_1fr]'

const StatusBadge = ({ elem }) => (
    <span
        className={`inline-flex items-center gap-1.5 text-xs font-medium ${!elem.isActive
            ? "text-red-500"
            : elem.isOnline
                ? "text-green-500"
                : "text-yellow-500"
            }`}
    >
        <span
            className={`w-2 h-2 rounded-full ${!elem.isActive
                ? "bg-red-500"
                : elem.isOnline
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
        />
        {!elem.isActive ? "Banned" : elem.isOnline ? "Active" : "Inactive"}
    </span>
)

const ActionButton = ({ elem, blockRole, unblockRole }) => (
    elem.isActive ? (
        <button
            onClick={() => { blockRole(elem.id) }}
            className='bg-red-500 hover:bg-red-600 border-0 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 rounded px-3 py-1.5 text-sm text-white w-full sm:w-auto'
        >
            Banned
        </button>
    ) : (
        <button
            onClick={() => { unblockRole(elem.id) }}
            className='bg-emerald-500 hover:bg-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 border-0 rounded px-3 py-1.5 text-sm text-white w-full sm:w-auto'
        >
            UnBanned
        </button>
    )
)

const AllArtistInArtistPage = () => {
    const { blockRole, unblockRole } = useContext(bannedUserContext)
    const { totalArtistData } = useContext(adminContext)
    return (
        <div className='w-full bg-[#141414] rounded-xl border mt-4 border-[#232323] p-3 sm:p-4'>
            {/* Toolbar */}
            <div className='relative w-full sm:w-64 mb-4'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500' />
                <input
                    type='text'
                    placeholder='Search users...'
                    className='w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-600'
                />
            </div>

            {/* ===== Mobile / small screens: stacked cards ===== */}
            <div className='flex w-full flex-col gap-3 md:hidden'>
                {totalArtistData.map((elem) => (
                    <div key={elem?._id} className='bg-[#1a1a1a] border border-[#232323] rounded-lg p-3'>
                        <div className='flex items-start justify-between gap-3'>
                            <div className='flex items-center gap-3 min-w-0'>
                                <div className='w-9 h-9 shrink-0 rounded-full overflow-hidden relative'>
                                    <div className='w-full flex items-center justify-center bg-green-500 z-0 h-full absolute'>
                                        <UserNames user={elem.username} />
                                    </div>
                                    {elem.pfp && (
                                        <img src={elem.pfp} alt={elem.username} className='w-full h-full object-cover absolute z-10' />
                                    )}
                                </div>
                                <div className='min-w-0'>
                                    <p className='text-gray-200 font-medium leading-tight truncate'>{elem.username}</p>
                                    <p className='text-gray-500 text-xs leading-tight truncate'>@{elem.username}</p>
                                </div>
                            </div>
                            <span className='px-2 py-1 rounded-md text-xs font-medium text-gray-300 border border-[#2a2a2a] shrink-0'>
                                {elem.role}
                            </span>
                        </div>

                        <div className='mt-3 grid grid-cols-2 gap-y-2 gap-x-3 text-xs'>
                            <div>
                                <p className='text-gray-500'>Email</p>
                                <p className='text-gray-300 truncate'>{elem.email}</p>
                            </div>
                            <div>
                                <p className='text-gray-500'>Status</p>
                                <StatusBadge elem={elem} />
                            </div>
                            <div>
                                <p className='text-gray-500'>Joined</p>
                                <p className='text-gray-300'>{timeAgo(elem.artistApprovedAt)}</p>
                            </div>
                            <div>
                                <p className='text-gray-500'>Last Active</p>
                                <p className='text-gray-300'>{timeAgo(elem.lastActive)}</p>
                            </div>
                        </div>

                        <div className='mt-3 pt-3 border-t border-[#232323]'>
                            <ActionButton elem={elem} blockRole={blockRole} unblockRole={unblockRole} />
                        </div>
                    </div>
                ))}
            </div>

            {/* ===== Tablet / desktop: grid table ===== */}
            <div className='hidden md:block overflow-x-auto'>
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
                    {totalArtistData.map((elem) => {
                        return <div
                            key={elem?._id}
                            className={`grid ${gridCols} items-center border-b border-[#1e1e1e] hover:bg-[#1a1a1a]/60 text-sm`}>
                            <div className='py-3 px-2'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-8 h-8 rounded-full overflow-hidden relative'>
                                        <div className='w-full flex items-center justify-center bg-green-500 z-0 h-full absolute'>
                                            <UserNames user={elem.username} />
                                        </div>
                                        {
                                            elem.pfp && (
                                                <img src={elem.pfp} alt={elem.username} className='w-full h-full object-cover absolute z-10' />
                                            )
                                        }
                                    </div>
                                    <div>
                                        <p className='text-gray-200 font-medium leading-tight'>{elem.username}</p>
                                        <p className='text-gray-500 text-xs leading-tight'>@{elem.username}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='py-3 px-2 text-gray-400 truncate'>{elem.email}</div>

                            <div className='py-3 px-2'>
                                <span className={`px-2 py-1 rounded-md text-xs font-medium`}>
                                    {elem.role}
                                </span>
                            </div>

                            <div className="py-3 px-2">
                                <StatusBadge elem={elem} />
                            </div>

                            <div className='py-3 px-2 text-gray-400'>{timeAgo(elem.artistApprovedAt)}</div>
                            <div className='py-3 px-2 text-gray-400'>{timeAgo(elem.lastActive)}</div>

                            <div className='py-3 px-2 text-right'>
                                <ActionButton elem={elem} blockRole={blockRole} unblockRole={unblockRole} />
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div>
                <PaginationInArtistDashBoard />
            </div>
        </div>
    )
}

export default AllArtistInArtistPage