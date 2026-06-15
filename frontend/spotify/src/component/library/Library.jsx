import React, { useContext } from 'react'
import { authProvider } from '../../contextapi/AuthContext'
import { Link } from 'react-router-dom'
import { RiPauseFill, RiPlayFill } from '@remixicon/react'
import LibraryMusic from '../leftside/LibraryMusic'

const Library = () => {
    let { library } = useContext(authProvider)
    
    return (
        <div>
            {
                library.map((elem) => (
                    elem.music.map((item) => {
                        return <LibraryMusic item={item} key={item._id} />
                    })
                ))}
        </div>
    )
}

export default Library
