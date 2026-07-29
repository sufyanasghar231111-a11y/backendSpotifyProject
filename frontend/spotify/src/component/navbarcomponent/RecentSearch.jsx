import React, { useContext } from 'react'
import { authSearch } from '../../contextapi/RecentSearchRoute'
import { RiAddCircleLine, RiCloseCircleLine, RiCloseLine, RiMoreLine, RiPlayCircleFill } from '@remixicon/react'


const RecentSearch = () => {
    let { getSearch, deleteRecentSearch } = useContext(authSearch)
    

    return (
        <div>
            <h1 className=' px-5 font-bold'>Recent searches</h1>
            {
                getSearch?.[0]?.search?.map((elem) => {
                    
                    return <div key={elem._id}>
                    {
                        elem.type==='song' && (
                            <div key={elem.item?._id} className='mx-2 cursor-pointer group hover:bg-[#404040] transition-all duration-500 rounded-lg py-2  gap-6 px-3  flex items-center'>
                        <h1 className='w-15 h-12 rounded overflow-hidden'>
                            <img src={elem.item?.image} className='w-full h-full object-cover' alt={elem.item?.title} />
                        </h1>
                        <div className='flex items-center justify-between w-full'>
                            <div>
                                <h1 className='font-semibold text-[16px]'>{elem.item?.title}</h1>
                                <h1 className='text-sm text-[#adaaaa]'>{elem.item?.artist?.username}</h1>
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
                        elem.type==='album' && (
                            <div key={elem.item?._id} className='mx-2 cursor-pointer group hover:bg-[#404040] transition-all duration-500 rounded-lg py-2  gap-6 px-3  flex items-center'>
                        <h1 className='w-15 h-12 rounded overflow-hidden'>
                            <img src={elem.item?.image} className='w-full h-full object-cover' alt={elem.item?.title} />
                        </h1>
                        <div className='flex items-center justify-between w-full'>
                            <div>
                                <h1 className='font-semibold text-[16px]'>{elem.item.title}</h1>
                                <h1 className='text-sm text-[#adaaaa]'>{elem.item.artist?.username}</h1>
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
                              <div key={elem._id} className=' px-7 cursor-pointer group h-14 hover:bg-[#404040] transition-all duration-500 rounded-lg py-2  gap-6   flex items-center'>
                       
                        <div className='flex items-center justify-between w-full'>
                                <h1 className='font-semibold text-[16px] text-[#969494]'>{elem.text}</h1>
                            <div>
                                <div onClick={() => {
                                    deleteRecentSearch(elem._id)
                                }} className='flex items-center gap-3'>
                                    <button className=' group-hover:block hidden rounded-full px-1 py-1 hover:bg-[#252525] transition-all duration-300 '><RiCloseLine /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                        )
                    }

                    {
                        elem.type === 'playlist' && (
                              <div key={elem._id} className=' px-7 cursor-pointer group h-14 hover:bg-[#404040] transition-all duration-500 rounded-lg py-2  gap-6   flex items-center'>
                       
                        <div className='flex items-center justify-between w-full'>
                                <h1 className='font-semibold text-[16px] text-[#969494]'>{elem.item?.name}</h1>
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

                    
                    </div>
                })
            }

        </div>
    )
}

export default RecentSearch
