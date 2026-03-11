import React from 'react'
import space from '../assets/space.png'

const NotFound = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className='flex justify-center items-center'>
            <img 
              src={space} alt="page not found" 
              className='w-[50%]'  
            />
            <div>
              <h1 className='text-4xl font-bold text-center'>404</h1>
              <p className='text-2xl'>Page not found</p>
            </div>
        </div>
    </div>
  )
}

export default NotFound