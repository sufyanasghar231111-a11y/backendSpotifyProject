import React, { createContext, useContext, useEffect, useState } from 'react'
import { montlyActiveUser } from '../api/AdminApi'
import { resetContext } from './resetPasswordContext'

// eslint-disable-next-line react-refresh/only-export-components
export const adminContext = createContext()
const AdminContext = ({children}) => {
    const [getMonthlyActive, setMonthlyActive] = useState([])
    const [user, setUser] = useState(null)
    const {authReady} = useContext(resetContext)
    
    const getActiveApi = async  () =>{
        try{
            const res = await montlyActiveUser({
                params:{
                    role:'user'
                }
            })
            setMonthlyActive(res.data.chartData)
        }
        catch(err){
            console.log(err);
        }
    }    

    useEffect(()=>{
        if(!authReady || user.role === 'artist' || user.role === 'user') return 
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getActiveApi()
    },[authReady, user])
  return (
    <adminContext.Provider value={{getMonthlyActive, user, setUser}}>
        {children}
    </adminContext.Provider>
  )
}

export default AdminContext