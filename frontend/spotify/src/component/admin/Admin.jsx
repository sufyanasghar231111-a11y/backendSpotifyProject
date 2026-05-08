import React, { useContext } from 'react'
import { authProvider } from '../contextapi/AuthContext'
import Login from '../login/Login'

function Admin() {
  let {user}=useContext(authProvider)
 
  
  
  return (
    <div>

    {
      user?.role === 'admin'? (
        <div>hello</div>
      ):(
        <Login />
      )
    }
    
    </div>
  )
}

export default Admin