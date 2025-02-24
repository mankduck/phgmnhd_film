import React from "react"
import { Link } from 'react-router-dom'

import Header from "@components/Frontend/Header/Header"
import Footer from "@components/Frontend/Footer/Footer"
import PopupNotification from "@components/Frontend/PopupNotification/PopupNotification"

const LayoutFrontend = ({ children }) => {
    return (
        <div className="main-wrapper">
            <Header />
            <PopupNotification />
            {children}
            <Footer />
        </div>
    )
}

export default LayoutFrontend