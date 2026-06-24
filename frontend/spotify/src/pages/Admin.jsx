import React, { useContext } from 'react'
import Login from '../pages/Login'
import { LogoutContext } from '../../src/contextapi/AuthContext'

function Admin() {
  let {handleLogout}=useContext(LogoutContext)
 
  return (
    <div>
    admin
    <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Admin