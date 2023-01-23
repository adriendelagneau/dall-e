import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <header className='w-full flex justify-between items-center bg-white px-3 py-2  sm:px-5 border-b border-b-[#e6ebf4]'>
          <Link href="/">
            <img src='/robot-painter.png' alt="logo" className='w-21 h-14 object-contain'/>
          </Link>
          <Link href="/createPost" className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
            Create
          </Link>
        </header>
  )
}

export default Navbar