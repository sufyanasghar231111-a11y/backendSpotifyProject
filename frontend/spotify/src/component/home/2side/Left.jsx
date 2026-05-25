import { RiAddLine, RiHeartFill, RiHeartLine, RiPlayListLine } from '@remixicon/react'
import React, { useContext, useMemo } from 'react'
import { authHome } from '../../contextapi/HomeContext'
import { Link } from 'react-router-dom'
import { authProvider } from '../../contextapi/AuthContext'

const Left = () => {
    let { hide, setHide, fav } = useContext(authHome)
    let { setHidePlay, getPlayList, playlistLoader } = useContext(authProvider)

    const length = useMemo(() => {
        return fav.reduce((acc, elem) => {
            return acc + (elem.favorite?.length || 0)
        }, 0)

    }, [fav])

    return (
        <div className={`w-[30%] max-sm:w-[60%] overflow-hidden max-sm:fixed max-sm:z-30 ${hide ? "max-sm:-translate-x-full max-sm:opacity-0" : "translate-x-0 max-sm:opacity-100"} transition-transform duration-500 ease-out  h-[76vh]  rounded-lg bg-[#282828] flex flex-col `}>
            <header className=' py-4 max-sm:py-8 px-3 bg-[#1a1a1a]  sticky top-0 z-10 '>
                <div className='flex relative items-center justify-between'>
                    <h1 className='font-semibold max-sm:text-[13px]'>Your Library</h1>
                    <button onClick={() => { setHidePlay(true) }} className='bg-white/10 rounded-full max-sm:px-2 px-3 max-sm:py-0.5 max-sm:gap-1 py-1.5 font-semibold flex items-center gap-2 max-sm:text-sm cursor-pointer'> <RiAddLine className='max-sm:w-5 max-sm:h-5' />  Create</button>
                    <div onClick={() => { setHide(true) }} className=' absolute right-0 md:hidden  -top-6 text-sm'>X</div>
                </div>
                <div className='pt-5'>
                    <button className='bg-white/10 rounded-full max-sm:px-2 max-sm:text-sm px-4 py-1 max-sm:py-0.5 font-semibold   cursor-pointer'>Playlist</button>
                </div>
                <div className=' flex items-center pt-4 max-sm:px-2 py-2'>
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center justify-center  rounded w-13 max-sm:w-10 max-sm:h-10 h-13 bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] '>
                            <RiHeartFill className='text-white' />
                        </div>
                        <div className='max-sm:text-sm'>
                            <Link to={`/like`}  >
                                <h1 className='font-semibold'>Liked Songs</h1>
                            </Link>
                            <h1 className='text-sm max-sm:text-[10px] text-[#a5a5a5] font-semibold'>Liked . {length} songs</h1>
                        </div>
                    </div>
                </div>
            </header>
            <div className='h-[60vh] relative pb-7 pt-2 overflow-y-auto '>
                {getPlayList.length > 0 ? (
                    getPlayList?.map((elem, index) => {
                        return <div key={elem?._id} className=' flex items-center px-4 max-sm:px-2 py-2'>
                            <Link to={`/playlist/${elem._id}?index=${index + 1}`} >
                                <div className='flex items-center gap-3'>
                                    <div className='flex items-center justify-center  rounded w-13 max-sm:w-10 max-sm:h-10 h-13 bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] '>
                                        <RiPlayListLine />
                                    </div>
                                    <div className='max-sm:text-sm'>
                                        <h1 className='font-semibold'>{elem.name} </h1>
                                        <h1 className='text-sm max-sm:text-[10px] text-[#a5a5a5] font-semibold'>playlist {index + 1} . <span className={`${elem.music?.length > 0 ? " text-green-500" : "text-red-500"}`}>{elem.music?.length || 0} songs</span></h1>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    })
                ) : (
                    <div className=' absolute top-30 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xl z-9 font-semibold'>Your playlist library  is empty. Start by creating a playlist.</div>
                )
                }
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

                <div>
                 {
                    [0,1,2].map((elem) => {
                        return <div className=' flex items-center px-4 max-sm:px-2 py-2'>
                            <Link >
                                <div className='flex items-center gap-3'>
                                    <div className='flex items-center justify-center  rounded w-13 max-sm:w-10 max-sm:h-10 h-13 bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] '>
                                        <img className='w-full h-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVBmvQ0vWIbzrOhkQyUhU-iQ2M2NYbm9lnzg&s" alt="" />
                                    </div>
                                    <div className='max-sm:text-sm'>
                                        <h1 className='font-semibold'>Byebyebye wav </h1>
                                        <h1 className='text-sm max-sm:text-[10px] text-[#a5a5a5] font-semibold'> Single. sufyan</h1>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}



export default Left
