import React, { useContext } from 'react'
import { Routes ,Route } from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import ShowAll from './pages/ShowAll'
import Detail from './pages/Detail'
import AllAlbum from './pages/AllAlbum'
import AlbumDetail from './pages/AlbumDetail'
import LikeSong from './pages/LikeSong'
import PlayUI from './pages/PlayUI'
import ProtectedRoute from './route/ProtectedRoute'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'
import LoadingAnimation from './component/home/LoadingAnimation'
import Musicforsearch from './pages/Musicforsearch'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import { resetContext } from './contextapi/resetPasswordContext'
import ProtectedOtpRoute from './route/ProtectedOtpRoute'
import OtpPage from './pages/OtpPage'
import PublicRoute from './route/PublicRoute'


function App() {
  let {authReady}=useContext(resetContext)
    if (!authReady){
      return <LoadingAnimation />
      }
  return (

    <div className='w-full bg-[#121212] text-white h-screen'>  
      <Routes >
        
        // public route 
        <Route element={<PublicRoute />}>
        <Route path='/login' element={<Login />} />
         <Route path='/register' element={<Register />} />
         <Route path='/forget-password' element={<ForgetPassword />} />
         <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Route>

        // Public opt-route
         <Route element={<ProtectedOtpRoute />} >
         <Route path='/opt-verify' element={<OtpPage />} />
         </Route>

         // protected route only login user can access
         <Route element={<ProtectedRoute />} >
         <Route path='/' element={<Home />} >
        <Route path='showall' element={<ShowAll />} />
        <Route path='detail/:id' element={<Detail />} />
        <Route path='showallalbum' element={<AllAlbum />} />
        <Route path='albumdetail/:id' element={<AlbumDetail />} />
        <Route path='like' element={ <LikeSong />} />
        <Route path='playlist/:id' element={ <PlayUI  />} />
        <Route path='visible/:id' element={ <PlayUI  />} />
        <Route path='profile' element={<UserProfile />} />
        <Route path='profile/:id' element={<UserProfile />} />
        <Route path='searchmusic' element={<Musicforsearch />} />
        </Route>
         </Route>
        </Routes> 
          </div>
  )
}


export default App