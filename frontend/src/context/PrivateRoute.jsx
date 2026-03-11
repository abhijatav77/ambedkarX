import React from 'react'
import { useAuth } from './AuthProvider'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {isAuthenticated, loading} = useAuth()
    if(loading) return null

  return (
    <div>
        {isAuthenticated ? children : <Navigate to={'/login'} />}
    </div>
  )
}

export default PrivateRoute