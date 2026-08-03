import React from 'react'
import { dashboardStats } from '../../../utils/DashBoardData'
const DashBoardMidHeader = () => {
    return (
        <div className='flex items-center justify-center gap-4'>
            {
                dashboardStats.map((item) => {
                    const Icon = item.icon;
                    return <div
                        className="group w-40 h-25 rounded-xl
  bg-gradient-to-br from-[#181818] to-[#131313]
  border border-zinc-800
  p-2 cursor-pointer
  transition-all duration-300 ease-out
  hover:-translate-y-1.5
  hover:border-[#1DB954]/40
  hover:shadow-[0_10px_30px_rgba(29,185,84,0.18)]"
                    >
                        <div className="flex items-center justify-center w-full h-full gap-4">
                            <div
                                className={`w-13 h-13 flex items-center justify-center rounded-full ${item.bg}
      transition-all duration-300
      group-hover:scale-110
      group-hover:rotate-6
      group-hover:shadow-[0_0_18px_rgba(29,185,84,0.25)]`}
                            >
                                <Icon size={24} className={`${item.color} transition-all duration-300 group-hover:scale-110`} />
                            </div>

                            <div>
                                <h1 className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                                    {item.title}
                                </h1>

                                <h1 className="text-xl font-bold text-white transition-all duration-300 group-hover:text-[#1DB954]">
                                    {item.total}
                                </h1>
                            </div>
                        </div>
                    </div>
                })
            }

        </div>
    )
}

export default DashBoardMidHeader