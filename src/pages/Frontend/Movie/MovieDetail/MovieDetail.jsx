import React, { useState, useEffect, useRef } from "react"
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom"
import movieAPI from "@api/axiosClient"
import Hls from "hls.js"
import { toast } from "react-toastify"
import Loader from "@components/Frontend/Loader/Loader"
import NoSleep from 'nosleep.js'
import Skeleton from "react-loading-skeleton"
import Comment from "@components/Frontend/Comment/Comment"

const MovieDetail = () => {
    const { slug } = useParams()
    const videoRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const [movieInfo, setMovieInfo] = useState(null) 
    const [movieNew, setMovieNew] = useState(null)
    const [movieEpisodes, setMovieEpisodes] = useState([])
    const [selectedEpisode, setSelectedEpisode] = useState(0)
    const [activeTab, setActiveTab] = useState(0)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const tap = searchParams.get("tap")


    useEffect(() => {
        if (tap) {
            setSelectedEpisode(Number(tap) - 1)
        }
    }, [tap])

    function getSlug() {
        const path = window.location.pathname
        console.log(path);
        
        const query = window.location.search
        const slug = movieEpisodes[activeTab].server_data[selectedEpisode].link_embed
        console.log(slug);
        
        return slug
    }

    function saveProgress(slug, currentTime) {
        const key = `progress_${slug}`
        localStorage.setItem(key, JSON.stringify({ currentTime }))
    }

    function getProgress(slug) {
        const key = `progress_${slug}`
        const progress = localStorage.getItem(key)
        // return
        if (progress) {
            // return
            return JSON.parse(progress).currentTime
        }
        return 0
    }

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true)
            try {
                const data = await movieAPI.getMovieDetail(slug)
                console.log(data);
                
                const dataNewMovie = await movieAPI.getMovieNewUpdate(1)
                setMovieInfo(data.movie)
                setMovieEpisodes(data.episodes)
                setMovieNew(dataNewMovie.items)
                setLoading(false)
            } catch (error) {
                toast.error("Không thể lấy dữ liệu phim! Vui lòng thử lại!")
                setLoading(false)
            }
        }
        fetchMovie()
    }, [slug])



    useEffect(() => {
        const noSleep = new NoSleep()
        if (movieEpisodes.length > 0 && videoRef.current) {
            const slug = getSlug()
            let saveCounter = 0
            const video = videoRef.current
            console.log(video.currentTime);
            
            const videoSrc = movieEpisodes[activeTab].server_data[selectedEpisode].link_m3u8

            const handleFullscreen = () => {
                // toast.success('Vào fullscreen iOS – bật NoSleep')
                try {
                    noSleep.enable()
                } catch (err) {
                    // console.warn('Không bật được NoSleep:', err)
                }
            }

            const handleTimeUpdate = () => {
                saveCounter++
                if (saveCounter >= 30) { // Khoảng 30 lần timeupdate (cỡ 30s) thì mới save
                    saveProgress(slug, video.currentTime)
                    saveCounter = 0
                }
            }
            console.log(video.currentTime);

            video.addEventListener("webkitbeginfullscreen", handleFullscreen)
            video.addEventListener('timeupdate', handleTimeUpdate)
            console.log(video.currentTime);


            const savedTime = getProgress(slug)

            if (Hls.isSupported()) {
                // toast.success('HLSHLSHLSHLS')
                const hls = new Hls()
                hls.loadSource(videoSrc)
                hls.attachMedia(video)

                if (savedTime > 0) {
                    video.addEventListener('loadedmetadata', () => {
                        video.currentTime = savedTime
                    })
                }

            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = linkMovie
                video.addEventListener("canplay", function () {
                    video.load()
                    video.play()
                    noSleep.enable()
                })
            } else {
                // toast("IOS ngu vcl")
                noSleep.enable()
            }
            return () => {
                if (video) {
                    video.removeEventListener('timeupdate', handleTimeUpdate)
                    saveProgress(slug, video.currentTime)
                }
            }
        }

    }, [selectedEpisode, movieEpisodes, movieInfo, activeTab])



    const handleEpisodeClick = (episode) => {
        navigate(`?tap=${episode}`)
    }

    const handleTabChange = (index) => {
        toast.success('Đổi server thành công!')
        setActiveTab(index)
    }


    // const enterFullscreen = () => {
    //     if (videoRef.current) {
    //         if (videoRef.current.requestFullscreen) {
    //             videoRef.current.requestFullscreen()
    //         } else if (videoRef.current.webkitRequestFullscreen) {
    //             videoRef.current.webkitRequestFullscreen()
    //         } else if (videoRef.current.mozRequestFullScreen) {
    //             videoRef.current.mozRequestFullScreen()
    //         } else if (videoRef.current.msRequestFullscreen) {
    //             videoRef.current.msRequestFullscreen()
    //         }
    //     }
    // }



    return (
        <>
            {
                loading ?
                    <div className="container">
                        <div className="row-container">
                            <div className="halim-panel-filter" style={{ marginBottom: "10px" }}>
                                <Skeleton className="panel-heading" />
                            </div>
                            <div className="row">

                                <div id="main-contents" className="col-xs-12 col-sm-12 col-md-8">
                                    <Skeleton className="clearfix wrap-content" height={450} />
                                </div>
                                <div id="sidebar" className="col-xs-12 col-sm-12 col-md-4">
                                    <Skeleton className="widget halim_tab_popular_videos-widget" height={450} />
                                </div>
                            </div>
                        </div>
                    </div>
                    :

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
                                                    preload="auto"
                                                    disablePictureInPicture
                                                    controlsList="true"
                                                    loop="loop"
                                                    poster={movieInfo.thumb_url}
                                                    style={{ width: "100%", height: "auto" }}
                                                ></video>
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
                                                                                setSelectedEpisode(index)
                                                                                handleEpisodeClick(index + 1)
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
                                            <div className="title-block">
                                                <div className="row">
                                                    <ul className="movie-detail-description">
                                                        <li>
                                                            <p>Diễn Viên:
                                                                {movieInfo.actor.map((item, index) => (
                                                                    <span key={index}>
                                                                        {item}
                                                                        {index < movieInfo.actor.length - 1 && ', '}
                                                                    </span>
                                                                ))}
                                                            </p>
                                                        </li>
                                                        <li>Đạo diễn: {movieInfo.director}</li>
                                                        <li>Số tập: {movieInfo.episode_total} tập</li>
                                                        <li>Trạng thái: {(movieInfo.status == 'ongoing' ? 'Đang sản xuất' : 'Hoàn thành')}</li>
                                                        <li>
                                                            <p>Mô tả: {movieInfo.content}</p>
                                                        </li>
                                                    </ul>

                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <Comment slug={movieInfo.slug} />
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
            }
        </>
    )
}

export default MovieDetail
