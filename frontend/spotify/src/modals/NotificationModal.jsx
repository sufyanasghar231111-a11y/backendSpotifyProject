import React, { useContext } from 'react'
import { notificationContext } from '../contextapi/UserRequest'
import { RiCheckLine, RiCloseLine } from '@remixicon/react'
import { timeAgo } from '../utils/TimeAgo'

const NotificationModal = () => {
    const { notificationpopup, getnotification } = useContext(notificationContext)

    return (
        <div className={`absolute  ${notificationpopup ? ' overflow-auto opacity-100 pointer-events-auto  translate-y-0 max-h-80 max-sm:max-h-50 p-1 z-40 ' : 'pointer-events-none  opacity-0 -translate-y-2  h-0 p-0 border-0 overflow-hidden '} w-45  max-[500px]:w-45 md:w-55 lg:w-60 right-26 max-sm:right-10 max-sm:top-10 top-14  border rounded transition-all ease duration-400 bg-zinc-900 border-zinc-700 shadow-2xl p-1`}>
            <div className='flex flex-col gap-1'>

            {
                getnotification.map((elem) => {
                    return <div key={elem._id} className="flex gap-3 rounded-lg bg-zinc-800 p-3 hover:bg-zinc-700 transition-colors cursor-pointer">
                            {
                                elem?.isApproved ? (
                                    <div className="flex h-10 max-sm:h-8 max-sm:w-8 w-10 items-center justify-center rounded-full bg-green-600 text-white text-lg">
                                     <RiCheckLine />
                              </div>
                                ):
                                (
                                    <div  className="flex h-10 max-sm:h-8 max-sm:w-8 w-10 items-center justify-center rounded-full bg-red-600 text-white text-lg">
                                       ✕
                                    </div>
                                )
                            }

                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm max-sm:text-xs font-semibold text-white">
                                {elem.title}
                            </h3>

                            <p className="mt-1 text-xs max-sm:text-[10px] text-zinc-300 line-clamp-2">
                                {elem.message}
                            </p>
                            <div className='flex items-center justify-between'>
                                <span className="mt-2 block text-[11px] max-sm:text-[9px] text-zinc-500">
                                    {timeAgo(elem.createdAt)} 
                                </span>
                                <div className='mt-2'>
                                    <RiCloseLine className='w-4 h-4 text-zinc-500' />
                                </div>
                            </div>
                        </div>

                        {!elem.isRead && (
                            <span className="mt-1 h-2 w-2 rounded-full bg-blue-500"></span>
                        )}

                    </div>

                })
            }
            </div>

        </div>
    )
}

export default NotificationModal