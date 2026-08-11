import { RiAddLine } from '@remixicon/react'
import { Link } from 'react-router-dom'

const DemoLeft = ({ showMobile }) => {

    return (
        <div
            className={`
                w-[30%] md:w-[35%] sm:w-[50%] max-sm:w-[75%]
                relative overflow-hidden
                max-sm:left-0 max-sm:top-13 max-sm:fixed z-50
                ${showMobile ? "max-sm:-translate-x-full max-sm:opacity-0" : "translate-x-0 max-sm:opacity-100"}
                transition-transform duration-500 ease-out
                h-[76vh] max-sm:h-[calc(100vh-4rem)]
                rounded-lg bg-[#282828] flex flex-col
            `}
        >
            <div className='flex-1 overflow-y-auto px-3 sm:px-4 py-3 flex flex-col gap-3'>

                {/* Header */}
                <div className='flex items-center justify-between'>
                    <h2 className='text-lg sm:text-xl font-bold truncate'>
                        Your <span className='text-[#b3b3b3]'>Library</span>
                    </h2>

                    <Link
                        to='/login'
                        className='flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-full bg-[#1f1f1f] hover:bg-[#333] transition-colors duration-200 text-xs font-semibold shrink-0'
                    >
                        <RiAddLine className='w-4 h-4' />
                        <span className='hidden xs:inline'>Create</span>
                    </Link>
                </div>

                {/* Create playlist card */}
                <div className='w-full h-full rounded-lg gap-3 sm:gap-4 bg-[#1f1f1f] p-3 sm:p-4 flex-col flex items-center justify-center'>
                    <div className='flex flex-col gap-2 text-center'>
                        <div className='text-base sm:text-lg md:text-xl font-bold'>
                            Create your first playlist
                        </div>
                        <div className='text-xs sm:text-sm text-[#b3b3b3]'>
                            It's easy, we'll help you
                        </div>
                    </div>

                    <Link
                        to='/login'
                        className='px-4 py-2 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:scale-105 transition-transform duration-200'
                    >
                        Create playlist
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default DemoLeft