import React, { useEffect, useState } from 'react'
import {FaAngleRight} from "react-icons/fa6"
import {FaAngleLeft} from "react-icons/fa6"
import image1 from "../assest/banner/img1.webp"
import image2 from "../assest/banner/img2.webp"
import image3 from "../assest/banner/img3.jpg"
import image4 from "../assest/banner/img4.jpg"
import image5 from "../assest/banner/img5.webp"
import image1Mobile from "../assest/banner/img1_mobile.jpg"
import image2Mobile from "../assest/banner/img2_mobile.webp"
import image3Mobile from "../assest/banner/img3_mobile.jpg"
import image4Mobile from "../assest/banner/img4_mobile.jpg"
import image5Mobile from "../assest/banner/img5_mobile.png"

const BannerProduct = () => {

    const [currentImage,setCurrentImage] = useState(0)

    const desktopImages = [
        image1,image2,image3,image4,image5
    ]
    const mobileImages = [
        image1Mobile,image2Mobile,image3Mobile,image4Mobile,image5Mobile
    ]

    const preveImage = ()=>
        {
            if(currentImage !=0)
                {
                    setCurrentImage(preve=> preve-1)
                }
        }

    const nextImage = ()=>
        {
            if(desktopImages.length-1>currentImage)
                {
                    setCurrentImage(preve=> preve+1)
                }
        }

        //below useeffect was used for automatic sliding of the images.setInterval was used for displaying and changing the image every 5 seconds
        //when the last image was encountered the control went to else condition and then the image was set to 0,and to make the currentimage to 0
        //the curretImage was mentioned within the square bracket so that when the last image was encountered, it should again set the 
        //currentimage to 0.
        useEffect(()=>
        {
            const interval = setInterval(()=>
            {
            if(desktopImages.length-1>currentImage)
                {
                nextImage()
                }
            else
            {
                setCurrentImage(0)
            }
            },5000)

            return()=> clearInterval(interval)
        },[currentImage])
  return (
    <div className='container mx-auto px-4 rounded'>
        <div className='h-56 :md:h-72 w-full bg-slate-200 relative'>        {/*generally for mobile version we give h-60 and for desktop version we give height after using md */}

            <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                <div className='flex justify-between w-full text-2xl'>
                    <button onClick={preveImage} className=' shadow-md rounded-full p-1'><FaAngleLeft/></button>
                    <button onClick={nextImage} className=' shadow-md rounded-full p-1'><FaAngleRight/></button>
                </div>
            </div>

            {/*desktop and tablet version */}
            <div className='hidden md:flex h-full w-full overflow-hidden'>

                {
                    desktopImages.map((imageURL,index)=>
                    {
                        return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform:`translateX(-${currentImage*100}%)`}}>
                                <img src={imageURL} alt="" className='w-full h-full' />
                            </div>
                        )
                    })
                }
            </div>

            {/*mobile version */}
            <div className='flex h-full w-full overflow-hidden md:hidden'>

                {
                    mobileImages.map((imageURL,index)=>
                    {
                        return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform:`translateX(-${currentImage*100}%)`}}>
                                <img src={imageURL} alt="" className='w-full h-full object-cover' />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default BannerProduct
