import React,{useState} from 'react'
import Logo from './Logo'
import { IoSearch } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';

const Header = () => {
    
    const user = useSelector(state=> state?.user?.user)                 //here all the details were fetched with the help of "state" defined in the userslice.js
    const dispatch = useDispatch()
    const [menudisplay, setmenudisplay] = useState(false)

    
    const handleLogout = async()=>{
        const fetchData = await fetch(SummaryApi.logout_user.url,{
            method: SummaryApi.logout_user.method,
            credentials: 'include'
        })

        const data = await fetchData.json()

        if(data.success)
            {
                toast.success(data.message)
                dispatch(setUserDetails(null))                      //this is setting the userdetails to none, as when logout button was clicked cookies was getting cleared but after the page reload
            }

        if(data.error)
            {
                toast.error(data.message)
            }
    }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
            <div className="">
            <Link to="/">
                <Logo/>
            </Link>
            </div>


            <div className="hidden lg:flex items-center w-full justify-center max-w-sm border rounded-full pl-2 focus-within:shadow-md">
                <input type="text" placeholder='search products here' className='outline-none w-full h-8 flex items-center' />
                <div>
                <IoSearch className='text-lg bg-red-600 h-8 min-w-16 flex items-center justify-center rounded-r-full'/>
                </div>
            </div>

            <div className='flex items-center gap-4'>

                    <div className='relative flex justify-center'>
                    {
                        user?._id && (
                            <div className="text-3xl cursor-pointer relative flex justify-center" onClick={()=>setmenudisplay(preve => !preve)}>
                            {
                                user?.profilePic ? (<img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />) : (<FaRegCircleUser/>)
                            }
                        </div>
                        )
                    }
                        
                                {
                                    menudisplay && (<div className='absolute bg-white p-2 bottom-0 top-11 h-fit shadow-lg rounded '>
                                        <nav>
                                        {
                                            user?.role === ROLE.ADMIN && ( 
                                            <Link to = {"admin-panel"} className='whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block' onClick={()=>setmenudisplay(preve => !preve)}>Admin Panel</Link>
                                            )

                                        }
                                        </nav> 
                                    </div>)
                                }
                    </div>

                <div className="text-2xl relative">
                    <span><FaShoppingCart/></span>
                    <div className='bg-red-600 text-white w-3 h-3 p-2 flex items-center rounded-full justify-center absolute -top-1 -right-1'>
                        <p className='text-xs'>0</p>
                    </div>
                </div>

                <div>
                {
                    user?._id ? (
                        <button onClick={handleLogout} className='px-2 text-white bg-red-600 rounded-full hover:bg-red-700 h-8 w-24'>Logout</button>
                    ) : (
                        <Link to="/login"> <button className='px-2 text-white bg-red-600 rounded-full hover:bg-red-700 h-8 w-24'>Login</button></Link>
                    )
                }
                </div>
            </div>


        </div>
    </header>
  )
}

export default Header
