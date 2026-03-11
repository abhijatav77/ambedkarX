import React from 'react'
import { useAuth } from '../context/AuthProvider'

const Famous = () => {
  const {book} = useAuth()
  return (
    <div className='bg-blue-50 pb-8'>
      <div className='container mx-auto p-6'>
        <h1 className='text-xl font-bold text-blue-700 mb-5'>Famous</h1>
        {book && book.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
          {book.slice(0,6).map((element) => (
              <div key={element._id}
                className='bg-white shadow-lg rounded-lg w-full text-center p-4 hover:scale-105 duration-300'
              >
                <div className='relative'>
                  <img 
                    src={element.image.url} 
                    alt="bookImage" 
                    className='w-full h-60 object-cover rounded-md'
                  />
                  <span 
                    className='absolute bottom-2 left-2 bg-blue-500 text-white hover:bg-blue-700 duration-300 cursor-pointer px-2 text-sm rounded-lg'
                  >Famous</span>
                  </div>
                  <div className='mt-2'>
                    <h1 className='text-xl font-semibold text-gray-800'>{element.title}</h1>
                    <p className='text-sm '>{element.author}</p>
                  </div>
              </div>
          ))} 
            </div>
        ) : (
          <div className='text-center text-2xl'>Loading</div>
        )}
      </div>
    </div>
  )
}

export default Famous