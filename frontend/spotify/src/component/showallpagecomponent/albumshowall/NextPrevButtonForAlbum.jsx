import React, { useContext } from 'react'
import { authSearchBar } from '../../../contextapi/SearchSeparateContext'

const NextPrevButtonForAlbum = ({item}) => {
    const {page, setPage} = useContext(authSearchBar)
    return (
        <div>
            <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className={`px-2 py-1 rounded-full ${page === 1
                        ? 'opacity-60 cursor-not-allowed'
                        : 'opacity-100 cursor-pointer'
                    } bg-[#4b4a4a]`}
            >
                Prev
            </button>

            <button
                disabled={item.length < 8}
                onClick={() => setPage((prev) => prev + 1)}
                className={`px-2 py-1 rounded-full ${item.length < 8
                        ? 'opacity-60 cursor-not-allowed'
                        : 'opacity-100 cursor-pointer'
                    } bg-[#4b4a4a]`}
            >
                Next
            </button>
        </div>
    )
}

export default NextPrevButtonForAlbum