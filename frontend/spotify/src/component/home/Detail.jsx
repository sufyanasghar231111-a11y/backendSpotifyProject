import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const Detail = () => {

  let {id}=useParams()
  let [data,setData]=useState([])
  async function fetchSingleMusic(){
    try{
    const res=await axios.get(`http://localhost:3000/api/creator/singleMusic/${id}`) 
    setData(res.data)
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchSingleMusic()
  },[])

  console.log(data.detail?.title);
  
  return (
    <div className='text-white'>
      {data.detail?.title}
    </div>
  )
}

export default Detail
