
import SearchMusicDetail from './SearchMusicDetail'


const Musicforsearch = () => {
  

  return (
   <div className='w-[100%] max-sm:w-full ml-auto  rounded-lg overflow-hidden h-[76vh]'>
      
            <div className='w-full flex gap-3 bg-[#282828]  sticky p-6 px-7 '>
              <button className='md:hidden'>show</button>
              <button className='px-4 py-1.5 rounded-full text-sm font-semibold bg-white text-black cursor-pointer'>All</button>
              <button className='px-4 py-1.5 rounded-full text-sm  font-semibold backdrop-blur-2xl bg-white/10 cursor-pointer'>Music</button>
            </div>
           <SearchMusicDetail />
    </div>
  )
}

export default Musicforsearch
