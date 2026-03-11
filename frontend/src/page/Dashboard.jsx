import React, { useState } from 'react'
import Sidebar from '../admin/Sidebar'
import Biography from '../admin/Biography'
import UpdateBio from '../admin/UpdateBio'
import CreateBio from '../admin/CreateBio'

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const Dashboard = () => {
    const [component, setComponent] = useState("Biography")
    const { isAuthenticated, profile, loading } = useAuth()

    console.log("Dashboard auth:", isAuthenticated)
    console.log("Dashboard profile:", profile)
    console.log("Dashboard :", isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to={'/'} />
    }

    if (profile?.role !== "admin") {
        return <Navigate to={"/"} />
    }

    if (loading) return null
    return (
        <div>
            <Sidebar component={component} setComponent={setComponent} />
            {component === "Create Bio" ? (
                <CreateBio />
            ) : component === "Update Bio" ? (
                <UpdateBio />
            ) : (
                <Biography />
            )}
        </div>
    )
}

export default Dashboard 