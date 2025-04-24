import React, { useEffect, useState } from "react"
import movieAPI from "@api/axiosClient"
import Loader from "@components/Frontend/Loader/Loader"
import { Link } from "react-router-dom"
import SkeletonItem from "../SkeletonItem/SkeletonItem"
import SkeletonItemCol3 from "../SkeletonItem/SkeletonItemCol3"

const MovieList = () => {
    const [movies, setMovies] = useState([])
    const [movieSeries, setMovieSeries] = useState([])
    const [movieSingle, setMovieSingle] = useState([])
    const [movieCartoon, setMovieCartoon] = useState([])
    const [movieTVShow, setMovieTVShow] = useState([])

    const [loading, setLoading] = useState(true)
    const paramSerie = {
        country: "",
        category: "",
        year: "",
        limit: 8
    }

    const paramSingle = {
        country: "",
        category: "",
        year: "",
        limit: 12
    }


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await movieAPI.getMovieNewUpdate(1)
                const dataSerieMovie = await movieAPI.getSerieMovies(1, paramSerie)
                const dataSingleMovie = await movieAPI.getSingleMovies(1, paramSingle)
                const dataCartoon = await movieAPI.getCartoon(1, paramSerie)
                const dataTVShow = await movieAPI.getTVShows(1, paramSerie)

                setMovies(data.items)
                setMovieSeries(dataSerieMovie.data.items)
                setMovieSingle(dataSingleMovie.data.items)
                setMovieCartoon(dataCartoon.data.items)
                setMovieTVShow(dataTVShow.data.items)
                setLoading(false)
            } catch (err) {
                console.error('FETCH MOVIE FAILED: ', err)
                setLoading(false)
            }
        }
        fetchMovies()
    }, [])

    function rand() {
        const randomNumber = (Math.random() * (10 - 1) + 1).toFixed(1);
        return randomNumber
    }


    return (
        <>
            {/* {loading ? (
                <Loader />
            ) : (
                <> */}
            <div className="container">
                <div className="row fullwith-slider"></div>
            </div>
            <div className="container">
                <div className="row container" id="wrapper">
                    <div className="halim-panel-filter">
                        <div id="ajax-filter" className="panel-collapse collapse" aria-expanded="true" role="menu">
                            <div className="ajax"></div>
                        </div>
                    </div>
                    <div className="col-xs-12 carausel-sliderWidget">
                        <section id="halim-advanced-widget-4">
                            <div className="section-heading">
                                <a href="#">
                                    <span className="h-text">Phim Lẻ Mới</span>
                                </a>
                            </div>
                            <div id="halim-advanced-widget-4-ajax-box" className="halim_box">
                                {loading
                                    ? Array.from({ length: 12 }).map((_, index) => (
                                        <SkeletonItem key={index} />
                                    )) :
                                    movieSingle.map((item) => (
                                        <article className="col-md-2 col-sm-4 col-xs-6 thumb grid-item post-38424">
                                            <div className="halim-item">
                                                <Link to={`/phim/${item.slug}`} className="halim-thumb">
                                                    <figure><img className="lazy img-responsive" src={`https://phimimg.com/${item.poster_url}`} alt={item.name} title={item.name} /></figure>
                                                    <span className="status">HD</span><span className="episode"><i className="fa fa-play" aria-hidden="true"></i>Vietsub</span>
                                                    <div className="icon_overlay"></div>
                                                    <div className="halim-post-title-box">
                                                        <div className="halim-post-title ">
                                                            <p className="entry-title">{item.name}</p>
                                                            <p className="original_title">{item.origin_name}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </article>
                                    ))
                                }
                            </div>
                        </section>
                        <div className="clearfix"></div>
                    </div>
                    <main id="main-contents" className="col-xs-12 col-sm-12 col-md-8">
                        <section id="halim-advanced-widget-2">
                            <div className="section-heading">
                                <a href="#">
                                    <span className="h-text">Phim Bộ</span>
                                </a>
                            </div>
                            <div id="halim-advanced-widget-2-ajax-box" className="halim_box">
                                {loading
                                    ? Array.from({ length: 8 }).map((_, index) => (
                                        <SkeletonItemCol3 key={index} />
                                    )) :
                                    movieSeries.map((item) => (
                                        <article className="col-md-3 col-sm-3 col-xs-6 thumb grid-item">
                                            <div className="halim-item">
                                                <Link to={`/phim/${item.slug}`} className="halim-thumb">
                                                    <figure><img className="lazy img-responsive" src={`https://phimimg.com/${item.poster_url}`} alt={item.name} title={item.name} /></figure>
                                                    <span className="status">HD</span><span className="episode"><i className="fa fa-play" aria-hidden="true"></i>Vietsub</span>
                                                    <div className="icon_overlay"></div>
                                                    <div className="halim-post-title-box">
                                                        <div className="halim-post-title ">
                                                            <p className="entry-title">{item.name}</p>
                                                            <p className="original_title">{item.origin_name}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                            </div>
                        </section>
                        <div className="clearfix"></div>
                        <section id="halim-advanced-widget-2">
                            <div className="section-heading">
                                <a href="#">
                                    <span className="h-text">TV Show</span>
                                </a>
                            </div>
                            <div id="halim-advanced-widget-2-ajax-box" className="halim_box">
                                {loading
                                    ? Array.from({ length: 8 }).map((_, index) => (
                                        <SkeletonItemCol3 key={index} />
                                    )) :
                                    movieTVShow.map((item) => (
                                        <article className="col-md-3 col-sm-3 col-xs-6 thumb grid-item post-37606">
                                            <div className="halim-item">
                                                <Link to={`/phim/${item.slug}`} className="halim-thumb">
                                                    <figure><img className="lazy img-responsive" src={`https://phimimg.com/${item.poster_url}`} alt={item.name} title={item.name} /></figure>
                                                    <span className="status">HD</span><span className="episode"><i className="fa fa-play" aria-hidden="true"></i>Vietsub</span>
                                                    <div className="icon_overlay"></div>
                                                    <div className="halim-post-title-box">
                                                        <div className="halim-post-title ">
                                                            <p className="entry-title">{item.name}</p>
                                                            <p className="original_title">{item.origin_name}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                            </div>
                        </section>
                        <div className="clearfix"></div>
                        <section id="halim-advanced-widget-2">
                            <div className="section-heading">
                                <a href="#">
                                    <span className="h-text">Hoạt Hình</span>
                                </a>
                            </div>
                            <div id="halim-advanced-widget-2-ajax-box" className="halim_box">
                                {loading
                                    ? Array.from({ length: 8 }).map((_, index) => (
                                        <SkeletonItemCol3 key={index} />
                                    )) :
                                    movieCartoon.map((item) => (
                                        <article className="col-md-3 col-sm-3 col-xs-6 thumb grid-item">
                                            <div className="halim-item">
                                                <Link to={`/phim/${item.slug}`} className="halim-thumb">
                                                    <figure><img className="lazy img-responsive" src={`https://phimimg.com/${item.poster_url}`} alt={item.name} title={item.name} /></figure>
                                                    <span className="status">HD</span><span className="episode"><i className="fa fa-play" aria-hidden="true"></i>Vietsub</span>
                                                    <div className="icon_overlay"></div>
                                                    <div className="halim-post-title-box">
                                                        <div className="halim-post-title ">
                                                            <p className="entry-title">{item.name}</p>
                                                            <p className="original_title">{item.origin_name}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                            </div>
                        </section>
                        <div className="clearfix"></div>
                    </main>
                    <aside id="sidebar" className="col-xs-12 col-sm-12 col-md-4">
                        <div id="halim_tab_popular_videos-widget-7" className="widget halim_tab_popular_videos-widget">
                            <div className="section-bar clearfix">
                                <div className="section-title">
                                    <span>Phim Mới</span>
                                </div>
                            </div>
                            <section className="tab-content">
                                <div role="tabpanel" className="tab-pane active halim-ajax-popular-post">
                                    <div className="halim-ajax-popular-post-loading hidden"></div>
                                    <div id="halim-ajax-popular-post" className="popular-post">
                                        {movies.map((item) => (
                                            <div className="item post-37176">
                                                <Link to={`/phim/${item.slug}`}>
                                                    <div className="item-link">
                                                        <img src={item.poster_url} className="lazy post-thumb" alt={item.name} title={item.name} />
                                                        <span className="is_trailer">Trailer</span>
                                                    </div>
                                                    <p className="title">{item.name}</p>
                                                </Link>
                                                <div className="viewsCount" style={{ color: '#9d9d9d' }}>{rand()}K lượt xem</div>
                                                <div style={{ float: 'left' }}>
                                                    <span className="user-rate-image post-large-rate stars-large-vang" style={{ display: 'block' }}>
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
        // )}
        // </>

    )
}

export default MovieList
