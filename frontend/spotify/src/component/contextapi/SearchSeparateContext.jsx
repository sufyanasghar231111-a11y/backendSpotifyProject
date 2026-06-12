import axios from 'axios'
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { authSearch } from './RecentSearchRoute'

export const authSearchBar = createContext()
const SearchSeparateContext = ({ children }) => {

    //all get array data from backend here 
    const [searchMusic, setSearchMusic] = useState([])
    const [album, setAlbum] = useState([])
    const [music, setMusic] = useState([])
    const [searchAlbum, setSearchAlbum] = useState([])

    //all true and false state
    const [Issearch, setIssearch] = useState(false)
    const [loader, setLoader] = useState(false)
    const  [skeletonLoader, setSkeletonLoader] = useState(false)

    //page and input 
    const [searchinput, setSearchinput] = useState('')
    const [page, setPage] = useState(1)

    //userref
    let requestRef = useRef(0)

    //usecontext
    let { getRecentSearch } = useContext(authSearch)

    useEffect(() => {
        if (searchinput.trim().length < 2) {
            setSearchMusic([])
            setSearchAlbum([])
        }
        const timer = setTimeout(async () => {

            const currentRef = ++requestRef.current
            setLoader(true)


            try {

                let res = await axios.get(`http://localhost:3000/api/creator/getmusicalbum?page=${page}&search=${searchinput}`)
                if (currentRef !== requestRef.current) return
                if (searchinput.trim()) {
                    setSearchMusic(res.data.music)
                    setSearchAlbum(res.data.album)
                    setIssearch(true)
                }
                else {
                    setMusic(res.data.music)
                    setAlbum(res.data.album)
                    setIssearch(false)
                }
            }
            catch (err) {
                console.log(err);
            }
            finally {
                if (currentRef === requestRef.current) {
                    setLoader(false)
                }
            }


        }, searchinput.trim() ? 600 : 0)
        return () => clearTimeout(timer)

    }, [page, searchinput])


    const patchText = useCallback(async () => {
        try {
            await axios.patch(`http://localhost:3000/api/search/recenttext`, { text: searchinput }, { withCredentials: true })
            await getRecentSearch()
        }
        catch (err) {
            console.log(err);
        }

    }, [searchinput])
    return (
        <authSearchBar.Provider value={{ searchinput, setSearchinput, searchMusic, Issearch, setIssearch, loader, searchAlbum, music, setMusic, page, setPage, album, patchText, setLoader,skeletonLoader, setSkeletonLoader }}>
            {children}
        </authSearchBar.Provider>
    )
}

export default SearchSeparateContext
