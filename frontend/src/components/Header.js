import React from 'react'
import Logo from './Logo'
import { IoSearch } from "react-icons/io5";

const Header = () => {
  return (
    <header className='h-16 shadow-md'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
            <div className="">
                <Logo/>
            </div>


            <div className="hidden lg:flex items-center w-full justify-center max-w-sm border rounded-full pl-2 focus-within:shadow-md">
                <input type="text" placeholder='search products here' className='outline-none w-full '/>a
                <div>
                <IoSearch className='text-lg bg-red-600 h-7 min-w-16 flex items-center justify-center rounded-r-full'/>
                </div>
            </div>


            <div className="">
                icons
            </div>
        </div>
    </header>
  )
}

export default Header
