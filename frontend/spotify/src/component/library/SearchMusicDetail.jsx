import React, { useEffect } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {RiAddCircleLine, RiMoreLine, RiPlayCircleFill} from '@remixicon/react'
import { useContext } from 'react'
import { authHome } from '../contextapi/HomeContext'
import Skeleton from './Skeleton'

const SearchMusicDetail = () => {
    const { query } = useParams()
    let {results, setResults}=useContext(authHome)
   
      useEffect(()=>{
         async function fetchData() {
             
        const music = await axios.get(
          `http://localhost:3000/api/creator/getMusic?search=${query}`
        )
            
            const album=await axios.get(`http://localhost:3000/api/creator/allAlbum?search=${query}`)
        
        const musicFetch=music.data.music.map(i=>({
            ...i,
            type:'music'
        }))

        const albumFetch=album.data.album.map(i=>({
            ...i,
            type:'album'
        }))

        setResults([...musicFetch,...albumFetch])
      }
    
      fetchData()
      },[query])


  return (
    <div className='h-[65vh] relative px-2 max-sm:px-3 py-3 bg-[#282828]   overflow-y-auto '>
      <Skeleton />
        <div className='flex flex-col  pb-6 py-2'>
            {
                results.map((elem)=>{
                    return  <>
                    {elem.type==='music'? (
                          <div key={elem._id} className='flex hover:bg-[#1F1F1F] cursor-pointer px-4 py-3 rounded-lg items-center justify-between '>

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
                    ):(
                        <div>
                            Hello
                        </div>
                    )}
                    </>
                  
                })
            }
        
        </div>
    </div>
  )
}

export default SearchMusicDetail
