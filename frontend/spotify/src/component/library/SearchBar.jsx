import React, { useCallback, useContext, useMemo } from 'react'
import { RiSearchLine } from '@remixicon/react'
import { Link, useNavigate } from 'react-router-dom'
import { authSearch } from '../../contextapi/RecentSearchRoute'
import RecentSearch from '../recentsearch/RecentSearch'
import ShowSearch from './ShowSearch'
import Empty from './Empty'
import NoResult from './NoResult'
import Loader from './Loader'
import { authSearchBar } from '../../contextapi/SearchSeparateContext'

function SearchBar() {

    let { searchMusic, music, Issearch, searchinput, loader, searchAlbum,hideSearch, setHideSearch,searchPublicplay,visible  } = useContext(authSearchBar)
    let { getSearch, patchRecentSearch, patchAlbumRecentSearch,setSkeletonLoader,patchPlaylistRecentSearch } = useContext(authSearch)
    
    const showsearch =
        useMemo(() => {
            if (!searchinput.trim()) return music

            return [...searchMusic.map(elem => ({
                ...elem,
                type: 'song'
            })),
             ...searchAlbum.map(elem => ({
                ...elem,
                type: 'album'
            })),
            ...searchPublicplay.map(elem => ({
                ...elem,
                type:'visible'
            }))
        ]

        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [searchinput, searchAlbum, searchMusic, searchPublicplay])

        
        


    let navigate = useNavigate()

    
    const handleClick = useCallback((elem) => {
        
         if (!searchinput.trim()) return
        setSkeletonLoader(true)
        setHideSearch(false)
        navigate(`/searchmusic?query=${searchinput}&selected=${elem._id}`)
        
        setTimeout(() => {
            setSkeletonLoader(false)
        }, 1500)

        if (elem.type === 'song') {
            patchRecentSearch(elem._id)
        }
        
        if(elem.type === 'album'){
            patchAlbumRecentSearch(elem._id)
        }

        if(elem.type === 'visible'){
            patchPlaylistRecentSearch(elem._id)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patchRecentSearch, patchAlbumRecentSearch,navigate,searchinput,patchPlaylistRecentSearch])

    return (
        <div>
            {
                hideSearch && (
                    <>
                        <div onClick={() => { setHideSearch(false) }} className='w-full h-full z-150 bg-black/30 inset-0  absolute '></div>
                        <div className={`w-100 max-h-90  absolute left-42  top-15 overflow-y-auto overflow-x-hidden  z-151 bg-[#2A2A2A] rounded-lg`}>
                            <div className='w-full py-4 relative'>
                                <div className='flex text-[#9f9f9f] text-sm items-center gap-2 justify-center py-1'>
                                    <h1 className='border rounded px-1.5 '>Enter</h1>
                                    <h1>Search</h1>
                                </div>
                                {
                                    searchinput.trim() === '' ? (
                                        getSearch?.[0]?.search.length > 1 ? (
                                            <RecentSearch />
                                        ) : (<Empty />)
                                    ) : (
                                        <>
                                            {
                                                searchinput.trim().length >=0 && (
                                                    showsearch?.map((elem) => {

                                                        return <ShowSearch key={elem._id} elem={elem} handleClick={handleClick} />
                                                    })
                                                )
                                            }
                                        </>
                                    )
                                }

                                {
                                    loader && (
                                        <Loader />
                                    )
                                }
                                {

                                    searchinput.trim() !== '' && searchMusic.length === 0 && searchAlbum.length === 0 && searchPublicplay.length ===0 && (
                                        <NoResult />
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



