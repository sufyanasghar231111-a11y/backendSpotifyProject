import React, { useContext } from 'react'
import { Search, MoreVertical } from 'lucide-react'
import { authSearchBar } from '../../../contextapi/SearchSeparateContext'
import { timeAgo } from '../../../utils/TimeAgo'
import { RiMusicLine, RiPauseLine, RiPlayLine } from '@remixicon/react'
import { audioContext } from '../../../contextapi/AudioProvider'
import { musciControl } from '../../../contextapi/MusicControllerContext'
import PaginationForMusic from './PaginationForMusic'
import { useState } from 'react'
const AllSongInSongPage = () => {
    const gridCols = 'grid-cols-[2fr_2fr_1fr_1fr_1fr]'
    const { music } = useContext(authSearchBar)
    const { playRef } = useContext(musciControl)
    const { playing, currentSong } = useContext(audioContext)
    const [searchMusic, setSearchMusic] = useState('')
    const filter = music.filter(name =>  name.title.toLowerCase().includes(searchMusic.trim().toLowerCase()))
    return (
        <div className='w-full bg-[#141414] rounded-xl border mt-4 border-[#232323] p-4'>
            {/* Toolbar */}
            <div className='relative w-64 max-sm:w-60 mb-4'>
                <Search className='absolute left-3  top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500' />
                <input onChange={(elem) => { setSearchMusic(elem.target.value) }}
                    type='text'
                    value={searchMusic}
                    placeholder='Search users...'
                    className='w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-600'
                />
            </div>
            <div className='md:hidden gap-2 flex flex-col '>
                {
                   filter 
                    .map((elem) => {     
                        return <div key={elem._id} className='overflow-hidden bg-[#1a1a1a] rounded-lg w-full p-3'>
                    <div className=' flex items-center  justify-between'>
                        <div className='flex items-center  gap-3'>
                            <div className='w-10 h-10 rounded-full  relative overflow-hidden'>
                                <div className='bg-green-500 absolute z-39  w-full h-full flex items-center justify-center'>
                                    <RiMusicLine />
                                </div>
                                <img src={elem.image} alt="" className=' w-full h-full absolute z-40 object-cover' />
                            </div>
                            <div>
                                <h1 className='truncate w-20 text-sm font-semibold'>{elem?.title}</h1>
                                <h1 className='truncate text-xs text-zinc-500'>{elem?.artist?.username}</h1>
                            </div>
                        </div>
                        <div className='border text-sm px-2 py-0.5 rounded border-zinc-600'>
                            song
                        </div>
                    </div>
                    <div className=' pt-4'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='text-sm  text-zinc-500'>Status</h1>
                                <h1 className='rounded text-xs text-green-500'>Published</h1>
                            </div>
                            <div>
                                <h1 className='text-xs  text-zinc-500'>Uploaded</h1>
                                <h1 className='rounded truncate text-[10px] text-green-500'>{timeAgo(elem?.createdAt)}</h1>
                            </div>
                        </div>
                    </div>
                    <div className='border-t border-zinc-600 mt-4 py-3'>
                        <div className='  flex items-center justify-center text-right'>
                            <button onClick={() => { playRef(elem) }} className='p-1.5 rounded-full bg-green-500 hover:bg-green-600'>
                                {currentSong === elem?._id && playing ? (<RiPauseLine />) : (<RiPlayLine />)}
                            </button>
                        </div>
                    </div>
                </div>

                    })
                }

            </div>

            <div className='md:block hidden overflow-x-auto'>
                <div className='min-w-[800px]'>
                    {/* Header row */}
                    <div className={`grid ${gridCols} text-left text-gray-500 border-b border-[#232323] text-sm`}>
                        <div className='py-3 px-2 font-medium'>Songs</div>
                        <div className='py-3 px-2 font-medium'>Artist</div>
                        {/* <div className='py-3 px-2 font-medium'>Duration</div> */}
                        <div className='py-3 px-2 font-medium'>Status</div>
                        <div className='py-3 px-2 font-medium'>Uploaded</div>
                        <div className='py-3 px-2 font-medium text-right'>Actions</div>
                    </div>

                    {/* Data rows */}
                    {filter.map((elem) => {
                        return <div
                            key={elem?._id}
                            className={`grid ${gridCols} items-center border-b border-[#1e1e1e] hover:bg-[#1a1a1a]/60 text-sm`}>
                            <div className='py-3 px-2'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-8 h-8 rounded-full overflow-hidden relative'>
                                        <div className='w-full  flex items-center justify-center bg-green-500 z-100 h-full absolute'>
                                            <RiMusicLine className='w-4 h-4' />
                                        </div>
                                        {
                                            elem.image && (
                                                <img src={elem.image} alt={elem.title} className='w-full h-full object-cover absolute z-101' />
                                            )
                                        }
                                    </div>
                                    <div>
                                        <p className='text-gray-200 font-medium leading-tight'>{elem.title}</p>

                                    </div>
                                </div>
                            </div>

                            <div className='py-3 px-2 text-gray-400'>{elem.artist?.username}</div>

                            {/* <div className='py-3 px-2'>
                                <span className={`px-2 py-1 rounded-md text-xs font-medium`}>
                                    {Math.floor((duration[elem._id] || 0) / 60)}:{String(Math.floor(duration[elem._id] || 0) % 60).padStart(2, '0')}
                                </span>
                            </div> */}


                            <div className="p-2 bg-green/30 text-green-500 text-xs font-semibold rounded">
                                Published
                            </div>

                            <div className='py-3 px-2 text-gray-400'>
                                <span>{timeAgo(elem.createdAt)}</span>
                            </div>

                            <div className=' pl-10 flex items-center justify-center text-right'>
                                <button onClick={() => { playRef(elem) }} className='p-1.5 rounded-full bg-green-500 hover:bg-green-600'>
                                    {currentSong === elem?._id && playing ? (<RiPauseLine />) : (<RiPlayLine />)}
                                </button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <PaginationForMusic />
        </div>
    )
}

export default AllSongInSongPage