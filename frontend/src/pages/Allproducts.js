import React, { useState, useEffect } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const Allproducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async()=>
    {
      const response = await fetch(SummaryApi.allProduct.url,{
        method: 'GET',

      })

      const dataResponse = await response.json()
      setAllProduct(dataResponse?.data || [])
    }


    useEffect(() => {
      fetchAllProduct()
    }, [])
    
  return (
    <div>
        <div className='bg-white py-2 px-4 flex justify-between items-center'>
          <h2 className='font-bold text-lg'>All Products</h2>
          <button className='border-2 py-1 px-3 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all rounded-full ' onClick={()=> setOpenUploadProduct(true)}>Upload Button</button>
        </div>

      {/*all product display */}
        <div className='flex flex-wrap items-center gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'> {/*here overflow-y-scroll was given so that only product display area gets scrolled down, not whole page */}
            {
              allProduct.map((product,index)=>{
                return(
                  <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
                )
              })
            }
        </div>

        {
          openUploadProduct && (
        <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>

          )
        }
    </div>
  )
}

export default Allproducts
