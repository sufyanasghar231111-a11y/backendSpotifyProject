import React from 'react'
import SingleUserChart from './SingleUserChart'
import AllUserPieChart from './AllUserPieChart'

const DashBoardMiddleChart = () => {
  return (
    <>
    <div className=' flex  justify-center gap-4 mt-4 '>
        <div className=' w-[35%]  rounded-sm'>
            
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