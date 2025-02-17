import React from "react"
import Header from "@components/Backend/Header/Header"
import Footer from "@components/Backend/Footer/Footer"

const LayoutAdmin = ({ children }) => {

    return (
        <div className="main-wrapper">
            <Header />
            {children}
            <Footer />
        </div>
    )
};

export default LayoutAdmin;
