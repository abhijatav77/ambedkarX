import React, { useState } from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { BACKEND_URL } from '../utils/utils'
import { useAuth } from '../context/authProvider'

const Sidebar = ({ setComponent }) => {
  const [show, setShow] = useState(false)
  const { profile } = useAuth()
  console.log("PROFILESSSSSSSSSSSSSSS", profile)
  const navigate = useNavigate()

  const handleComponents = (value) => {
    setComponent(value)
  }

  const goToHome = () => {
    navigate('/')
  }


  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/users/logout`, {
        withCredentials: true
      })
      toast.success(data.message)
      navigate("/login")
    } catch (error) {
      toast(error.response.data.message)
    }
  }
  return (
    <div>

      {show && (
        <div
          className="fixed inset-0 bg-gray-500/30 backdrop-blur-md z-30 sm:hidden"
          onClick={() => setShow(false)}
        ></div>
      )}
      <div className='fixed sm:hidden top-4 left-4 z-50' onClick={() => setShow(!show)}>
        {!show ? <CiMenuBurger size={25} /> : <IoMdClose size={25} />}
      </div>
      <div className={`w-64 bg-gray-100 h-full shadow-lg fixed z-40 top-0 left-0 transition-transform duration-300 transform sm:translate-0 ${show ? "translate-0" : "-translate-x-full"} `}>
        <div className='pt-5 flex flex-col items-center justify-center'>
          <img src={profile.user.adminPhoto.url} alt="AdminPhoto" className='w-30 h-30 rounded-full border-2 border-blue-600' />
          <p className='pt-2 text-sm font-semibold'>{profile.user.fullName}</p>
        </div>
        <ul className='pt-5 space-y-6 mx-4'>
          <button onClick={() => handleComponents("Biography")} className='w-full bg-blue-500 px-4 py-2 text-white rounded-lg hover:bg-blue-700 transition duration-300'>BIOGRAPHY</button>
          <button onClick={() => handleComponents("Create Bio")} className='w-full bg-green-500 px-4 py-2 text-white rounded-lg hover:bg-green-700 transition duration-300'>CREATE BIO</button>
          <button onClick={goToHome} className='w-full bg-violet-500 px-4 py-2 text-white rounded-lg hover:bg-violet-700 transition duration-300'>HOME</button>
          <button onClick={handleLogout} className='w-full bg-red-500 px-4 py-2 text-white rounded-lg hover:bg-red-700 transition duration-300'>LOGOUT</button>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar