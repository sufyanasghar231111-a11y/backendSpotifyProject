import React, { createContext, useState } from 'react'

export const authHome=createContext()
const HomeContext = ({children}) => {
    let [hidepro, setHidepro]=useState(false)
  return (
    <authHome.Provider value={{hidepro, setHidepro}}>
      {children}
    </authHome.Provider>
  )
}

export default HomeContext
