import React, { useContext } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { adminContext } from '../../../contextapi/AdminContext'

const AllUserPieChart = () => {

  const { totalUsers, totalRoles, totalAdmin, totalArtist } = useContext(adminContext)

  const total = totalRoles.length

  const userPercentage = ((totalUsers.length / total) * 100).toFixed()
  const adminPercentage = ((totalAdmin.length / total) * 100).toFixed()
  const artistPercentage = ((totalArtist.length / total) * 100).toFixed()

  const data = [
    { name: 'Users', value: totalUsers.length, color: '#4ade80' },
    { name: 'Artist', value: totalArtist.length, color: '#c084fc' },
    { name: 'Admin', value: totalAdmin.length, color: '#fb923c' },
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
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='w-[30%] flex flex-col gap-4'>
          <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center text-[13px] text-[#e8ebe9] gap-2'>
              <span className='h-2 w-2 rounded-full bg-green-400'></span> Users
            </div>
            <div className='text-[10px]'>
              <div>
                {totalUsers.length} ({userPercentage}%)
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center text-[13px] text-[#e8ebe9] gap-2'>
              <span className='h-2 w-2 rounded-full bg-purple-400'></span> Artist
            </div>
            <div className='text-[10px]'>
              <div>
                {totalArtist.length} ({artistPercentage}%)
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center text-[13px] text-[#e8ebe9] gap-2'>
              <span className='h-2 w-2 rounded-full bg-orange-400'></span> Admin
            </div>
            <div className='text-[10px]'>
              <div>
                {totalAdmin.length} ({adminPercentage}%)
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default AllUserPieChart