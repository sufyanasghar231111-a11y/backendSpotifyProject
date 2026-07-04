/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { deleterecent, getrecent, patchrecent, patchrecentalbum } from '../api/recent'
import { resetContext } from './resetPasswordContext'

export const  authRecent=createContext()
const RecentRoute = ({children}) => {
  let [recentActivity, setRecentActivity]=useState([])
  const {authReady}=useContext(resetContext)
  
const  fetchRecent= useCallback(async()=>{
    try{
      const res=await getrecent()
      setRecentActivity(res.data.get)      
    }
    catch(err){
      console.log(err);
    }
  },[])

  useEffect(()=>{
    if(!authReady) return 
    fetchRecent()
  },[authReady])

  const  update= useCallback (async (id) => {
    try{
      await patchrecent(id)
      await fetchRecent()
    }
    catch(err){
      console.log(err);
      
    }
  },[fetchRecent])

  async function updateAlbum(id){
    try{
      const res=await patchrecentalbum(id)
      setRecentActivity(res.data.update)
      await fetchRecent()
    }
    catch(err){
      console.log(err);
      
    }
  }
  
  async function deleteData(id){
    try{
      const res=await deleterecent(id)
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
