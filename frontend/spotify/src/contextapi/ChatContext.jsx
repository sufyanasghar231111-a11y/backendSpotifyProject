/* eslint-disable react-hooks/set-state-in-effect */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { conversationApi, messageApi } from '../api/chatApi'
import { adminContext } from './AdminContext'
import socket from '../socket/socket'

// eslint-disable-next-line react-refresh/only-export-components
export const ConversationContext = createContext()
const ChatContext = ({ children }) => {

    const [messages, setMessages] = useState([])
    const [conversation, setConversation] = useState(null)
    const [chatInput, setChatInput] = useState('')
    const { userId } = useContext(adminContext)
    const createConversation = async () => {
        try {
            const res = await conversationApi({
                userId: userId?._id
            })
            console.log('BEFORE SET:', res.data.conversation)
            setConversation(res.data.conversation)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!userId?._id) return
        createConversation()
    }, [userId?._id])


    const sendMessage = async () => {
        try {
            const res = await messageApi(conversation._id, {
                text: chatInput
            })

            let newMessage = res.data.CreateMessage

            setMessages(prev => [
                ...prev,
                newMessage
            ])
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
        <ConversationContext.Provider value={{ createConversation, setChatInput, chatInput, sendMessage, messages, conversation }}>
            {children}
        </ConversationContext.Provider>
    )
}

export default ChatContext