import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import Login from "./component/login/Login"
import Register from "./component/register/Register"
import User from './component/user/User'
import Artist from './component/artist/Artist'

function App() {
  return (
    <div>
      <Routes >
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/artist' element={<Artist />} />
        <Route path='/user' element={<User />} />
        </Routes> 
          </div>
  )
}

export default App