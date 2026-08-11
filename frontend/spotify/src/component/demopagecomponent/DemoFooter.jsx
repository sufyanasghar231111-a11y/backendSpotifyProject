import React from 'react'
import { Link } from 'react-router-dom'

const DemoFooter = () => {
  return (
    <footer className="w-full px-4 max-sm:py-2 py-6">
      <div className="flex items-center justify-center">
        <Link to='/register'>
        <button
          className="
            rounded-full bg-white px-8 py-3
            text-sm font-semibold text-black
            transition hover:scale-105 hover:bg-gray-200
            active:scale-95
            max-sm:w-full 
          "
        >
          Sign up for free
        </button>
          </Link>
      </div>
    </footer>
  )
}

export default DemoFooter