import React, { useContext } from 'react'
import { authSearchBar } from '../../../contextapi/SearchSeparateContext'
import { Search, MoreVertical } from 'lucide-react'
import { RiPlayListLine, RiUserLine } from '@remixicon/react'
import { timeAgo } from '../../../utils/TimeAgo'
import PaginationInPlaylistDashBoard from './PaginationInPlaylistDashBoard'
const AllPlaylistInPlaylistDash = () => {
    const gridCols = 'grid-cols-[2fr_2fr_1fr_0.5fr_1.5fr_1fr]'
    const { visible } = useContext(authSearchBar)
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

            <div className='overflow-x-auto'>
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
                                        <div className='w-full  flex items-center justify-center bg-green-500 z-100 h-full absolute'>
                                            <RiPlayListLine className='w-4 h-4' />
                                        </div>
                                        {
                                            elem.playlistPic && (
                                                <img src={elem.playlistPic} alt={elem.name} className='w-full h-full object-cover absolute z-101' />
                                            )
                                        }
                                    </div>
                                        <div>
                                            <h1 className='text-sm'>{elem.name}</h1>
                                        </div>
                                </div>
                            </div>

                            <div className='py-3 px-2'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-8 h-8 rounded-full overflow-hidden relative'>
                                        <div className='w-full  flex items-center justify-center bg-green-500 z-100 h-full absolute'>
                                            <RiUserLine className='w-4 h-4' />
                                        </div>
                                        {
                                            elem.user?.pfp && (
                                                <img src={elem.user?.pfp} alt={elem.user.username} className='w-full h-full object-cover absolute z-101' />
                                            )
                                        }
                                    </div>
                                    <div>
                                        <h1 className='text-sm'>{elem.user.username}</h1>
                                    </div>
                                </div>
                            </div>
                            {
                                elem.visibility === 'private' ? (
                                    <div className="p-2 bg-green/30 text-red-500 text-xs font-semibold rounded">
                                        Private
                                    </div>
                                ) : (
                                    <div className="p-2 bg-green/30 text-green-500 text-xs font-semibold rounded">
                                        public
                                    </div>
                                )
                            }
                            <div className='text-xs ml-4'>
                                {elem.music.length}
                            </div>

                            <div className='py-3 px-2 flex items-center justify-center ml-16 text-gray-400'>
                                <span>{timeAgo(elem.createdAt)}</span>
                            </div>

                            <div className='flex items-center justify-end'>
                                action
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