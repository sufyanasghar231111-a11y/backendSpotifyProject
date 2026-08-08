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
    { name: 'Users', value: totalUser, percentage: userPercentage, color: '#4ade80', dot: 'bg-green-400' },
    { name: 'Artist', value: totalRoleArtist, percentage: artistPercentage, color: '#c084fc', dot: 'bg-purple-400' },
    { name: 'Admin', value: totalRoleAdmin, percentage: adminPercentage, color: '#fb923c', dot: 'bg-orange-400' },
  ]

  return (
    <div className='w-full p-3 sm:p-4 bg-[#0e1116]'>

      <h2 className="text-sm font-semibold text-[#e8ebe9]">
        User Roles
      </h2>

      <div className='flex flex-col sm:flex-row items-center mt-4 sm:mt-6 w-full justify-between gap-4 sm:gap-2'>

        <div className='w-full sm:w-[65%] lg:w-[70%] h-36 sm:h-40'>
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

        <div className='w-full sm:w-[35%] lg:w-[30%] flex flex-row sm:flex-col flex-wrap justify-center gap-4 sm:gap-4'>
          {data.map((item) => (
            <div key={item.name} className='flex flex-col items-center justify-center min-w-[70px]'>
              <div className='flex items-center justify-center text-xs sm:text-[15px] text-[#e8ebe9] gap-2 whitespace-nowrap'>
                <span className={`h-2 w-2 rounded-full shrink-0 ${item.dot}`}></span> {item.name}
              </div>
              <div className='text-[10px] text-zinc-400'>
                {item.value} ({item.percentage}%)
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default AllUserPieChart