import React from 'react'
import loading from './Eclipse-1s-200px.gif'

const Spinner =()=> {
    return (
      <div className='text-center'>
        <img src={loading} alt="Loading" />
      </div>
    )
}

export default Spinner
