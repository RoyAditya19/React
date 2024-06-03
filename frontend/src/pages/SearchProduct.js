import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    const query = useLocation()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    const fetchProduct = async()=>
        {
            setLoading(true)
            const response = await fetch(SummaryApi.searchProduct.url+query.search)
            const dataResponse = await response.json()
            setLoading(false)

            setData(dataResponse.data)
        }

        useEffect(()=>
        {
            fetchProduct()
        },[query])     //the dependency "query" is given bcoz, as the query will be changing that many times the fetchProduct function will be called
  return (
    <div className='container mx-auto p-4'>
    {
        loading && (
            <p className='text-lg text-center'>Loading...</p>
        )
    }

    <p>Search Results: {data.length}</p>
    {
        data.length === 0 && !loading && (
            <p className='bg-white text-lg text-center p-4'>No Data Found...</p>
        )
    }

    {
        data.length!==0 && !loading && (
        <VerticalCard loading={loading} data={data}/>
              
        )
    }
    </div>
  )
}

export default SearchProduct
