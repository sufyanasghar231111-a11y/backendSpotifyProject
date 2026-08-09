import React, { useContext } from 'react'
import { LogoutContext, UIContext } from '../contextapi/AuthContext'
import { adminContext } from '../contextapi/AdminContext'
import { RiLoader4Line } from '@remixicon/react'

const SureForLogOut = () => {
    const { handleLogout } = useContext(LogoutContext)
    const { user } = useContext(adminContext)

    const { hideSure, setHideSure } = useContext(LogoutContext)
    const { loading } = useContext(UIContext)

    return (
        <>
            {
                hideSure && (
                    <>
                        <div onClick={() => { setHideSure(false) }} className='w-full h-full cursor-pointer absolute inset-0  bg-black/60 z-299 '></div>
                        <div className='w-full h-full absolute z-300 flex items-center justify-center  '>
                            <div className='bg-[#141414] w-96 max-sm:w-[70vw] flex  p-10 text-center  flex-col   rounded-2xl'>
                                <h1 className='text-2xl max-sm:text-[5vw] font-semibold'>Are you sure you <br /> want to log out?</h1>
                                <h1 className='pt-4 text-lg max-sm:text-[3vw]'>Log out of Spotify as <br /> {user?.email}?</h1>
                                <div className='flex flex-col gap-3 pt-5'>
                                    <button onClick={handleLogout} className='py-2.5 flex items-center justify-center w-full max-sm:py-2 w-full rounded-full bg-green-500 cursor-pointer hover:bg-green-600 max-sm:text-[3vw]'>{loading ? (
                                        <RiLoader4Line size={22} className="animate-spin" />
                                    ) : (
                                        "Logout"
                                    )}</button>
                                    <button onClick={() => { setHideSure(false) }} className='py-2.5 max-sm:py-2 w-full rounded-full bg-black/40 hover:bg-black/60 cursor-pointer max-sm:text-[3vw]'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default SureForLogOut
