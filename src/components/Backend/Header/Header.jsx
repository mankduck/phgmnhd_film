import React, { useEffect, useState } from "react"
import movieAPI from "@api/axiosClient"
import { useNavigate } from "react-router-dom"
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify"

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        var menuNav = document.querySelector("nav.main-navigation")

        if (menuNav) {

            const mobileLinks = document.querySelectorAll(".mobile-menu a")

            mobileLinks.forEach((link) => {
                link.removeEventListener("click", handleLinkClick)
                link.addEventListener("click", handleLinkClick)
            })

            // function handleLinkClick(e) {
            //     e.preventDefault()
            //     const targetUrl = e.target.getAttribute("href")
            //     if (targetUrl) {
            //         navigate(targetUrl)
            //     }
            // }

            return () => {
                mobileLinks.forEach((link) => {
                    link.removeEventListener("click", handleLinkClick)
                })
            }
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        navigate("/admin-phim-cu/login");
    };

    return (
        <nav className="navbar navbar-expand-lg bg-black">
            <div className="container-fluid">
                <a className="navbar-brand text-white fw-bold text-uppercase" href="/admin-phim-cu">Phim Cũ Admin</a>
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
                            <Link to="/admin-phim-cu/tai-khoan" className="nav-link text-white">QL Tài Khoản</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/phim-bo" className="nav-link text-white">QL API</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/hoat-hinh" className="nav-link text-white">QL Banner</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tv-show" className="nav-link text-white">QL Popup</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tv-show" className="nav-link text-white">QL Thông Báo</Link>
                        </li>
                    </ul>
                </div>
                <div className="d-flex justify-content-end collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle text-white"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Tài Khoản
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <Link to="" className="dropdown-item">Về Trang Chủ</Link>
                                    {/* <Link to="" className="dropdown-item" onClick={handleLogout()}>Đăng Xuất</Link> */}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header