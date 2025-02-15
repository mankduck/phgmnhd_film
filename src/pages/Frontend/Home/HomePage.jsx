import React from "react"

import SlideHomeTop from "@components/Frontend/Slide/SlideHomeTop"
import MovieList from "@components/Frontend/Movie/MovieList"
import HomeComponent from "@components/Frontend/HomeComponent/HomeComponent"


const HomePage = () => {
    return (
        <>
            <SlideHomeTop />
            <MovieList />
            {/* <HomeComponent /> */}
        </>
    )
}

export default HomePage