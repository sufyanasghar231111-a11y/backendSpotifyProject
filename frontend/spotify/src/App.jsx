import React, { useContext } from 'react'
import { Routes ,Route } from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import ShowAll from '../src/component/home/ShowAll'
import Detail from './component/home/Detail'
import AllAlbum from './component/allalbum/AllAlbum'
import AlbumDetail from './component/home/AlbumDetail'
import LikeSong from './like/LikeSong'
import PlayUI from './like/PlayUI'
import ProtectedRoute from './contextapi/ProtectedRoute'
import Home from './pages/Home'
import { authProvider } from './contextapi/AuthContext'
import UserProfile from './component/login/UserProfile'
import LoadingAnimation from './component/home/LoadingAnimation'
import Musicforsearch from './component/library/Musicforsearch'


function App() {
  let {authReady}=useContext(authProvider)
    if (!authReady){
      return <LoadingAnimation />
      }
  return (

    <div className='w-full bg-[#121212] text-white h-screen'>  
      <Routes >
        <Route path='/' element={<Login />} />
         <Route path='/register' element={<Register />} />
         <Route element={<ProtectedRoute />} >
         <Route element={<Home />}>
        <Route path='showall' element={<ShowAll />} />
        <Route path='detail/:id' element={<Detail />} />
        <Route path='showallalbum' element={ <AllAlbum /> } />
        <Route path='albumdetail/:id' element={ < AlbumDetail /> } />
        <Route path='like' element={ <LikeSong />} />
        <Route path='playlist/:id' element={ <PlayUI  />} />
        <Route path='visible/:id' element={ <PlayUI  />} />
        <Route path='profile' element={<UserProfile />} />
        <Route path='searchmusic' element={<Musicforsearch />} />
         </Route>
         </Route>
        </Routes> 
          </div>
  )
}


export default App