import React, { useContext, useState } from 'react'
import AllNotificationInPage from '../../component/adminPageComponent/notificationpagecomponent/AllNotificationInPage'
import { requestContext } from '../../contextapi/UserRequest'

const AdminNotificationPage = () => {
  const [customTab, setCustomTab] = useState('all')
  const { getRequests } = useContext(requestContext)
  const unread = (getRequests.filter(elem => !elem.isChecked)).length
  const read = (getRequests.filter(elem => elem.isChecked)).length
  return (
    <div className='w-[75%]  ml-84 border-t mt-5 border-[#2e2e2e] p-6  bg-[#121212]'>
      <h1 className='text-xl font-semibold leading-5'>
        Notifications <br />
        <span className='text-[12px] font-normal text-gray-400'>View and Manage all system notifications</span>
      </h1>
      <div className='flex items-center gap-3 pt-4 px-2  text-sm'>
        <button onClick={()=>{setCustomTab('all')}} className={`flex items-center justify-center gap-3  cursor-pointer hover:border-b-2 hover:border-green-600 rounded-b-sm pb-4 px-3  ${customTab === 'all'? ' border-green-500 border-b-2':'' } `}>All <div className={`rounded-2xl text-white  px-2 ${customTab === 'all'?'bg-green-600':"text-zinc-300"}  font-semibold`}>{getRequests.length} </div></button>
        <button onClick={()=>{setCustomTab('unread')}} className={`flex items-center justify-center gap-3  cursor-pointer hover:border-b-2 hover:border-green-600 rounded-b-sm pb-4 px-3  ${customTab === 'unread'? ' border-green-500 border-b-2':'' } `}>UnRead <div className={`rounded-2xl text-white  px-2 ${customTab === 'unread'?'bg-green-600':"text-zinc-300"}  font-semibold`}>{unread} </div></button>
        <button onClick={()=>{setCustomTab('read')}} className={`flex items-center justify-center gap-3 cursor-pointer hover:border-b-2 hover:border-green-600 rounded-b-sm  pb-4 px-3  ${customTab === 'read'? ' border-green-500 border-b-2':'' } `}>Read <div className={`rounded-2xl text-white  px-2 ${customTab === 'read'?'bg-green-600':"text-zinc-300"}  font-semibold`}>{read} </div></button>
      </div>
      <AllNotificationInPage customTab={customTab} />
    </div>
  )
}

export default AdminNotificationPage