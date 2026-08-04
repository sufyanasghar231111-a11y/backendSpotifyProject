import React, { useContext } from 'react'
import { adminContext } from '../contextapi/AdminContext'

const Username = () => {
    const {user} = useContext(adminContext)
    const userName = user.username.trim()
    const extractName = ((userName.split(' ')[0][0] + userName.split(' ').pop()[0]).toUpperCase())
  return (
    <div>{extractName}</div>
  )
}

export default Username