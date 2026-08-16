import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { authRecent } from '../contextapi/RecentRoute';
import { authSearch } from '../contextapi/RecentSearchRoute';
import { musciControl } from '../contextapi/MusicControllerContext';
import { audioContext } from '../contextapi/AudioProvider';
import { authPlaylist } from '../contextapi/PlaylistContext';
import { checkUser, deleteUserPfp, loginUser, logoutUser, otpCreate, register, rotation, updateUserPfp } from '../api/authApi';
import { deleteLibraryData, getLibraryData, updateLibraryData } from '../api/library';
import { setAccessToken, removeAccessToken } from '../api/accessToken';
import { resetContext } from './ResetPasswordContext';
import { adminContext } from './AdminContext';

let authInitializationPromise = null;

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
    const [otp, setOtp] = useState({
        email: '',
        otpHash: ''
    })
    const [otploading, setOtpLoading] = useState(false)
    const [wrongPassword, setWrongPassword] = useState(false)
    const [alreadyExist, setAlreadyExist] = useState(false)
     const [invalidOtp, setInvalidOtp] = useState(false)

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
    const { user, setUser } = useContext(adminContext)
    const { authReady, setAuthReady } = useContext(resetContext)


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

    const regValid = emailreg !== '' &&
        passwordreg !== '' &&
        passwordreg.length === 8 &&
        username !== ''

    const handleSumbit = useCallback(async (e) => {
        e.preventDefault()
        if (!regValid) return
        try {
            setLoading(true)
            await register(
                {
                    username: username,
                    email: emailreg,
                    password: passwordreg
                }
            )
            navigate('/otp-verify')
            setUsername('')
            setEmailreg('')
            setPasswordreg('')

        }
        catch (err) {
            console.log("REGISTER ERROR:", err)
            if(err.response.status === 409){
                setAlreadyExist(true)
            }
        }
        finally {
            setLoading(false)
        }
    }, [regValid, username, emailreg, passwordreg, navigate])


    const loginValid = login.email !== '' &&
        login.password !== '' &&
        login.password.length === 8

    const handleLogin = useCallback(async (e) => {
        e.preventDefault()
        if (!loginValid) return
        try {
            setLoading(true)
            const res = await loginUser(
                {
                    email: login.email,
                    password: login.password
                }
            )

            const userData = res.data?.user || res.data
            setAccessToken(res.data?.accessToken)
            setUser(userData)
            setAuthReady(true)

            if (userData?.role !== 'admin') {
                await Promise.all([
                    handleGetPlayList(),
                    getLibrary(),
                    fetchRecent(),
                    getMusicPlaying(),
                    getRecentSearch(),
                ])
            }

        }
        catch (e) {

            if (e?.response?.status === 401) {
                setWrongPassword(true)
            }
        }
        finally {
            setLoading(false)
        }

    }, [loginValid, login.email, login.password, setUser, setAuthReady, handleGetPlayList, fetchRecent, getMusicPlaying, getRecentSearch])

    useEffect(() => {
        if (authInitializationPromise) {
            return;
        }

        async function initializeAuth() {
            try {
                const rotationRes = await rotation();
                if (!rotationRes?.data?.accessToken) {
                    setUser(null)
                    setAccessToken(null);
                    return
                }
                const token = rotationRes.data.accessToken
                setAccessToken(token);

                const userRes = await checkUser();
                setUser(userRes.data.getAuthData);

            } catch (err) {
                console.log(err);
                
                setUser(null);
            setAccessToken(null);

            } finally {
                setAuthReady(true);
                authInitializationPromise = null;
            }
        }

        authInitializationPromise = initializeAuth();

    }, [setAuthReady, setUser]);

    async function handleLogout() {

        try {
            setLoading(true)
            await logoutUser()
        }
        catch (e) {
            console.log('Logout failed:', e);
        }
        finally {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.currentTime = 0
                audioRef.current.src = ''
            }
            setCurrentSong(null)
            setAccessToken(null)
            removeAccessToken()
            setUser(null)
            setHideSure(false)
            setLoading(false)
            navigate('/', { replace: true })
        }
    }

    const valid =
        otp.email !== '' &&
        otp.otpHash !== '' &&
        otp.otpHash.length === 6

    async function handleOtp(e) {
        e.preventDefault()
        if (!valid) return
        try {
            setOtpLoading(true)
            const res = await otpCreate({
                otpHash: otp.otpHash,
                email: otp.email
            })

            const userData = res.data?.user || res.data
            setAccessToken(res.data?.accessToken)
            setUser(userData)
            setAuthReady(true)

            if (userData?.role !== 'admin') {
                await Promise.all([
                    handleGetPlayList(),
                    getLibrary(),
                    fetchRecent(),
                    getMusicPlaying(),
                    getRecentSearch(),
                ])
            }

            navigate('/')

        }
        catch (error) {
            if (error.response?.status !== 401) {
                console.error("Auth initialization failed:", error);
            }

            if(error.response?.status === 400){
                setInvalidOtp(true)
            }

        }
        finally {
            setOtpLoading(false)

        }
    }

    function handleOtpChange(e) {
        setOtp(prev => ({
            ...prev,
            [e.target.name]: e.target.value
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
        if (!authReady || !user) return
        if (user?.role === "admin") return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getLibrary()

    }, [authReady, user])

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
        handleSumbit, emailreg, setEmailreg, passwordreg, setPasswordreg, handleLogin, handleChange, login, setLogin, handleOtp, otp, setOtp, handleOtpChange   // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [emailreg, passwordreg, login, otp])

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
        loading, setLoading, otploading, setOtpLoading, valid, loginValid, wrongPassword, regValid, alreadyExist, invalidOtp
    }), [loading, otploading, valid, loginValid, wrongPassword, regValid, alreadyExist, invalidOtp])

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