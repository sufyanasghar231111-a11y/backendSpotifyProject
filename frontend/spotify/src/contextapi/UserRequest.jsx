import React, { createContext, useState } from 'react'

export const requestContext= createContext()
const UserRequest = ({children}) => {
    const [requestpopup, setRequestpopup] = useState(false)
  return (
    <requestContext.Provider value={{requestpopup, setRequestpopup}}>
        {children}
    </requestContext.Provider>
  )
}

export default UserRequest