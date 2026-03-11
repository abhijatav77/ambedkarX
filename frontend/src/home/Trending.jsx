import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthProvider';


const Trending = () => {
  const { bio } = useAuth()
  console.log(bio)

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (

    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto p-6'>
      <h1 className='mb-10 text-xl font-bold text-blue-700'>Trending</h1>
      <Carousel
        responsive={responsive}
        infinite={true}     // loops slides
        arrows={true}       // show arrows
        showDots={true}     // navigation dots
        autoPlay={true}
      >
        {bio && bio.length > 0 &&
          bio.slice(0, 6).map((element) => (
            <div
              key={element._id}
              className='bg-white p-10 mx-3 shadow-md rounded-md'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 place-items-center '>
                <img
                  src={element.bioImage.url}
                  alt="Image"
                  className="object-cover rounded-lg shadow-md w-60 h-90"
                />
                <div className='text-center md:text-left space-y-2 cursor-pointer'>
                  <h1 className='text-center font-semibold text-2xl md:text-left'>{element.name}</h1>
                  <p className='text-blue-400 font-sm'>{element.identity}</p>
                  <p className='text-gray-600 mb-5'>{element.shortBio}</p>
                  <Link
                    to={`/bio/${element._id}`}
                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 duration-300'
                  >Read More!</Link>
                </div>
              </div>
            </div>
          ))}
      </Carousel>
      </div>
    </div>

  )
}

export default Trending