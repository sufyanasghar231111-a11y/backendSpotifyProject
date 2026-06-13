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
   
    let [hideSearch, setHideSearch] = useState(false)

    //page and input 
    const [searchinput, setSearchinput] = useState('')
    const [page, setPage] = useState(1)

    //userref
    let requestRef = useRef(0)
    const cacheRef = useRef(new Map());

    //usecontext
    let { getRecentSearch } = useContext(authSearch)

    useEffect(() => {
        const key = `${searchinput.trim().toLowerCase()}-page-${page}`
        if (searchinput.trim().length < 2) {
            setSearchMusic([])
            setSearchAlbum([])
            setLoader(false)
            return
        }

        // 1. CACHE FIRST
        if (cacheRef.current.has(key)) {
            const cached = cacheRef.current.get(key)
            setSearchAlbum(cached.album)
            setSearchMusic(cached.music)
            setLoader(false)
            return
        }
        setLoader(true)
        const timer = setTimeout(async () => {

            // 2. API ONLY IF NO CACHE

            const currentRef = ++requestRef.current

            try {
                let res = await axios.get(`http://localhost:3000/api/creator/getmusicalbum?page=${page}&search=${searchinput}`)
                if (currentRef !== requestRef.current) return


                setSearchMusic(res.data.music)
                setSearchAlbum(res.data.album)
                setIssearch(true)

                cacheRef.current.set(key, {
                    music: res.data.music,
                    album: res.data.album
                })

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

    }, [searchinput, page])

    const FetchData = useCallback(async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/creator/getmusicalbum')
            setMusic(res.data.music)
            setAlbum(res.data.album)
        }
        catch (err) {
            console.log(err);
        }
    }, [])

    useEffect(() => {
        FetchData()
    }, [FetchData])


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
        <authSearchBar.Provider value={{ searchinput, setSearchinput, searchMusic, Issearch, setIssearch, loader, searchAlbum, music, setMusic, page, setPage, album, patchText, setLoader, hideSearch, setHideSearch }}>
            {children}
        </authSearchBar.Provider>
    )
}

export default SearchSeparateContext
