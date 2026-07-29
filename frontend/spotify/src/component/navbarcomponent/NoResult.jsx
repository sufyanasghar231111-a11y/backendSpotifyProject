import React, { useContext } from 'react'
import { RiSearchLine } from '@remixicon/react'
import { authSearchBar } from '../../contextapi/SearchSeparateContext'

const NoResult = () => {
    let { searchinput } = useContext(authSearchBar)
    return (
        <div> <div className='flex flex-col items-center justify-center py-14 text-center text-[#8a8a8a]'>

            {/* Icon */}
            <div className='w-16 h-16 rounded-full bg-[#1f1f1f] flex items-center justify-center text-3xl mb-4'>
                <RiSearchLine />
            </div>

            {/* Title */}
            <h1 className='text-white text-lg font-semibold'>
                No Music Found
            </h1>

            {/* Subtitle */}
            <p className='text-sm mt-1 max-w-[260px] leading-6'>
                We couldn’t find any songs matching
                <span className='text-white font-medium'>
                    {" "}“{searchinput}”
                </span>
            </p>

        </div></div>
    )
}

export default NoResult
