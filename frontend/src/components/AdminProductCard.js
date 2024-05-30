import React, { useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import AdminEditProduct from './AdminEditProduct'
import displayINRCurrency from '../helper/displayCurrency'

const AdminProductCard = ({
        data,
        fetchdata
}) => {

    const[editProduct, setEditProduct] = useState(false)
  return (
    <>
        <div className='bg-white p-4 rounded '>
                            <div className='w-40 '>
                            <div className='w-32 h-32 justify-center items-center'>
                            <img src={data?.productImage[0]} width={100} height={100} alt="" className='object-fill mx-auto h-full' />
                            </div>
                                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1> {/*here line-clamp was given for styling purpose, such that if there is more than 2 lines it will show just two line and then ... */}
                                
                                <div>
                                <p className='font-semi-bold'>
                                    {
                                        displayINRCurrency(data.sellingPrice)
                                    }
                                </p>
                                <div className='w-fit ml-auto p-2 bg-green-100 cursor-pointer hover:bg-green-500 rounded-full hover:text-white' onClick={()=>setEditProduct(true)}>
                                    <MdModeEditOutline/>
                                </div>
                                </div>
                            </div>
                        {
                            editProduct && (<AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>)
                        }
                  </div>
    </>
  )
}

export default AdminProductCard
