import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import toast from 'react-hot-toast';
import axios from 'axios';
import { BACKEND_URL } from '../utils/utils';
import { useAuth } from '../context/AuthProvider';


const Navbar = () => {
    const [show, setShow] = useState(false)
    const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useAuth();

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const { data } = await axios.get(`${BACKEND_URL}/users/logout`, {
                withCredentials: true
            })
            toast.success(data.message)
            setIsAuthenticated(false)
            setProfile(null)
            navigate("/login")
        } catch (error) {
            toast(error?.response?.data?.message)
        }
    }

    // if(!profile) return null

    return (
        <div className='shadow-lg'>
            <nav className='container mx-auto z-50 p-6'>
                <div className='flex justify-between items-center'>
                    <h1 className='sm:hid text-2xl font-bold text-blue-600 text-center'>Ambedkar<span className='text-black'>X</span></h1>
                    <div className='hidden md:flex gap-8'>
                        <Link to={'/'} className='hover:text-blue-700 duration-300'>Home</Link>
                        <Link to={'/biography'} className='hover:text-blue-700 duration-300'>Biography</Link>
                        <Link to={'/about'} className='hover:text-blue-700 duration-300'>About</Link>
                        <Link to={'/contact'} className='hover:text-blue-700 duration-300'>Contact us</Link>
                    </div>
                    {/* Mobile navbar */}
                    <div className='md:hidden cursor-pointer' onClick={() => setShow(!show)}>{show ? (<AiOutlineClose size={25} />) : <AiOutlineMenu size={25} />}</div>
                </div>
                {/* Mobile Navbar */}
                {show && (
                    <div className='bg-white'>
                        <div className='md:hidden h-screen flex flex-col items-center justify-center text-2xl space-y-8 font-semibold'>
                    <div className='space-x-3'>
                        {isAuthenticated && profile?.role === 'admin' ? (
                            <Link to={'/dashboard'}
                                className='bg-blue-500 hover:bg-blue-800 duration-300 text-white rounded-md px-3 py-2'
                            >Dashboard</Link>

                        ) : (
                            <div></div>
                        )}
                        {isAuthenticated &&
                            <button onClick={handleLogout}
                                className='bg-red-500 hover:bg-red-800 duration-300 text-white rounded-md px-3 py-2 cursor-pointer'
                            >Logout</button>
                        }
                    </div>
                            <Link to={'/'} onClick={() => setShow(!show)} className='hover:text-blue-700 duration-300'>Home</Link>
                            <Link to={'/biography'} onClick={() => setShow(!show)} className='hover:text-blue-700 duration-300'>Biography</Link>
                            <Link to={'/about'} onClick={() => setShow(!show)} className='hover:text-blue-700 duration-300'>About</Link>
                            <Link to={'/contact'} onClick={() => setShow(!show)} className='hover:text-blue-700 duration-300'>Contact us</Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default Navbar