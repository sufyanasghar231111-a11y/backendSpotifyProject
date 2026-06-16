import { RiAddLine, RiHeartFill, RiHeartLine, RiPlayListLine } from '@remixicon/react'
import React, { useContext } from 'react'
import { authHome } from '../../contextapi/HomeContext'
import { Link } from 'react-router-dom'
import Library from '../../component/library/Library'
import HeaderLike from '../../component/leftside/HeaderLike'
import Playlistget from '../../component/leftside/Playlistget'
import { authPlaylist } from '../../contextapi/PlaylistContext'

const Left = () => {
    let { hide} = useContext(authHome)
    let { playlistLoader } = useContext(authPlaylist)

    

    return (
        <div className={`w-[30%] max-sm:w-[60%] overflow-hidden max-sm:fixed max-sm:z-30 ${hide ? "max-sm:-translate-x-full max-sm:opacity-0" : "translate-x-0 max-sm:opacity-100"} transition-transform duration-500 ease-out  h-[76vh]  rounded-lg bg-[#282828] flex flex-col `}>
            <HeaderLike />

            <div className='h-[60vh] relative pb-7 pt-2 overflow-y-auto '>
                <Library />
                <Playlistget />
                {
                    playlistLoader && (
                        <div className='absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#1f1f1f]/95 to-[#0f0f0f]/95 backdrop-blur-3xl'>
                            <div className='w-12 h-12 border-4 border-white/20 border-t-green-500 rounded-full animate-spin'></div>
                            <p className='text-white text-lg font-medium tracking-wide animate-pulse'>
                                Loading Playlist...
                            </p>
                        </div>
                    )
                }

                
            </div>
        </div>
    )
}



export default Left
