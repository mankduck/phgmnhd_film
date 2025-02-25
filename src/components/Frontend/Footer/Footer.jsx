import React from "react"
import './footer.css'

const Footer = () => {
    return (
        <>
            <footer className="footer-area bg-black-2 section-padding-lr">
                <div className="footer-hm4-ptb">
                    <div className="container-fluid">
                        <div className="row text-center">
                            <div className="footer-widget footer-about">
                                <div className="footer-logo">
                                    <a className="navbar-brand text-white fw-bold text-uppercase" href="/">Phim cũ</a>
                                </div>
                                <p>Chúc các bạn xem phim vui vẻ!</p>
                                <div className="social-style-1 center-footer">
                                    <a className="facebook" href="#"><i className="zmdi zmdi-facebook"></i></a>
                                    <a className="pinterest" href="#"><i className="zmdi zmdi-github"></i></a>
                                    <a className="linkedin" href="#"><i className="zmdi zmdi-linkedin"></i></a>
                                    <a className="instagram" href="#"><i className="zmdi zmdi-instagram"></i></a>
                                    {/* <a className="facebook" href="https://www.facebook.com/phgmnhd" target="_blank" rel="noopener noreferrer"><i className="zmdi zmdi-facebook"></i></a>
                                <a className="pinterest" href="https://github.com/mankduck" target="_blank" rel="noopener noreferrer"><i className="zmdi zmdi-github"></i></a>
                                <a className="linkedin" href="#"><i className="zmdi zmdi-linkedin"></i></a>
                                <a className="instagram" href="https://www.instagram.com/phgmnhd/" target="_blank" rel="noopener noreferrer"><i className="zmdi zmdi-instagram"></i></a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="bg-black py-3">
                <div className="container-fluid">
                    <div className="copyright text-center">
                        <p className="copyright-text">
                            Copyright &copy;{new Date().getFullYear()} Bản quyền thuộc về <a href="/">PHIM CŨ</a> | Không copy dưới mọi hình thức.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer