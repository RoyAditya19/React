import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'

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
            // setLoading(false)
            const responseData = response.json()

            if(responseData.success)
                {
                    setData(responseData.data)
                }
        }


        useEffect(()=>{
            fetchData()
        },[])
  return (
    <div className='container mx-auto'>
        <div className='text-center text-lg my-3'>
        {
        data.length ===0 && !loading  && (
            <p className='bg-white py-5'>No Data</p>
        )
      }
        </div>
        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between'>
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
                            <div>

                            </div>
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
                            <div className='h-36 bg-slate-200'></div>
                        )
                    }
                    </div>
            
        </div>
    </div>
  )
}

export default Cart
