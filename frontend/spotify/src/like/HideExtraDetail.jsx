import React, { useContext } from 'react'
import { authPlaylist, UIPlaylistContext } from '../contextapi/PlaylistContext'
import { authSearchBar } from '../contextapi/SearchSeparateContext'
import {
    RiListCheck2,
    RiUserUnfollowLine,
    RiEdit2Line,
    RiDeleteBin6Line,
    RiLockLine,
    RiLockUnlockLine,
    RiHeart2Fill,
    RiAddBoxFill,
} from "@remixicon/react";
import { authProvider } from '../contextapi/AuthContext';
import { authHome } from '../contextapi/HomeContext';
import { playlistUpdate } from '../contextapi/PlaylistUpdateContext';

const HideExtraDetail = () => {
    const { hideExtra, setHideExtra } = useContext(UIPlaylistContext)
    const { updateVisibility } = useContext(authSearchBar)
    const { separate } = useContext(authPlaylist)
    const {user}=useContext(authProvider)
    const {createFav,fav,deletemusic}=useContext(authHome)  
    const {setShowUpdate} = useContext(playlistUpdate)

    const playlistId= fav?.favorite?.some(
        item => item.type === 'playlist' && item.item?._id === separate._id
    )

    const deleteId= fav?.favorite?.find(
        item => item.type === 'playlist' && item.item?._id === separate._id
    )


    return (
        <>
            {
                hideExtra && (
                    <>
                        <div onClick={() => { setHideExtra(false) }} className='w-full h-full absolute z-150 '></div>
                        <div className=' absolute w-55 max-h-70 z-151  rounded  bg-[#404040] top-40 left-40 overflow-hidden'>
                            {
                                separate?.user?._id === user?._id ? (
                                    <>
                                    <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#333333] transition-colors">
                                <RiListCheck2 size={18} />
                                <span>Add to queue</span>
                            </button>

                            <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#333333] transition-colors">
                                <RiUserUnfollowLine size={18} />
                                <span>Remove from profile</span>
                            </button>

                            <button onClick={()=>{setShowUpdate(true)}} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#333333] transition-colors">
                                <RiEdit2Line size={18} />
                                <span>Edit details</span>
                            </button>

                            <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#333333] transition-colors">
                                <RiDeleteBin6Line size={18} />
                                <span>Delete</span>
                            </button>
                                    </>
                                ):(
                                    <div>
                                        <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#333333] transition-colors">
                                <RiListCheck2 size={18} />
                                <span>Add to queue</span>
                            </button>
                            {
                                playlistId ? 
                                (
                                     <button title='Add to Favorite' onClick={()=>{deletemusic(deleteId?._id)}}  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#333333] transition-colors">
                                <RiHeart2Fill size={18} className='text-red-500' />
                                <span>Remove to Favorite</span>
                            </button>
                                ):
                                (
                                     <button title='Remove to Favorite' onClick={()=>{createFav('playlist', separate._id)}}  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#333333] transition-colors">
                                <RiHeart2Fill size={18} className='text-white' />
                                <span>Add to Favorite</span>
                            </button>
                                )
                            }
                           

                            <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#333333] transition-colors">
                                <RiAddBoxFill size={18} />
                                <span>Add To Library</span>
                            </button>

                            
                                    </div>
                                )
                            }
                            {
                                separate?.user?._id===user?._id && (
                                    <button
                                onClick={() => updateVisibility(separate?._id)}
                                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#333333] transition-colors"
                            >
                                {separate?.visibility === "public" ? (
                                    <>
                                        <RiLockLine size={18} />
                                        <span>Make private</span>
                                    </>
                                ) : (
                                    <>
                                        <RiLockUnlockLine size={18} />
                                        <span>Make public</span>
                                    </>
                                )}
                            </button>
                                )
                            }
                            
                        </div>
                    </>
                )
            }
        </>
    )
}

export default HideExtraDetail


