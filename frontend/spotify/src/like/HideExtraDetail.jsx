import React, { useContext } from 'react'
import { authPlaylist, UIPlaylistContext } from '../contextapi/PlaylistContext'
import { authSearchBar } from '../contextapi/SearchSeparateContext'

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
                        <div className=' absolute w-55 h-70 z-151  rounded  bg-[#404040] top-40 left-40'>
                            <button onClick={() => updateVisibility(separate?._id)}>
                                {separate?.visibility === 'public'
                                    ? 'Make Private'
                                    : 'Make Public'}
                            </button>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default HideExtraDetail


