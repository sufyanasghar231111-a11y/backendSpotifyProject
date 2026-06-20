import { RiSearchLine } from '@remixicon/react'
import React from 'react'


const ShowSearch = ({ elem, handleClick }) => {
    console.log(elem);

    return (
        <>
            {
                elem.type === 'song' && (
                    <div key={elem._id} onClick={() => { handleClick(elem) }} >
                        <div className='mx-2 cursor-pointer hover:bg-[#404040] rounded-lg py-2  gap-6 px-3  flex items-center'>
                            <h1 className='px-2.5 py-2.5 rounded-full bg-[#282828]'><RiSearchLine /></h1>
                            <h1 className='font-semibold '>{elem.title}</h1>
                        </div>
                    </div>
                )
            }

            {
                elem.type === 'album' && (
                    <div key={elem._id} onClick={() => { handleClick(elem) }} >
                        <div className='mx-2 cursor-pointer hover:bg-[#404040] rounded-lg py-2  gap-6 px-3  flex items-center'>
                            <h1 className='px-2.5 py-2.5 rounded-full bg-[#282828]'><RiSearchLine /></h1>
                            <h1 className='font-semibold '>{elem.title}</h1>
                        </div>
                    </div>
                )
            }

            {
                elem.type === 'visible' && elem.visibility === "public" && (
                    <div key={elem._id} onClick={() => { handleClick(elem) }} >
                        <div className='mx-2 cursor-pointer hover:bg-[#404040] rounded-lg py-2  gap-6 px-3  flex items-center'>
                            <h1 className='px-2.5 py-2.5 rounded-full bg-[#282828]'><RiSearchLine /></h1>
                            <h1 className='font-semibold '>{elem.name}</h1>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default React.memo(ShowSearch)
