import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import Login from "./component/login/Login"
import Register from "./component/register/Register"
import ShowAll from '../src/component/home/ShowAll'


function App() {
  return (
    <div className='w-full bg-[#121212] h-screen'>
      <Routes >
        <Route path='/' element={<Login />} >
        <Route path='showall' element={<ShowAll />} />
        </Route>
        <Route path='/register' element={<Register />} />

        </Routes> 
          </div>
  )
}

export default App