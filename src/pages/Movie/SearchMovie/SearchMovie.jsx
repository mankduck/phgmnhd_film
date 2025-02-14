import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import movieAPI from "../../../api/axiosClient"
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb"
import Loader from "../../../components/Loader/Loader"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const SearchMovie = () => {
    const [searchMovies, setSearchMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get("keyword") || ""
    const [breadcrumb, setBreadcrumb] = useState("")

    useEffect(() => {
        const fetchSearchMovie = async () => {
            if (!keyword.trim()) return

            setLoading(true)
            try {
                const data = await movieAPI.getMovieByKeyword(keyword, currentPage)
                const movies = data.data.items;
                setSearchMovies(movies);
                setTotalPages(data.data.params.pagination.totalPages)
                setBreadcrumb(`Kết quả tìm kiếm cho "${keyword}"`)
                if (movies.length === 0) {
                    toast.warning("Không có phim nào phù hợp với từ khóa bạn tìm!");
                }
            } catch (error) {
                toast.error("Không thể lấy dữ liệu phim! Vui lòng thử lại.")
            } finally {
                setLoading(false)
            }
        }
        fetchSearchMovie()
    }, [keyword, currentPage])


    return (
        <>
            <Breadcrumb name={breadcrumb} />

            {loading
                ? (<Loader />)
                : (
                    <div className="movie-list section-padding-lr section-pt-50 section-pb-50 bg-black">
                        <div className="container-fluid">
                            <div className="row">
                                {searchMovies.map((item) => (
                                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12" key={item._id}>
                                        <div className="movie-wrap text-center mb-30">
                                            <div className="movie-img">
                                                <Link to={`/phim-bo/${item.slug}`}>
                                                    <img src={`https://phimimg.com/${item.poster_url}`} alt="" />
                                                </Link>
                                            </div>
                                            <div className="movie-content">
                                                <h3 className="title">
                                                    <Link to={`/phim-bo/${item.slug}`}>{item.name}</Link>
                                                </h3>
                                                <h3 className="title">
                                                    ({item.origin_name})
                                                </h3>
                                                <span>Chất lượng : {item.quality}</span>
                                                <div className="movie-btn">
                                                    <Link to={`/phim-bo/${item.slug}`} className="btn-style-hm4-2 animated">
                                                        Xem Ngay
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>)}
        </>
    )
}

export default SearchMovie