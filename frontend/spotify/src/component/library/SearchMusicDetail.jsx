import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
import { RiAddCircleLine, RiMoreLine, RiPlayCircleFill } from '@remixicon/react'
import { useContext } from 'react'
import Skeleton from '../searchMusicComponent/Skeleton'
import { authSearch } from '../../contextapi/RecentSearchRoute'
import MusicSearch from '../searchMusicComponent/MusicSearch'
import AlbumSearch from '../searchMusicComponent/AlbumSearch'
import VisibleSearch from '../searchMusicComponent/VisibleSearch'

const SearchMusicDetail = () => {
    const [params] = useSearchParams()
    const query = params.get('query')
    let { albumresults, setAlbumResults, musicresults, setMusicResults, visibleresults, setVisibleResults } = useContext(authSearch)


    useEffect(() => {
        async function fetchData() {

            const res = await axios.get(
                `http://localhost:3000/api/creator/getmusicalbum?search=${query}`
            )

            setAlbumResults(res.data.album)
            setMusicResults(res.data.music)
            setVisibleResults(res.data.visible)
        }

        fetchData()
    }, [query])


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
        <div className='h-[65vh] relative px-2 max-sm:px-3 py-3 bg-[#282828]   overflow-y-auto '>
            <Skeleton />
            <div className='flex flex-col  pb-6 py-2'>
                {

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
                }


            </div>
        </div>
    )
}

export default SearchMusicDetail
