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
    const [username, setUsername] = useState("");
    const navigate = useNavigate()


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
    }

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

    const handleClickNumberRandom = (e) => {
        e.preventDefault(); 
        toast.warning("Chức năng đang được phát triển, chờ xíu nhé!")
    };

    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("Đăng xuất thành công!")
    };


    return (
        <nav className="navbar navbar-expand-lg bg-black">
            <div className="container-fluid">
                <a className="navbar-brand text-white fw-bold text-uppercase" href="/">Phim Cũ</a>
                <button
                    className="navbar-toggler mb-10"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="zmdi zmdi-view-list-alt" style={{ color: 'white' }}></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/phim-le" className="nav-link text-white">Phim Lẻ</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/phim-bo" className="nav-link text-white">Phim Bộ</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/hoat-hinh" className="nav-link text-white">Hoạt Hình</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tv-show" className="nav-link text-white">TV Shows</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle text-white"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Thể Loại
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
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle text-white"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Quốc Gia
                            </a>
                            <ul className="dropdown-menu"
                            >
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
                        <li className="nav-item">
                            <Link to="/quay-so-may-man" className="nav-link text-white" onClick={handleClickNumberRandom}>Quay Số May Mắn</Link>
                        </li>
                        {user ? (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle text-white"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Chào, {user.name}
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/yeu-thich" className="dropdown-item" onClick={handleLogout}>Phim Yêu Thích</Link>
                                        <Link to="/tai-khoan" className="dropdown-item" onClick={handleLogout}>Thông Tin Tài Khoản</Link>
                                        <Link to="/" className="dropdown-item" onClick={handleLogout}>Đăng Xuất</Link>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link to="/dang-nhap" className="nav-link text-white">Đăng Nhập</Link>
                            </li>
                        )}

                        {/* </li> */}
                    </ul>
                </div>
                <form className="d-flex my-2" role="search" onSubmit={handleSearch}>
                    <input className="form-control me-2"
                        placeholder="Tìm kiếm phim"
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button className="btn btn-danger bg-danger" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

export default Header