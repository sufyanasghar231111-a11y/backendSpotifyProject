import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react'
import React, { useContext } from 'react'
import { authSearchBar } from '../../../contextapi/SearchSeparateContext'
import { adminContext } from '../../../contextapi/AdminContext'

const PaginationForMusic = () => {
    const { page, music, setPage } = useContext(authSearchBar)
    const { totalMusic } = useContext(adminContext)

    const totalPage = Math.ceil(music.length / 8)
    return (
        <div className='pt-3'>
            <div className=' flex items-center justify-between'>
                <div className='text-[12px] text-gray-400'>
                    Showing 1 to {music.length} of {totalMusic} songs
                </div>
                <div className='flex items-center gap-3'>
                    <button disabled={page === 1} onClick={() => { setPage(prev => prev - 1) }} className={`border border-zinc-600 px-2 py-1.5  ${page === 1 ? 'hover:border-gray-400 opacity-50 cursor-not-allowed' : 'hover:border-green-400 opacity-100 cursor-pointer'} transition-all duration-200  rounded-lg`}>
                        <RiArrowLeftSLine className='w-4 h-4' />
                    </button>
                    {[1, 2, 3].map((pages) => (
                        <button  key={pages} onClick={() => { setPage(pages) }} className={`border  rounded-lg px-2.5 ${page === pages ? 'border-green-600 ':'border-zinc-600 '} hover:border-green-400 ${pages >= totalPage ? 'hover:border-green-400 cursor-pointer  opacity-100' : 'hover:border-gray-400 cursor-not-allowed  opacity-50'} transition-all duration-200 py-0.5`}>
                            {pages}
                        </button>
                    ))}

                    .....
                    <button disabled={music.length < 8} onClick={() => { setPage(prev => prev + 1) }} className={`border border-zinc-600 ${music.length < 8 ? 'hover:border-gray-400 cursor-not-allowed  opacity-50' : 'hover:border-green-400 cursor-pointer  opacity-100'}  px-2 py-1.5  transition-all duration-200 rounded-lg`}>
                        <RiArrowRightSLine className='w-4 h-4' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaginationForMusic