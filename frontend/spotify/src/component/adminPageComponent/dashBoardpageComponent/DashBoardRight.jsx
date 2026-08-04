import React from 'react'
import DashBoardMidHeader from './DashBoardMidHeader'
import DashBoardMiddleChart from './DashBoardMiddleChart'
import UserRequsertToAdmin from './UserRequsertToAdmin'

const 


DashBoardRight = () => {
    return (
        <div className='w-[75%]  ml-84 border-t mt-5 border-[#2e2e2e] bg-[#121212] '>
            <DashBoardMidHeader />
            <DashBoardMiddleChart />
            <UserRequsertToAdmin />
        </div>
    )
}

export default DashBoardRight