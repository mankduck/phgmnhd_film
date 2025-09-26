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
        limit: 6
    }

    const paramSingle = {
        country: "",
        category: "",
        year: "",
        limit: 6
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
                                    ? Array.from({ length: 6 }).map((_, index) => (
                                        <SkeletonItem key={index} />
                                    )) :
                                    movieSingle.map((item) => (
                                        <article key={item.id || item.slug} className="col-md-2 col-sm-4 col-xs-6 thumb grid-item post-38424">
                                            <div className="halim-item">
                                                <Link to={`/phim/${item.slug}`} className="halim-thumb">
                                                    <figure><img loading="lazy" className="lazy img-responsive" src={`https://phimimg.com/${item.poster_url}`} alt={item.name} title={item.name} /></figure>
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
                        <section id="halim-advanced-widget-4">
                            <div className="section-heading">
                                <a href="#">
                                    <span className="h-text">Phim Bộ Mới</span>
                                </a>
                            </div>
                            <div id="halim-advanced-widget-4-ajax-box" className="halim_box">
                                {loading
                                    ? Array.from({ length: 6 }).map((_, index) => (
                                        <SkeletonItem key={index} />
                                    )) :
                                    movieSeries.map((item) => (
                                        <article key={item.id || item.slug} className="col-md-2 col-sm-4 col-xs-6 thumb grid-item post-38424">
                                            <div className="halim-item">
                                                <Link to={`/phim/${item.slug}`} className="halim-thumb">
                                                    <figure><img loading="lazy" className="lazy img-responsive" src={`https://phimimg.com/${item.poster_url}`} alt={item.name} title={item.name} /></figure>
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
                        <section id="halim-advanced-widget-4">
                            <div className="section-heading">
                                <a href="#">
                                    <span className="h-text">Hoạt Hình Mới</span>
                                </a>
                            </div>
                            <div id="halim-advanced-widget-4-ajax-box" className="halim_box">
                                {loading
                                    ? Array.from({ length: 6 }).map((_, index) => (
                                        <SkeletonItem key={index} />
                                    )) :
                                    movieCartoon.map((item) => (
                                        <article key={item.id || item.slug} className="col-md-2 col-sm-4 col-xs-6 thumb grid-item post-38424">
                                            <div className="halim-item">
                                                <Link to={`/phim/${item.slug}`} className="halim-thumb">
                                                    <figure><img loading="lazy" className="lazy img-responsive" src={`https://phimimg.com/${item.poster_url}`} alt={item.name} title={item.name} /></figure>
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
                        <section id="halim-advanced-widget-4">
                            <div className="section-heading">
                                <a href="#">
                                    <span className="h-text">TV Show Mới</span>
                                </a>
                            </div>
                            <div id="halim-advanced-widget-4-ajax-box" className="halim_box">
                                {loading
                                    ? Array.from({ length: 6 }).map((_, index) => (
                                        <SkeletonItem key={index} />
                                    )) :
                                    movieTVShow.map((item) => (
                                        <article key={item.id || item.slug} className="col-md-2 col-sm-4 col-xs-6 thumb grid-item post-38424">
                                            <div className="halim-item">
                                                <Link to={`/phim/${item.slug}`} className="halim-thumb">
                                                    <figure><img loading="lazy" className="lazy img-responsive" src={`https://phimimg.com/${item.poster_url}`} alt={item.name} title={item.name} /></figure>
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
                    </div>
                </div>
            </div>
        </>
        // )}
        // </>

    )
}

export default MovieList
