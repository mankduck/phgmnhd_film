import React from "react"
import './footer.css'

const Footer = () => {
    return (
        <footer className="footer-area bg-black-2 section-padding-lr">
            <div className="footer-hm4-ptb">
                <div className="container-fluid">
                    <div className="row text-center">
                        <div className="footer-widget footer-about">
                            <div className="footer-logo">
                                <a href="index-4.html"><img src="/assets/images/logo/logo.png" alt="" /></a>
                            </div>
                            <p>Chúc các bạn xem phim vui vẻ - Nói không với quảng cáo!</p>
                            <div className="social-style-1 center-footer">
                                <a className="facebook" href="https://www.facebook.com/phgmnhd" target="_blank" rel="noopener noreferrer"><i className="zmdi zmdi-facebook"></i></a>
                                <a className="pinterest" href="https://github.com/mankduck" target="_blank" rel="noopener noreferrer"><i className="zmdi zmdi-github"></i></a>
                                {/* <a className="linkedin" href="#"><i className="zmdi zmdi-linkedin"></i></a> */}
                                <a className="instagram" href="https://www.instagram.com/phgmnhd/" target="_blank" rel="noopener noreferrer"><i className="zmdi zmdi-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer