import React, { createContext, useRef, useState } from 'react'

export const authHome=createContext()

const HomeContext = ({children}) => {
    let [hidepro, setHidepro]=useState(false)
    let [hide, setHide]=useState(true)
    let silderRef=useRef(null)
     function rightRef(){
    silderRef.current.scrollBy({
      left:300,
      behavior:'smooth'
    })
  }
  function leftRef(){
    silderRef.current.scrollBy({
      left:-300,
      behavior:'smooth'
    })
  }
  return (
    <authHome.Provider value={{hidepro, setHidepro,hide,rightRef, silderRef,leftRef, setHide}}>
      {children}
    </authHome.Provider>
  )
}

export default HomeContext
