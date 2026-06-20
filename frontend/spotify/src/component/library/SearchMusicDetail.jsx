import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
import { RiAddCircleLine, RiMoreLine, RiPlayCircleFill } from '@remixicon/react'
import { useContext } from 'react'
import Skeleton from './Skeleton'
import { authSearch } from '../../contextapi/RecentSearchRoute'

const SearchMusicDetail = () => {
    const [params]=useSearchParams()
    const query=params.get('query')
    let {  albumresults, setAlbumResults,musicresults,setMusicResults,visibleresults, setVisibleResults} = useContext(authSearch)


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

    
      const selected=params.get('selected')

      const results=[
        ...musicresults.map(elem=>({
            ...elem,
            type:'music'})
        ),
        ...albumresults.map(elem => ({
            ...elem,
            type:'album'
        })),
        ...visibleresults.map(elem => ({
            ...elem,
            type:"visible"
        }))
      ]


      const sort=selected ?[
        ...results.filter(elem=> elem._id === selected),
        ...results.filter(elem=> elem._id !== selected)
      ]:results

      
    return (
        <div className='h-[65vh] relative px-2 max-sm:px-3 py-3 bg-[#282828]   overflow-y-auto '>
            <Skeleton />
            <div className='flex flex-col  pb-6 py-2'>
                {

                    sort.map((elem) => {
                        return <>
                            {elem.type === 'music' && (
                                <> 
                                
                                        <div key={elem._id} className={`flex  cursor-pointer ${selected === elem._id ? 'bg-[#1F1F1F] hover:bg-[#141414]':'hover:bg-[#1F1F1F]'} px-4 py-3 rounded-lg items-center justify-between `}>
                                    <div className='flex items-center gap-4'>
                                        <div className=' rounded-lg w-20 h-20 overflow-hidden'><img className='w-full h-full object-cover' src={elem.image} alt="" /></div>
                                        <div>
                                            <h1 className='text-[24px] font-bold'>{elem.title}</h1>
                                            <h1 className='text-sm'>song . {elem.artist?.username}</h1>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <RiMoreLine className='text-[#a1a0a0] w-5 h-5 hover:scale-107 cursor-pointer' />
                                        <RiAddCircleLine className='text-[#a1a0a0] w-5 h-5 cursor-pointer hover:scale-105' />
                                        <button className='cursor-pointer hover:-translate-y-0.5 transition-all duration-200'><RiPlayCircleFill className='w-15 text-green-500 h-15' /></button>
                                    </div>
                                </div>
                                </>
                            ) } 
                            
                            {elem.type === 'album' &&  (
                                <div>
                                    <div
                                        key={elem._id}
                                        className={`flex ${selected === elem._id ? 'bg-[#1F1F1F] hover:bg-[#141414]':'hover:bg-[#1F1F1F]'} cursor-pointer px-4 py-3 rounded-lg items-center justify-between`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="rounded-lg w-20 h-20 overflow-hidden">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn2nmWoa-66Yo5xylQwIiAxtvMrK2pB2l4CA&s'
                                                    alt={elem.title}
                                                />
                                            </div>

                                            <div>
                                                <h1 className="text-[24px] font-bold">{elem.title}</h1>
                                                <h1 className="text-sm text-gray-400">
                                                    Album • {elem.songs?.length || 0} songs
                                                </h1>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">

                                            <RiAddCircleLine className="text-[#a1a0a0] w-6 h-6 cursor-pointer hover:scale-110 transition" />

                                            <RiMoreLine className="text-[#a1a0a0] w-6 h-6 cursor-pointer hover:scale-110 transition" />
                                            <Link to={`/albumdetail/${elem._id}`}>

                                            <button className="text-sm px-3 py-1 border border-gray-600 rounded-full hover:border-white">
                                                View
                                            </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {
                                elem.type === 'visible' && (
                                    <div>
                                        {elem.name}
                                    </div>
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
