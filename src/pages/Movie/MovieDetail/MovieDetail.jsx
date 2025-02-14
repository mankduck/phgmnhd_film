import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import movieAPI from "../../../api/axiosClient"
import Hls from "hls.js"
import Slider from "react-slick"
import { toast } from "react-toastify"
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb"
import Loader from "../../../components/Loader/Loader"

const MovieDetail = () => {
    const { slug } = useParams()
    const videoRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const [movieInfo, setMovieInfo] = useState(null)
    const [movieEpisodes, setMovieEpisodes] = useState([])
    const [selectedEpisode, setSelectedEpisode] = useState(0)

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true)
            try {
                const data = await movieAPI.getMovieDetail(slug)
                console.log(data)
                setMovieInfo(data.movie)
                setMovieEpisodes(data.episodes)
                setLoading(false)
            } catch (error) {
                toast.error("Không thể lấy dữ liệu phim! Vui lòng thử lại.")
                setLoading(false)
            }
        }

        fetchMovie()
    }, [slug])

    useEffect(() => {
        if (movieEpisodes.length > 0 && videoRef.current) {
            const video = videoRef.current
            const videoSrc = movieEpisodes[0].server_data[selectedEpisode].link_m3u8

            if (Hls.isSupported()) {
                const hls = new Hls()
                hls.loadSource(videoSrc)
                hls.attachMedia(video)

                return () => {
                    hls.destroy()
                }
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = linkMovie
                video.addEventListener("canplay", function () {
                    video.play()
                })
            }
        }
    }, [selectedEpisode, movieEpisodes])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
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
                    slidesToScroll: 5,
                },
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                movieInfo && (
                    <>
                        <Breadcrumb name={movieInfo.name + ' ( ' + movieInfo.origin_name + ' )'} />
                        <div className="movie-details-wrap section-ptb-50 bg-black">
                            <div className="container">
                                <div className="movie-details-video-content-wrap">
                                    <div className="video-wrap">
                                        <video
                                            id="movieVideo"
                                            ref={videoRef}
                                            controls
                                            disablepictureinpicture
                                            controlslist
                                            loop="loop"
                                            poster={movieInfo.thumb_url}
                                            style={{ width: "100%", height: "auto" }}
                                        ></video>
                                    </div>
                                    <div className="movie-details-content">
                                        <div className="movie-details-info">
                                            <ul>
                                                <li>
                                                    <span>Đạo diễn: </span>
                                                    {movieInfo.director || "Không rõ"}
                                                </li>
                                                <li>
                                                    <span>Diễn viên chính: </span>
                                                    {movieInfo.actor && movieInfo.actor.length > 0
                                                        ? movieInfo.actor.join(", ")
                                                        : "Không rõ"}
                                                </li>
                                                <li>
                                                    <span>Năm: </span>
                                                    {movieInfo.year || "Không rõ"}
                                                </li>
                                                <li>
                                                    <span>Tập: </span>
                                                    {movieEpisodes[0].server_data[selectedEpisode].name || "Không rõ"}
                                                </li>
                                            </ul>
                                        </div>
                                        <p>{movieInfo.content || "Không có mô tả"}</p>
                                        <div className="like-share-wrap">
                                            <div className="social-share-wrap">
                                                <span>Chia sẻ:</span>
                                                <div className="social-style-1">
                                                    <a className="facebook" href="#">
                                                        <i className="zmdi zmdi-facebook"></i>
                                                    </a>
                                                    <a className="pinterest" href="#">
                                                        <i className="zmdi zmdi-github"></i>
                                                    </a>
                                                    {/* <a className="linkedin" href="#">
                                                        <i className="zmdi zmdi-linkedin"></i>
                                                    </a> */}
                                                    <a className="instagram" href="#">
                                                        <i className="zmdi zmdi-instagram"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="movie-list section-pb-50 bg-black">
                            <div className="container">
                                <div className="section-title-4 st-border-bottom">
                                    <h2>Tập phim</h2>
                                </div>
                                <div className="movie-slider-active nav-style-3">
                                    <Slider {...settings}>
                                        {
                                            movieEpisodes[0].server_data.length > 1 ? (
                                                movieEpisodes[0].server_data.map((episode, index) => (
                                                    <div key={index} className="movie-wrap px-2 text-center">
                                                        <div className="movie-img">
                                                            <a href="#" onClick={() => setSelectedEpisode(index)}>
                                                                <img src={movieInfo.poster_url} alt="" />
                                                            </a>
                                                        </div>
                                                        <div className="movie-content">
                                                            <h3 className="title">
                                                                <a href="#">{episode.name}</a>
                                                            </h3>
                                                            <div className="movie-btn">
                                                                <a
                                                                    href="#"
                                                                    onClick={() => setSelectedEpisode(index)}
                                                                    className="btn-style-hm4-2 animated"
                                                                >
                                                                    Xem Ngay
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : ('')
                                        }
                                    </Slider>
                                </div>
                            </div>
                        </div>

                        <div className="movie-details-wrap section-ptb-50 bg-black">
                            <div className="container">
                                <div className="section-title-4 st-border-bottom">
                                    <h2>Trailer</h2>
                                </div>
                                <div className="movie-details-video-content-wrap">
                                    <div className="video-wrap">
                                        {movieInfo.trailer_url && (
                                            <iframe
                                                width="100%"
                                                height="500"
                                                src={movieInfo.trailer_url.replace("watch?v=", "embed/")}
                                                title="YouTube video player"
                                                allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            )}
        </>
    )
}

export default MovieDetail
