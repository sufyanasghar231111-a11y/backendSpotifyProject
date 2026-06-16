import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
export const  authRecent=createContext()
const RecentRoute = ({children}) => {
  let [recentActivity, setRecentActivity]=useState([])
  
const  fetchRecent= useCallback(async()=>{
    try{
      const res=await axios.get('http://localhost:3000/api/moreuser/getrecent', {withCredentials:true})
      setRecentActivity(res.data.get)      
    }
    catch(err){
      console.log(err);
    }
  },[])

  useEffect(()=>{
    fetchRecent()
  },[])

  const  update= useCallback (async (id) => {
    try{
      await axios.patch(`http://localhost:3000/api/moreuser/updaterecent/${id}`, {} ,{withCredentials:true})
      await fetchRecent()
    }
    catch(err){
      console.log(err);
      
    }
  },[fetchRecent])

  async function updateAlbum(id){
    try{
      const res=await axios.patch(`http://localhost:3000/api/moreuser/updateRecentAlbum/${id}`, {} ,{withCredentials:true})
      setRecentActivity(res.data.update)
      await fetchRecent()
    }
    catch(err){
      console.log(err);
      
    }
  }
  
  async function deleteData(id){
    try{
      const res=await axios.delete(`http://localhost:3000/api/moreuser/deleterecent/${id}` ,{withCredentials:true})
      setRecentActivity(res.data.deletere)
      await fetchRecent()
    }
    catch(err){
      console.log(err);
      
    }
  }

  const value = useMemo(() => ({
    recentActivity,
    update,
    deleteData,
    updateAlbum,
    fetchRecent
  }), [recentActivity, update, deleteData, updateAlbum, fetchRecent])

  return (
    <authRecent.Provider value={value}>
      {children}
    </authRecent.Provider>
  )
}

export default RecentRoute
