import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Header = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        if (!keyword.trim()) return;
        navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    };

    useEffect(() => {
        var menuNav = document.querySelector("nav.main-navigation");

        if (menuNav) {

            const mobileLinks = document.querySelectorAll(".mobile-menu a");

            mobileLinks.forEach((link) => {
                link.removeEventListener("click", handleLinkClick);
                link.addEventListener("click", handleLinkClick);
            });

            function handleLinkClick(e) {
                e.preventDefault();
                const targetUrl = e.target.getAttribute("href");
                if (targetUrl) {
                    navigate(targetUrl);
                }
            }

            return () => {
                mobileLinks.forEach((link) => {
                    link.removeEventListener("click", handleLinkClick);
                });
            };
        }
    }, [navigate]);

    return (
        <header className="header-area bg-black section-padding-lr">
            <div className="container-fluid">
                <div className="header-wrap header-netflix-style">
                    <div className="logo-menu-wrap">
                        <div className="logo">
                            <a href="/"><img src="/assets/images/logo/logo.png" alt="" /></a>
                        </div>
                        <div className="main-menu main-theme-color-four">
                            <nav className="main-navigation">
                                <ul>
                                    <li><Link to="/phim-le">Phim Lẻ</Link></li>
                                    <li><Link to="/phim-bo">Phim Bộ</Link></li>
                                    <li><Link to="/hoat-hinh">Hoạt Hình</Link></li>
                                    <li><Link to="/tv-show">TV Shows</Link></li>
                                    <li><Link to="/lien-he">Liên Hệ</Link></li>
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