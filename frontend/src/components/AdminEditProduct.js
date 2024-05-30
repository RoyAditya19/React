import React, { useState } from 'react'
import {CgClose} from "react-icons/cg";
import productCategory from '../helper/productCategory';
import { FaCloudUploadAlt } from 'react-icons/fa';
import uploadImage from '../helper/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from 'react-icons/md';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminEditProduct = ({
    onClose,
    productData,
    fetchdata}) => {

    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description : productData?.description,
        price: productData?.price,
        sellingPrice:productData?.sellingPrice
    })

    const [openFullScreenImage, setOpenFullScreenImage] =useState(false)
    const[fullScreenImage, setFullScreenImage] = useState("")

    const handleOnChange = (e)=>
        {
            const {name, value} = e.target
            setData((preve)=>{
                return{
                    ...preve,
                    [name]: value
                }
            })
        }

        //the file/image was received and was stored in the file variable and then this variable was passed as a prop to uploadimage.js file
        //and then that file(uploadImage.js) was responsible for uploading the image to the cloudinary platform
    const handleUploadProduct = async(e)=> {
            const file = e.target.files[0];
            const uploadImageCloudinary = await uploadImage(file)
            setData((preve)=>{
                return{
                    ...preve,
                    productImage: [...preve.productImage, uploadImageCloudinary.url]
                }
            })
        }

        //when the image was being uploaded using above function, then along with that the data was being uploaded using setdata.
        //now when the delete button was getting clicked at first all the previous image values were being extracted to newProductImage variable
        //using the spread operator, then it was spliced(removed), and then again the data of the productimage was set using the setdata.
        const handleDeleteProductImage = async(index)=>
            {
                const newProductImage = [...data.productImage]
                newProductImage.splice(index,1)

                setData((preve)=>{
                    return{
                        ...preve,
                        productImage: [...newProductImage]
                    }
                })
            }


        //submit upload product

        const handleSubmit = async(e)=>
            {
                e.preventDefault()
                const response = await fetch(SummaryApi.updateProduct.url,{
                    method: SummaryApi.updateProduct.method,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        },
                    body: JSON.stringify(data)
                })

                const responseData = await response.json()
                if(responseData.success)
                    {
                        toast.success(responseData?.message)
                        onClose()
                        fetchdata()
                    }
                if(responseData.error)
                    {
                        toast.error(responseData?.message)
                    }
            }
  return (
    <div className='fixed top-0 right-0 left-0 bg-slate-200 bg-opacity-35 bottom-0 flex justify-center items-center w-full h-full '>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        
            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'>
                     Edit product
                </h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-400 cursor-pointer' onClick={onClose}>
                    <CgClose />
                </div>
            </div>
            <form className='grid p-4 gap-3 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
            <label htmlFor="productName">Product Name:</label>
            <input type="text" id='productName' placeholder='Enter Product Name' required name='productName' value={data.productName} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded '/>
            <label htmlFor="brandName" className='mt-3'>Brand Name:</label>
            <input type="text" id='brandName' placeholder='Enter Brand Name' required name='brandName' value={data.brandName} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded '/>
            <label htmlFor="category">Category</label>
            <select name="category" value={data.category} id="category" required className='p-2 bg-slate-100 border rounded ' onChange={handleOnChange}>
            <option value={""}>Select Category</option>
                {
                    productCategory.map((el,index)=>
                    {
                        return(
                            <option value={el.value} key={el.value+index}>{el.label}</option>
                        )
                    
                    })
                }
            </select>

            <label htmlFor="productImage" className='mt-3'>Product Image:</label>
            <label htmlFor="uploadImageInput">
                <div className='p-2 bg-slate-100 border rounded h-48 w-full flex justify-center items-center cursor-pointer'>
                    <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                        <span className='text-4xl'><FaCloudUploadAlt/></span>
                        <p className='text-sm'>Upload Product Image</p>
                        <input type="file" id='uploadImageInput' className='hidden' onChange={handleUploadProduct}/>
                    </div>
                </div>
            </label>
            <div>
            {
                data?.productImage[0] ? 
                (
                        <div className='flex items-center gap-2'>
                        {
                            data.productImage.map((el, index)=> {
                            return(
                    //here below in the div the classname group has been mentioned and in the MdDelete component below it's given group-hover:block.
                    //what it does is it basically displays the delete button only when someone hovers over the image, and this image is
                    //under the below div tag.so for this purpose the group is used
                                <div className='relative group'>
                                    <img src={el} alt={el} width={80} height={80} className='bg-slate-100 border cursor-pointer' onClick={()=>
                                    {
                                        setOpenFullScreenImage(true)
                                        setFullScreenImage(el)
                                    }}/>
                                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                        <MdDelete/>
                                    </div>
                                </div>
                            )
                        })
                        }
                        </div>
                ): (
                    <p className='text-red-600 text-xs'>*Please upload product image</p>
                )
            }
            </div>

            <label htmlFor="price" className='mt-3'>Price: </label>
            <input type="number" id='price' placeholder='Enter Price: ' required name='price' value={data.price} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded '/>
            <label htmlFor="sellingPrice" className='mt-3'>Selling Price: </label>
            <input type="number" id='sellingPrice' placeholder='Enter Selling Price' required name='sellingPrice' value={data.sellingPrice} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded '/>
            <label htmlFor="description" className='mt-3'>Description: </label>
            <textarea type="number" id='description' placeholder='Enter Product Description' required name='description' value={data.description} onChange={handleOnChange} className='h-28 bg-slate-100 border resize-none p-1'rows={3}>

            </textarea>
            
            <button className='px-2 py-1 bg-red-600 text-white mb-10 hover:bg-red-700'>Update Product</button>
        </form>
        </div>

            {/**display image full screen */}

            {
                openFullScreenImage &&  
            (<DisplayImage onClose={()=>setOpenFullScreenImage(false)} imageUrl={fullScreenImage}/>)
                
            }
    </div>
  )
}

export default AdminEditProduct
