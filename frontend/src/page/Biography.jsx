import React from 'react'
import { useAuth } from '../context/authProvider'
import {Link} from "react-router-dom"

const Biography = () => {
    const { bio } = useAuth()
    console.log("BIOs :", bio)
    return (
        <div className='container mx-auto p-6'>
            <div
                className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'
            >
                {bio.map((element) => (
                    <div key={element._id}>
                        <Link
                            to={`/bio/${element._id}`}
                            className='w-full hover:scale-105 duration-300 relative'
                        >
                            <img
                                src={element.bioImage.url}
                                alt="Bio_Image"
                                className='w-full h-70 rounded-lg shadow-lg'
                            />
                            <div className='absolute inset-0 bg-linear-to-b to-gray-900 from-transparent rounded-lg'>
                                <div className='absolute bottom-2 left-2'>
                                    <h1 className='text-white font-semibold'>{element.name}</h1>
                                    <p className='text-white text-sm'>{element.identity}</p>
                                    <p className='text-white text-sm'>{element.BorD}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Biography