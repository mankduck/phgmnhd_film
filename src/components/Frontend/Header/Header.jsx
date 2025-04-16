import React, { useEffect, useState } from "react"
import movieAPI from "@api/axiosClient"
import { useNavigate } from "react-router-dom"
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify"
import { useAuth } from "@context/AuthContext";

const Header = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [keyword, setKeyword] = useState("")
    const [category, setCategory] = useState([])
    const [country, setCountry] = useState([])
    const navigate = useNavigate()
    const [suggestedMovies, setSuggestedMovies] = useState([]);

    const [isMenuOpen, setMenuOpen] = useState(false);

    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //         setUsername(JSON.parse(storedUser).name);
    //     }
    // }, []);


    const handleSearch = (event) => {
        event.preventDefault()
        if (!keyword.trim()) return
        navigate(`/search?keyword=${encodeURIComponent(keyword)}`)
        setSuggestedMovies([])
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    };

    useEffect(() => {
        if (keyword.trim().length === 0) {
            setSuggestedMovies([]); // Xóa danh sách gợi ý nếu không có từ khóa
            return;
        }

        const fetchMovies = async () => {
            try {
                const response = await movieAPI.getMovieByKeyword(keyword, "")
                const data = response.data.items
                setSuggestedMovies(data.slice(0, 5))
            } catch (error) {
                console.error("Lỗi khi tìm kiếm phim:", error);
            }
        };

        const timeoutId = setTimeout(fetchMovies, 200); // Chờ 300ms để tránh gọi API quá nhiều lần

        return () => clearTimeout(timeoutId);
    }, [keyword]);


    useEffect(() => {
        var menuNav = document.querySelector("nav.main-navigation")

        if (menuNav) {

            const mobileLinks = document.querySelectorAll(".mobile-menu a")

            mobileLinks.forEach((link) => {
                link.removeEventListener("click", handleLinkClick)
                link.addEventListener("click", handleLinkClick)
            })

            function handleLinkClick(e) {
                e.preventDefault()
                const targetUrl = e.target.getAttribute("href")
                if (targetUrl) {
                    navigate(targetUrl)
                }
            }

            return () => {
                mobileLinks.forEach((link) => {
                    link.removeEventListener("click", handleLinkClick)
                })
            }
        }
    }, [navigate])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryRes = await movieAPI.getCategory()
                const countryRes = await movieAPI.getCountry()
                setCategory(categoryRes);
                setCountry(countryRes);
            } catch (error) {
                toast.error("Không thể lấy dữ liệu! Vui lòng thử lại.")
            }
        };

        fetchData();
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        toast.warning("Chức năng đang được phát triển, chờ xíu nhé!")
    };

    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("Đăng xuất thành công!")
    };


    return (
        <>
            <header id="header">
                <div className="container">
                    <div className="row" id="headwrap">
                        <div className="col-md-3 col-sm-6 slogan">
                            <p className="text-center logo-header-custom" style={{ height: "55px", margin: "-5px 0 -20px 0"}} >

                                {/* <image href="assets/images/logo2.jpg"/> */}
                                <a className="logo" href="/" title="Phim Hay">
                                    <img src="/phimcu.png" alt="" style={{ height: "55px" }} />
                                </a>
                            </p>
                        </div>
                        <div className="col-md-5 col-sm-6 halim-search-form">
                            <div className="header-nav">
                                <div className="col-xs-12">
                                    <form id="search-form-pc" name="halimForm" role="search" onSubmit={handleSearch}>
                                        <div className="form-group">
                                            <div className="input-group col-xs-12">
                                                <input
                                                    id="search"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Tìm kiếm..."
                                                    value={keyword}
                                                    onChange={(e) => setKeyword(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                />
                                                <i className="animate-spin hl-spin4 hidden"></i>
                                            </div>
                                        </div>
                                    </form>
                                    {keyword && suggestedMovies.length > 0 && (
                                        <div
                                            className=""
                                            style={{ zIndex: 1000, position: 'absolute', width: '93%', background: 'rgba(233, 236, 239)' }} // Giới hạn chiều cao, thêm scroll nếu cần
                                        >
                                            {suggestedMovies.map((movie) => (
                                                <Link
                                                    key={movie.slug}
                                                    to={`/phim/${movie.slug}`}
                                                    className="list-group-item list-group-item-action d-flex align-items-center"
                                                    onClick={() => setKeyword("")} // Reset ô tìm kiếm khi chọn phim
                                                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px" }} // Giữ căn chỉnh đẹp
                                                >
                                                    {/* Ảnh */}
                                                    <img
                                                        src={`https://phimimg.com/${movie.thumb_url}`}
                                                        width="40"
                                                        height="40"
                                                        className="rounded"
                                                        style={{ objectFit: "cover", flexShrink: 0 }} // Đảm bảo ảnh luôn vừa
                                                    />

                                                    {/* Tên phim, tránh tràn xuống dòng */}
                                                    <span
                                                        className="text-truncate"
                                                        style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1 }}
                                                    >
                                                        {movie.name}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>

                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 hidden-xs">
                            <div id="get-bookmark" className="box-shadow"><span> Vì quá nghèo nên phải gắn quảng cáo!!!</span></div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="navbar-container">
                <div className="container">
                    <nav className="navbar halim-navbar main-navigation">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed pull-left" data-toggle="collapse" data-target="#halim" aria-expanded="false">
                                <span className="sr-only">Menu</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>

                        <div className="collapse navbar-collapse" id="halim">
                            <ul className="nav navbar-nav navbar-left">
                                <li className="current-menu-item">
                                    <a href="/">Trang Chủ</a>
                                </li>
                                <li className="mega dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        Thể Loại <span className="caret"></span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        {category.length > 0 ? (
                                            category.map((item, index) => (
                                                <li key={index}>
                                                    <Link to={`the-loai/${item.slug}`} className="dropdown-item">{item.name}</Link>
                                                </li>
                                            ))
                                        ) : (
                                            <li>Đang tải...</li>
                                        )}
                                    </ul>
                                </li>
                                <li className="mega dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        Quốc Gia <span className="caret"></span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        {country.length > 0 ? (
                                            country.map((item, index) => (
                                                <li key={index}>
                                                    <Link to={`quoc-gia/${item.slug}`} className="dropdown-item">{item.name}</Link>
                                                </li>
                                            ))
                                        ) : (
                                            <li>Đang tải...</li>
                                        )}
                                    </ul>
                                </li>
                                <li className="mega">
                                    <Link to="/phim-le" className="nav-link text-white">Phim Lẻ</Link>
                                </li>
                                <li className="mega">
                                    <Link to="/phim-bo" className="nav-link text-white">Phim Bộ</Link>
                                </li>
                                <li className="mega">
                                    <Link to="/hoat-hinh" className="nav-link text-white">Hoạt Hình</Link>
                                </li>
                                <li className="mega">
                                    <Link to="/quay-so-may-man" className="nav-link text-white" onClick={handleClick}>Quay Số May Mắn</Link>
                                </li>
                                {/* {user ? (
                                    <li className="mega dropdown">
                                        <a
                                            className="dropdown-toggle" data-toggle="dropdown"
                                        >
                                            Chào, {user ? user.name : "Khách"} <span className="caret"></span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link to="/phim-da-xem" className="dropdown-item">Phim Đã Xem</Link>
                                                <Link to="/quan-ly-tai-khoan" className="dropdown-item" >Thông Tin Tài Khoản</Link>
                                                <Link to="/" className="dropdown-item" onClick={handleLogout}>Đăng Xuất</Link>
                                            </li>
                                        </ul>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link to="/dang-nhap" className="nav-link text-white">Đăng Nhập</Link>
                                    </li>
                                )} */}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>

        </>
    )
}

export default Header