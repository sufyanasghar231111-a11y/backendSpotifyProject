import React from 'react'

const UserNames = ({user}) => {
     const userName = user.trim()
    const extractName = ((userName.split(' ')[0][0] + userName.split(' ').pop()[0]).toUpperCase())
  return (
    <div>{extractName}</div>
  )
}

export default UserNames