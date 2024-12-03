import React, { useEffect, useState } from "react";
import Slider from "react-slick"; // Import react-slick
import movieAPI from "../../api/axiosClient";
import Loader from "../Loader/Loader";

// Cài đặt Slider options
const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await movieAPI.getMovieNewUpdate();
                setMovies(data.items);
                setLoading(false)
            } catch (err) {
                console.error('FETCH MOVIE FAILED: ', err);
                setLoading(false)
            }
        };
        fetchMovies();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: (
            <button type="button" className="slick-prev">
                <i className="zmdi zmdi-chevron-left"></i>
            </button>
        ),
        nextArrow: (
            <button type="button" className="slick-next">
                <i className="zmdi zmdi-chevron-right"></i>
            </button>
        ),
        responsive: [
            {
                breakpoint: 1365,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <>
            {loading
                ? (<Loader />)
                : (
                    <div className="movie-list section-padding-lr section-pt-50 section-pb-50 bg-black">
                        <div className="container-fluid">
                            <div className="section-title-4 st-border-bottom">
                                <h2>Phim mới</h2>
                            </div>
                            <div className="movie-slider-active nav-style-2">
                                <Slider {...settings}>
                                    {movies.map((item) => (
                                        <div className="movie-wrap-plr" key={item._id}>
                                            <div className="movie-wrap text-center">
                                                <div className="movie-img">
                                                    <a href={`phim-moi/${item.slug}`}>
                                                        <img src={item.thumb_url} alt={item.name} />
                                                    </a>
                                                </div>
                                                <div className="movie-content">
                                                    <h3 className="title">
                                                        <a href={`phim-moi/${item.slug}`}>{item.name}</a>
                                                    </h3>
                                                    <span>Quality : HD</span>
                                                    <div className="movie-btn">
                                                        <a
                                                            href={`phim-moi/${item.slug}`}
                                                            className="btn-style-hm4-2 animated"
                                                        >
                                                            Xem Ngay
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>)}
        </>
    );
};

export default MovieList;
