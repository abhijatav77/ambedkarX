import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/utils'
import { Link, useNavigate } from 'react-router-dom'

const Biography = () => {
  const [bio, setBio] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/bio/all-bio`)
        console.log("Biography :", data)
        setBio(data.allBio)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchBio()
  }, [])

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this bio?")) {
        return;
      }
      const { data } = await axios.delete(`${BACKEND_URL}/bio/delete/${id}`, {
        withCredentials: true
      })
      toast.success(data.message)
      setBio(bio.filter((value) => value._id !== id))
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='p-6 sm:ml-66 mt-8'>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {bio && bio.length > 0 ? (
          bio.map((element) => (
            <div key={element._id} className='bg-white shadow-md rounded-lg p-2'>
              <div className='relative'>
                <img src={element.bioImage.url} alt="Bio Image" className='w-full h-60 object-cover rounded-lg' />
                <div className='absolute bottom-0 w-full bg-black/50 text-center py-1'>
                  <h1 className='font-semibold text-white'>{element.name}</h1>
                  <h2 className=' text-white text-sm'>{element.identity}</h2>
                </div>
              </div>
              <div className='flex justify-between mt-3 gap-'>
                <Link to={`/bio/update/${element._id}`} className='bg-blue-500 text-white font-medium px-3 py-1 rounded-lg hover:bg-blue-700 duration-300'>Update</Link>
                <button onClick={()=>handleDelete(element._id)} className='bg-red-500 text-white font-medium px-3 py-1 rounded-lg hover:bg-red-700 cursor-pointer duration-300'>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default Biography