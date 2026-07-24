import React, { createContext, useState } from 'react'
import { postApi } from '../api/userrequest'

export const requestContext = createContext()
const UserRequest = ({ children }) => {
    const [requestpopup, setRequestpopup] = useState(false)
    const [requestData, setRequestData] = useState([])
    const [description, setDescription] = useState('')
    const [popup, setPopup] = useState(false);

    const requestArtist = async () => {
        try {
            const res = await postApi({
                requestDescription: description
            })
            setRequestData(res.data.sendrequest)
        }
        catch (err) {
            if(err.response?.status === 409){
                setPopup(true)
            }
        }
    }



    return (
        <requestContext.Provider value={{ requestpopup, setRequestpopup, description, setDescription, requestArtist, setPopup, popup}}>
            {children}
        </requestContext.Provider>
    )
}

export default UserRequest