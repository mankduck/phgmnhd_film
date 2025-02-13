import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
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
                                    <li><a href="/">Trang Chủ</a></li>
                                    <li><Link to="/phim-le">Phim Lẻ</Link></li>
                                    <li><Link to="/phim-bo">Phim Bộ</Link></li>
                                    <li><Link to="/tv-show">TV Shows</Link></li>
                                    <li><Link to="#">Comming Soon</Link></li>
                                    <li><Link to="/lien-he">Liên Hệ</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    {/* <div className="right-side d-flex">
                        <div className="our-profile-area ">
                            <a href="#" className="our-profile-pc" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="public/assets/images/review/author-01.png" alt="" />
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
                    </div> */}
                </div>
            </div>
        </header>
    )
}

export default Header