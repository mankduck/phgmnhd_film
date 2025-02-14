import React from "react"
import { Link } from "react-router-dom"

const SlideHomeTop = () => {
    return (
        <div id="carouselExampleDark" className="carousel carousel-dark slide">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                {/* <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button> */}
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                    <img
                        src="/assets/images/slider/dau-gau-hoc-nhom.webp"
                        className="d-block w-100"
                        style={{ height: "600px", objectFit: "cover" }}
                        alt="..." />
                    {/* <div className="carousel-caption d-none d-md-block">
                        <h2 className="text-white text-start text-uppercase fw-bold py-5">Đầu Gấu Học Nhóm</h2>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div> */}
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                    <img src="/assets/images/slider/cay-o-liu-mau-trang-poster.webp"
                        className="d-block w-100"
                        style={{ height: "600px", objectFit: "cover" }}
                        alt="..." />
                    {/* <div className="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div> */}
                </div>
                {/* <div className="carousel-item">
                    <img src="/assets/images/slider/friendly-rivalry.jpg"
                        className="d-block w-100"
                        style={{ height: "600px", objectFit: "cover" }}
                        alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                    </div>
                </div> */}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                    style={{ color: 'White' }}
                ></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                    style={{ color: 'White' }}
                ></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        // <div className="slider-area bg-black">
        //     <div className="container-fluid p-0">
        //         <div className="hero-slider-four dot-style-1 nav-style-1">
        //             <div className="single-hero-slider-wrap single-animation-wrap slider-height-hm4 bg-image-hm4 slider-bg-color-black d-flex align-items-center slider-bg-position-1 bg-black" style={{ backgroundImage: 'url(/assets/images/slider/dau-gau-hoc-nhom.webp)' }}>
        //                 <div className="slider-content-hm4 slider-animated">
        //                     <h1 className="title animated">Study Group </h1>
        //                     <div className="sub-title-time-wrap">
        //                         <span className="sub-title animated">Đầu Gấu Học Đường</span>
        //                         {/* <span className="time animated">45 Mins</span> */}
        //                     </div>
        //                     <div className="slider-button">
        //                         <Link
        //                             to={'/phim-bo/hoc-sinh-ca-biet'}
        //                             className="btn-style-hm4 animated"
        //                         >
        //                             Xem Ngay
        //                         </Link>
        //                         {/* <a href="/phim-bo/cay-o-liu-mau-trang" className="btn-style-hm4 animated">Watch Now</a> */}
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="single-hero-slider-wrap single-animation-wrap slider-height-hm4 bg-image-hm4 slider-bg-color-black d-flex align-items-center slider-bg-position-2 bg-black" style={{ backgroundImage: 'url(/assets/images/slider/cay-o-liu-mau-trang-poster.webp)' }}>
        //                 <div className="slider-content-hm4 slider-animated">
        //                     <h1 className="title animated">The White Olive Tree </h1>
        //                     <div className="sub-title-time-wrap">
        //                         <span className="sub-title animated">Cây Ô Liu Trắng</span>
        //                         {/* <span className="time animated">45 Mins</span> */}
        //                     </div>
        //                     <div className="slider-button">
        //                         <Link
        //                             to={'/phim-bo/cay-o-liu-mau-trang'}
        //                             className="btn-style-hm4 animated"
        //                         >
        //                             Xem Ngay
        //                         </Link>
        //                         {/* <a href="/phim-bo/cay-o-liu-mau-trang" className="btn-style-hm4 animated">Watch Now</a> */}
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default SlideHomeTop