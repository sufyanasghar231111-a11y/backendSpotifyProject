import React, { useContext } from 'react'
import { authSearchBar } from '../../../contextapi/SearchSeparateContext'
import { RiAlbumLine, RiUserLine } from '@remixicon/react'
import { timeAgo } from '../../../utils/TimeAgo'
import { Search, MoreVertical } from 'lucide-react'
import PaginationInAlbumDashBoard from './PaginationInAlbumDashBoard'
import { useState } from 'react'

const AllAlbumInAlbumDashBoard = () => {
    const gridCols = 'grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr]'
    const [albumSearch, setAlbumSearch] = useState('')
    const { album } = useContext(authSearchBar)
    const filterData = album.filter(elem => elem.title.toLowerCase().trim().includes(albumSearch.trim().toLowerCase()))
    return (
        <div className='w-full bg-[#141414] rounded-xl border mt-4 border-[#232323] p-4'>
            {/* Toolbar */}
            <div className='relative w-64 max-sm:w-60 mb-4'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500' />
                <input value={albumSearch}
                    onChange={(elem) => { setAlbumSearch(elem.target.value) }}
                    type='text'
                    placeholder='Search users...'
                    className='w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-600'
                />
            </div>

            <div className='flex flex-col gap-3 md:hidden'>
                {filterData.map((elem) => {

                    return (
                        <div
                            key={elem?._id}

                            className='bg-[#1a1a1a] border border-[#232323] rounded-lg p-3 cursor-pointer'
                        >
                            <div className='flex items-start justify-between gap-3'>
                                <div className='flex items-center  gap-3 min-w-0'>
                                    <div className='w-9 h-9 shrink-0 rounded-full overflow-hidden relative'>
                                        <div className='w-full flex items-center justify-center bg-green-500 z-0 h-full absolute'>
                                            <RiUserLine className='w-4 h-4' />
                                        </div>
                                        {elem.user?.pfp && (
                                            <img src={elem.user?.pfp} alt={elem.user?.username} className='w-full h-full object-cover absolute z-10' />
                                        )}
                                    </div>
                                    <div>
                                    <div className='text-sm font-semibold'>
                                        {elem.title}
                                    </div>
                                    <div className='text-xs text-zinc-500'>
                                        {elem.artist?.username}
                                    </div>
                                    </div>
                                </div>
                                <div className='text-sm flex items-center flex-col text-zinc-500'>
                                    <h1>Track</h1>
                                    <h1 className='text-xs'>{elem?.album.length}</h1>
                                </div>
                            </div>

                            <div className='mt-3 pt-3 border-t border-[#232323] flex items-center justify-between text-xs'>
                                <span className='text-gray-400'>{timeAgo(elem.createdAt)}</span>
                                <div className='flex items-center flex-col'>
                                    <h1 className='text-sm font-semibold text-zinc-500'>Status</h1>
                                    <h1 className='text-xs font-semibold text-green-500'>Published</h1>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className='hidden md:block overflow-x-auto'>
                <div className='min-w-[800px]'>
                    {/* Header row */}
                    <div className={`grid ${gridCols} text-left text-gray-500 border-b border-[#232323] text-sm`}>
                        <div className='py-3 px-2 font-medium'>Albums</div>
                        <div className='py-3 px-2 font-medium'>Artist</div>
                        <div className='py-3 px-2 font-medium'>Track</div>
                        <div className='py-3 px-2 font-medium'>Release Data</div>
                        <div className='py-3 px-2 font-medium text-right'>Status</div>
                        <div className='py-3 px-2 font-medium text-right'>Action</div>
                    </div>

                    {/* Data rows */}
                    {filterData.map((elem) => {
                        return <div
                            key={elem?._id}
                            className={`grid ${gridCols} items-center border-b border-[#1e1e1e] hover:bg-[#1a1a1a]/60 text-sm`}>
                            <div className='py-3 px-2'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-8 h-8 rounded overflow-hidden relative'>
                                        <div className='w-full  flex items-center justify-center bg-green-500 z-100 h-full absolute'>
                                            <RiAlbumLine className='w-4 h-4' />
                                        </div>
                                        {
                                            elem.image && (
                                                <img src={elem.image} alt={elem.title} className='w-full h-full object-cover absolute z-101' />
                                            )
                                        }
                                    </div>
                                    <div>
                                        <p className='text-gray-200 font-medium leading-tight'>{elem.title}</p>
                                        <p className='text-xs text-gray-500'>{elem.artist?.username}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='py-3 px-2 text-gray-400'>{elem.artist?.username}</div>

                            <div className='text-xs ml-4'>
                                {(elem.album.length) || 0}
                            </div>
                            <div className='py-3 px-2 text-gray-400'>
                                <span>{timeAgo(elem.createdAt)}</span>
                            </div>

                            <div className="p-2  bg-green/30 text-green-500 text-xs flex items-center justify-end font-semibold rounded">
                                Published
                            </div>

                            <div className='text-sm flex items-center justify-end'>
                                Action
                            </div>

                        </div>
                    })}
                </div>
            </div>
            <PaginationInAlbumDashBoard />
        </div>
    )
}

export default AllAlbumInAlbumDashBoard