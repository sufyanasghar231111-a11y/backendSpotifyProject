/* eslint-disable react-hooks/set-state-in-effect */
import React, { createContext, useEffect, useRef, useState } from 'react'
import { messageApi } from '../api/chatApi'
import socket from '../socket/socket'

// eslint-disable-next-line react-refresh/only-export-components
export const ConversationContext = createContext()
const ChatContext = ({ children }) => {

    const [messages, setMessages] = useState([])
    const [conversation, setConversation] = useState(null)
    const [chatInput, setChatInput] = useState('')


    let scrollRef = useRef(null)

    useEffect(()=>{
        if(messages.length > 0){
            scrollRef.current?.scrollIntoView({
                behavior:'smooth'
            })
        }
    },[messages])


    const sendMessage = async (e) => {
        e.preventDefault()
        if (!chatInput) return
        try {
            const res = await messageApi(conversation._id, {
                text: chatInput
            })

            let newMessage = res.data.CreateMessage

            setMessages(prev => [
                ...prev,
                newMessage
            ])
            setChatInput('')
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        const handleMessage = (message) => {
            console.log('socket message', message);
            setMessages(prev => [...prev, message])
        }
        socket.on('receive-message', handleMessage)

        return () => {
            socket.off('receive-message', handleMessage)
        }

    }, [])



    return (
        <ConversationContext.Provider value={{ setChatInput, chatInput, sendMessage, messages, setMessages, conversation, setConversation, scrollRef }}>
            {children}
        </ConversationContext.Provider>
    )
}

export default ChatContext