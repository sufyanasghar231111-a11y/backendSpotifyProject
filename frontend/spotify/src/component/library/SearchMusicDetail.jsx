import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {RiAddCircleLine, RiMoreLine, RiPlayCircleFill} from '@remixicon/react'

const SearchMusicDetail = () => {
    const { query } = useParams()

    
      let [result, setResults]=useState([])
      useEffect(()=>{
         async function fetchData() {
        const res = await axios.get(
          `http://localhost:3000/api/creator/getMusic?search=${query}`
        )

        setResults(res.data.music)
      }
    
      fetchData()
      },[query])
    
  return (
    <div className='h-[65vh] relative px-2 max-sm:px-3 py-3 bg-[#282828]   overflow-y-auto '>
        <div className='flex flex-col  pb-6 py-2'>
            {
                result.map((elem)=>{
                    return <div className='flex hover:bg-[#1F1F1F] cursor-pointer px-4 py-3 rounded-lg items-center justify-between '>
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
                })
            }
        
        </div>
    </div>
  )
}

export default SearchMusicDetail
