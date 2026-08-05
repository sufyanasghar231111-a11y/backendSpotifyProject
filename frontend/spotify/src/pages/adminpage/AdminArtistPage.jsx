import React from 'react'
import userArtistDashBoardData from '../../Hooks/useUserArtistDashBoardData'
import AllArtistInArtistPage from '../../component/adminPageComponent/artistpagecomponent/AllArtistInArtistPage'
import PaginationInArtistDashBoard from '../../component/adminPageComponent/artistpagecomponent/PaginationInArtistDashBoard'

const AdminArtistPage = () => {
  const artistData = userArtistDashBoardData()
  return (
    <div className='w-[75%]  ml-84 border-t mt-5 border-[#2e2e2e] p-6  bg-[#121212]'>
      <h1 className='text-xl font-semibold leading-5'>
        Artists <br />
        <span className='text-[12px] font-normal text-gray-400'>Manage and oversee platform artist</span>
      </h1>
      <div className=' pt-2'>
        <div className='flex items-center justify-between gap-2 flex-warp shrink-0'>
          {
            artistData.map((elem) => {
              const Icon = elem.icon
              return <div className='w-60 h-30  bg-[#141414] border border-zinc-700 rounded-xl  hover:-translate-y-1.5
                          hover:border-[#1DB954]/40
                          hover:shadow-[0_10px_30px_rgba(29,185,84,0.18)] transition-all ease duration-300 group flex items-center px-7 gap-5'>
                <div className={`w-15 h-15  flex items-center group-hover:-rotate-10 transition-all ease duration-300 justify-center rounded-full ${elem.bg} `}>
                  <Icon size={24} className={`${elem.color} transition-all duration-300 group-hover:scale-110`} />
                </div>
                <div>
                  <h1 className='text-[11px] text-zinc-400 group-hover:text-zinc-300 transition-colors'>{elem.title}</h1>
                  <h1 className='text-xl font-semibold transition-all duration-300 group-hover:text-[#1DB954]'>{elem.total}</h1>
                </div>
              </div>
            })
          }

        </div>
      </div>
      <AllArtistInArtistPage />
    </div>
  )
}

export default AdminArtistPage