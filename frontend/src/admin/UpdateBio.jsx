import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../utils/utils'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateBio = () => {
  const [name, setName] = useState("")
  const [identity, setIdentity] = useState("")
  const [longBio, setLongBio] = useState("")
  const [shortBio, setShortBio] = useState("")
  const [bioImage, setBioImage] = useState("")
  const [previewImage, setPreviewImage] = useState("")

  const navigate = useNavigate()

  const {id} = useParams()
  useEffect(() => {
    const fetchBio = async() => {
      try {
        const {data} = await axios.get(`${BACKEND_URL}/bio/${id}`,{
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/file-data"
        }
      })
      console.log("Bio Images :",data.bio)
      setName(data?.bio?.name)
      setIdentity(data?.bio?.identity)
      setLongBio(data?.bio?.longBio)
      setShortBio(data?.bio?.shortBio)
      setPreviewImage(data?.bio?.bioImage?.url)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBio()
  },[id])


  const changeImageHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPreviewImage(reader.result)
      setBioImage(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("identity", identity)
    formData.append("longBio", longBio)
    formData.append("shortBio", shortBio)
    formData.append("bioImage", bioImage)
    try {
      const { data } = await axios.put(`${BACKEND_URL}/bio/update/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/file-data"
        }
      })
      console.log(data)
      toast.success(data.message)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className='min-h-screen flex items-center mt-8 mb-8 justify-center'>
      <div className='w-full max-w-xl'>
        <form onSubmit={handleSubmit}>
          <h1 className='text-2xl text-center font-semibold'>UPDATE BIOGRAPHY</h1>
          <div className='mt-5'>
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder='Mahapurush Name'
              className='w-full border border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>
          <div className='mt-5'>
            <input
              type="text"
              value={identity}
              onChange={(e)=>setIdentity(e.target.value)}
              placeholder='Mahapurush Identity'
              className='w-full border border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>
          <div className='mt-5'>
            <textarea
              rows='4'
              type="text"
              value={longBio}
              onChange={(e)=>setLongBio(e.target.value)}
              placeholder='Long Bio'
              className='w-full border border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>
          <div className='mt-5'>
            <textarea
              rows='3'
              type="text"
              value={shortBio}
              onChange={(e)=>setShortBio(e.target.value)}
              placeholder='Short Bio (Minimum 350 characters required)'
              className='w-full border border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>
          <div className='mt-4'>
            <div className='flex items-center justify-center'>
              <img src={previewImage ? `${previewImage}` : "imgPL.webp"} alt="Image" className='w-50 rounded-lg' />
            </div>
            <input
              type="file"
              onChange={changeImageHandler}
              className='mt-5 w-full border border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>
          <button className='mt-4 w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg cursor-pointer'>
            Update Bio
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateBio