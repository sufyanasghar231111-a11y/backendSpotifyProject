/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { createContext, useEffect, useState, useContext, use } from 'react'
import { resetContext } from './ResetPasswordContext'
import { deleteRequest, getNotificationData, getRequest, getSingleRequest, patchRequest, postApi, singleFetch } from '../api/userrequest'
import { adminContext } from './AdminContext'

export const requestContext = createContext()
export const notificationContext = createContext()
export const adminApprovalContext = createContext()
const UserRequest = ({ children }) => {
    const [requestpopup, setRequestpopup] = useState(false)
    // const [requestData, setRequestData] = useState([])
    const [description, setDescription] = useState('')
    const [popup, setPopup] = useState(false);
    const [notificationpopup, setNotificationpopup] = useState(false)
    const [getnotification, setGetnotification] = useState([])
    const [getRequests, setGetRequests] = useState([])
    const { user } = useContext(adminContext)
    const [singleRequestData, setSingleRequestData] = useState({})
    const [openSingleRequest, setOpenSingleRequest] = useState(false)
    const [notificationCheck, setNotificationCheck] = useState(false)
    const [getSingleNotification, setGetSingleNotification ] = useState({})

    const requestArtist = async () => {
        try {
            await postApi({
                requestDescription: description
            })
            setRequestpopup(false)
        }
        catch (err) {
            if (err.response?.status === 409) {
                setPopup(true)
            }
        }
    }

    const { authReady } = useContext(resetContext)

    const notificationGet = async () => {
        try {
            const res = await getNotificationData()
            setGetnotification(res.data.response)          
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!authReady || !user?.role) return
        notificationGet()
    }, [authReady, user])


    const adminGetRequest = async () => {
        try {
            const res = await getRequest()
            setGetRequests(res.data.getrequest)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!authReady || user?.role !== 'admin') return
        adminGetRequest()
    }, [user, authReady])


    const updateRequest =async (id) => {
        try{
           await patchRequest(id)
            await adminGetRequest()
        }
        catch(err){
            console.log(err);
        }
    }

    const deleteRequests = async (id) => {
        try{
            await deleteRequest(id)
            await adminGetRequest()
        }
        catch(err){
            console.log(err);
        }
    }

    const singleRequest = async (id) => {
        if(!id) return 
        try{
            
            const res = await getSingleRequest(id)
            
            setSingleRequestData(res.data.getSingle)
            await adminGetRequest()
            setOpenSingleRequest(true)
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if (!authReady || user?.role !== 'admin') return
        singleRequest()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authReady, user ])

    const singleNotification = async (id) => {
        if(!id) return
        try{
            const res = await singleFetch(id)
            setGetSingleNotification(res.data.updateData)
            await notificationGet()
            setNotificationCheck(true)
            setNotificationpopup(false)
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        if(!authReady || !user) return
        singleNotification()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authReady, user])



    return (
        <requestContext.Provider value={{ requestpopup, setRequestpopup, description, setDescription, requestArtist, setPopup, popup, getRequests }}>
            <notificationContext.Provider value={{ notificationpopup, setNotificationpopup, getnotification, notificationCheck, setNotificationCheck, getSingleNotification , singleNotification }}>
                <adminApprovalContext.Provider value={{updateRequest, deleteRequests, singleRequestData, singleRequest, openSingleRequest, setOpenSingleRequest}}>
                    {children}
                </adminApprovalContext.Provider>
            </notificationContext.Provider>
        </requestContext.Provider>
    )
}

export default UserRequest