import React, { useContext } from 'react'
import { authHome } from '../../contextapi/HomeContext'

const ToggleButton = ({favId, deleteId, music}) => {
    const { deletemusic, createFav } = useContext(authHome)
  return (
    <button
                  className='p-2 max-sm:p-0.5 rounded lg:rounded-xl bg-white/10 hover:bg-red-500/20 hover:border-red-500/30 border border-transparent hover:border-red-500/50 transition-all duration-200 group/like'
                  title='Remove from favorites'
                >
                  {
                    favId ? (
                      <svg onClick={() => { deletemusic(deleteId?._id) }} className='w-3 md:w-3 max-sm:w-2.5 lg:w-5 lg:h-5 md:h-3 h-3 max-sm:h-2.5 text-red-500 group-hover/like:text-red-500 group-hover/like:scale-110 transition-all duration-200' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z' clipRule='evenodd' />
                      </svg>
                    ) : (
                      <svg onClick={() => { createFav("music", music?._id) }} className='w-3 md:w-3 max-sm:w-2.5 lg:w-5 lg:h-5 md:h-3 h-3 max-sm:h-2.5 text-white  group-hover/like:scale-110 transition-all duration-200' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z' clipRule='evenodd' />
                      </svg>
                    )
                  }

                </button>
  )
}

export default ToggleButton