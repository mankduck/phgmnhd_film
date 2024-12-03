import React from "react";
import './footer.css'

const Footer = () => {
    return (
        <footer className="footer-area bg-black-2 section-padding-lr">
            <div className="footer-hm4-ptb">
                <div className="container-fluid">
                    <div className="row text-center">
                        <div className="footer-widget footer-about">
                            <div className="footer-logo">
                                <a href="index-4.html"><img src="src/assets/images/logo/logo.png" alt="" /></a>
                            </div>
                            <p>Eiusmod tempor incididunt ut la abore et minim ven exerc itation ulla mco lboris naliquip comm.</p>
                            <div className="social-style-1 center-footer">
                                <a className="facebook" href="#"><i className="zmdi zmdi-facebook"></i></a>
                                <a className="twitter" href="#"><i className="zmdi zmdi-twitter"></i></a>
                                <a className="linkedin" href="#"><i className="zmdi zmdi-linkedin"></i></a>
                                <a className="instagram" href="#"><i className="zmdi zmdi-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer