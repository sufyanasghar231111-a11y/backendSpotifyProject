import React, { useContext } from 'react'
import { authHome } from '../contextapi/HomeContext'
import { authProvider } from '../contextapi/AuthContext'
import axios from 'axios'

const Logout = () => {
    let {hidepro}=useContext(authHome)
    let {setUser}=useContext(authProvider)

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
      <div className={`bg-[#1a1a1a]   ${hidepro  ? 'opacity-100 scale-100 translate-y-0 max-h-60 p-3' : 'opacity-0 scale-95 -translate-y-2 max-h-0 p-0 border-0' } right-12 top-16 duration-300 rounded absolute z-40  w-50 transition-all ease-in-out `}>
        <button onClick={handleLogout}>Logout</button>
          </div>
  )
}

export default Logout
