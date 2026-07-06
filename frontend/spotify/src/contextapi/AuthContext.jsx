import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authRecent } from '../contextapi/RecentRoute';
import { authSearch } from '../contextapi/RecentSearchRoute';
import { musciControl } from '../contextapi/MusicControllerContext';
import { audioContext } from '../contextapi/AudioProvider';
import { authPlaylist } from '../contextapi/PlaylistContext';
import { checkUser, deleteUserPfp, loginUser, logoutUser, otpCreate, register, rotation, updateUserPfp } from '../api/authApi';
import { deleteLibraryData, getLibraryData, updateLibraryData } from '../api/library';
import {  setAccessToken } from '../api/accessToken';
import { resetContext } from './resetPasswordContext';


// eslint-disable-next-line react-refresh/only-export-components
export const authProvider = createContext()
// eslint-disable-next-line react-refresh/only-export-components
export const ProfileContext = createContext()
// eslint-disable-next-line react-refresh/only-export-components
export const LibraryContext = createContext()
// eslint-disable-next-line react-refresh/only-export-components
export const UIContext = createContext()
// eslint-disable-next-line react-refresh/only-export-components
export const LogoutContext = createContext()
const AuthContext = ({ children }) => {

    // All Navigates
    let navigate = useNavigate()
    // All Null states
    let [user, setUser] = useState(null)
    let [preview, setPreview] = useState(null)
    let [updateprofile, setUpdateprofile] = useState(null)

    // All Input field states
    let [username, setUsername] = useState('')
    let [emailreg, setEmailreg] = useState('')
    let [passwordreg, setPasswordreg] = useState('')
    let [updatename, setUpdatename] = useState('')
    let [login, setLogin] = useState({
        email: '',
        password: ""
    })
    const [otp, setOtp]=useState({
        email:'',
        otpHash:''
    })
    const [otpBased, setOtpBased]=useState([])

    // All Toggle or true & false states 
    let [loading, setLoading] = useState(false)
    
    let [hideSure, setHideSure] = useState(false)
    let [hideProfileDetail, setHideProfileDetail] = useState(false)

    // All ref
    let imageref = useRef()

    // All Array
    let [library, setLibrary] = useState([])

    // All Usecontext from context api
    let { fetchRecent } = useContext(authRecent)
    let { getRecentSearch } = useContext(authSearch)
    let { getMusicPlaying } = useContext(musciControl)
    let { handleGetPlayList } = useContext(authPlaylist)
    let { setCurrentSong, audioRef } = useContext(audioContext)
    const {authReady, setAuthReady}=useContext(resetContext)


    // this is for input field in profile update input it by default set user name 
    useEffect(() => {
        if (user?.username) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUpdatename(user.username)
        }
    }, [user])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getLibrary = async () => {
        try {
            const res = await getLibraryData()
            setLibrary(res.data.getLib)
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleSumbit = useCallback(async (e) => {
        e.preventDefault()
        try {
            const res = await register(
                {
                    username: username,
                    email: emailreg,
                    password: passwordreg
                }
            )
            setOtpBased(res.data.user)
            navigate('/opt-verify')
            setUsername('')
            setEmailreg('')
            setPasswordreg('')
            
            
            
        }
        catch (err) {
            console.log(err);
        }
    }, [username, emailreg, passwordreg, navigate])

    const handleLogin = useCallback(async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await loginUser(
                {
                    email: login.email,
                    password: login.password
                }
            )

            setAccessToken(res.data?.accessToken)
            setUser(res.data)
            setAuthReady(true)
            await Promise.all([
                handleGetPlayList(),
                getLibrary(),
                fetchRecent(),
                getMusicPlaying(),
                getRecentSearch(),
            ])
            
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false)
        }

    }, [login.email, login.password, setAuthReady, handleGetPlayList, fetchRecent, getMusicPlaying, getRecentSearch])

   useEffect(() => {
    async function initializeAuth() {
        try {
            const rotationRes = await rotation();
            setAccessToken(rotationRes.data.accessToken);
            
            const userRes = await checkUser();
            setUser(userRes.data.getAuthData);
            
        } catch (err) {
            // User not logged in or session expired - this is expected for new users
            console.log('Auth initialization: User not authenticated', err?.response?.status);
            
        } finally {
            setAuthReady(true);
        }
    }

    initializeAuth();
}, [setAuthReady]);

    async function handleLogout() {
        try {
            await logoutUser()
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.currentTime = 0
                audioRef.current.src = ''
            }
            setCurrentSong(null)
        }
        catch (e) {
            console.log(e);
        }
        setUser(null)
    }

    async function handleOtp(e) {
        e.preventDefault()
        try{
            
            const res = await otpCreate({
                otpHash:otp.otpHash,
                email:otp.email
            })

            setAccessToken(res.data?.accessToken)
            setUser(res.data.user)
            setAuthReady(true)

             navigate('/')
            await Promise.all([
                handleGetPlayList(),
                getLibrary(),
                fetchRecent(),
                getMusicPlaying(),
                getRecentSearch(),
            ])

        }
        catch(err){
            console.log(err);
            
        }
        finally {
            setLoading(false)
        }
    }

    function handleOtpChange(e){
        setOtp(prev => ({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    function handleChange(e) {
        setLogin(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    async function updatePfp(e) {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('pfp', updateprofile)
            formData.append('username', updatename)
            const res = await updateUserPfp(formData)
            setUser(prev => ({
                ...prev,
                pfp: res.data.pfp,
                username: res.data.username
            }))
            setHideProfileDetail(false)

        }
        catch (err) {
            console.log(err);
        }
    }

    async function removePfp() {
        try {
            const res = await deleteUserPfp()
            setUser(prev => ({
                ...prev,
                pfp: res.data.deletePfp?.pfp
            }))
            setPreview(null)
            setUpdateprofile(null)
            if (imageref.current) {
                imageref.current.value = ''
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(!authReady) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getLibrary()
        
    }, [authReady])

    async function addToLibrary(id) {
        try {
            await updateLibraryData(id)

            await getLibrary()
        }
        catch (err) {
            console.log(err);
        }
    }

    async function removeTolibrary(id) {
        try {
            await deleteLibraryData(id)
            await getLibrary()
        }
        catch (err) {
            console.log(err);
        }
    }

    const auth = useMemo(() => ({
        user, setUser, handleSumbit, emailreg, setEmailreg, passwordreg, setPasswordreg, handleLogin, handleChange, login, setLogin ,otpBased,handleOtp  ,otp, setOtp  ,handleOtpChange   // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [user, emailreg, passwordreg, login,otpBased,otp])

    const logout = useMemo(() => ({
        handleLogout, hideSure, setHideSure
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [hideSure])

    const profile = useMemo(() => ({
        username, setUsername, updatePfp, updatename, setUpdatename, updateprofile, setUpdateprofile, preview, setPreview, removePfp, imageref, hideProfileDetail, setHideProfileDetail
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [username, updatename, preview, hideProfileDetail])

    const librarys = useMemo(() => ({
        library, addToLibrary, removeTolibrary, getLibrary
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [library])

    const ui = useMemo(() => ({
        loading, setLoading, name
    }), [loading])

    return (
        <authProvider.Provider value={auth}>
            <LogoutContext.Provider value={logout}>

                <ProfileContext.Provider value={profile}>
                    <LibraryContext.Provider value={librarys}>
                        <UIContext.Provider value={ui}>
                            {children}
                        </UIContext.Provider>
                    </LibraryContext.Provider>
                </ProfileContext.Provider>
            </LogoutContext.Provider>
        </authProvider.Provider>
    )
}

export default React.memo(AuthContext)