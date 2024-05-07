import React from 'react'
import Logo from './Logo'
import { IoSearch } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header = () => {
    
    
  return (
    <header className='h-16 shadow-md bg-white'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
            <div className="">
            <Link to="/">
                <Logo/>
            </Link>
            </div>


            <div className="hidden lg:flex items-center w-full justify-center max-w-sm border rounded-full pl-2 focus-within:shadow-md">
                <input type="text" placeholder='search products here' className='outline-none w-full ' />
                <div>
                <IoSearch className='text-lg bg-red-600 h-7 min-w-16 flex items-center justify-center rounded-r-full'/>
                </div>
            </div>

            <div className='flex items-center gap-4'>
                <div className="text-3xl cursor-pointer">
                <FaRegCircleUser />
                </div>

                <div className="text-2xl relative">
                    <span><FaShoppingCart/></span>
                    <div className='bg-red-600 text-white w-3 h-3 p-2 flex items-center rounded-full justify-center absolute -top-1 -right-1'>
                        <p className='text-xs'>0</p>
                    </div>
                </div>

                <div className=''>
            <Link to="/login">
                <button className='px-2 text-white bg-red-600 rounded-full hover:bg-red-700 h-8 w-24'>Login</button>
            </Link>
                </div>
            </div>


        </div>
    </header>
  )
}

export default Header
