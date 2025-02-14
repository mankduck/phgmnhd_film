import React, { useEffect, useState } from "react";
import movieAPI from "../../../api/axiosClient";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Loader from "../../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Filter from "../../../components/Filter/Filter";

const SingleMovie = () => {
    const [singleMovies, setSingleMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [category, setCategory] = useState([]);
    const [country, setCountry] = useState([]);
    const [param, setParam] = useState({
        country: "",
        category: "",
        year: "",
    });

    const fetchSingleMovie = async (page, param) => {
        setLoading(true);
        try {
            const data = await movieAPI.getSingleMovies(page, param);
            const movies = data.data.items;
            setSingleMovies(movies);
            setTotalPages(data.data.params.pagination.totalPages);
            setLoading(false);
            if (movies.length === 0) {
                toast.warning("Không có phim nào phù hợp với điều kiện bạn tìm!");
            }
        } catch (error) {
            toast.error("Không thể lấy dữ liệu phim! Vui lòng thử lại.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSingleMovie(currentPage, param);
    }, [currentPage, param]);

    const handleReset = () => {
        setParam({
            country: "",
            category: "",
            year: "",
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryRes = await movieAPI.getCategory();
                const countryRes = await movieAPI.getCountry();
                setCategory(categoryRes);
                setCountry(countryRes);
            } catch (error) {
                toast.error("Không thể lấy dữ liệu! Vui lòng thử lại.");
            }
        };

        fetchData();
    }, []);

    const getPagination = () => {
        const pages = [];
        const totalVisiblePages = 3;

        if (currentPage > 1) {
            pages.push(currentPage - 1);
        }

        pages.push(currentPage);

        if (currentPage < totalPages) {
            pages.push(currentPage + 1);
        }

        if (currentPage > 2) {
            pages.unshift("...");
        }
        if (currentPage < totalPages - 1) {
            pages.push("...");
        }

        return [...new Set(pages)];
    };

    return (
        <>
            <Breadcrumb name="Phim Lẻ" />

            <Filter param={param} setParam={setParam} category={category} country={country} handleReset={handleReset} />

            {loading ? (
                <Loader />
            ) : (
                <div className="movie-list section-padding-lr section-pt-50 section-pb-50 bg-black">
                    <div className="container-fluid">
                        <div className="row">
                            {singleMovies.map((item) => (
                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12" key={item._id}>
                                    <div className="movie-wrap text-center mb-30">
                                        <div className="movie-img">
                                            <Link to={`/phim-le/${item.slug}`}>
                                                <img src={`https://phimimg.com/${item.poster_url}`} alt="" />
                                            </Link>
                                        </div>
                                        <div className="movie-content">
                                            <h3 className="title">
                                                <Link to={`/phim-le/${item.slug}`}>{item.name}</Link>
                                            </h3>
                                            <h3 className="title">({item.origin_name})</h3>
                                            <span>Chất lượng : {item.quality}</span>
                                            <div className="movie-btn">
                                                <Link to={`/phim-le/${item.slug}`} className="btn-style-hm4-2 animated">
                                                    Xem Ngay
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {singleMovies.length > 0 ? (
                            <div className="pagination-style mt-30">
                                <ul>
                                    {getPagination().map((page, index) => (
                                        <li key={index}>
                                            <a
                                                href="#"
                                                onClick={() => (typeof page === "number" ? setCurrentPage(page) : null)}
                                                className={page === currentPage ? "active" : ""}
                                            >
                                                {page}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <h4 className="text-white pt-100 pb-100 text-center">Không có phim nào</h4>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default SingleMovie;
