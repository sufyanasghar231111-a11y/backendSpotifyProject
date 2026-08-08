import React from 'react'
import useUserSongDashBoard from '../../Hooks/useUserSongDashBoard'
import AllSongInSongPage from '../../component/adminPageComponent/songPageComponent/AllSongInSongPage'

const AdminSongPage = () => {
  const songData = useUserSongDashBoard()
  return (
    <div className='lg:w-[75%] w-[67%] md:w-[67%] max-sm:ml-0 md:ml-[250px] lg:ml-[250px] xl:ml-[320px]  max-sm:w-full  border-t mt-5 border-[#2e2e2e] p-6  bg-[#121212]'>
      <h1 className='text-xl font-semibold leading-5'>
        Songs <br />
        <span className='text-[12px] font-normal text-gray-400'>Manage and oversee platform songs</span>
      </h1>
      <div className=' pt-2'>
        <div className='flex items-center flex-wrap justify-center gap-2  shrink-0'>
          {
            songData.map((elem) => {
              const Icon = elem.icon
              return <div className='lg:w-58 max-sm:w-50 md:w-50 h-30  bg-[#141414] border border-zinc-700 rounded-xl  hover:-translate-y-1.5
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
      <AllSongInSongPage />
    </div>
  )
}

export default AdminSongPage