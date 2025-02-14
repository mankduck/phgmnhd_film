import React, { useEffect, useState } from "react"
import movieAPI from "../../api/axiosClient"
import { useNavigate } from "react-router-dom"
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify"

const Header = () => {
    const location = useLocation();
    const [keyword, setKeyword] = useState("")
    const [category, setCategory] = useState([])
    const [country, setCountry] = useState([])
    const navigate = useNavigate()

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

    console.log(location);

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

    return (
        <header className="header-area bg-black section-padding-lr">
            <div className="container-fluid">
                <div className="header-wrap header-netflix-style">
                    <div className="logo-menu-wrap">
                        <div className="logo">
                            <a href="/" className="fw-bold text-white">PHGMNHD FILM</a>
                        </div>
                        <div className="main-menu main-theme-color-four">
                            <nav className="main-navigation">
                                <ul>
                                    <li><Link to="/phim-le" className={location.pathname == "/phim-le" ? "text-danger" : ""}>Phim Lẻ</Link></li>
                                    <li><Link to="/phim-bo" className={location.pathname == "/phim-bo" ? "text-danger" : ""}>Phim Bộ</Link></li>
                                    <li><Link to="/hoat-hinh" className={location.pathname == "/hoat-hinh" ? "text-danger" : ""}>Hoạt Hình</Link></li>
                                    <li><Link to="/tv-show" className={location.pathname == "/tv-show" ? "text-danger" : ""}>TV Shows</Link></li>
                                    <li><a href="#">Thể Loại</a>
                                        <ul class="sub-menu">
                                            {category.length > 0 ? (
                                                category.map((item, index) => (
                                                    <li key={index}>
                                                        <Link to={`the-loai/${item.slug}`}>{item.name}</Link>
                                                    </li>
                                                ))
                                            ) : (
                                                <li>Đang tải...</li>
                                            )}
                                        </ul>
                                    </li>
                                    <li><a href="#">Quốc Gia</a>
                                        <ul class="sub-menu">
                                            {country.length > 0 ? (
                                                country.map((item, index) => (
                                                    <li key={index}>
                                                        <Link to={`quoc-gia/${item.slug}`}>{item.name}</Link>
                                                    </li>
                                                ))
                                            ) : (
                                                <li>Đang tải...</li>
                                            )}
                                        </ul>
                                    </li>
                                    <li><Link to="/lien-he" className={location.pathname == "/lien-he" ? "text-danger" : ""}>Liên Hệ</Link></li>
                                    <li><Link to="#">Comming Soon</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="right-side d-flex">
                        <div className="header-search-2">
                            <a className="search-toggle" href="#">
                                <i className="zmdi zmdi-search s-open"></i>
                                <i className="zmdi zmdi-close s-close"></i>
                            </a>
                            <div className="search-wrap-2">
                                <form onSubmit={handleSearch}>
                                    <input
                                        placeholder="Search"
                                        type="text"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                    <button className="button-search" type="submit">
                                        <i className="zmdi zmdi-search"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="mobile-menu d-block d-lg-none">
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header