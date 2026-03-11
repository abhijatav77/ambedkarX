import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../utils/utils'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthProvider'

const Login = () => {

    const {setIsAuthenticated, setProfile} = useAuth()

    const [role, setRole] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(`${BACKEND_URL}/users/login`, {role, email, password}, {
                withCredentials: true
            })
            console.log(data)
            toast.success(data.message || "User logged in successfully")
            setIsAuthenticated(true)
            setProfile(data)
            navigate('/')
            setRole("")
            setEmail("")
            setPassword("")
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
                    <h2 className='text-xl font-semibold mt-5'>Login</h2>
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
                        <p className='text-center mt-2 text-gray-700'>Create an account <Link to={'/register'} className='text-sm text-blue-700 hover:underline'>Register</Link></p>
                        <button
                            type='submit'
                            className='mt-3 w-full bg-blue-500 text-white rounded-md py-2 cursor-pointer hover:bg-blue-800 duration-300'
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login