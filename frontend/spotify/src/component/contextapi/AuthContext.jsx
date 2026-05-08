import React, { createContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const authProvider=createContext()
const AuthContext = ({children}) => {
    let navigate=useNavigate()
    let [user,setUser]=useState(()=>{
        let store=localStorage.getItem('token')
        return store ? store:null
    })
    let [username,setUsername]=useState('')
    let [emailreg,setEmailreg]=useState('')
    let [passwordreg,setPasswordreg]=useState('')
    let [login, setLogin]=useState({
        email:'',
         password:""
    })
   async function handleSumbit(e){
        e.preventDefault()
        try{
            const response=await axios.post('http://localhost:3000/api/auth/register',
                {
                    username:username,
                    email:emailreg,
                    password:passwordreg
                }
            )
             localStorage.setItem('token', response.data.user.token)
            setUser(response.data.user || true)
            setUsername('')
            setEmailreg('')
            setPasswordreg('')
            navigate('/')
            
        }
        catch(err){
            console.log(err);
        }
    }

    async function handleLogin(e) {
        e.preventDefault()
        try{

            const checkLogin=await axios.post('http://localhost:3000/api/auth/login',
                {
                    email:login.email,
                    password:login.password
                }
            )
            localStorage.setItem('token', checkLogin.data.token)                        
            setUser(checkLogin.data)

        }
        catch(e){
            console.log(e);
        }

    }

    function handleChange(e){
        setLogin(prev => ({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
  return (
    <authProvider.Provider value={{handleSumbit,emailreg,setEmailreg,passwordreg,setPasswordreg,username,setUsername,user,setUser,handleLogin,login, setLogin,handleChange}}>
      {children}
    </authProvider.Provider>
  )
}

export default AuthContext
