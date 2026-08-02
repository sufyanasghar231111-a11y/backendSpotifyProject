import React from 'react'
import DashBoardMidHeader from './DashBoardMidHeader'
import DashBoardMiddleChart from './DashBoardMiddleChart'

const DashBoardMid = () => {
    return (
        <div className='w-[60%] border-t mt-5 border-[#2e2e2e] pt-6'>
            <DashBoardMidHeader />
            <DashBoardMiddleChart />
        </div>
    )
}

export default DashBoardMid