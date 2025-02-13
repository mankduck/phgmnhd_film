import React from "react";
import { Link } from "react-router-dom";

const SlideHomeTop = () => {
    return (
        <div className="slider-area bg-black">
            <div className="container-fluid p-0">
                <div className="hero-slider-four dot-style-1 nav-style-1">
                    <div className="single-hero-slider-wrap single-animation-wrap slider-height-hm4 bg-image-hm4 slider-bg-color-black d-flex align-items-center slider-bg-position-1 bg-black" style={{ backgroundImage: 'url(/assets/images/slider/dau-gau-hoc-nhom.webp)' }}>
                        <div className="slider-content-hm4 slider-animated">
                            <h1 className="title animated">Study Group </h1>
                            <div className="sub-title-time-wrap">
                                <span className="sub-title animated">Đầu Gấu Học Đường</span>
                                {/* <span className="time animated">45 Mins</span> */}
                            </div>
                            <div className="slider-button">
                                <Link
                                    to={'/phim-bo/hoc-sinh-ca-biet'}
                                    className="btn-style-hm4 animated"
                                >
                                    Xem Ngay
                                </Link>
                                {/* <a href="/phim-bo/cay-o-liu-mau-trang" className="btn-style-hm4 animated">Watch Now</a> */}
                            </div>
                        </div>
                    </div>
                    <div className="single-hero-slider-wrap single-animation-wrap slider-height-hm4 bg-image-hm4 slider-bg-color-black d-flex align-items-center slider-bg-position-2 bg-black" style={{ backgroundImage: 'url(/assets/images/slider/cay-o-liu-mau-trang-poster.webp)' }}>
                        <div className="slider-content-hm4 slider-animated">
                            <h1 className="title animated">The White Olive Tree </h1>
                            <div className="sub-title-time-wrap">
                                <span className="sub-title animated">Cây Ô Liu Trắng</span>
                                {/* <span className="time animated">45 Mins</span> */}
                            </div>
                            <div className="slider-button">
                                <Link
                                    to={'/phim-bo/cay-o-liu-mau-trang'}
                                    className="btn-style-hm4 animated"
                                >
                                    Xem Ngay
                                </Link>
                                {/* <a href="/phim-bo/cay-o-liu-mau-trang" className="btn-style-hm4 animated">Watch Now</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SlideHomeTop