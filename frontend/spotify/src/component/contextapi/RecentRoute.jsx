import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
export const authRecent=createContext()
const RecentRoute = ({children}) => {
  let [recentActivity, setRecentActivity]=useState([])
async  function fetchRecent(){
    try{
      const res=await axios.get('http://localhost:3000/api/moreuser/getrecent', {withCredentials:true})
      setRecentActivity(res.data.get)
      console.log(res.data.get);
    }
    catch(err){
      console.log(err);
      
    }
  }
  useEffect(()=>{
    fetchRecent()
  },[])
  return (
    <authRecent.Provider value={{recentActivity}}>
      {children}
    </authRecent.Provider>
  )
}

export default RecentRoute
