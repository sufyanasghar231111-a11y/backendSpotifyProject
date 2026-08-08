import React from 'react'
import SingleUserChart from './SingleUserChart'
import AllUserPieChart from './AllUserPieChart'
import AlbumSongChart from './AlbumSongChart'

const DashBoardMiddleChart = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 p-6'>
      <div className='rounded-sm'>
        <AlbumSongChart />
      </div>
      <div className='rounded-sm'>
        <SingleUserChart />
      </div>
      <div className='rounded-sm'>
        <AllUserPieChart />
      </div>
    </div>
  )
}

export default DashBoardMiddleChart