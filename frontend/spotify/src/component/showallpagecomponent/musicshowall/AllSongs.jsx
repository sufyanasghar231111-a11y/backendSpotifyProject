import React, { useContext } from 'react'
import { musciControl } from '../../../contextapi/MusicControllerContext'
import { authRecent } from '../../../contextapi/RecentRoute'
import { audioContext } from '../../../contextapi/AudioProvider'
import { Link } from 'react-router-dom'
import { RiMusicLine, RiPauseFill, RiPlayFill } from '@remixicon/react'

const AllSongs = ({ elem }) => {
    const { update } = useContext(authRecent)
    const { playing, currentSong } = useContext(audioContext)
    const { patchMusicPlaying, playRef } = useContext(musciControl)
    return (
        <div key={elem._id} className='shrink-0 rounded-lg group lg:w-54 md:w-50 xl:w-55   max-sm:w-70   transition-all duration-300 hover:bg-white/10 p-2 mt-5 cursor-pointer'>
            <div className='relative rounded-lg overflow-hidden   h-50'>
                <Link to={`/detail/${elem._id}`} >
                {
                    elem.image && (
                        <img
                            className='w-full h-full absolute z-40 object-cover rounded'
                            src={elem.image}
                            alt='' />
                    )
                }

                        <div className='w-full h-full flex items-center justify-center z-39 bg-green-500'>
                            <RiMusicLine className='w-15 h-15' />
                        </div>
                </Link>


                <div onClick={() => {
                    playRef(elem)
                    update(elem?._id)
                    patchMusicPlaying(elem?._id)
                }} className='absolute bottom-3 right-3
              flex items-center justify-center
              w-12 h-12 rounded-full hover:bg-green-600 bg-green-500
              opacity-0 translate-y-4
              group-hover:translate-y-0
              group-hover:opacity-100
              z-40
              transition-all duration-300 ease-out shadow-lg'>
                    {
                        currentSong === elem._id && playing ? (<RiPauseFill className='text-black w-7 h-7' />) : (<RiPlayFill className='text-black w-7 h-7' />)
                    }
                </div>
            </div>
            <div>
                <h1 className='font-semibold hover:underline w-fit'>
                    {elem.title}
                </h1>
                <h1 className='pt-1 text-sm font-semibold text-[#bebebe] hover:underline w-fit'>
                    {elem.artist?.username}
                </h1>
            </div>
        </div>
    )
}

export default AllSongs