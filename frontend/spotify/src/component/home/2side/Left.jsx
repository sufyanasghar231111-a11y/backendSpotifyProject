import { RiAddLine, RiHeartFill, RiHeartLine } from '@remixicon/react'
import React, { useContext } from 'react'
import { authHome } from '../../contextapi/HomeContext'
import { Link } from 'react-router-dom'

const Left = () => {
    let { hide, setHide, fav } = useContext(authHome)

    let length = fav.reduce((acc, elem) => {
        return acc + elem.favorite?.length
    }, 0)



    //  async   function createFav(){
    //         try{
    //             const res=await axios.post('http://localhost:3000/api/user/particularUserFavorite')
    //             setFav(res.data)
    //         }
    //         catch(err){
    //             console.log(err);

    //         }
    //     }



    return (
        <div className={`w-[30%] max-sm:w-[60%] overflow-hidden max-sm:fixed max-sm:z-30 ${hide ? "max-sm:-translate-x-full max-sm:opacity-0" : "translate-x-0 max-sm:opacity-100"} transition-transform duration-500 ease-out sticky h-[76vh] left-0 rounded-lg bg-[#282828]  `}>
            <header className=' py-4 max-sm:py-8 px-3 bg-[#1a1a1a]  sticky top-0 z-10 '>
                <div className='flex relative items-center justify-between'>
                    <h1 className='font-semibold max-sm:text-[13px]'>Your Library</h1>
                    <button className='bg-white/10 rounded-full max-sm:px-2 px-3 max-sm:py-0.5 max-sm:gap-1 py-1.5 font-semibold flex items-center gap-2 max-sm:text-sm cursor-pointer'> <RiAddLine className='max-sm:w-5 max-sm:h-5' />  Create</button>
                    <div onClick={() => { setHide(true) }} className=' absolute right-0 md:hidden  -top-6 text-sm'>X</div>
                </div>
                <div className='pt-5'>
                    <button className='bg-white/10 rounded-full max-sm:px-2 max-sm:text-sm px-4 py-1 max-sm:py-0.5 font-semibold   cursor-pointer'>Playlist</button>
                </div>
            </header>
            <div className='h-[60vh]  overflow-y-auto '>
                <div className=' flex items-center px-4 max-sm:px-2 py-2'>
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center justify-center  rounded w-13 max-sm:w-10 max-sm:h-10 h-13 bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] '>
                            <RiHeartFill className='text-white' />
                        </div>
                        <div className='max-sm:text-sm'>
                            <Link to={`/like`}  >
                                <h1 className='font-semibold'>Liked Songs</h1>
                            </Link>
                            <h1 className='text-sm max-sm:text-[10px] text-[#a5a5a5] font-semibold'>playlist . {length} songs</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default Left
