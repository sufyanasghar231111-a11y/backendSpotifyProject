import { RiAddLine, RiHeartFill, RiHeartLine, RiPlayListLine } from '@remixicon/react'
import React, { useContext } from 'react'
import {  UIHomeContex } from '../../contextapi/HomeContext'
import { Link } from 'react-router-dom'
import Library from '../../component/leftsidecomponents/Library'
import HeaderLike from '../../component/leftsidecomponents/HeaderLike'
import Playlistget from '../../component/leftsidecomponents/Playlistget'
import {  UIPlaylistContext } from '../../contextapi/PlaylistContext'
import LeftSideSkeletonLoader from '../../modals/LeftSideSkeletonLoader'
import { authSearchBar } from '../../contextapi/SearchSeparateContext'

const Left = () => {
    let { hide} = useContext(UIHomeContex)
    
    const { musicLoader } = useContext(authSearchBar)

    return (
        <div className={`w-[30%] max-sm:w-[60%] relative overflow-hidden max-sm:fixed z-50 ${hide ? "max-sm:-translate-x-full max-sm:opacity-0" : "translate-x-0 max-sm:opacity-100"} transition-transform duration-500 ease-out  h-[76vh]  rounded-lg bg-[#282828] flex flex-col `}>
            <HeaderLike />
            {
                musicLoader && <LeftSideSkeletonLoader />
            }
            
            <div className='h-[60vh] relative pb-7 pt-2 overflow-y-auto left'>
                <Library />
                <Playlistget />
            </div>
        </div>
    )
}



export default Left
