import React, { useContext } from 'react'
import Login from '../pages/Login'
import { authProvider } from '../../src/contextapi/AuthContext'

function Admin() {
  let {handleLogout}=useContext(authProvider)
 
  return (
    <div>
    admin
    <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Admin