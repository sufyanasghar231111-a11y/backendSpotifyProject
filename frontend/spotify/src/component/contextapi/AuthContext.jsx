import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const authProvider=createContext()
const AuthContext = ({children}) => {
    let navigate=useNavigate()
    let [user,setUser]=useState(null)
    // ()=>{
    //     let store=localStorage.getItem('token')
    //     return store ? store:null
    // }
    let [username,setUsername]=useState('')
    let [emailreg,setEmailreg]=useState('')
    let [passwordreg,setPasswordreg]=useState('')
    let [loading, setLoading]=useState(false)
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
                }, {withCredentials:true}
            )
            
             localStorage.setItem('token', response.data.user.token)
             setUser(response.data.user)
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
            setLoading(true)
            const checkLogin=await axios.post('http://localhost:3000/api/auth/login',
                {
                    email:login.email,
                    password:login.password
                },
              { withCredentials: true }
            )
            // localStorage.setItem('token', checkLogin.data.token)                        
            setUser(checkLogin.data)

        }
        catch(e){
            console.log(e);
        }
        finally{

            setLoading(false)
        }

    }

   async function checkRefresh(){
    try{
        let res=await axios.get("http://localhost:3000/api/auth/user",
                { withCredentials: true }
            )
            setUser(res.data.getAuthData)
    }
    catch(e){
        console.log(e);
    }
   }

   useEffect(()=>{
    checkRefresh()
   },[])

    function handleChange(e){
        setLogin(prev => ({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

   async function handleLogout(){
        try{
            await axios.post('http://localhost:3000/api/auth/logout',
                {},
                {withCredentials:true}
            )
        }
        catch(e){
            console.log(e);
        }
        setUser(null)
    }

  return (
    <authProvider.Provider value={{handleSumbit,emailreg,setEmailreg,passwordreg,setPasswordreg,username,setUsername,user,setUser,handleLogin,login, setLogin,handleChange,loading, setLoading,handleLogout}}>
      {children}
    </authProvider.Provider>
  )
}

export default AuthContext
