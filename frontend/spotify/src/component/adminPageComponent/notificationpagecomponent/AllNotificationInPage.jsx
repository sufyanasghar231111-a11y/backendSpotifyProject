import React, { useContext } from 'react'
import { adminApprovalContext, requestContext } from '../../../contextapi/UserRequest'
import { RiPlayListLine, RiUserLine } from '@remixicon/react'
import { timeAgo } from '../../../utils/TimeAgo'
import { Search, MoreVertical } from 'lucide-react'

const AllNotificationInPage = ({ customTab }) => {
    const gridCols = 'grid-cols-[3fr_1fr_1fr_1fr]'
    const { getRequests } = useContext(requestContext)
    const { singleRequest } = useContext(adminApprovalContext)


    return (
        <div className='w-full bg-[#141414] rounded-xl border mt-4 border-[#232323] p-4'>
            {/* Toolbar */}
            <div className='relative w-64 mb-4'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500' />
                <input
                    type='text'
                    placeholder='Search users...'
                    className='w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-600'
                />
            </div>

            <div className='overflow-x-auto'>
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
                        return <>
                            <div onClick={() => { singleRequest(elem._id) }}
                                key={elem?._id}
                                className={`grid ${gridCols} cursor-pointer items-center border-b border-[#1e1e1e] hover:bg-[#1a1a1a]/60 text-sm`}>
                                <div className='py-3 px-2'>
                                    <div className='flex items-center gap-3'>
                                        {
                                            !elem.isChecked && (
                                                <div className='h-2 w-2 rounded-full bg-green-500'></div>
                                            )
                                        }
                                        <div className='w-8 h-8 rounded-full overflow-hidden relative'>
                                            <div className='w-full  flex items-center justify-center bg-green-500 z-100 h-full absolute'>
                                                <RiUserLine className='w-4 h-4' />
                                            </div>
                                            {
                                                elem.user?.pfp && (
                                                    <img src={elem.user?.pfp} alt={elem.user?.username} className='w-full h-full object-cover absolute z-101' />
                                                )
                                            }
                                        </div>
                                        <div>
                                            {
                                                elem.requestStatus === 'Pending' ? (
                                                    <>
                                                        <h1 className='text-sm'>New Artist Registration request</h1>
                                                        <h1 className='text-xs text-gray-400'><span className='text-green-500'>{elem.user.username}</span> has request to join as an artist</h1>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h1 className='text-sm'>Artist Verified </h1>
                                                        <h1 className='text-xs text-gray-400'><span className='text-green-500'>{elem.user.username}</span> has been verified as an artist </h1>
                                                    </>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>

                                {
                                    elem.requestStatus === 'Pending' ? (
                                        <div className="p-2 bg-yellow-900/30 w-fit text-yellow-500 text-xs font-semibold rounded">
                                            Pending
                                        </div>
                                    ) : (
                                        <div className="p-2 bg-green-900/30 w-fit text-green-500 text-xs font-semibold rounded">
                                            Approved
                                        </div>
                                    )
                                }


                                <div className='py-3 px-2   text-gray-400'>
                                    <span>{timeAgo(elem.createdAt)}</span>
                                </div>

                                <div className='flex px-5 justify-end items-center '>
                                    Action
                                </div>

                            </div>
                        </>

                    })}
                </div>
            </div>
        </div>
    )
}

export default AllNotificationInPage