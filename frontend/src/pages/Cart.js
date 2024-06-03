import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helper/displayCurrency'
import {MdDelete} from "react-icons/md"

const Cart = () => {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const context = useContext(Context)

    const loadingCart = new Array(context?.cartProductCount).fill(null)

    const fetchData = async()=>
        {
            setLoading(true)
            const response = await fetch(SummaryApi.addToCartProductView.url,{
                method: SummaryApi.addToCartProductView.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
            })
            setLoading(false)
            const responseData = await response.json()
            if(responseData.success)
                {
                    setData(responseData.data)
                }
        }
        
        
        useEffect(()=>{
            fetchData()
        },[])


        const increaseQty = async(id, qty)=>{
            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method : SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers:{
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    quantity: qty + 1,
                    _id: id

                })
            })

            const responseData = await response.json()

            if(responseData.success)
                {
                    fetchData()
                }
        }
        const decreaseQty = async(id, qty)=>{
            if(qty>=2)
                {
                    const response = await fetch(SummaryApi.updateCartProduct.url,{
                        method : SummaryApi.updateCartProduct.method,
                        credentials: 'include',
                        headers:{
                            "content-type": 'application/json'
                        },
                        body: JSON.stringify({
                            quantity: qty - 1,
                            _id: id
                        })
                    })
        
                    const responseData = await response.json()
        
                    if(responseData.success)
                        {
                            fetchData()
                        }
                }
        }

        const deleteCartProduct = async(id)=>
            {
                const response = await fetch(SummaryApi.deleteCartProduct.url,{
                    method : SummaryApi.deleteCartProduct.method,
                    credentials: 'include',
                    headers:{
                        "content-type": 'application/json'
                    },
                    body: JSON.stringify({
                        _id: id
                    })
                })
    
                const responseData = await response.json()
    
                if(responseData.success)
                    {
                        fetchData()
                        context.fetchUserAddToCart()
                    }
            }

            const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
            const totalPrice = data.reduce((previousValue,currentValue)=> previousValue + (currentValue.quantity * currentValue?.productId?.sellingPrice),0)
  return (
    <div className='container mx-auto'>
        <div className='text-center text-lg my-3'>
        {
        data.length ===0 && !loading  && (
            <p className='bg-white py-5'>No Data</p>
        )
      }
        </div>
        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/**view product */}
            <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                                loadingCart.map(el=>
                                {
                                    return(
                                        <div key={el+"Add To Cart Loading"} className='w-full bg-slate-200 h-32 my-1 border border-slate-300 animate-pulse rounded'>

                                        </div>
                                    )
                                })

                        ):
                        (
                            data.map((product,index)=>{
                                return(
                                    <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-1 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                        <div className='w-32 h-32 bg-slate-200'>
                                                <img src={product?.productId?.productImage[0]} alt="" className='w-full h-full object-scale-down mix-blend-multiply'/>
                                        </div>
                                        <div className='px-4 py-2 relative'>
                                        <div className='absolute right-0 rounded-full text-red-600 p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                                <MdDelete/>
                                        </div>
                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                            <div className='flex items-center justify-between'>
                                            <p className='text-red-600 text-lg font-medium'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-600 text-lg font-semibold'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-1'>
                                                <button className='w-6 h-6 border border-red-600 text-red-600 flex justify-center items-center rounded hover:bg-red-600 hover:text-white' onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                                <span className='mx-2'>{product?.quantity}</span>
                                                <button className='w-6 h-6 border border-red-600 text-red-600 flex justify-center items-center rounded hover:bg-red-600 hover:text-white' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
            </div>

            {/*summary product */}
                    <div className='mt-5 lg:mt-0 w-full max-w-sm '>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'></div>
                        ): 
                        (
                            <div className='h-34 bg-slate-200'>
                                <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                <div className='flex items-center justify-between px-4 gap-2 my-1 font-medium text-lg text-slate-600'>
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>
                                <div className='flex items-center justify-between px-4 gap-2 my-1 font-medium text-lg text-slate-600'>
                                    <p>Total Price</p>
                                    <p>{displayINRCurrency(totalPrice )}</p>
                                </div>

                                <button className='bg-blue-600 p-2 text-white w-full'>Checkout</button>
                            </div>
                        )
                    }
                    </div>
            
        </div>
    </div>
  )
}

export default Cart
