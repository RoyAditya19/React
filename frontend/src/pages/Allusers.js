import React, { useState, useEffect } from 'react'
import SummaryApi from '../common'

const Allusers = () => {
  const[allUser, setAllUsers] = useState([])

  const fetchAllUsers = async()=>
    {
      const fetchData = await fetch(SummaryApi.allUser.url,{
        method: SummaryApi.allUser.method,
        credentials: 'include'
    })

    const dataResponse = await fetchData.json()
    console.log(dataResponse)

    }
    

    useEffect(() => {
      
        fetchAllUsers()
    }, [])
    
  return (
    <div>
      
    </div>
  )
}

export default Allusers
