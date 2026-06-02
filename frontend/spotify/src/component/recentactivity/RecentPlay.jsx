import React, { useContext } from 'react'
import { authRecent } from '../contextapi/RecentRoute';
import { RiCloseLine } from "@remixicon/react";

const RecentPlay = () => {
  let {recentActivity,deleteData}=useContext(authRecent)

  const items=[
   ...( recentActivity?.[0]?.songs?.map(i => ({
    ...i.item,
    createdAt:i.createdAt,
    type:'songs'
   })) || []),
   ...(
    recentActivity?.[0]?.album?.map(i =>({
      ...i.item,
    createdAt:i.createdAt,
      type:"album"
    }))
    || [] )
    
  ].sort((a,b)=> new Date(b.createdAt)- new Date(a.createdAt))


  function timeAgo(date){
    let now=new Date()
    let diff= Math.floor((now-new Date(date))/1000)
    

    if(diff <60 ) return `${diff} sec ago`
    let min=Math.floor(diff/60)

    if(min <60 ) return `${min} min ago`
    let hr=Math.floor(min/60)

    if(hr<24) return `${hr} hr ago`

    let day=Math.floor(hr/24)
    return `${day} day ago`
  }


  return (

    <div className="pb-5">
  <h2 className="text-xl font-bold mb-4">Recently Played</h2>

  <div className="flex gap-4 overflow-x-auto scrollbar-hide">
    {
    items.map((item)=>{
        return <div
        key={item._id}
        className="min-w-[180px]  bg-[#181818] p-3 rounded-lg"
      >
        <div className='w-full  h-40 relative '>
          <div onClick={()=>{deleteData(item._id)}} className=' absolute top-3 right-3 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-[#5c5c5c]  hover:bg-[#353535] transition-all duration-150 '>
             <RiCloseLine size={20} />
          </div>
        <img
          src={item.image || "/default-cover.jpg"}
          alt={item.title}
          className="w-full h-full object-cover rounded"
        />
        </div>
        <div className='flex items-center justify-between'>
        <div>
          <div>
        <h3 className="mt-2 truncate">{item.title}</h3>
        <p className="text-sm text-gray-400 truncate">
          {
            item.type==='songs'? (
              item.artist?.username
            )
            :
            (
              item.artistName
            )
          }
        </p>
          </div>
        </div>
          <div className='truncate text-sm'>
            {timeAgo(item.createdAt)}
          </div>
        </div>
      </div>
      })
}
  </div>
</div>
  )
}

export default RecentPlay
