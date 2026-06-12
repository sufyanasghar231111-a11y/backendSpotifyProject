import React, { useCallback, useContext, useMemo } from 'react'
import { authProvider } from '../contextapi/AuthContext'
import { RiSearchLine } from '@remixicon/react'
import { authHome } from '../contextapi/HomeContext'
import { Link, useNavigate } from 'react-router-dom'
import { authSearch } from '../contextapi/RecentSearchRoute'
import RecentSearch from '../recentsearch/RecentSearch'
import ShowSearch from './ShowSearch'
import Empty from './Empty'
import NoResult from './NoResult'
import Loader from './Loader'

function SearchBar() {

    let { hideSearch, setHideSearch } = useContext(authProvider)
    let { searchMusic, music, Issearch, searchinput, loader, searchAlbum, setSkeletonLoader } = useContext(authHome)
    let { getSearch, patchRecentSearch, patchAlbumRecentSearch } = useContext(authSearch)
    
    const showsearch =
        useMemo(() => {
            if (!searchinput.trim()) return music

            return [...searchMusic.map(elem => ({
                ...elem,
                type: 'song'
            })), ...searchAlbum.map(elem => ({
                ...elem,
                type: 'album'
            }))]

        }, [searchinput, searchAlbum, searchMusic])

        

    let navigate = useNavigate()


    function handleSubmit(elem) {
        if (!searchinput.trim()) return
        setSkeletonLoader(true)
        setHideSearch(false)
        navigate(`/searchmusic?query=${searchinput}&selected=${elem._id}`)
        setTimeout(() => {
            setSkeletonLoader(false)
        }, 1500)
    }

    const handleClick = useCallback((elem) => {
        handleSubmit(elem)
        if (elem.type === 'song') {
            patchRecentSearch(elem._id)
        }
        else {
            patchAlbumRecentSearch(elem._id)
        }
    }, [patchRecentSearch, patchAlbumRecentSearch])

    return (
        <div>
            {
                hideSearch && (
                    <>
                        <div onClick={() => { setHideSearch(false) }} className='w-full h-full z-150 bg-black/30 inset-0  absolute '></div>
                        <div className={`w-100 ${searchinput.trim() === '' && !loader ? 'max-h-90' : 'h-90'} absolute left-42  top-15 overflow-y-auto  z-151 bg-[#2A2A2A] rounded-lg`}>
                            <div className='w-full py-4 relative'>
                                <div className='flex text-[#9f9f9f] text-sm items-center gap-2 justify-center py-1'>
                                    <h1 className='border rounded px-1.5 '>Enter</h1>
                                    <h1>Search</h1>
                                </div>
                                {
                                    searchinput.trim() === '' ? (
                                        getSearch?.[0]?.search.length > 0 ? (
                                            <RecentSearch />
                                        ) : (<Empty />)
                                    ) : (
                                        <>
                                            {
                                                searchinput.trim().length >= 1 && (
                                                    showsearch?.map((elem) => {

                                                        return <ShowSearch key={elem._id} elem={elem} handleClick={handleClick} />
                                                    })
                                                )
                                            }
                                        </>
                                    )
                                }

                                {
                                    loader && searchMusic.length === 0 && searchAlbum.length === 0 && searchinput.trim().length < 2 && (
                                        <Loader />
                                    )
                                }
                                {

                                    searchinput.trim() !== '' && searchMusic.length === 0 && searchAlbum.length === 0 && (
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



