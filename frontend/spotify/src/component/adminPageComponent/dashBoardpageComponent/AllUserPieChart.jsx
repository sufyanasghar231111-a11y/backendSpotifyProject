import React, { useContext } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { CustomTooltip } from '../../../utils/CustomToolTip'
import { adminCountContext } from '../../../contextapi/AdminCountContext'

const AllUserPieChart = () => {

  const { totalRole, totalRoleAdmin, totalRoleArtist, totalUser } = useContext(adminCountContext)

  const total = totalRole

  const userPercentage = ((totalUser / total) * 100).toFixed()
  const adminPercentage = ((totalRoleAdmin / total) * 100).toFixed()
  const artistPercentage = ((totalRoleArtist / total) * 100).toFixed()

  const data = [
    { name: 'Users', value: totalUser, color: '#4ade80' },
    { name: 'Artist', value: totalRoleAdmin, color: '#c084fc' },
    { name: 'Admin', value: totalRoleArtist, color: '#fb923c' },
  ]

  return (
    <div className='w-full p-3  bg-[#0e1116]'>

      <h2 className="text-sm font-semibold text-[#e8ebe9]">
        User Roles
      </h2>

      <div className='flex items-center mt-6 w-full justify-between'>

        <div className='w-[70%] h-40'>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="90%"
                paddingAngle={0}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#39ff6a",
                  strokeOpacity: 0.3,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='w-[30%] flex flex-col gap-4'>
          <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center text-[15px] text-[#e8ebe9] gap-2'>
              <span className='h-2 w-2 rounded-full bg-green-400'></span> Users
            </div>
            <div className='text-[10px]'>
              <div>
                {totalUser} ({userPercentage}%)
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center text-[15px] text-[#e8ebe9] gap-2'>
              <span className='h-2 w-2 rounded-full bg-purple-400'></span> Artist
            </div>
            <div className='text-[10px]'>
              <div>
                {totalRoleArtist} ({artistPercentage}%)
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center text-[15px] text-[#e8ebe9] gap-2'>
              <span className='h-2 w-2 rounded-full bg-orange-400'></span> Admin
            </div>
            <div className='text-[10px]'>
              <div>
                {totalRoleAdmin} ({adminPercentage}%)
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default AllUserPieChart