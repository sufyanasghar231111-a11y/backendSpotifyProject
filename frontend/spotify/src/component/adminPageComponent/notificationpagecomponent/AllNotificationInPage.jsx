import React, { useContext } from 'react'
import { adminApprovalContext, requestContext } from '../../../contextapi/UserRequest'
import { RiPlayListLine, RiUserLine } from '@remixicon/react'
import { timeAgo } from '../../../utils/TimeAgo'
import { Search, MoreVertical } from 'lucide-react'

const StatusBadge = ({ elem }) => (
    elem.requestStatus === 'Pending' ? (
        <span className="inline-block px-2 py-1 bg-yellow-900/30 w-fit text-yellow-500 text-xs font-semibold rounded">
            Pending
        </span>
    ) : (
        <span className="inline-block px-2 py-1 bg-green-900/30 w-fit text-green-500 text-xs font-semibold rounded">
            Approved
        </span>
    )
)

const NotificationSummary = ({ elem }) => (
    elem.requestStatus === 'Pending' ? (
        <>
            <h1 className='text-sm text-gray-200'>New Artist Registration request</h1>
            <h1 className='text-xs text-gray-400'><span className='text-green-500'>{elem.user.username}</span> has request to join as an artist</h1>
        </>
    ) : (
        <>
            <h1 className='text-sm text-gray-200'>Artist Verified</h1>
            <h1 className='text-xs text-gray-400'><span className='text-green-500'>{elem.user.username}</span> has been verified as an artist</h1>
        </>
    )
)

const AllNotificationInPage = ({ customTab }) => {
    const gridCols = 'md:grid-cols-[3fr_1fr_1fr_1fr]'
    const { getRequests } = useContext(requestContext)
    const { singleRequest } = useContext(adminApprovalContext)


    return (
        <div className='w-full bg-[#141414] rounded-xl border mt-4 border-[#232323] p-3 sm:p-4'>
            {/* Toolbar */}
            <div className='relative w-full sm:w-64 mb-4'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500' />
                <input
                    type='text'
                    placeholder='Search users...'
                    className='w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-600'
                />
            </div>

            {/* ===== Mobile / small screens: stacked cards ===== */}
            <div className='flex flex-col gap-3 md:hidden'>
                {getRequests.map((elem) => {
                    if (customTab === "unread" && elem.isChecked) return null;
                    if (customTab === "read" && !elem.isChecked) return null;
                    return (
                        <div
                            key={elem?._id}
                            onClick={() => { singleRequest(elem._id) }}
                            className='bg-[#1a1a1a] border border-[#232323] rounded-lg p-3 cursor-pointer'
                        >
                            <div className='flex items-start justify-between gap-3'>
                                <div className='flex items-start gap-3 min-w-0'>
                                    {!elem.isChecked && (
                                        <div className='h-2 w-2 rounded-full bg-green-500 mt-1.5 shrink-0'></div>
                                    )}
                                    <div className='w-9 h-9 shrink-0 rounded-full overflow-hidden relative'>
                                        <div className='w-full flex items-center justify-center bg-green-500 z-0 h-full absolute'>
                                            <RiUserLine className='w-4 h-4' />
                                        </div>
                                        {elem.user?.pfp && (
                                            <img src={elem.user?.pfp} alt={elem.user?.username} className='w-full h-full object-cover absolute z-10' />
                                        )}
                                    </div>
                                    <div className='min-w-0'>
                                        <NotificationSummary elem={elem} />
                                    </div>
                                </div>
                                <StatusBadge elem={elem} />
                            </div>

                            <div className='mt-3 pt-3 border-t border-[#232323] flex items-center justify-between text-xs'>
                                <span className='text-gray-400'>{timeAgo(elem.createdAt)}</span>
                                <button className='p-1.5 rounded hover:bg-[#232323] text-gray-400'>
                                    <MoreVertical className='w-4 h-4' />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* ===== Tablet / desktop: grid table ===== */}
            <div className='hidden md:block overflow-x-auto'>
                <div className='min-w-[800px]'>
                    {/* Header row */}
                    <div className={`grid ${gridCols} text-left text-gray-500 border-b border-[#232323] text-sm`}>
                        <div className='py-3 px-2 font-medium'>Notification</div>
                        <div className='py-3 px-2 font-medium'>Type</div>
                        <div className='py-3 px-2 font-medium '>Date</div>
                        <div className='py-3 font-medium px-5 flex justify-end'>Action</div>

                    </div>

                    {/* Data rows */}
                    {getRequests.map((elem) => {
                        if (customTab === "unread" && elem.isChecked) return null;
                        if (customTab === "read" && !elem.isChecked) return null;
                        return (
                            <div onClick={() => { singleRequest(elem._id) }}
                                key={elem?._id}
                                className={`grid ${gridCols} cursor-pointer items-center border-b border-[#1e1e1e] hover:bg-[#1a1a1a]/60 text-sm`}>
                                <div className='py-3 px-2'>
                                    <div className='flex items-center gap-3'>
                                        {
                                            !elem.isChecked && (
                                                <div className='h-2 w-2 rounded-full bg-green-500 shrink-0'></div>
                                            )
                                        }
                                        <div className='w-8 h-8 shrink-0 rounded-full overflow-hidden relative'>
                                            <div className='w-full  flex items-center justify-center bg-green-500 z-0 h-full absolute'>
                                                <RiUserLine className='w-4 h-4' />
                                            </div>
                                            {
                                                elem.user?.pfp && (
                                                    <img src={elem.user?.pfp} alt={elem.user?.username} className='w-full h-full object-cover absolute z-10' />
                                                )
                                            }
                                        </div>
                                        <div className='min-w-0'>
                                            <NotificationSummary elem={elem} />
                                        </div>
                                    </div>
                                </div>

                                <div className='py-3 px-2'>
                                    <StatusBadge elem={elem} />
                                </div>

                                <div className='py-3 px-2 text-gray-400'>
                                    <span>{timeAgo(elem.createdAt)}</span>
                                </div>

                                <div className='py-3 flex px-5 justify-end items-center'>
                                    <button
                                        onClick={(e) => e.stopPropagation()}
                                        className='p-1.5 rounded hover:bg-[#2a2a2a] text-gray-400'
                                    >
                                        <MoreVertical className='w-4 h-4' />
                                    </button>
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AllNotificationInPage