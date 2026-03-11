import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../utils/utils'
import toast from 'react-hot-toast'

const Register = () => {
    const [fullName, setFullName] = useState("")
    const [role, setRole] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [adminPhoto, setAdminPhoto] = useState(null)
    const [preview, setPreview] = useState(null)

    const navigate = useNavigate()

    const changeImageHandler = (e) => {
        const file = e.target.files[0]
        if(file){
            setAdminPhoto(file)
            setPreview(URL.createObjectURL(file))
        } else {
            setAdminPhoto(null)
            setPreview(null)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fullName', fullName)
        formData.append('role', role)
        formData.append('email', email)
        formData.append('password', password)
        if(role === 'admin' && adminPhoto){
            formData.append('adminPhoto', adminPhoto)
        }
        try {
            const {data} = await axios.post(`${BACKEND_URL}/users/register`, formData ,{
                withCredentials: true
            })
            console.log(data)
            toast.success(data.message || "User registered successfully")
            navigate('/login')
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div>
            <div className='min-h-screen flex items-center justify-center bg-gray-100'>
                <div className='w-full max-w-md shadow-md bg-white rounded-lg p-6'>
                    <form onSubmit={handleSubmit}>
                    <h1 className='text-2xl font-bold text-blue-600 text-center'>Ambedkar<span className='text-black'>X</span></h1>
                    <h2 className='text-xl font-semibold mt-5'>Register</h2>
                        <select
                            value={role}
                            onChange={(e)=>setRole(e.target.value)}
                            className='w-full px-4 py-2 border border-blue-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg mt-5'
                        >
                            <option value="">Please select the role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <div className='mt-5'>
                            <input 
                                type="text" 
                                value={fullName}
                                onChange={(e)=>setFullName(e.target.value)}
                                placeholder='Full Name'
                                className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                        <div className='mt-5'>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder='Email Id'
                                className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                        <div className='mt-5'>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder='Password'
                                className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                        {role === 'admin' && (
                            <div className='mt-4'>
                                <div className='flex items-center justify-center'>
                                {preview && (
                                    <img src={preview} alt="preview" className='w-[50%] h-50 rounded-lg object-cover'/>
                                )}
                            </div>
                                <input
                                    type="file"
                                    onChange={changeImageHandler}
                                    className='mt-4 w-full px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                />
                            </div>
                        )}
                        <p className='text-center mt-2 text-gray-700'>Already have an account <Link to={'/login'} className='text-sm text-blue-700 hover:underline duration-300'>Login</Link></p>
                        <button
                            type='submit'
                            className='mt-3 w-full bg-blue-500 text-white rounded-md py-2 cursor-pointer hover:bg-blue-800 duration-300'
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register