import React from "react"
import { Link } from 'react-router-dom'

import Header from "./Header/Header"
import Footer from "./Footer/Footer"

const Layout = ({ children }) => {
    return (
        <div className="main-wrapper">
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout