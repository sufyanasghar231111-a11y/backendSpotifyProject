import React, { useContext } from 'react'
import { authProvider } from '../contextapi/AuthContext'
import { RiSearchLine } from '@remixicon/react'
import { authHome } from '../contextapi/HomeContext'
import { Link } from 'react-router-dom'

function SearchBar() {

    let { hideSearch, setHideSearch } = useContext(authProvider)
    let { searchMusic, music, Issearch, searchinput, loader,setSearchinput } = useContext(authHome)

    let showsearch = searchinput.trim() ? searchMusic : music

    return (
        <div>
            {
                hideSearch && (
                    <>
                        <div onClick={() => { setHideSearch(false) }} className='w-full h-full z-150 bg-black/30 inset-0  absolute '></div>
                        <div className='w-100 h-90 absolute left-42  top-15 overflow-y-auto  z-151 bg-[#2A2A2A] rounded-lg'>
                            <div className='w-full py-4 relative'>
                                <div className='flex text-[#9f9f9f] text-sm items-center gap-2 justify-center py-1'>
                                    <h1 className='border rounded px-1.5 '>Enter</h1>
                                    <h1>Search</h1>
                                </div>
                                {
                               searchinput.trim()==='' ? (
                                        <div className='flex flex-col items-center justify-center py-14 text-center text-[#8a8a8a]'>
                                            <div className='w-16 h-16 rounded-full bg-[#1d1d1d] flex items-center justify-center text-2xl mb-4'>
                                                <RiSearchLine />
                                            </div>

                                            <h1 className='text-white font-semibold text-lg'>
                                                Start Searching
                                            </h1>

                                            <p className='text-sm mt-1 max-w-[260px]'>
                                                Find your favorite songs, artists and playlists instantly.
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            {
                                               searchinput.trim().length >1  && (
                                                    showsearch?.map((elem) => {
                                                    return <Link key={elem._id} onClick={()=>{setHideSearch(false)
                                                        setSearchinput('')
                                                    }} to={`/detail/${elem._id}`} >
                                                     <div  className='mx-2 cursor-pointer hover:bg-[#404040] rounded-lg py-2  gap-6 px-3  flex items-center'>
                                                        <h1 className='px-2.5 py-2.5 rounded-full bg-[#282828]'><RiSearchLine /></h1>
                                                        <h1 className='font-semibold '>{elem.title}</h1>
                                                    </div>
                                                        </Link>
                                                })
                                                )
                                            }
                                        </>
                                    )
                                }

                                {
                                    loader && searchMusic.length===0  && searchinput.trim().length<2 && (
                                        <div className=' absolute w-100  h-90 z-150 bg-black inset-0'>
                                            <div className='flex flex-col justify-center w-full h-full items-center gap-4'>
                                                <div className='w-10 h-10 border-[3px] border-[#1DB954] border-t-transparent rounded-full animate-spin'></div>

                                                <h1 className='text-sm text-[#d0d0d0] tracking-wide'>
                                                    Searching...
                                                </h1>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    !loader &&
                                    searchinput.trim() !== '' && searchMusic.length === 0 && (
                                        <div> <div className='flex flex-col items-center justify-center py-14 text-center text-[#8a8a8a]'>

                                            {/* Icon */}
                                            <div className='w-16 h-16 rounded-full bg-[#1f1f1f] flex items-center justify-center text-3xl mb-4'>
                                                <RiSearchLine />
                                            </div>

                                            {/* Title */}
                                            <h1 className='text-white text-lg font-semibold'>
                                                No Music Found
                                            </h1>

                                            {/* Subtitle */}
                                            <p className='text-sm mt-1 max-w-[260px] leading-6'>
                                                We couldn’t find any songs matching
                                                <span className='text-white font-medium'>
                                                    {" "}“{searchinput}”
                                                </span>
                                            </p>

                                        </div></div>
                                    )
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default SearchBar



{/* <div className='mx-2 cursor-pointer hover:bg-[#404040] rounded-lg py-2  gap-6 px-3  flex items-center'>
                            <h1 className='w-12 h-12 rounded  border'></h1>
                            <div className=''>
                            <h1 className='font-semibold text-[16px]'>Test1</h1>
                            <h1 className='text-sm text-[#adaaaa]'>artist jutt</h1>
                            </div>
                        </div> */}