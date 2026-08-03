import React from 'react'
import SingleUserChart from './SingleUserChart'
import AllUserPieChart from './AllUserPieChart'
import AlbumSongChart from './AlbumSongChart'

const DashBoardMiddleChart = () => {
  return (
    <>
    <div className=' flex  p-6   justify-center gap-4  '>
        <div className=' w-[35%]  rounded-sm'>
          <AlbumSongChart />
        </div>
        <div className='w-[35%] rounded-sm'>
            <SingleUserChart />
        </div>
        <div className=' w-[30%] rounded-sm'>
          <AllUserPieChart />
        </div>
    </div>
    </>
  )
}

export default DashBoardMiddleChart