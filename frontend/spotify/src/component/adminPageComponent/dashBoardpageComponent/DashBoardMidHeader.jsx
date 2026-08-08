import React from 'react'
import DashBoardData from '../../../utils/DashBoardData'

const DashBoardMidHeader = () => {
    const dashBoardStat = DashBoardData()
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 p-4 sm:p-6 sm:py-4'>
            {
                dashBoardStat.map((item) => {
                    const Icon = item.icon;
                    return <div
                        key={item.id}
                        className="group w-full min-h-[7.5rem] sm:min-h-32 rounded-xl
                          bg-gradient-to-br from-[#181818] to-[#131313]
                          border border-zinc-800
                          p-3 pt-5 sm:pt-6 cursor-pointer
                          transition-all duration-300 ease-out
                          hover:-translate-y-1.5
                          hover:border-[#1DB954]/40
                          hover:shadow-[0_10px_30px_rgba(29,185,84,0.18)]"
                    >
                        <div className="flex items-center w-full gap-3 sm:gap-4">
                            <div
                                className={`w-10 h-10 sm:w-13 sm:h-13 shrink-0 flex items-center justify-center rounded-full ${item.bg}
                            transition-all duration-300
                            group-hover:scale-110
                            group-hover:rotate-6
                            group-hover:shadow-[0_0_18px_rgba(29,185,84,0.25)]`}
                            >
                                <Icon className={`${item.color} transition-all w-5 h-5 sm:w-7 sm:h-7 duration-300 group-hover:scale-110`} />
                            </div>

                            <div className='min-w-0'>
                                <h1 className="text-xs sm:text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors truncate">
                                    {item.title}
                                </h1>

                                <h1 className="text-sm sm:text-xl font-bold text-white transition-all duration-300 group-hover:text-[#1DB954] truncate">
                                    {item.total}
                                </h1>
                            </div>
                        </div>
                        {
                            item.id <= 2 && (
                                <div
                                    className={`pt-3 px-1 sm:px-6 text-sm flex items-center gap-2 sm:gap-2.5 font-semibold ${item.isOnline ? "text-green-500" : "text-gray-500"
                                        }`}
                                >
                                    <span
                                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${item.isOnline ? "bg-green-500" : "bg-gray-500"
                                            }`}
                                    ></span>

                                    <div className="text-[9px] sm:text-[10px]">
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