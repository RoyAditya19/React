import React, { useState,useEffect, useRef } from 'react'
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct'
import displayINRCurrency from '../helper/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helper/addToCart'

const HorizontalCardProduct = ({category,heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)
    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()

    const fetchData = async()=>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct?.data)
    }

    useEffect(()=>
    {
        fetchData()
    },[])

    const scrollRight = ()=>{
        scrollElement.current.scrollLeft +=300
    }

    const scrollLeft = ()=>{
        scrollElement.current.scrollLeft -=300
    }
  return (
    <div className='container mx-auto px-4 my-6 relative'>  {/*here position was made as relative so that the buttons below can come outside this container */}
        <h2 className='text-2xl py-4 font-semibold'>{heading}</h2>

        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
        <button onClick={scrollLeft} className='hidden md:block bg-white shadow-md rounded-full p-1 absolute left-0 text-lg'><FaAngleLeft/></button>
        <button onClick={scrollRight} className='hidden md:block bg-white shadow-md rounded-full p-1 absolute right-0 text-lg'><FaAngleRight/></button>
        {
            loading ? (
                loadingList.map((product,index)=>{
                return(
            //when we load the website sometimes it just displays the blank area content of the original content, so for displaying that part we use
            //the following code which is same as the code used for displaying the original content. the only difference is that the contents have
            //been removed and only the styling part is maintained with small changes.
            <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                </div>
                <div className='p-4 grid w-full gap-2'>
                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2> {/*"text-ellipsis line-clamp-1" this line was responsible for making the productname look in one line */}
                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                    <div className='flex gap-3 w-full'>
                        <p className='font-medium text-black p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                        <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse  rounded-full'></p>
                    </div>
                    <button className=' text-white px-3 rounded-full cursor-pointer py-0.5 text-sm w-full bg-slate-200 animate-pulse p-1'></button>
                </div>
            </div>
                )
            })
            ): (
                data.map((product,index)=>{
                return(
            <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] '>
                    <img src={product.productImage[0]} alt="" className='object-scale-down h-full hover:scale-110 transition-all'/>
                </div>
                <div className='p-4 grid'>
                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2> {/*"text-ellipsis line-clamp-1" this line was responsible for making the productname look in one line */}
                    <p className='capitalize text-slate-500'>{product?.category}</p>
                    <div className='flex gap-3'>
                        <p className='font-medium text-black '>{ displayINRCurrency(product?.sellingPrice) }</p>
                        <p className='text-slate-500 line-through'>{ displayINRCurrency(product?.price) }</p>
                    </div>
                    <button className='bg-red-500 hover:bg-red-600 text-white px-3 rounded-full cursor-pointer py-0.5 text-sm' onClick={(e)=>addToCart(e,product?._id)}>Add to Cart</button>
                </div>
            </Link>
                )
            })
            )
        }
        </div>

    </div>
  )
}

export default HorizontalCardProduct
