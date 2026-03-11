import axios from 'axios'
import React, { useState } from 'react'
import { BACKEND_URL } from '../../utils/utils'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const CreateBio = () => {
  const [name, setName] = useState("")
  const [identity, setIdentity] = useState("")
  const [longBio, setLongBio] = useState("")
  const [shortBio, setShortBio] = useState("")
  const [bioImage, setBioImage] = useState("")
  const [previewImage, setPreviewImage] = useState("")

  const navigate = useNavigate("")

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
      const { data } = await axios.post(`${BACKEND_URL}/bio/create-bio`, formData, {
        headers: {
          "Content-Type": "multi/data-files"
        }
      })
      console.log(data)
      toast.success(data.message)
      navigate('')
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='sm:ml-66 min-h-screen flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-lg w-full max-w-xl p-8'>
        <form onSubmit={handleSubmit}>
          <h1 className='text-2xl text-center font-semibold'>Create Biography</h1>
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
          <button className='mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg cursor-pointer'>
            Create Bio
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateBio