import React, { createContext, useContext, useEffect, useState } from 'react'
import { montlyActiveUser } from '../api/AdminApi'
import { resetContext } from './resetPasswordContext'

// eslint-disable-next-line react-refresh/only-export-components
export const adminContext = createContext()
const AdminContext = ({children}) => {
    const [getMonthlyActive, setMonthlyActive] = useState([])
    const [user, setUser] = useState(null)
    const [role, setRole] = useState('')
    const {authReady} = useContext(resetContext)
    const getActiveApi = async  () =>{
        try{
            const res = await montlyActiveUser(role)
            setMonthlyActive(res.data.chartData)
        }
        catch(err){
            console.log(err);
        }
    }    

    useEffect(()=>{
        if(!authReady || user.role === 'artist' || user.role === 'user') return 
        getActiveApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authReady, user])
  return (
    <adminContext.Provider value={{getMonthlyActive, role, setRole, user, setUser}}>
        {children}
    </adminContext.Provider>
  )
}

export default AdminContext