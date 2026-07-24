import React, { useContext } from 'react'
import Login from '../pages/Login'
import { LogoutContext } from '../../src/contextapi/AuthContext'

function Artist() {
   let {handleLogout}=useContext(LogoutContext)

  return (
    <div>Artist
       <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Artist