import React, { useContext } from 'react'
import { authRecent } from '../contextapi/RecentRoute'
import { audioContext } from '../contextapi/AudioProvider'
import { Link } from 'react-router-dom'
import { RiPauseFill, RiPlayFill } from '@remixicon/react'
import { musciControl } from "../contextapi/MusicControllerContext";

const LibraryMusic = ({ item }) => {
    let { playing, playRef, pauseSong } = useContext(audioContext)
     let { patchMusicPlaying } = useContext(musciControl)
     let { update } = useContext(authRecent)
    return (

        <div key={item._id} className=' flex items-center px-4 max-sm:px-2 py-2'>
            <div className='flex items-center gap-3'>
                <div className='flex items-center justify-center group relative  overflow-hidden rounded w-13 max-sm:w-10 max-sm:h-10 h-13 bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] '>

                    <img className='w-full h-full object-cover' src={item.image} alt="" />
                    <div>
                        {
                            playing === item._id ? (
                                <RiPauseFill onClick={pauseSong} className='absolute group-hover:block hidden transition-all duration-500  left-3 top-3.5 cursor-pointer z-10' />
                            ) : (
                                <RiPlayFill onClick={() => {
                                    playRef(item)
                                    update(item._id)
                                    patchMusicPlaying(item._id)
                                }} className='absolute left-3 group-hover:block hidden transition-all duration-500 top-3.5 cursor-pointer z-10' />
                            )
                        }
                    </div>

                </div>
                <div className='max-sm:text-sm'>
                    <Link to={`/detail/${item._id}`} >
                        <h1 className='font-semibold hover:border-b'>{item.title}</h1>
                    </Link>
                    <h1 className='text-sm max-sm:text-[10px] text-[#a5a5a5] font-semibold'> Single. {item.artist?.username}</h1>
                </div>
            </div>
        </div>

    )
}

export default LibraryMusic
