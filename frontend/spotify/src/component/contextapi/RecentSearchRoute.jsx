import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const authSearch=createContext()
const RecentSearchRoute = ({children}) => {

    let [getSearch, setGetSearch]=useState([])
    let [musicresults, setMusicResults] = useState([])
    let [albumresults, setAlbumResults] = useState([])
   

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

    async function patchRecentSearch(id) {
      try{
      await axios.patch(`http://localhost:3000/api/search/songSearch/${id}`, {}, {withCredentials:true})
        
        await getRecentSearch()
      }
      catch(err){
        console.log(err);
      }
    }
    async function patchAlbumRecentSearch(id) {
      try{
      await axios.patch(`http://localhost:3000/api/search/albumSearch/${id}`, {}, {withCredentials:true})
        
        await getRecentSearch()
      }
      catch(err){
        console.log(err);
      }
    }
    async function deleteRecentSearch(id) {
      try{
      await axios.delete(`http://localhost:3000/api/search/deleteSearch/${id}`, {withCredentials:true})
      
        await getRecentSearch()
      }
      catch(err){
        console.log(err);
      }
    }

   

  return (
    <authSearch.Provider value={{getSearch,patchRecentSearch,deleteRecentSearch,patchAlbumRecentSearch,getRecentSearch, albumresults, setAlbumResults,musicresults,setMusicResults}}>
      {children}
    </authSearch.Provider>
  )
}

export default RecentSearchRoute