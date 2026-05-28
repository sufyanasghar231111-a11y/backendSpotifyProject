import React, { useContext } from 'react'
import { authProvider } from '../contextapi/AuthContext'
import { Link } from 'react-router-dom'

const Library = () => {
    let {library}=useContext(authProvider)
  return (
    <div>
                    {
                        library.map((elem) => (
                           elem.music.map((item)=>{
                            return <div key={item._id} className=' flex items-center px-4 max-sm:px-2 py-2'>
                                <Link to={`/detail/${item._id}`} >
                                    <div className='flex items-center gap-3'>
                                        <div className='flex items-center justify-center  overflow-hidden rounded w-13 max-sm:w-10 max-sm:h-10 h-13 bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] '>
                                            <img className='w-full h-full object-cover' src={item.image}  alt="" />
                                        </div>
                                        <div className='max-sm:text-sm'>
                                            <h1 className='font-semibold'>{item.title}</h1>
                                            <h1 className='text-sm max-sm:text-[10px] text-[#a5a5a5] font-semibold'> Single. {item.artist?.username}</h1>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                           }) 
                        ))}
                </div>
  )
}

export default Library
