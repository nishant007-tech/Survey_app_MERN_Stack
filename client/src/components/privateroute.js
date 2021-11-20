import React from 'react'
import { Navigate } from 'react-router'

const Privateroute = ({ Component, token, apiData }) => {

    if (apiData?.role === "Admin") {
        return <Navigate to="/admin-home" />
    }
    else if (apiData?.role === "User") {
        return <Navigate to="/user-home" />
    }
    else {
        return Component
    }
}
export default Privateroute
