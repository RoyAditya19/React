import React, { useState, useEffect } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'

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
        <div className='flex items-center gap-5 py-4'>
            {
              allProduct.map((product,index)=>{
                return(
                  <div className='bg-white p-4 rounded'>
                    <img src={product?.productImage[0]} width={100} height={100} alt="" />
                    <h1>{product.productName}</h1>
                  </div>
                )
              })
            }
        </div>

        {
          openUploadProduct && (
        <UploadProduct onClose={()=>setOpenUploadProduct(false)} />

          )
        }
    </div>
  )
}

export default Allproducts
