import { RiSendPlaneFill } from '@remixicon/react'
import UsersChat from '../component/conversationcomponent/UsersChat'
import { conversationApi } from '../api/chatApi'
import { useContext, useState } from 'react'
import { ConversationContext } from '../contextapi/ChatContext'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import UserName from '../utils/UserNames'

const ConversationPage = () => {
  const { setConversation, chatInput, setChatInput, sendMessage } = useContext(ConversationContext)
  const { id } = useParams()
  const [chatUser, setChatUser] = useState(null)
  const createConversation = async () => {
    try {
      const res = await conversationApi(id)
      setConversation(res.data.conversation)
      setChatUser(res.data.user)
      console.log('BEFORE SET:', res.data.conversation)

    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!id) return
    createConversation()
  }, [id])

    const fetchname = chatUser?.username 
  ? ((chatUser.username.trim().split(' ')[0][0] + chatUser.username.trim().split(' ').pop()[0]).toUpperCase())
  : '' ;
  return (
    <div className='w-full max-sm:w-full relative ml-auto   rounded-lg overflow-hidden h-[76vh] bg-[#282828]'>
      <div className='h-[14%]  py-2 px-8  w-full sticky border-b border-zinc-700'>
        <div className='flex items-center gap-3'>
          <div className=' w-12 h-12 rounded-full overflow-hidden relative'>
            <div className=' absolute z-39 w-full h-full bg-green-500 flex items-center font-semibold justify-center'>
             {fetchname}
            </div>
            {
              chatUser?.pfp && (
                <img src={chatUser?.pfp} className='w-full h-full absolute z-40 object-cover' alt="" />
              )
            }
          </div>
          <div className=''>
            <h1 className='font-semibold text-[17px]'>{chatUser?.username}</h1>
            <h1 className='text-green-500 text-sm'>Online</h1>
          </div>
        </div>
      </div>
      <div className='h-[75%] bg-[#1A1A1A] left w-full overflow-y-auto'> 
          <UsersChat /> 
      </div>
      <div className='h-[11%]   w-full border-t border-zinc-700'>
        <form onSubmit={sendMessage} className='w-full flex items-center justify-center '>
          <div className='flex items-center justify-center py-2 gap-4 w-full'>
            <input value={chatInput} onChange={(elem) => { setChatInput(elem.target.value) }} type="text" className='border border-neutral-600 w-[50%] py-2 px-3 rounded-sm text-sm outline-0' placeholder='Type a message...' />
            <button disabled={!chatInput} type='submit' className={`bg-green-600 rounded-full flex ${chatInput.length > 0 ? " opacity-100" : ' opacity-55'} items-center justify-center w-8 h-8 hover:bg-green-700 cursor-pointer`}><RiSendPlaneFill className='w-5 h-5 rotate-45  pr-0.5' /></button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ConversationPage