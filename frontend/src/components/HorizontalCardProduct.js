import React, { useState,useEffect, useRef } from 'react'
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct'
import displayINRCurrency from '../helper/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

const HorizontalCardProduct = ({category,heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
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
            data.map((product,index)=>{
                return(
            <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
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
                    <button className='bg-red-500 hover:bg-red-600 text-white px-3 rounded-full cursor-pointer py-0.5 text-sm'>Add to Cart</button>
                </div>
            </div>
                )
            })
        }
        </div>

    </div>
  )
}

export default HorizontalCardProduct
