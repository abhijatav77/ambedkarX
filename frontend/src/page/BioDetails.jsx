import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../utils/utils'


const BioDetails = () => {
    const {id} = useParams()
    const [bio, setBio] = useState({})
    

    useEffect(() => {
        const fetchBio = async () => {
            try {
                const {data} = await axios.get(`${BACKEND_URL}/bio/${id}`,{
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                console.log("BioDetails: ",data)
                setBio(data.bio)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBio()
    },[id])
  return (
    <div className='bg-gray-100 p-6 '>
        <div className='container mx-auto bg-white max-w-6xl shadow-lg rounded-lg p-8'>
            {bio && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className='w-full space-y-2'>
                        <h1 className='text-2xl font-bold'>{bio.name}</h1>
                        <h2 className=''>{bio.identity}</h2>
                        <p className='whitespace-pre-line text-gray-600 text-sm'>{bio.longBio}</p>
                    </div>
                    <div className='w-full'>
                    <img 
                        src={bio?.bioImage?.url} 
                        alt="Image" 
                        className='w-150 h-150 rounded-lg'
                    />
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default BioDetails