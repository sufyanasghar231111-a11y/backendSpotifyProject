import React, { useContext } from 'react'
import { authSearch } from '../../contextapi/RecentSearchRoute'
import { RiAddCircleLine, RiCloseCircleLine, RiCloseLine, RiMoreLine, RiPlayCircleFill } from '@remixicon/react'


const RecentSearch = () => {
    let { getSearch, deleteRecentSearch } = useContext(authSearch)
    

    return (
        <div>
            <h1 className=' px-5 font-bold flex'>Recent searches</h1>
            {
                getSearch?.[0]?.search?.map((elem) => {
                    
                    return <div key={elem._id}>
                    {
                        elem.type==='song' && (
                            <div key={elem.item?._id} className='mx-2 mt-1 max-sm:mx-1 cursor-pointer group hover:bg-[#404040] max-sm:bg-[#404040] transition-all duration-500 rounded-lg py-2  gap-6 px-3 max-sm:px-2 max-sm:justify-between max-sm:w-fit w-full flex  items-center'>
                        <h1 className='w-15 h-12 max-sm:h-10 rounded overflow-hidden'>
                            <img src={elem.item?.image} className='w-full h-full object-cover' alt={elem.item?.title} />
                        </h1>
                        <div className='flex items-center justify-between w-full'>
                            <div>
                                <h1 className='font-semibold text-[16px] max-sm:text-[10px]'>{elem.item?.title}</h1>
                                <h1 className='text-sm text-[#adaaaa] max-sm:text-[8px]'>{elem.item?.artist?.username}</h1>
                            </div>
                            <div>
                                <div onClick={() => {
                                    deleteRecentSearch(elem.item._id)
                                }} className='flex items-center gap-3'>
                                    <button className=' group-hover:block max-sm:flex hidden rounded-full px-1 py-1 hover:bg-[#252525] transition-all duration-300 '><RiCloseLine /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                        )
                    }
                    {
                        elem.type==='album' && (
                            <div key={elem.item?._id} className='mx-2 max-sm:mx-1 mt-1 cursor-pointer group hover:bg-[#404040] transition-all duration-500 rounded-lg py-2  gap-6 px-3 max-sm:px-2 max-sm:justify-between max-sm:w-fit flex items-center'>
                        <h1 className='w-15 h-12 max-sm:h-10 rounded overflow-hidden'>
                            <img src={elem.item?.image} className='w-full h-full object-cover' alt={elem.item?.title} />
                        </h1>
                        <div className='flex items-center justify-between w-full'>
                            <div>
                                <h1 className='font-semibold text-[16px] max-sm:text-[10px]'>{elem.item.title}</h1>
                                <h1 className='text-sm text-[#adaaaa] max-sm:text-[8px]'>{elem.item.artist?.username}</h1>
                            </div>
                            <div>
                                <div onClick={() => {
                                    deleteRecentSearch(elem.item._id)
                                }} className='flex items-center gap-3'>
                                    <button className=' group-hover:block hidden rounded-full px-1 py-1 hover:bg-[#252525] transition-all duration-300 '><RiCloseLine /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                        )
                    }

                    {
                        elem.type === 'text' && (
                              <div key={elem._id} className='mx-2 max-sm:mx-1 mt-1 px-7 max-sm:px-2.5 cursor-pointer group h-14 hover:bg-[#404040] max-sm:bg-[#404040] transition-all duration-500 rounded-lg py-2  gap-6 max-sm:justify-between   flex items-center'>
                       
                        <div className='flex items-center justify-between w-full'>
                                <h1 className='font-semibold text-[16px] text-[#969494] max-sm:text-xs'>{elem.text}</h1>
                            <div>
                                <div onClick={() => {
                                    deleteRecentSearch(elem._id)
                                }} className='flex items-center gap-3'>
                                    <button className=' group-hover:block max-sm:flex hidden rounded-full px-1 py-1 hover:bg-[#252525] transition-all duration-300 '><RiCloseLine /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                        )
                    }

                    {
                        elem.type === 'playlist' && (
                              <div key={elem._id} className=' mx-2 max-sm:mx-1 px-7 mt-1 max-sm:px-2.5  cursor-pointer group h-14 hover:bg-[#404040] max-sm:bg-[#404040] transition-all duration-500 rounded-lg py-2  gap-6   flex items-center'>
                       
                        <div className='flex items-center justify-between w-full'>
                                <h1 className='font-semibold text-[16px] text-[#969494] max-sm:text-xs'>{elem.item?.name}</h1>
                            <div>
                                <div onClick={() => {
                                    deleteRecentSearch(elem.item._id)
                                }} className='flex items-center gap-3'>
                                    <button className=' group-hover:block max-sm:flex hidden rounded-full px-1 py-1 hover:bg-[#252525] transition-all duration-300 '><RiCloseLine /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                        )
                    }

                    
                    </div>
                })
            }

        </div>
    )
}

export default RecentSearch
