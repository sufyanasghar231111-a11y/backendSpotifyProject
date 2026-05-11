import React, { useContext } from 'react'
import Login from '../login/Login'
import { authProvider } from '../contextapi/AuthContext'

function Artist() {
   let {handleLogout}=useContext(authProvider)

  return (
    <div>Artist
       <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Artist