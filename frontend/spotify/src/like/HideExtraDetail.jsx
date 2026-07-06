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
} from "@remixicon/react";

const HideExtraDetail = () => {
    const { hideExtra, setHideExtra } = useContext(UIPlaylistContext)
    const { updateVisibility } = useContext(authSearchBar)
    const { separate } = useContext(authPlaylist)

    return (
        <>
            {
                hideExtra && (
                    <>
                        <div onClick={() => { setHideExtra(false) }} className='w-full h-full absolute z-150 '></div>
                        <div className=' absolute w-55 max-h-70 z-151  rounded  bg-[#404040] top-40 left-40 overflow-hidden'>
                            <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#333333] transition-colors">
                                <RiListCheck2 size={18} />
                                <span>Add to queue</span>
                            </button>

                            <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#333333] transition-colors">
                                <RiUserUnfollowLine size={18} />
                                <span>Remove from profile</span>
                            </button>

                            <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#333333] transition-colors">
                                <RiEdit2Line size={18} />
                                <span>Edit details</span>
                            </button>

                            <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#333333] transition-colors">
                                <RiDeleteBin6Line size={18} />
                                <span>Delete</span>
                            </button>

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
                        </div>
                    </>
                )
            }
        </>
    )
}

export default HideExtraDetail


