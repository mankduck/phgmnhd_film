import React, { useState, useEffect, useRef } from "react"
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom"
import movieAPI from "@api/axiosClient"
import Hls from "hls.js"
import { toast } from "react-toastify"
import Loader from "@components/Frontend/Loader/Loader"
import NoSleep from 'nosleep.js'
import FacebookComment from "@components/Frontend/FacebookComment/FacebookComment";
import FacebookLike from "@components/Frontend/FacebookLike/FacebookLike";

const MovieDetail = () => {
    const { slug } = useParams()
    const videoRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const [movieInfo, setMovieInfo] = useState(null)
    const [movieNew, setMovieNew] = useState(null)
    const [movieEpisodes, setMovieEpisodes] = useState([])
    const [selectedEpisode, setSelectedEpisode] = useState(0)
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tap = searchParams.get("tap");


    useEffect(() => {
        if (tap) {
            setSelectedEpisode(Number(tap) - 1);
        }
    })

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true)
            try {
                const data = await movieAPI.getMovieDetail(slug)
                const dataNewMovie = await movieAPI.getMovieNewUpdate(1)
                console.log(data);
                setMovieInfo(data.movie)
                setMovieEpisodes(data.episodes)
                setMovieNew(dataNewMovie.items)
                setLoading(false)
            } catch (error) {
                toast.error("Không thể lấy dữ liệu phim! Vui lòng thử lại.")
                setLoading(false)
            }
        }
        fetchMovie()
    }, [slug])



    useEffect(() => {
        const noSleep = new NoSleep()
        if (movieEpisodes.length > 0 && videoRef.current) {
            const video = videoRef.current
            const videoSrc = movieEpisodes[activeTab].server_data[selectedEpisode].link_m3u8

            const handleFullscreen = () => {
                toast.success('Vào fullscreen iOS – bật NoSleep');
                try {
                    noSleep.enable();
                } catch (err) {
                    console.warn('Không bật được NoSleep:', err);
                }
            };
            video.addEventListener("webkitbeginfullscreen", handleFullscreen);

            if (Hls.isSupported()) {
                toast.success('HLSHLSHLSHLS')
                const hls = new Hls()
                hls.loadSource(videoSrc)
                hls.attachMedia(video)

            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                toast.success('ádasdsa')
                video.src = linkMovie
                video.addEventListener("canplay", function () {
                    video.load()
                    video.play()
                    noSleep.enable()
                })
            } else {
                toast("IOS ngu vcl")
                noSleep.enable()
            }

        }
    }, [selectedEpisode, movieEpisodes])



    const handleEpisodeClick = (episode) => {
        navigate(`?tap=${episode}`);
    };

    const handleTabChange = (index) => {
        setActiveTab(index);
    };


    const enterFullscreen = () => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if (videoRef.current.webkitRequestFullscreen) {
                videoRef.current.webkitRequestFullscreen();
            } else if (videoRef.current.mozRequestFullScreen) {
                videoRef.current.mozRequestFullScreen();
            } else if (videoRef.current.msRequestFullscreen) {
                videoRef.current.msRequestFullscreen();
            }
        }
    };



    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                movieInfo && (
                    <>
                        <div className="container">
                            <div className="row container" id="wrapper">
                                <div className="halim-panel-filter">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-6">
                                                <div className="yoast_breadcrumb hidden-xs"><span className="breadcrumb_last"
                                                    aria-current="page">{movieInfo.name}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="ajax-filter" className="panel-collapse collapse" aria-expanded="true" role="menu">
                                        <div className="ajax"></div>
                                    </div>
                                </div>
                                <main id="main-contents" className="col-xs-12 col-sm-12 col-md-8">
                                    <section id="content" className="test">
                                        <div className="clearfix wrap-content">
                                            <video
                                                id="movieVideo"
                                                ref={videoRef}
                                                controls
                                                // autoplay
                                                preload="auto"
                                                disablePictureInPicture
                                                controlsList="true"
                                                loop="loop"
                                                poster={movieInfo.thumb_url}
                                                style={{ width: "100%", height: "auto" }}
                                            // onPlay={enterFullscreen}
                                            ></video>
                                            <iframe width={0} height={0} src="https://player.phimapi.com/player/?url=https://s4.phim1280.tv/20250417/PsdyI9az/index.m3u8" frameborder="0"></iframe>
                                        </div >

                                        <div className="clearfix"></div>
                                        <div className="clearfix"></div>
                                        <div className="title-block">
                                            <div className="title-wrapper-xem full">
                                                <h1 className="entry-title" style={{ fontSize: '17px' }}>{movieEpisodes[0].server_data[selectedEpisode].name}</h1>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="text-center">
                                            <div id="halim-ajax-list-server"></div>
                                        </div>
                                        <div id="halim-list-server">
                                            <ul className="nav nav-tabs" role="tablist">
                                                {
                                                    movieEpisodes.map((item, key) => (
                                                        <li role="presentation" className={`server-1 ${key === 0 ? 'active' : ''}`} key={key}
                                                            onClick={() => handleTabChange(key)}>
                                                            <a href={`#server-${key}`} aria-controls={`server-${key}`} role="tab" data-toggle="tab">
                                                                {item.server_name}
                                                            </a>
                                                        </li>
                                                    ))
                                                }

                                            </ul>
                                            <div className="tab-content">
                                                {movieEpisodes.map((item, key) => (
                                                    <div role="tabpanel" className={`tab-pane ${key === 0 ? 'active' : ''} server-1`} id={`server-${key}`} key={key}>
                                                        <div className="halim-server">
                                                            <ul className="halim-list-eps">
                                                                {item.server_data.length > 1 ? (
                                                                    item.server_data.map((episode, index) => (
                                                                        <li className="halim-episode" key={index} onClick={() => {
                                                                            setSelectedEpisode(index);
                                                                            handleEpisodeClick(index + 1);
                                                                        }}>
                                                                            <span className={`halim-btn halim-btn-2  ${selectedEpisode === index ? 'active' : ''} halim-info-1-1 box-shadow`}
                                                                                data-post-id="37976" data-server="1" data-episode="1" data-position="first"
                                                                                data-embed="0"
                                                                                data-title={`Xem phim ${item.name} - Tập ${index + 1} - ${episode.name}`}
                                                                                data-h1={`${item.name} - tập ${index + 1}`}>
                                                                                {episode.name} - {item.server_name}
                                                                            </span>
                                                                        </li>
                                                                    ))
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </ul>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>

                                        <div className="clearfix"></div>
                                        <div className="htmlwrap clearfix">
                                            <div id="lightout"></div>
                                        </div>
                                    </section>

                                </main>
                                <aside id="sidebar" className="col-xs-12 col-sm-12 col-md-4">
                                    <div id="halim_tab_popular_videos-widget-7" className="widget halim_tab_popular_videos-widget">
                                        <div className="section-bar clearfix">
                                            <div className="section-title">
                                                <span>Top Views</span>
                                            </div>
                                        </div>
                                        <section className="tab-content">
                                            <div role="tabpanel" className="tab-pane active halim-ajax-popular-post">
                                                <div className="halim-ajax-popular-post-loading hidden"></div>
                                                <div id="halim-ajax-popular-post" className="popular-post">
                                                    {movieNew.map((item) => (
                                                        <div key={item.id} className="item post-37176">
                                                            <Link to={`/phim/${item.slug}`} className="halim-thumb">
                                                                <div className="item-link">
                                                                    <img
                                                                        src={item.poster_url}
                                                                        className="lazy post-thumb" alt={item.name}
                                                                        title={item.name} />
                                                                </div>
                                                                <p className="title">{item.name}</p>
                                                            </Link>
                                                            <div className="viewsCount" style={{ color: '#9d9d9d' }}>{item.origin_name}</div>
                                                            <div style={{ float: 'left' }}>
                                                                <span className="user-rate-image post-large-rate stars-large-vang"
                                                                    style={{ display: 'block' }}>
                                                                    <span style={{ width: '0%' }}></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </section>
                                        <div className="clearfix"></div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </>
                )
            )}
        </>
    )
}

export default MovieDetail
