import React from 'react'
import { useEffect, useContext, createContext, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../../utils/utils'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [book, setBook] = useState([])
    const [bio, setBio] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState()

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await axios.get(`${BACKEND_URL}/books/all-books`,{
                    withCredentials: true
                })
                console.log(data)
                setBook(data.allBooks)
            } catch (error) {
                console.log(error)
            } 
        }
        const fetchBios = async () => {
            try {
                const {data} = await axios.get(`${BACKEND_URL}/bio/all-bio`,{
                    withCredentials: true
                })
                console.log(data)
                setBio(data.allBio)
            } catch (error) {
                console.log(error)
            }

        }
        const fetchProfile = async () => {
            try {
                const {data} = await axios.get(`${BACKEND_URL}/users/profile`,{
                    withCredentials: true
                })
                console.log(data)
                setProfile(data)
                setIsAuthenticated(true)
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false)
            } finally {
                setLoading(false)
            }
        }
        fetchBooks()
        fetchBios()
        fetchProfile()
    },[])
    return (
        <AuthContext.Provider value={{book, bio, setBio, setBook, isAuthenticated, setIsAuthenticated, loading, profile, setProfile}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)