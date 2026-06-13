import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authRecent } from './RecentRoute';
import { authSearch } from './RecentSearchRoute';
import { musciControl } from './MusicControllerContext';
import { audioContext } from './AudioProvider';
import { authPlaylist } from './PlaylistContext';


export const authProvider = createContext()
const AuthContext = ({ children }) => {
    let navigate = useNavigate()
    let [user, setUser] = useState(null)

    let [username, setUsername] = useState('')
    let [emailreg, setEmailreg] = useState('')
    let [passwordreg, setPasswordreg] = useState('')
    let [loading, setLoading] = useState(false)
    

    let [login, setLogin] = useState({
        email: '',
        password: ""
    })
    const [authReady, setAuthReady] = useState(false);
   
    let [hideSure, setHideSure] = useState(false)
    let [updatename, setUpdatename] = useState('')
    let [hideProfileDetail, setHideProfileDetail] = useState(false)
    let [updateprofile, setUpdateprofile] = useState(null)
    let [preview, setPreview] = useState(null)
    let imageref = useRef()
    let [library, setLibrary] = useState([])
    let [hideSearch, setHideSearch] = useState(false)
    let { fetchRecent } = useContext(authRecent)
    let { getRecentSearch } = useContext(authSearch)
    let { getMusicPlaying } = useContext(musciControl)
    let {handleGetPlayList} =useContext(authPlaylist)
    let {setCurrentSong,audioRef}=useContext(audioContext)

    useEffect(() => {
        if (user?.username) {
            setUpdatename(user.username)
        }
    }, [user])


    async function handleSumbit(e) {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register',
                {
                    username: username,
                    email: emailreg,
                    password: passwordreg
                }, { withCredentials: true }
            )

            
            setUsername('')
            setEmailreg('')
            setPasswordreg('')
            navigate('/')
            await handleGetPlayList();
            await getLibrary()
            await fetchRecent()
            await getRecentSearch()
            await getMusicPlaying()
            setUser(response.data.user)
        }
        catch (err) {
            console.log(err);
        }
    }

    async function handleLogin(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const checkLogin = await axios.post('http://localhost:3000/api/auth/login',
                {
                    email: login.email,
                    password: login.password
                },
                { withCredentials: true }
            )

            setAuthReady(true)
            await handleGetPlayList();
            await getLibrary()
            await fetchRecent()
            await getRecentSearch()
            await getMusicPlaying()
            setUser(checkLogin.data)
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false)
        }

    }

    async function checkRefresh() {
        try {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            let res = await axios.get("http://localhost:3000/api/auth/user",
                { withCredentials: true }
            )
            setUser(res.data.getAuthData)
            setAuthReady(true)
        }
        catch (e) {
            console.log(e);
            setUser(null)
        }
        finally {

            setAuthReady(true)
        }
    }

    useEffect(() => {
        checkRefresh()

    }, [])

    async function handleLogout() {
        try {
            await axios.post('http://localhost:3000/api/auth/logout',
                {},
                { withCredentials: true }
            )
            if(audioRef.current){
                audioRef.current.pause()
                audioRef.current.currentTime=0
                audioRef.current.src=''
            }
            setCurrentSong(null)
        }
        catch (e) {
            console.log(e);
        }
        setUser(null)
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
            const res = await axios.put('http://localhost:3000/api/auth/updatepfp', formData, { withCredentials: true })
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
            const res = await axios.delete('http://localhost:3000/api/auth/removePfp', { withCredentials: true })
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

    async function getLibrary() {
        try {
            const res = await axios.get('http://localhost:3000/api/user/getLibrary', { withCredentials: true })
            setLibrary(res.data.getLib)

        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getLibrary()
    }, [])

    async function addToLibrary(id) {
        try {
           await axios.patch(`http://localhost:3000/api/user/addTolab/${id}`, {}, { withCredentials: true })

            await getLibrary()
        }
        catch (err) {
            console.log(err);
        }
    }
    async function removeTolibrary(id) {
        try {
             await axios.delete(`http://localhost:3000/api/user/deleteLab/${id}`, { withCredentials: true })
            await getLibrary()
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <authProvider.Provider value={{ handleSumbit, emailreg, setEmailreg, passwordreg, setPasswordreg, username, setUsername, user, setUser, handleLogin, login, setLogin, handleChange, loading, setLoading, authReady, setAuthReady, name,  handleLogout, hideSure, setHideSure, updatePfp, updatename, setUpdatename, hideProfileDetail, setHideProfileDetail, updateprofile, setUpdateprofile, preview, setPreview, removePfp, imageref, library, addToLibrary, removeTolibrary, getLibrary, hideSearch, setHideSearch }}>
            {children}
        </authProvider.Provider>
    )
}

export default React.memo(AuthContext)
