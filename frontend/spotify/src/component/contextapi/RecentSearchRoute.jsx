import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const authSearch=createContext()
const RecentSearchRoute = ({children}) => {

    let [getSearch, setGetSearch]=useState([])
    async function getRecentSearch(){
        try{
            const res=await axios.get('http://localhost:3000/api/search/getSearch', {withCredentials:true})
            setGetSearch(res.data.getSearchItem)
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getRecentSearch()
    },[])
  return (
    <authSearch.Provider value={{getSearch}}>
      {children}
    </authSearch.Provider>
  )
}

export default RecentSearchRoute
