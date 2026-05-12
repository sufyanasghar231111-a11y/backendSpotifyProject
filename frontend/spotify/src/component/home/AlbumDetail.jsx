import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AlbumDetail = () => {
   let {id}=useParams()
   let [detailData, setDetailData]=useState({})
   async function detail() {
    try{
      let res=await axios.get(`http://localhost:3000/api/creator/allAlbum/${id}`)
      setDetailData(res.data.detailFetch)       
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    detail()
  },[])

  return (
    <div>
      {detailData.title}      
    </div>
  )
}

export default AlbumDetail
