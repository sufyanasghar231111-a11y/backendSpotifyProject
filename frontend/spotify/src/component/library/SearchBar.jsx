import React, { useContext } from 'react'
import { authProvider } from '../contextapi/AuthContext'
import { RiSearchLine } from '@remixicon/react'

function SearchBar() {
    let {hideSearch, setHideSearch}=useContext(authProvider)
  return (
    <div>
         {
              hideSearch && (
                <>
                <div onClick={()=>{setHideSearch(false)}} className='w-full h-full z-150 bg-black/30 inset-0  absolute '></div>
                <div className='w-100 h-90 absolute left-42  top-15 overflow-y-auto  z-151 bg-[#2A2A2A] rounded-lg'>
                    <div className='w-full py-4'>
                        <div className='flex text-[#9f9f9f] text-sm items-center gap-2 justify-center py-1'>
                            <h1 className='border rounded px-1.5 '>Enter</h1>
                            <h1>Search</h1>
                        </div>
                        {
                            [0,1,2,3,4,5].map((elem)=>{
                                return  <div className='mx-2 cursor-pointer hover:bg-[#404040] rounded-lg py-2  gap-6 px-3  flex items-center'>
                            <h1 className='px-2.5 py-2.5 rounded-full bg-[#282828]'><RiSearchLine  /></h1>
                            <h1 className='font-semibold '>hhh</h1>
                        </div>
                            })
                        }
                        <div className='mx-2 cursor-pointer hover:bg-[#404040] rounded-lg py-2  gap-6 px-3  flex items-center'>
                            <h1 className='w-12 h-12 rounded  border'></h1>
                            <div className=''>
                            <h1 className='font-semibold text-[16px]'>Test1</h1>
                            <h1 className='text-sm text-[#adaaaa]'>artist jutt</h1>
                            </div>
                        </div>
                    </div>
                </div>
                </>
              )
            }
    </div>
  )
}

export default SearchBar