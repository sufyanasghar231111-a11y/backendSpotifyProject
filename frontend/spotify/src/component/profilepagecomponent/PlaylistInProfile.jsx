import { RiPlayListLine } from '@remixicon/react'
import React from 'react'
import {Link} from 'react-router-dom'

const PlaylistInProfile = ({elem}) => {
    return (
        <div
            key={elem._id}
            className='bg-[#222] hover:bg-[#2c2c2c] transition-all duration-300 rounded-lg p-3 cursor-pointer shadow-md'
        >
            <Link to={`/visible/${elem._id}`}>
                <div className='w-full flex items-center justify-center h-40 bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] rounded-md mb-3' >
                    <RiPlayListLine className='text-white w-20 h-20' />
                </div>
                <h1 className='text-base font-semibold truncate'>
                    {elem.name}
                </h1>

                <h1 className='text-sm text-[#a9a9a9]'>
                    {elem.user.username}
                </h1>
            </Link>
        </div>
    )
}

export default PlaylistInProfile