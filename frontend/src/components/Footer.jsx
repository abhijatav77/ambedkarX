import React from 'react'
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <div>
    <div className='border border-gray-300'>
      <div className='container mx-auto p-10 flex flex-col items-center space-y-3'>
        <h1 className='text-2xl font-semibold cursor-default text-blue-700'>Abhi Jatav</h1>
        <p className='text-gray-600 text-sm text-center'>This is the my first website to credit dr. baba saheb bhimrao ambedkar. I am able to do all this only because of you. Thanks of all bahujan mahapurush</p>
        <div className='flex space-x-2'>
          <a href="https://github.com/abhijatav77" target='_blank' rel='noopener noreferrer'>
            <FaGithub className='text-xl hover:text-pink-900 cursor-pointer duration-300'/>
          </a>
          <a href="https://www.linkedin.com/in/abhi-jatav77/" target='_blank' rel='noopener noreferrer'>
            <FaLinkedin className='text-xl hover:text-blue-900 cursor-pointer duration-300' />
          </a>
          <a href="https://youtube.com" target='_blank' rel='noopener noreferrer'>
            <FaYoutube className='text-xl hover:text-red-600 cursor-pointer duration-300' />
          </a>
        </div>
      </div>
    </div>
    <p className='text-sm text-gray-600 text-center p-5'>&copy; 2026 AbhiJatav. All rights reserved.</p>
    </div>
  )
}

export default Footer