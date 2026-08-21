import React, { useContext, useEffect } from 'react'
import { CheckCheck } from 'lucide-react'
import { getAllChatApi } from '../../api/chatApi'
import { ConversationContext } from '../../contextapi/ChatContext'
import { adminContext } from '../../contextapi/AdminContext'
import {timeAgo} from '../../utils/TimeAgo'

const UsersChat = () => {
  const { user } = useContext(adminContext)
  const { conversation, messages, setMessages, scrollRef } = useContext(ConversationContext)
  
  const getAllChat = async () => {
    try {
      const res = await getAllChatApi(conversation?._id)
      setMessages(res.data.getAllPreviousMessage)
      // await sendMessage()
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!conversation?._id) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getAllChat()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation?._id])

  return (
    <div className="w-full h-full overflow-y-auto px-4 py-3 flex flex-col gap-1.5">
      {
        messages?.map((elem) => {
          const sender = elem?.sender === user?._id
          return <div className={`flex ${sender ? 'justify-end':'justify-start' } `}>
            <div className={`relative max-w-[75%] sm:max-w-[65%] px-2.5 py-2.5 pr-2 rounded-lg  ${sender? "bg-green-800 rounded-br-none":'bg-[#111111] rounded-bl-none'}  shadow-sm text-[15px] leading-snug break-words`}>
              <span>{elem?.text}</span>

              <span className="float-right ml-2 mt-3 flex items-center justify-center gap-1 translate-y-1 text-[9px] text-gray-200">
                {timeAgo(elem.createdAt)}  {sender && <span ><CheckCheck className={`w-3 h-3 ${elem?.read ? 'text-blue-400':''} `} /></span>}
              </span>
              
            </div>
          </div>
        })
      }
      <div ref={scrollRef}></div>
    </div>
  )
}

export default UsersChat