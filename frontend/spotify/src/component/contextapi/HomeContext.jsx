import React, { createContext, useState } from 'react'

export const authHome=createContext()

const HomeContext = ({children}) => {
    let [hidepro, setHidepro]=useState(false)
    let [hide, setHide]=useState(true)
  return (
    <authHome.Provider value={{hidepro, setHidepro,hide, setHide}}>
      {children}
    </authHome.Provider>
  )
}

export default HomeContext
