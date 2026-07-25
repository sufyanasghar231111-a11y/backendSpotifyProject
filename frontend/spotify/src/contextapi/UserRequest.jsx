/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { createContext, useEffect, useState, useContext } from 'react'
import { resetContext } from './ResetPasswordContext'
import { getNotificationData, postApi } from '../api/userrequest'

export const requestContext = createContext()
export const notificationContext = createContext()
const UserRequest = ({ children }) => {
    const [requestpopup, setRequestpopup] = useState(false)
    // const [requestData, setRequestData] = useState([])
    const [description, setDescription] = useState('')
    const [popup, setPopup] = useState(false);
    const [notificationpopup, setNotificationpopup] = useState(false)
    const [getnotification, setGetnotification] = useState([])

    const requestArtist = async () => {
        try {
             await postApi({
                requestDescription: description
            })
        }
        catch (err) {
            if (err.response?.status === 409) {
                setPopup(true)
            }
        }
    }

    const { authReady } = useContext(resetContext)

    const notificationGet = async () =>{
        try{
            const res = await getNotificationData()
            setGetnotification(res.data.response)
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if (!authReady) return
        notificationGet()
    },[authReady])


    return (
        <requestContext.Provider value={{ requestpopup, setRequestpopup, description, setDescription, requestArtist, setPopup, popup}}>
            <notificationContext.Provider value={{ notificationpopup, setNotificationpopup, getnotification }}>
            {children}
            </notificationContext.Provider>
        </requestContext.Provider>
    )
}

export default UserRequest