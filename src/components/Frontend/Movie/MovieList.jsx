import React, { useEffect, useState } from "react"
import Slider from "react-slick"
import movieAPI from "@api/axiosClient"
import Loader from "@components/Frontend/Loader/Loader"
import { Link } from "react-router-dom"
import HomeComponent from "@components/Frontend/HomeComponent/HomeComponent"

const MovieList = () => {
    const [movies, setMovies] = useState([])
    const [movies2, setMovies2] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await movieAPI.getMovieNewUpdate(1)
                const data2 = await movieAPI.getMovieNewUpdate(5)
                setMovies(data.items)
                setMovies2(data2.items)
                setLoading(false)
            } catch (err) {
                console.error('FETCH MOVIE FAILED: ', err)
                setLoading(false)
            }
        }
        fetchMovies()
    }, [])

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
    }

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
                                                    <Link to={`/phim-moi/${item.slug}`}>
                                                        <img src={item.poster_url} alt={item.name} />
                                                    </Link>
                                                </div>
                                                <div className="movie-content">
                                                    <h3 className="title">
                                                        <Link to={`/phim-moi/${item.slug}`}>{item.name}</Link>
                                                    </h3>
                                                    <span>{item.origin_name}</span>
                                                    <div className="movie-btn">
                                                        <Link
                                                            to={`/phim-moi/${item.slug}`}
                                                            className="btn-style-hm4-2 animated"
                                                        >
                                                            Xem Ngay
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>)}
            <HomeComponent />
            {loading
                ? (<Loader />)
                : (
                    <div className="movie-list section-padding-lr section-pt-50 section-pb-50 bg-black">
                        <div className="container-fluid">
                            <div className="section-title-4 st-border-bottom">
                                <h2>Có thể bạn sẽ thích</h2>
                            </div>
                            <div className="movie-slider-active nav-style-2">
                                <Slider {...settings}>
                                    {movies2.map((item) => (
                                        <div className="movie-wrap-plr" key={item._id}>
                                            <div className="movie-wrap text-center">
                                                <div className="movie-img">
                                                    <Link to={`/phim-moi/${item.slug}`}>
                                                        <img src={item.poster_url} alt={item.name} />
                                                    </Link>
                                                </div>
                                                <div className="movie-content">
                                                    <h3 className="title">
                                                        <Link to={`/phim-moi/${item.slug}`}>{item.name}</Link>
                                                    </h3>
                                                    <span>{item.origin_name}</span>
                                                    <div className="movie-btn">
                                                        <Link
                                                            to={`/phim-moi/${item.slug}`}
                                                            className="btn-style-hm4-2 animated"
                                                        >
                                                            Xem Ngay
                                                        </Link>
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
    )
}

export default MovieList
