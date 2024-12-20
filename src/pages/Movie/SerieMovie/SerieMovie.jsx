import React, { useEffect, useState } from "react";
import movieAPI from "../../../api/axiosClient";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Loader from "../../../components/Loader/Loader";

const SerieMovie = () => {
    const [serieMovies, setSerieMovies] = useState([])
    const [loading, setLoading] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)


    useEffect(() => {

        const fetchSerieMovie = async (page) => {
            setLoading(true)
            try {
                const data = await movieAPI.getSerieMovies(page)
                setSerieMovies(data.data.items)
                setTotalPages(data.data.params.pagination.totalPages)
                setLoading(false)
            } catch (error) {
                console.error('FETCH MOVIE: ', error);
                setLoading(false)
            }
        }
        fetchSerieMovie(currentPage)
    }, [currentPage])

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
            pages.unshift('...');
        }
        if (currentPage < totalPages - 1) {
            pages.push('...');
        }

        return [...new Set(pages)];
    };


    return (
        <>
            <Breadcrumb name="Phim Lẻ" />

            {loading
                ? (<Loader />)
                : (
                    <div className="movie-list section-padding-lr section-pt-50 section-pb-50 bg-black">
                        <div className="container-fluid">
                            <div className="row">
                                {serieMovies.map((item) => (
                                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12" key={item._id}>
                                        <div className="movie-wrap text-center mb-30">
                                            <div className="movie-img">
                                                <a href={`phim-bo/${item.slug}`}><img src={`https://phimimg.com/${item.poster_url}`} alt="" /></a>
                                            </div>
                                            <div className="movie-content">
                                                <h3 className="title"><a href={`phim-bo/${item.slug}`}>{item.name}</a></h3>
                                                <span>Chất lượng : {item.quality}</span>
                                                <div className="movie-btn">
                                                    <a href={`phim-bo/${item.slug}`} className="btn-style-hm4-2 animated">Xem Ngay</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>

                            <div className="pagination-style mt-30">
                                <ul>
                                    {getPagination().map((page, index) => (
                                        <li key={index}>
                                            <a
                                                href="#"
                                                onClick={() => (typeof page === 'number' ? setCurrentPage(page) : null)} // Chỉ thay đổi khi click vào số trang
                                                className={page === currentPage ? 'active' : ''}
                                            >
                                                {page}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>)}
        </>
    )
}

export default SerieMovie