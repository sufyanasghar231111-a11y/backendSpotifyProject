import React from 'react'

const NoPublicPlaylistComponent = () => {
    return (
        <div className='flex flex-col items-center  top-25 left-1/2 w-full  -translate-x-1/2 -translate-y-1/2 absolute justify-center text-center py-40  px-4'>

            <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl'>
                🎵
            </div>

            <h1 className='text-white font-semibold max-sm:text-sm text-lg'>
                No playlists yet
            </h1>

            <p className='text-sm text-gray-400 mt-2 max-sm:mt-1 max-sm:text-sm  max-sm:w-full leading-5'>
                Your playlist library is empty.
                <br />
                Start by creating a playlist.
            </p>
        </div>
    )
}

export default NoPublicPlaylistComponent