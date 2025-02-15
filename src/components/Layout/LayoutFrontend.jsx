import React from "react"
import { Link } from 'react-router-dom'

import Header from "@components/Frontend/Header/Header"
import Footer from "@components/Frontend/Footer/Footer"

const LayoutFrontend = ({ children }) => {
    return (
        <div className="main-wrapper">
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default LayoutFrontend