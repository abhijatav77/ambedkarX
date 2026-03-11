import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './page/Login'
import Register from './page/Register'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer'
import About from './page/About'
import Contact from './page/Contact'
import Biography from './page/Biography'
import BioDetails from './page/BioDetails'
import Dashboard from './page/Dashboard'
import UpdateBio from './admin/UpdateBio'
import NotFound from './page/NotFound'
import Profile from './admin/Profile'
import { useAuth } from './context/AuthProvider'
import PrivateRoute from './context/PrivateRoute'

const App = () => {

  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/register", "/login", '/bio/update/:id'].includes(location.pathname)

  const {isAuthenticated, loading} = useAuth()
  
  if(loading) return null

  return (
    <>
    {!hideNavbarFooter && <Navbar />}
    <Toaster />
      <Routes>
        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/biography' element={<Biography />}></Route>
        <Route path='/bio/:id' element={<BioDetails />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/bio/update/:id' element={<UpdateBio />}></Route>

        <Route path='/profile' element={<Profile />}></Route>

        {/* Page not found */}
        <Route path='/*' element={ <NotFound /> } ></Route>

      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  )
}

export default App