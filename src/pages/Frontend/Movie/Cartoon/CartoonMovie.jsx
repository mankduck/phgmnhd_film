import React, { useEffect, useState } from "react"
import movieAPI from "@api/axiosClient"
import Breadcrumb from "@components/Frontend/Breadcrumb/Breadcrumb"
import Loader from "@components/Frontend/Loader/Loader"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import Filter from "@components/Frontend/Filter/Filter";
import SkeletonItemCol3 from "../../../../components/Frontend/SkeletonItem/SkeletonItemCol3"

const CartoonMovie = () => {
    const [cartoonMovies, setCartoonMovies] = useState([])
    const [loading, setLoading] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [category, setCategory] = useState([]);
    const [movieNew, setMovieNew] = useState([])
    const [country, setCountry] = useState([]);
    const [param, setParam] = useState({
        country: "",
        category: "",
        year: "",
        limit: 12
    });
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const trang = searchParams.get("trang");

    useEffect(() => {
        if (trang) {
            setCurrentPage(Number(trang));
        }
    })



    const fetchCartoonMovie = async (page, param) => {
        setLoading(true)
        try {
            const data = await movieAPI.getCartoon(page, param)
            const movies = data.data.items;
            setCartoonMovies(movies)
            setTotalPages(data.data.params.pagination.totalPages)
            const dataNewMovie = await movieAPI.getMovieNewUpdate(1)
            setMovieNew(dataNewMovie.items)
            setLoading(false)
            if (movies.length === 0) {
                toast.warning("Không có phim nào phù hợp với điều kiện bạn tìm!");
            }
        } catch (error) {
            toast.error("Không thể lấy dữ liệu phim! Vui lòng thử lại.")
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchCartoonMovie(currentPage, param);
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

    const handlePaginateClick = (episode) => {
        navigate(`?trang=${episode}`);
    };

    const getPagination = () => {
        const pages = []
        const totalVisiblePages = 3

        if (currentPage > 1) {
            pages.push(currentPage - 1)
        }

        pages.push(currentPage)

        if (currentPage < totalPages) {
            pages.push(currentPage + 1)
        }

        if (currentPage > 2) {
            pages.unshift('...')
        }
        if (currentPage < totalPages - 1) {
            pages.push('...')
        }

        return [...new Set(pages)]
    }


    return (
        <>
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
                    <main id="main-contents" className="col-xs-12 col-sm-12 col-md-8">
                        <section>
                            <div className="section-bar clearfix">
                                <h1 className="section-title"><span>Phim Hoạt Hình</span></h1>
                            </div>
                            <div className="section-bar">
                                <Filter param={param} setParam={setParam} category={category} country={country} year={year} handleReset={handleReset} />
                            </div>
                            <div className="halim_box">
                                {loading
                                    ? Array.from({ length: 12 }).map((_, index) => (
                                        <SkeletonItemCol3 key={index} />
                                    )) :
                                    cartoonMovies.map((item, key) => (
                                        <article className="col-md-3 col-sm-3 col-xs-6 thumb grid-item post-27021">
                                            <div className="halim-item">
                                                <Link to={`/phim/${item.slug}`} className="halim-thumb">
                                                    <figure><img className="lazy img-responsive" src={`https://phimimg.com/${item.poster_url}`} alt={item.name} title={item.name} /></figure>
                                                    <span className="status">{item.year}</span><span className="episode"><i className="fa fa-play" aria-hidden="true"></i>Vietsub</span>
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
                            <div className="clearfix"></div>
                            <div className="text-center">
                                {cartoonMovies.length > 0 ? (
                                    <ul className='page-numbers'>
                                        {getPagination().map((page, index) => (
                                            <li key={index} style={{ margin: '5px' }}>
                                                <a
                                                    href="#"
                                                    onClick={() => {
                                                        typeof page === "number" ? setCurrentPage(page) : null;
                                                        handlePaginateClick(page);
                                                    }}
                                                    className={page === currentPage ? "active" : ""}
                                                >
                                                    {page}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) :
                                    (
                                        <h4 className="text-white pt-100 pb-100 text-center">Không có phim nào</h4>
                                    )
                                }
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
                                            <div className="item post-37176">
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
            <div className="clearfix"></div>

        </>
    )
}

const year = Array.from({ length: 2025 - 2001 + 1 }, (_, i) => {
    const yearValue = 2001 + i;
    return { id: i + 1, value: yearValue, name: `Năm ${yearValue}` };
});


export default CartoonMovie