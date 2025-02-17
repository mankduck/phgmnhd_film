import React from "react"
import Breadcrumb from "@components/Frontend/Breadcrumb/Breadcrumb"
import HomeComponent from "@components/Backend/HomeComponent/HomeComponent"


const HomeAdmin = () => {
    return (
        <>
            <Breadcrumb name={"TRANG QUẢN TRỊ"} />
            <HomeComponent />
        </>
    )
}

export default HomeAdmin