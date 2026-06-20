import axios from 'axios'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { authSearch } from '../contextapi/RecentSearchRoute'
import useDebounce from '../Hooks/useDebounce'

export const authSearchBar = createContext()
const SearchSeparateContext = ({ children }) => {

    //all get array data from backend here 
    const [searchMusic, setSearchMusic] = useState([])
    const [searchAlbum, setSearchAlbum] = useState([])
    const [searchPublicplay,setSearchPublicplay]=useState([])
    const [music, setMusic] = useState([])
    const [album, setAlbum] = useState([])
    const [visible,setVisible]=useState([])

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

    const debounceSearch = useDebounce(searchinput, 600)

    useEffect(() => {
        const search = debounceSearch.trim().toLowerCase()
        if (debounceSearch.trim().length < 2) {
            setSearchMusic([])
            setSearchAlbum([])
            setSearchPublicplay([])
            setLoader(false)
            return
        }

        // 1. CACHE FIRST

        const key=`${search}-page-${page}`

        if (cacheRef.current.has(key)) {
            const cached = cacheRef.current.get(key)
            setSearchAlbum(cached.album)
            setSearchMusic(cached.music)
            setSearchPublicplay(cached.visible)
            setLoader(false)
            return
        }

        setLoader(true)

        // 2. API ONLY IF NO CACHE

        const currentRef = ++requestRef.current
        async function FetchSearch() {

            try {
                let res = await axios.get(`http://localhost:3000/api/creator/getmusicalbum?page=${page}&search=${debounceSearch}`)
                
                if (currentRef !== requestRef.current) return

                setSearchMusic(res.data.music)
                setSearchAlbum(res.data.album)
                setSearchPublicplay(res.data.visible)
                setIssearch(true)

                cacheRef.current.set(key, {
                    music: res.data.music,
                    album: res.data.album,
                    visible:res.data.visible
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
        }

        FetchSearch()
       

    }, [debounceSearch, page])


    // error here because i used usecallback and inside dependence i did't pass value for page change

    const FetchData = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/creator/getmusicalbum?page=${page}`)
            setMusic(res.data.music)
            setAlbum(res.data.album)
            setVisible(res.data.visible)
        }
        catch (err) {
            console.log(err);
        }
    }, [page])


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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchinput])
    
    const value = useMemo(() => ({
        searchinput,
        setSearchinput,
        searchMusic,
        Issearch,
        setIssearch,
        loader,
        searchAlbum,
        music,
        setMusic,
        page,
        setPage,
        album,
        patchText,
        setLoader,
        hideSearch,
        setHideSearch,
        visible,
        searchPublicplay
    }), [searchinput, searchMusic, Issearch, loader, searchAlbum, music, page, album, patchText, hideSearch,visible,searchPublicplay])

    return (
        <authSearchBar.Provider value={value}>
            {children}
        </authSearchBar.Provider>
    )
}

export default SearchSeparateContext
