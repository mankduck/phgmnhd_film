import React, { useEffect, useState } from "react"
import apiService from "@api/apiBackend";
import Breadcrumb from "@components/Frontend/Breadcrumb/Breadcrumb"
import Loader from "@components/Frontend/Loader/Loader"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const MovieWatched = () => {
    const [loading, setLoading] = useState()
    const [listWatched, setListWatched] = useState([])
    const [visibleMovies, setVisibleMovies] = useState(5);

    const loadMoreMovies = () => {
        setVisibleMovies((prev) => prev + 5);
    };

    useEffect(() => {
        const movieWatched = async () => {
            setLoading(true)
            try {
                const user = JSON.parse(localStorage.getItem("user"))
                const id = user.id
                const response = await apiService.get(`/movie-user/${id}`)
                setListWatched(response.list_movie)
                setLoading(false)
            } catch (error) {
                toast.error("Không thể lấy dữ liệu phim! Vui lòng thử lại.")
                console.error("ERR :", error)
                setLoading(false)
            }
        }
        movieWatched()
    }, [])


    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="movie-list-area section-ptb-50 bg-black-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-12 me-auto ms-auto">
                                <div className="movie-list-top-bar">
                                    <div className="movie-list-title">
                                        <h2 className="title">Phim Đã Xem</h2>
                                        <p className="text-danger pt--10">*Xem phim 10 phút để lưu vào danh sách đã xem</p>
                                    </div>
                                </div>
                                <div className="movielist-wrap">
                                    {listWatched.slice(0, visibleMovies).map((movie, index) => (
                                        <div className="single-movielist" key={index}>
                                            <div className="movielist-img-content">
                                                <div className="movielist-img">
                                                    <Link to={`/phim/${movie.slug}`}>
                                                        <img src={movie.image_url} alt="" />
                                                        <i className="zmdi zmdi-play play-btn-style"></i>
                                                    </Link>
                                                </div>
                                                <div className="movielist-content">
                                                    <h3 className="title">
                                                        <Link to={`/phim/${movie.slug}`}>{movie.name}</Link>
                                                    </h3>
                                                    <p>{movie.origin_name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {visibleMovies < listWatched.length && (
                                    <div className="text-center mt-3">
                                        <button className="btn btn-danger px-4 py-2" onClick={loadMoreMovies}>
                                            Xem thêm
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


export default MovieWatched