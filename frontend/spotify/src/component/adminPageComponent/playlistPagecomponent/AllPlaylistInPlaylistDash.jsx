import React, { useContext } from 'react'
import { authSearchBar } from '../../../contextapi/SearchSeparateContext'
import { Search, MoreVertical } from 'lucide-react'
import { RiPlayListLine, RiUserLine } from '@remixicon/react'
import { timeAgo } from '../../../utils/TimeAgo'
import PaginationInPlaylistDashBoard from './PaginationInPlaylistDashBoard'

const VisibilityBadge = ({ elem }) => (
    elem.visibility === 'private' ? (
        <span className="inline-block px-2 py-1 bg-red-500/10 text-red-500 text-xs font-semibold rounded">
            Private
        </span>
    ) : (
        <span className="inline-block px-2 py-1 bg-green-500/10 text-green-500 text-xs font-semibold rounded">
            Public
        </span>
    )
)

const AllPlaylistInPlaylistDash = () => {
    const gridCols = 'md:grid-cols-[2fr_2fr_1fr_0.5fr_1.5fr_1fr]'
    const { visible } = useContext(authSearchBar)
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
            <div className='flex flex-col gap-3 md:hidden'>
                {visible.map((elem) => (
                    <div key={elem?._id} className='bg-[#1a1a1a] border border-[#232323] rounded-lg p-3'>
                        <div className='flex items-start justify-between gap-3'>
                            <div className='flex items-center gap-3 min-w-0'>
                                <div className='w-9 h-9 shrink-0 rounded-full overflow-hidden relative'>
                                    <div className='w-full flex items-center justify-center bg-green-500 z-0 h-full absolute'>
                                        <RiPlayListLine className='w-4 h-4' />
                                    </div>
                                    {elem.playlistPic && (
                                        <img src={elem.playlistPic} alt={elem.name} className='w-full h-full object-cover absolute z-10' />
                                    )}
                                </div>
                                <div className='min-w-0'>
                                    <h1 className='text-sm text-gray-200 font-medium truncate'>{elem.name}</h1>
                                </div>
                            </div>
                            <VisibilityBadge elem={elem} />
                        </div>

                        <div className='mt-3 flex items-center gap-3'>
                            <div className='w-7 h-7 shrink-0 rounded-full overflow-hidden relative'>
                                <div className='w-full flex items-center justify-center bg-green-500 z-0 h-full absolute'>
                                    <RiUserLine className='w-3.5 h-3.5' />
                                </div>
                                {elem.user?.pfp && (
                                    <img src={elem.user?.pfp} alt={elem.user.username} className='w-full h-full object-cover absolute z-10' />
                                )}
                            </div>
                            <p className='text-gray-400 text-xs truncate'>{elem.user.username}</p>
                        </div>

                        <div className='mt-3 grid grid-cols-2 gap-y-2 gap-x-3 text-xs'>
                            <div>
                                <p className='text-gray-500'>Songs</p>
                                <p className='text-gray-300'>{elem.music.length}</p>
                            </div>
                            <div>
                                <p className='text-gray-500'>Created</p>
                                <p className='text-gray-300'>{timeAgo(elem.createdAt)}</p>
                            </div>
                        </div>

                        <div className='mt-3 pt-3 border-t border-[#232323] flex justify-end'>
                            <button className='p-1.5 rounded hover:bg-[#232323] text-gray-400'>
                                <MoreVertical className='w-4 h-4' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ===== Tablet / desktop: grid table ===== */}
            <div className='hidden md:block overflow-x-auto'>
                <div className='min-w-[800px]'>
                    {/* Header row */}
                    <div className={`grid ${gridCols} text-left text-gray-500 border-b border-[#232323] text-sm`}>
                        <div className='py-3 px-2 font-medium'>Playlists</div>
                        <div className='py-3 px-2 font-medium'>Owner</div>
                        <div className='py-3 px-2 font-medium'>Type</div>
                        <div className='py-3 px-2 font-medium'>Songs</div>
                        <div className='py-3 px-2 font-medium text-right'>CreatedAt</div>
                        <div className='py-3 px-2 font-medium text-right'>Action</div>
                    </div>

                    {/* Data rows */}
                    {visible.map((elem) => {
                        return <div
                            key={elem?._id}
                            className={`grid ${gridCols} items-center border-b border-[#1e1e1e] hover:bg-[#1a1a1a]/60 text-sm`}>
                            <div className='py-3 px-2'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-8 h-8 rounded-full overflow-hidden relative'>
                                        <div className='w-full  flex items-center justify-center bg-green-500 z-0 h-full absolute'>
                                            <RiPlayListLine className='w-4 h-4' />
                                        </div>
                                        {
                                            elem.playlistPic && (
                                                <img src={elem.playlistPic} alt={elem.name} className='w-full h-full object-cover absolute z-10' />
                                            )
                                        }
                                    </div>
                                        <div>
                                            <h1 className='text-sm truncate'>{elem.name}</h1>
                                        </div>
                                </div>
                            </div>

                            <div className='py-3 px-2'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-8 h-8 rounded-full overflow-hidden relative'>
                                        <div className='w-full  flex items-center justify-center bg-green-500 z-0 h-full absolute'>
                                            <RiUserLine className='w-4 h-4' />
                                        </div>
                                        {
                                            elem.user?.pfp && (
                                                <img src={elem.user?.pfp} alt={elem.user.username} className='w-full h-full object-cover absolute z-10' />
                                            )
                                        }
                                    </div>
                                    <div>
                                        <h1 className='text-sm truncate'>{elem.user.username}</h1>
                                    </div>
                                </div>
                            </div>

                            <div className='py-3 px-2'>
                                <VisibilityBadge elem={elem} />
                            </div>

                            <div className='py-3 px-2 text-xs text-gray-400'>
                                {elem.music.length}
                            </div>

                            <div className='py-3 px-2 flex items-center justify-end text-gray-400'>
                                <span>{timeAgo(elem.createdAt)}</span>
                            </div>

                            <div className='py-3 px-2 flex items-center justify-end'>
                                <button className='p-1.5 rounded hover:bg-[#232323] text-gray-400'>
                                    <MoreVertical className='w-4 h-4' />
                                </button>
                            </div>

                        </div>
                    })}
                </div>
            </div>
            <PaginationInPlaylistDashBoard />
        </div>
    )
}

export default AllPlaylistInPlaylistDash