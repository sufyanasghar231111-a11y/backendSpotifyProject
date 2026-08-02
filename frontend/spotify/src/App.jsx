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
import LoadingAnimation from './component/homepagecomponent/LoadingAnimation'
import Musicforsearch from './pages/Musicforsearch'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import { resetContext } from './contextapi/resetPasswordContext'
import ProtectedOtpRoute from './route/ProtectedOtpRoute'
import OtpPage from './pages/OtpPage'
import PublicRoute from './route/PublicRoute'
import Admin from './pages/adminpage/Admin'
import AdminUserPage from './pages/adminpage/AdminUserPage'
import AdminArtistPage from './pages/adminpage/AdminArtistPage'
import AdminSongPage from './pages/adminpage/AdminSongPage'
import AdminPlaylistpage from './pages/adminpage/AdminPlaylistpage'
import AdminAlbumPage from './pages/adminpage/AdminAlbumPage'
import AdminNotificationPage from './pages/adminpage/AdminNotificationPage'
import AdminSettingpage from './pages/adminpage/AdminSettingpage'
import AdminRoute from './route/AdminRoute'


function App() {
  let {authReady}=useContext(resetContext)
    if (!authReady){
      return <LoadingAnimation />
      }
  return (

    <div className='w-full bg-[#121212] text-white h-screen'>  
      <Routes >
        
        {/* public route */}
        <Route element={<PublicRoute />}>
        <Route path='/login' element={<Login />} />
         <Route path='/register' element={<Register />} />
         <Route path='/forget-password' element={<ForgetPassword />} />
         <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Route>

        {/* Public opt-route */}
         <Route element={<ProtectedOtpRoute />} >
         <Route path='/opt-verify' element={<OtpPage />} />
         </Route>

         {/* protected route only login user can access */}
         <Route element={<AdminRoute />}>
         <Route path='/admin' element={<Admin />} >
         <Route path='users' element={<AdminUserPage />} />
         <Route path='artists' element={<AdminArtistPage />} />
         <Route path='songs' element={<AdminSongPage />} />
         <Route path='playlists' element={<AdminPlaylistpage />} />
         <Route path='albums' element={<AdminAlbumPage />} />
         <Route path='notifications' element={<AdminNotificationPage />} />
         <Route path='Settings' element={<AdminSettingpage />} />
         </Route>
         </Route>
         
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