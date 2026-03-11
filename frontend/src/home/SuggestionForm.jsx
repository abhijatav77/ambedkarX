import React from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast, {} from 'react-hot-toast'

const SuggestionForm = () => {
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async(data) => {
    const userData = {
        access_key: 'f0fbcd0a-ce23-4e5e-a0de-f72e05740bab',
        fullName: data.fullName,
        email: data.email,
        message: data.message
    }
    try {
        await axios.post("https://api.web3forms.com/submit", userData)
        toast.success("Message sent successfully")
    } catch (error) {
        console.log(error)
        toast.error("Message not delivered")
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='max-w-md container mx-auto p-6 '>
            <div className='bg-white shadow-lg p-5 rounded-lg'>
                <h3 className='text-xl text-center font-semibold'>Suggest Bahujan Mahapurush Biography</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mt-5'>
                        <input 
                            type="text" 
                            name='fullName'
                            {...register("fullName", { required: true })}
                            placeholder='Full Name'
                            className='w-full border border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-1 focus:ring-blue-500'  
                        />
                        {errors.fullName && <span className='text-sm text-red-500 font-semibold'>This field is required</span>}
                    </div>
                    <div className='mt-4'>
                        <input 
                            type="email"
                            name='email'
                            {...register("email", { required: true })}
                            placeholder='Email Id'
                            className='w-full border border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-1 focus:ring-blue-500'  
                        />
                        {errors.email && <span className='text-sm text-red-500 font-semibold'>This field is required</span>}
                    </div>
                    <div className='mt-4'>
                        <textarea
                            rows='4'
                            name='message'
                            {...register("message", { required: true })}
                            placeholder='Suggest bahujan mahapurush biography'
                            className='w-full border border-blue-500 px-4 py-2 rounded-lg outline-none focus:ring-1 focus:ring-blue-500'
                        />
                        {errors.message && <span className='text-sm text-red-500 font-semibold'>This field is required</span>}
                    </div>
                    <button
                        type='submit'
                        className='w-full mt-2 bg-blue-500 text-white py-2 hover:bg-blue-700 duration-300 cursor-pointer rounded-md'
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SuggestionForm