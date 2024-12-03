import React from "react";

const SlideHomeTop = () => {
    return (
        <div className="slider-area bg-black">
            <div className="container-fluid p-0">
                <div className="hero-slider-four dot-style-1 nav-style-1">
                    <div className="single-hero-slider-wrap single-animation-wrap slider-height-hm4 bg-image-hm4 slider-bg-color-black d-flex align-items-center slider-bg-position-1 bg-black" style={{ backgroundImage: 'url(%PUBLIC_URL%/assets/images/slider/slider-hm4-1.jpg)' }}>
                        <div className="slider-content-hm4 slider-animated">
                            <h1 className="title animated">Out Of Network </h1>
                            <div className="sub-title-time-wrap">
                                <span className="sub-title animated">Feel Good</span>
                                <span className="time animated">45 Mins</span>
                            </div>
                            <div className="slider-button">
                                <a href="movie-details.html" className="btn-style-hm4 animated">Watch Now</a>
                            </div>
                        </div>
                    </div>
                    <div className="single-hero-slider-wrap single-animation-wrap slider-height-hm4 bg-image-hm4 slider-bg-color-black d-flex align-items-center slider-bg-position-2 bg-black" style={{ backgroundImage: 'url(%PUBLIC_URL%/assets/images/slider/slider-hm4-1.jpg)' }}>
                        <div className="slider-content-hm4 slider-animated">
                            <h1 className="title animated">Out Of Network </h1>
                            <div className="sub-title-time-wrap">
                                <span className="sub-title animated">Feel Good</span>
                                <span className="time animated">45 Mins</span>
                            </div>
                            <div className="slider-button">
                                <a href="movie-details.html" className="btn-style-hm4 animated">Watch Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SlideHomeTop