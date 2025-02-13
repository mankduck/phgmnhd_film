import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";

const ContactPage = () => {
    return (
        <div className="map-wrapper relative">
            {/* Google Map Iframe */}
            <div className="google_map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.698649622355!2d105.80209297486307!3d21.04474048060858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3d6f1cf6e1%3A0xd8149586c4bf6c21!2zbmfDtSA1IEhvw6BuZyBRdeG7kWMgVmnhu4d0LCBOZ2jEqWEgxJDDtCwgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWkgMTIyMTAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1739460332412!5m2!1svi!2s"
                    width="100%"
                    height="550"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            <div className="contact-info-area bg-black-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 ms-auto">
                            <div className="contact-info-inner black">
                                <SingleContactInfo icon="zmdi-home" text="Ngõ 5 Hoàng Quốc Việt" subtext="Nghĩa Đô, Cầu Giấy, Hà Nội" />
                                <SingleContactInfo icon="zmdi-phone">
                                    <p>+0921044773</p>
                                </SingleContactInfo>
                                <SingleContactInfo icon="zmdi-email">
                                    <a
                                        href="https://mail.google.com/mail/?view=cm&fs=1&to=phungmanhduc2209@gmail.com&su=LIÊN HỆ VỚI PHGMNHD"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Liên hệ Email
                                    </a>

                                </SingleContactInfo>
                                <SingleContactInfo icon="zmdi-facebook">
                                    <a href="https://www.facebook.com/phgmnhd" target="_blank" rel="noopener noreferrer">Phùng Mạnh Đức
                                    </a>
                                </SingleContactInfo>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SingleContactInfo = ({ icon, text, subtext, children }) => {
    return (
        <div className="single-contact-info">
            <div className="contact-info-icon">
                <i className={`zmdi ${icon}`}></i>
            </div>
            <div className="contact-info-text">
                {text && <p>{text} <br /> {subtext}</p>}
                {children}
            </div>
        </div>
    );
};


export default ContactPage