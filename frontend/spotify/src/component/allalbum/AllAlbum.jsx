import React, { useContext } from 'react'
import { authHome } from '../contextapi/HomeContext'
import { Link } from 'react-router-dom'

function AllAlbum() {
  let {albumFetch}=useContext(authHome)

  return (
    <div>
      <div className='w-full bg-[#282828] px-5 max-sm:px-4 py-4  h-[65vh] overflow-y-auto'>
        <h1 className='text-2xl font-bold'>Music </h1>
        <div className='flex max-sm:justify-center max-sm:items-center flex-wrap'>
         {albumFetch.map((elem)=>{
          return   <div key={elem._id} className='shrink-0 rounded-lg group lg:w-54 xl:w-55  max-sm:w-70  rounded-lgtransition-all duration-300 hover:bg-white/10 p-2 mt-5 cursor-pointer'>
       <div className='relative rounded-lg overflow-hidden w-full  h-50'>
        <Link to={`/albumdetail/${elem._id}`} >
          <img
    className='w-full h-full object-cover rounded'
    src='https://i.scdn.co/image/ab67616d0000b2736fd2559f0879066633e56c42'
    alt=''/>
    </Link>
        </div>
              <div>
              <h1 className='font-semibold hover:underline w-fit'>
                 {elem.title}
              </h1>
              <h1 className='pt-1 text-sm font-semibold text-[#bebebe] hover:underline w-fit'>
                {elem.artistName}
              </h1>
            </div>
      </div>
          
         })} 
      </div>
      <div className='flex py-3 gap-3 justify-center'>
      <button   className={`px-2 py-2 rounded-lg  bg-[#4b4a4a] `}>Prev</button>
      <button className={`px-2 py-2 rounded-lg   bg-[#4b4a4a] `}>Next</button>
      </div>
       </div>
    </div>
  )
}

export default AllAlbum