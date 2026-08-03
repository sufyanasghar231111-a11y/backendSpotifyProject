/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { createContext, useEffect, useState, useContext, use } from 'react'
import { resetContext } from './ResetPasswordContext'
import { getNotificationData, getRequest, postApi } from '../api/userrequest'
import {adminContext} from './AdminContext'

export const requestContext = createContext()
export const notificationContext = createContext()
const UserRequest = ({ children }) => {
    const [requestpopup, setRequestpopup] = useState(false)
    // const [requestData, setRequestData] = useState([])
    const [description, setDescription] = useState('')
    const [popup, setPopup] = useState(false);
    const [notificationpopup, setNotificationpopup] = useState(false)
    const [getnotification, setGetnotification] = useState([])
    const [getRequests, setGetRequests] = useState([])
    const { user } = useContext(adminContext)

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
        if (!authReady || user?.role === 'admin') return
        notificationGet()
    },[authReady, user])


    const adminGetRequest = async () => {
        try{
            const res = await getRequest()
            setGetRequests(res.data.getrequest)
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if(!authReady || !user?.role === 'admin') return
        adminGetRequest()
    },[user, authReady])


    return (
        <requestContext.Provider value={{ requestpopup, setRequestpopup, description, setDescription, requestArtist, setPopup, popup, getRequests}}>
            <notificationContext.Provider value={{ notificationpopup, setNotificationpopup, getnotification }}>
            {children}
            </notificationContext.Provider>
        </requestContext.Provider>
    )
}

export default UserRequest