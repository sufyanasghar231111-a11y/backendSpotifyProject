import api from '../api/axios'
import React, { createContext, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const resetContext = createContext()
const ResetPasswordContext = ({ children }) => {
    const [resetEmail, setResetEmail] = useState('')
    const [popup, setPopup] = useState(false)
    const [resetLoading, setResetLoading] = useState(false)
    const [authReady, setAuthReady] = useState(false);
    
    const [password, setpassword] = useState({
        newPassword: '',
        confirmPassword: ''
    })



    async function checkEmail(e) {
        e.preventDefault()
        try {
            setResetLoading(true)
            await api.post('/reset/postreset', {
                email: resetEmail
            })

            setPopup(true)

        }
        catch (err) {
            console.log(err)
        }
        finally {
            setResetLoading(false)
        }
    }

    function handlePasswordChange(e) {
        setpassword(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <resetContext.Provider value={{ resetEmail, setResetEmail, checkEmail, popup, setPopup, password, setpassword, handlePasswordChange, resetLoading, authReady, setAuthReady }}>
            {children}
        </resetContext.Provider>
    )
}

export default ResetPasswordContext
