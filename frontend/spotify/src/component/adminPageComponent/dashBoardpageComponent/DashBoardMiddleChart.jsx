import React from 'react'
import SingleUserChart from './SingleUserChart'

const DashBoardMiddleChart = () => {
  return (
    <div className='pt-3 flex items-center justify-center gap-2'>
        <div className=' w-[32%] rounded-sm'>
            
        </div>
        <div className='rounded-sm'>
            <SingleUserChart />
        </div>
        <div className=' w-[32%] rounded-sm'>
            
        </div>
    </div>
  )
}

export default DashBoardMiddleChart