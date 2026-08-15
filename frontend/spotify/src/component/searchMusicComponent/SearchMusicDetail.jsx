import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { RiAddCircleLine, RiMoreLine, RiPlayCircleFill } from '@remixicon/react'
import { useContext } from 'react'
import Skeleton from './Skeleton'
import { authSearch } from '../../contextapi/RecentSearchRoute'
import MusicSearch from './MusicSearch'
import AlbumSearch from './AlbumSearch'
import VisibleSearch from './VisibleSearch'
import { getOnlySearch } from '../../api/albumApi'

const SearchMusicDetail = () => {
    const [params] = useSearchParams()
    const query = params.get('query')
    let { albumresults, setAlbumResults, musicresults, setMusicResults, visibleresults, setVisibleResults } = useContext(authSearch)


    useEffect(() => {
        async function fetchData() {

            const res = await getOnlySearch(query)

            setAlbumResults(res.data.album)
            setMusicResults(res.data.music)
            setVisibleResults(res.data.visible)
        }

        fetchData()
    }, [query, setAlbumResults, setMusicResults, setVisibleResults])


    const selected = params.get('selected')

    const results = [
        ...musicresults.map(elem => ({
            ...elem,
            type: 'music'
        })
        ),
        ...albumresults.map(elem => ({
            ...elem,
            type: 'album'
        })),
        ...visibleresults.map(elem => ({
            ...elem,
            type: "visible"
        }))
    ]




    const sort = selected ? [
        ...results.filter(elem => elem._id === selected),
        ...results.filter(elem => elem._id !== selected)
    ] : results


    return (
        <div className='h-[65vh] relative px-2 max-sm:px-3 py-3 bg-[#282828] overflow-y-auto'>
            <Skeleton />
            <div className='flex flex-col pb-6 py-2'>
                {
                    sort.length > 0 ? (
                        sort.map((elem) => {
                            return <>
                                {elem.type === 'music' && (
                                    <>
                                        <MusicSearch elem={elem} selected={selected} />
                                    </>
                                )}

                                {elem.type === 'album' && (
                                    <AlbumSearch elem={elem} selected={selected} />
                                )}

                                {
                                    elem.type === 'visible' && (
                                        <VisibleSearch elem={elem} selected={selected} />
                                    )
                                }
                            </>
                        })
                    ) : (
                        <div className='flex flex-col items-center justify-center text-center px-6 py-16 gap-4'>
                            <div className='w-16 h-16 rounded-full bg-[#3a3a3a] flex items-center justify-center'>
                                <svg
                                    width='28'
                                    height='28'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M9 18V6l10-2v12'
                                        stroke='#b3b3b3'
                                        strokeWidth='1.6'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <circle cx='6' cy='18' r='3' stroke='#b3b3b3' strokeWidth='1.6' />
                                    <circle cx='16' cy='16' r='3' stroke='#b3b3b3' strokeWidth='1.6' />
                                    <line x1='3' y1='3' x2='21' y2='21' stroke='#b3b3b3' strokeWidth='1.6' strokeLinecap='round' />
                                </svg>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className='text-white text-base font-semibold'>
                                    No results found
                                </p>
                                <p className='text-[#b3b3b3] text-sm max-w-[260px]'>
                                    Try searching for a different song, artist, or playlist.
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SearchMusicDetail
