import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpodes"}/>
      <HorizontalCardProduct category={"earphones"} heading={"Popular Earphones"}/>
      <VerticalCardProduct category={"mobiles"} heading={"Latest Mobile Phones"}/>
      <VerticalCardProduct category={"mouse"} heading={"Top Brand's Mouse"}/>
      <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
      <VerticalCardProduct category={"speakers"} heading={"Speakers"}/>
      <VerticalCardProduct category={"processor"} heading={"Top Processors"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Top Cooling Refrigerators"}/>
      <VerticalCardProduct category={"printers"} heading={"Printer's"}/>
      <VerticalCardProduct category={"watches"} heading={"Coolest Watches"}/>
    </div>
  )
}

export default Home
