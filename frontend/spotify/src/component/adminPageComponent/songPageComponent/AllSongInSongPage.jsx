import React, { useContext } from 'react'
import { Search, MoreVertical } from 'lucide-react'
import { authSearchBar } from '../../../contextapi/SearchSeparateContext'
import { timeAgo } from '../../../utils/TimeAgo'
import { RiMusicLine, RiPauseLine, RiPlayLine } from '@remixicon/react'
import { audioContext, audioTimeContext } from '../../../contextapi/AudioProvider'
import { musciControl } from '../../../contextapi/MusicControllerContext'
import PaginationForMusic from './PaginationForMusic'
const AllSongInSongPage = () => {
    const gridCols = 'grid-cols-[2fr_2fr_1fr_1fr_1fr]'
    const { music } = useContext(authSearchBar)
    const { duration } = useContext(audioTimeContext)
    const { playRef } = useContext(musciControl)
    const { playing,currentSong } = useContext(audioContext)
    
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
                        <div className='py-3 px-2 font-medium'>Songs</div>
                        <div className='py-3 px-2 font-medium'>Artist</div>
                        {/* <div className='py-3 px-2 font-medium'>Duration</div> */}
                        <div className='py-3 px-2 font-medium'>Status</div>
                        <div className='py-3 px-2 font-medium'>Uploaded</div>
                        <div className='py-3 px-2 font-medium text-right'>Actions</div>
                    </div>

                    {/* Data rows */}
                    {music.map((elem) => {
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
                                <button onClick={()=>{playRef(elem)}} className='p-1.5 rounded-full bg-green-500 hover:bg-green-600'>
                                {currentSong === elem?._id && playing ? (<RiPauseLine />):(<RiPlayLine />) }
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