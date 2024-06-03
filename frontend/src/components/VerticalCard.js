import React, { useContext } from 'react'
import scrollTop from '../helper/scrollTop'
import displayINRCurrency from '../helper/displayCurrency'
import addToCart from '../helper/addToCart'
import Context from '../context'
import { Link } from 'react-router-dom'

const VerticalCard = ({loading,data = []}) => {
    const loadingList = new Array(13).fill(null)
    const {fetchUserAddToCart} = useContext(Context)

  const handleAddToCart = async(e,id)=>
    {
        await addToCart(e,id)
        fetchUserAddToCart()
    }
    
  return (
    <div className=' grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
        
        
        {
            loading ? (
                loadingList.map((product,index)=>{
                return(
            //when we load the website sometimes it just displays the blank area content of the original content, so for displaying that part we use
            //the following code which is same as the code used for displaying the original content. the only difference is that the contents have
            //been removed and only the styling part is maintained with small changes.
            <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] animate-pulse'>
                </div>
                <div className='p-4 grid gap-3'>
                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 py-2 rounded-full'></h2> {/*"text-ellipsis line-clamp-1" this line was responsible for making the productname look in one line */}
                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full py-2'></p>
                    <div className='flex gap-3 w-full'>
                        <p className='font-medium text-black p-1 bg-slate-200 w-full animate-pulse rounded-full py-2'></p>
                        <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse  rounded-full py-2'></p>
                    </div>
                    <button className=' text-white px-3 rounded-full cursor-pointer text-sm w-full bg-slate-200 animate-pulse p-1 py-2'></button>
                </div>
            </div>
                )
            })
            ): (
                data.map((product,index)=>{
                return(
            <Link to={"/product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={scrollTop}>    {/*when we were clicking on a specific product this function was called bcz when we were clicking on any recommended products then that product was not getting displayed and also the useEffect(of ProductDetails) was updated by passing the params in dependencies so that whenever a params get updated the new details with their id gets displayed*/}
                <div className='bg-slate-200 h-48 flex justify-center items-center p-4 min-w-[280px] md:min-w-[145px] '>
                    <img src={product.productImage[0]} alt="" className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/> {/*"mix-blend-multiply" was used to remove the white background of the image */}
                </div>
                <div className='p-4 grid gap-3'>
                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2> {/*"text-ellipsis line-clamp-1" this line was responsible for making the productname look in one line */}
                    <p className='capitalize text-slate-500'>{product?.category}</p>
                    <div className='flex gap-3'>
                        <p className='font-medium text-black '>{ displayINRCurrency(product?.sellingPrice) }</p>
                        <p className='text-slate-500 line-through'>{ displayINRCurrency(product?.price) }</p>
                    </div>
                    <button className='bg-red-500 hover:bg-red-600 text-white px-3 rounded-full cursor-pointer py-0.5 text-sm' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                </div>
            </Link>
                )
            })
            )
            
        }
        </div>
  )
}

export default VerticalCard
