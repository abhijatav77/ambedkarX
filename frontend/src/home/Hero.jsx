import React from 'react'
import babasaheb from '../assets/babasaheb.png'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='h-screen'>
            <div className='container mx-auto p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 items-center'>
                <div className='w-full'>
                    <h1 className="text-4xl font-bold">
                        Dr. Bhim Rao Ramji Ambedkar
                    </h1>

                    <h2 className="text-xl mt-2 text-blue-600">
                        Architect of the Indian Constitution
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Dr. B. R. Ambedkar was a great social reformer, jurist, economist,
                        and the chief architect of the Constitution of India. He dedicated
                        his life to fighting against social discrimination and worked for
                        equality, justice, and the rights of marginalized communities.
                    </p>

                    <div className="mt-4">
                        <p>📅 Born: 14 April 1891</p>
                        <p>📍 Place: Mhow, Madhya Pradesh, India</p>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <Link to={'/bio/69ae6a0a3ceae666891051e9'} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-white border border-blue-600 hover:text-black">
                            Learn More
                        </Link>

                        <Link to={'/biography'} className="border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white">
                            Explore Biographies
                        </Link>
                    </div>
                </div>
                <div className='flex md:justify-end justify-center'>
                    <img 
                        src={babasaheb} 
                        alt="baba saheb" 
                        className='rounded-md'
                    />
                </div>
            </div>
            </div>
        </div>
    )
}

export default Hero