import React, { useContext } from 'react'
import { authRecent } from '../contextapi/RecentRoute';
import { RiCloseLine } from "@remixicon/react";

const RecentPlay = () => {
  let {recentActivity}=useContext(authRecent)

  const items=[
   ( recentActivity?.[0]?.songs.map(item => ({
    ...item,
    type:'songs'
   }))),
   (
    recentActivity?.[0]?.album.map(item =>({
      ...item,
      type:"album"
    }))
   )
  ]
  return (
    <div className="pb-5">
  <h2 className="text-xl font-bold mb-4">Recently Played</h2>

  <div className="flex gap-4 overflow-x-auto scrollbar-hide">
    {items.map((song)=>{
        return <div
        key={song._id}
        className="min-w-[180px]  bg-[#181818] p-3 rounded-lg"
      >
        <div className='w-full  h-40 relative '>
          <div className=' absolute top-3 right-3 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-[#5c5c5c]  hover:bg-[#353535] transition-all duration-150 '>
             <RiCloseLine size={20} />
          </div>
        <img
          src={song.image}
          alt={song.title}
          className="w-full h-full object-cover rounded"
        />
        </div>

        <h3 className="mt-2 truncate">{song.title}</h3>
        <p className="text-sm text-gray-400 truncate">
          {song.artist?.username}
        </p>
      </div>
      })
}
  </div>
</div>
  )
}

export default RecentPlay
