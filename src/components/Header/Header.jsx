import React from "react";

const Header = () => {
    return (
        <header className="header-area bg-black section-padding-lr">
            <div className="container-fluid">
                <div className="header-wrap header-netflix-style">
                    <div className="logo-menu-wrap">
                        <div className="logo">
                            <a href="index-4.html"><img src="/assets/images/logo/logo.png" alt="" /></a>
                        </div>
                        <div className="main-menu main-theme-color-four">
                            <nav className="main-navigation">
                                <ul>
                                    <li><a href="/">Trang Chủ</a></li>
                                    <li><a href="/phim-le">Phim Lẻ </a></li>
                                    <li><a href="/phim-bo">Phim Bộ</a></li>
                                    <li><a href="/tv-show">TV Shows</a></li>
                                    <li><a href="#">Comming Soon</a></li>
                                    <li><a href="/lien-he">Liên Hệ</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="right-side d-flex">
                        <div className="our-profile-area ">
                            <a href="#" className="our-profile-pc" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="/assets/images/review/author-01.png" alt="" />
                            </a>
                            <div className="dropdown-menu netflix-profile-style red">
                                <ul>
                                    <li className="single-list"><a href="history.html">History</a></li>
                                    <li className="single-list"><a href="watchlist.html">Watchlist</a></li>
                                    <li className="single-list"><a href="my-account-2.html">My Account</a></li>
                                    <li className="single-list"><a href="login-and-register-2.html">Log Out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header