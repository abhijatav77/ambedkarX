import React from 'react'
import { useAuth } from '../context/AuthProvider'

const Profile = () => {
    const {profile} = useAuth()
    console.log("profilesssssssssssssssssss", profile)
  return (
    <div>Profile</div>
  )
}

export default Profile