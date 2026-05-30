import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'


const Musicforsearch = () => {
  const { query } = useParams()

  let [result, setResults]=useState([])
  useEffect(()=>{
     async function fetchData() {
    const res = await axios.get(
      `http://localhost:3000/api/creator/getMusic?search=${query}`
    )

    setResults(res.data.music)
  }

  fetchData()
  },[query])


  return (
    <div>
      {
        result.map((elem)=>{
          return <div>
            {elem.title}
          </div>
        })
      }
    </div>
  )
}

export default Musicforsearch
