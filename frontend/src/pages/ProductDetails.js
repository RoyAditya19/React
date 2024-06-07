import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from 'react-icons/fa6'
import { FaStarHalf } from 'react-icons/fa6'
import displayINRCurrency from '../helper/displayCurrency'
import VerticalCardProduct from '../components/VerticalCardProduct'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import addToCart from '../helper/addToCart'
import Context from '../context'

const ProductDetails = () => {
  const[productdata,setProductData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description : "",
    price: "",
    sellingPrice: ""
  })

  const params = useParams()
  const [loading,setLoading] = useState(false)
  const productImageListLoading = new Array(4).fill(null)
  const [activeimage,setActiveImage] = useState("")

  const {fetchUserAddToCart} = useContext(Context)
  const navigate = useNavigate()

  const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
    x:0,
    y:0
  })

  const [zoomImage,setZoomImage] = useState(false)

  const fetchProductDetails = async()=>
    { 
        setLoading(true)
        const response = await fetch(SummaryApi.productDetails.url,{
          method: SummaryApi.productDetails.method,
          headers:{
            "content-type": "application/json"
          },
          body: JSON.stringify({
            productId: params?.id
          })
        })
        setLoading(false)
        const dataResponse = await response.json()
        setProductData(dataResponse?.data)
        setActiveImage(dataResponse?.productdata?.productImage[0])
    }

  useEffect(()=>
  {
    fetchProductDetails()
  },[params])

  const handleMouseEnterProduct = (imageURL)=>
    {
      setActiveImage(imageURL)
    }

  const handleZoomImage = useCallback((e)=>{
        setZoomImage(true)
        const {left, top, width, height} = e.target.getBoundingClientRect()   //this was responsible for sending the coordinates of the image when the mouse was hovered over any specific area
        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height
        
        setZoomImageCoordinate({
          x:x,
          y:y
        })
    },[zoomImageCoordinate])


    const handleLeaveImageZoom = ()=>
      {
        setZoomImage(false)
      }

    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }

    const handleBuyProduct = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
        navigate("/cart")
    }
  return (
    <div className='container mx-auto p-4'>
          <div className='flex flex-col lg:flex-row gap-2 min-h-[200px]'>
          {/** product image */}
              <div className='h-96 flex flex-col gap-4 lg:flex-row-reverse'>
              <div className='lg:h-96 lg:w-96 h-[300px] w-[300px] bg-slate-200 relative p-2'>
                  <img src={activeimage} alt="" className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />
                  {/**product zoom */}
                  {
                    zoomImage && (
                      <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-200 overflow-hidden p-1 -right-[510px] top-0'>
                            <div 
                            className='w-full h-full mix-blend-multiply min-h-[400px] min-w-[500px] scale-150' 
                            style={{
                              backgroundImage: `url(${activeimage})`,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: `${zoomImageCoordinate.x * 100}%  ${zoomImageCoordinate.y * 100}% `
                              }}>

                            </div>
                      </div>
                    )
                  }

              </div>
                    <div className='h-full'>
                            {
                              loading ? (
                                    <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                              {
                                  productImageListLoading.map((el,index)=>
                                {
                                  return(
                                    <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>

                                    </div>
                                  )
                                })
                              }
                                    </div>
                              ): (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                              {
                                  productdata?.productImage?.map((imgURL,index)=>
                                {
                                  return(
                                    <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                                          <img src={imgURL} alt="" className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imgURL)} onClick={()=>handleMouseEnterProduct(imgURL)}/>
                                    </div>
                                  )
                                })
                              }
                                    </div>
                              )
                            }
                    </div>
              </div>
              {/**product details */}
                  {
                  loading ?(
                          <div className='grid w-full gap-1'>
                    <p className='bg-slate-300 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
                    <h2 className='text-2xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse w-full lg:h-8'></h2>
                    <p className='capitalize text-slate-400 bg-slate-200 animate-pulse min-w-[100px] h-6 w-full lg:h-8'></p>
                    <div className='text-red-600 bg-slate-200 h-6 animate-pulse flex items-center gap-1 w-full lg:h-8'>
                          
                    </div>
                    <div className='flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl h-6 lg:h-8 animate-pulse w-full'>
                    <p className='text-red-600 bg-slate-200 w-full'></p>
                    <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
                    </div>

                    <div className='flex items-center gap-3 my-2 w-full'>
                          <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
                          <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
                    </div>
                    <div className='w-full'>
                      <p className='text-slate-600 font-medium my-1 lg:h-8 h-6 bg-slate-200 rounded animate-pulse w-full' ></p>
                      <p className='bg-slate-200 rounded animate-pulse lg:h-12 h-10 w-full'></p>
                    </div>
                          </div>
                  ):(
                          <div className='flex flex-col gap-1'>
                    <p className='bg-slate-300 text-red-600 px-2 rounded-full inline-block w-fit'>{productdata?.brandName}</p>
                    <h2 className='text-2xl lg:text-4xl font-medium'>{productdata?.productName}</h2>
                    <p className='capitalize text-slate-400 '>{productdata?.category}</p>
                    <div className='text-red-600 flex items-center gap-1'>
                          <FaStar/>
                          <FaStar/>
                          <FaStar/>
                          <FaStar/>
                          <FaStarHalf/> 
                    </div>
                    <div className='flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl'>
                    <p className='text-red-600'>{displayINRCurrency(productdata?.sellingPrice)}</p>
                    <p className='text-slate-400 line-through'>{displayINRCurrency(productdata?.price)}</p>
                    </div>

                    <div className='flex items-center gap-3 my-2'>
                          <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-red-600 hover:bg-red-600 hover:text-white' onClick={(e)=>handleBuyProduct(e,productdata?._id)}>Buy</button>
                          <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px]  bg-red-600 hover:bg-white hover:text-red-600 font-medium text-white' onClick={(e)=>handleAddToCart(e,productdata?._id)}>Add To Cart</button>
                    </div>
                    <div>
                      <p className='text-slate-600 font-medium my-1'>Description:</p>
                      <p>{productdata?.description}</p>
                    </div>
                          </div>
                  )
                  }

          </div>

          {
            productdata?.category && (
            <CategoryWiseProductDisplay category={productdata?.category} heading={"Recommended Product"}/>
            )
          }
    </div>
  )
}

export default ProductDetails
