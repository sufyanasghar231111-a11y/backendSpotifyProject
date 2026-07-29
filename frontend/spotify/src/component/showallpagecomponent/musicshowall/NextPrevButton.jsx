import React, { useContext } from 'react'
import { authSearchBar } from '../../../contextapi/SearchSeparateContext'

const NextPrevButton = () => {
    const {page, setPage, music} = useContext(authSearchBar)
    return (
        <>
            <button disabled={page === 1} onClick={() => { setPage(prev => prev - 1) }} className={`px-2 py-2 rounded-lg ${page === 1 ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'}  bg-[#4b4a4a] `}>Prev</button>
            <button disabled={music.length < 8 && page === 1} onClick={() => { setPage(prev => prev + 1) }} className={`px-2 py-2 rounded-lg ${music.length < 8 ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'}  bg-[#4b4a4a] `}>Next</button>
        </>
    )
}

export default NextPrevButton