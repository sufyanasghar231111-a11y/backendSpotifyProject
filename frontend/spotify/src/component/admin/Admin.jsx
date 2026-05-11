import React, { useContext } from 'react'
import Login from '../login/Login'
import { authProvider } from '../contextapi/AuthContext'

function Admin() {
  let {handleLogout}=useContext(authProvider)
 
  return (
    <div>
    admi
    <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Admin