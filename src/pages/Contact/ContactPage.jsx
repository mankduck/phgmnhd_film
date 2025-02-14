import React, { useEffect, useState } from "react"
import emailjs from "emailjs-com"
import { toast } from "react-toastify"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import Loader from "../../components/Loader/Loader"
import { Link } from "react-router-dom"

const ContactPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        emailjs
            .send(
                "service_b7g55zv",
                "template_aeshall",
                {
                    to_name: formData.firstName + " " + formData.lastName,
                    email: formData.email,
                    message: formData.message,
                },
                "oMkUm8V5OaIo6Gld_"
            )
            .then(
                (response) => {
                    setLoading(false)
                    toast.success("Gửi mail thành công!.")
                    setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        subject: "",
                        message: "",
                    })
                },
                (err) => {
                    setLoading(false)
                    toast.error("Không thể gửi mail! Vui lòng thử lại.")
                }
            )
    }

    return (
        <>
            <Breadcrumb name="Liên hệ" />
            {loading
                ? (<Loader />)
                : (
                    <div className="contact-us-area bg-black section-pt-90">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="contact-form-wrap section-pb-90">
                                        <form onSubmit={handleSubmit}>
                                            <div className="contact-page-form">
                                                <div className="row contact-input">
                                                    <div className="col-lg-6 col-md-6 contact-inner black">
                                                        <input
                                                            name="firstName"
                                                            type="text"
                                                            placeholder="Nhập họ và tên đệm"
                                                            value={formData.firstName}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 contact-inner black">
                                                        <input
                                                            name="lastName"
                                                            type="text"
                                                            placeholder="Nhập tên "
                                                            value={formData.lastName}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 contact-inner black">
                                                        <input
                                                            type="email"
                                                            placeholder="Nhập email của bạn"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 contact-inner black contact-message">
                                                        <textarea
                                                            name="message"
                                                            placeholder="Nhập lời nhắn"
                                                            value={formData.message}
                                                            onChange={handleChange}
                                                            required
                                                        ></textarea>
                                                    </div>
                                                </div>
                                                <div className="contact-submit-btn text-center">
                                                    <button className="submit-btn" type="submit" disabled={loading}>
                                                        {loading ? <Loader /> : "Gửi Email"}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="map-wrapper relative">
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
                                                    <a href="https://m.me/phgmnhd" target="_blank" rel="noopener noreferrer">Phùng Mạnh Đức
                                                    </a>
                                                </SingleContactInfo>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}


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
    )
}


export default ContactPage