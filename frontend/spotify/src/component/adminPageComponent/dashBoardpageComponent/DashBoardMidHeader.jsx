import React from 'react'
import DashBoardData from '../../../utils/DashBoardData'
const DashBoardMidHeader = () => {
    const dashBoardStat = DashBoardData()
    return (
        <div className='flex items-center  p-6 py-4 justify-center gap-4'>
            {
                dashBoardStat.map((item) => {
                    const Icon = item.icon;
                    return <div
                        className="group w-41 min-h-32 rounded-xl
                          bg-gradient-to-br from-[#181818] to-[#131313]
                          border border-zinc-800
                          p-3 pt-6 cursor-pointer
                          transition-all duration-300 ease-out
                          hover:-translate-y-1.5
                          hover:border-[#1DB954]/40
                          hover:shadow-[0_10px_30px_rgba(29,185,84,0.18)]"
                    >
                        <div className="flex items-center  w-full  gap-4">
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
                        {
                            item.id <= 2 && (
                                <div
                                    className={`pt-3 px-6 text-sm flex items-center gap-2.5 font-semibold ${item.isOnline ? "text-green-500" : "text-gray-500"
                                        }`}
                                >
                                    <span
                                        className={`w-2 h-2 rounded-full ${item.isOnline ? "bg-green-500" : "bg-gray-500"
                                            }`}
                                    ></span>

                                    <div className="text-[10px]">
                                        {item.isOnline ? `${item.isOnline} Online` : `${item.isOnline} Online`}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                })
            }

        </div>
    )
}

export default DashBoardMidHeader