import React from "react"
import { Link } from "react-router-dom"

const HomeComponent = () => {
    return (
        <>
            <div className="movie-site-info-wrap bg-black-2 section-pt-90 section-pb-90">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7">
                            <div className="movie-site-info-content info-width-3">
                                <h2 className="title">Xem mọi thứ bạn muốn</h2>
                                <h3 className="sub-title">
                                    Xem vô số chương trình, trên điện thoại, máy tính bảng, máy tính xách tay và TV của bạn.
                                </h3>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="movie-site-img">
                                <img src="assets/images/landing/2.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="movie-site-info-wrap bg-black section-pt-90 section-pb-60">
                <div className="container">
                    <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-1">
                        <div className="col mb-30">
                            <div className="funfact-wrap text-center">
                                <h2 className="value">
                                    <span className="odometer" data-count-to="500"></span>+M
                                </h2>
                                <h3 className="title">Total Videos</h3>
                            </div>
                        </div>
                        <div className="col mb-30">
                            <div className="funfact-wrap text-center">
                                <h2 className="value">
                                    <span className="odometer" data-count-to="10"></span>th
                                </h2>
                                <h3 className="title">Position</h3>
                            </div>
                        </div>
                        <div className="col mb-30">
                            <div className="funfact-wrap text-center">
                                <h2 className="value">
                                    <span className="odometer" data-count-to="200"></span>+M
                                </h2>
                                <h3 className="title">Subscribers</h3>
                            </div>
                        </div>
                        <div className="col mb-30">
                            <div className="funfact-wrap text-center">
                                <h2 className="value">
                                    <span className="odometer" data-count-to="100"></span>+
                                </h2>
                                <h3 className="title">Awards</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="movie-site-info-wrap bg-black-2 section-pt-90 section-pb-90">
                <div className="container">
                    <div className="section-title-5 text-center">
                        <h2 className="title">Câu hỏi thường gặp</h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-9 ms-auto me-auto">
                            <div className="accordion" id="accordionExample">
                                {faqData.map(({ id, question, answer, show }) => (
                                    <div className="accordion-item" key={id}>
                                        <h2 className="accordion-header" id={`heading${id}`}>
                                            <button
                                                className={`accordion-button ${show ? "" : "collapsed"}`}
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${id}`}
                                                aria-expanded={show ? "true" : "false"}
                                                aria-controls={`collapse${id}`}
                                            >
                                                {question}
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapse${id}`}
                                            className={`accordion-collapse collapse ${show ? "show" : ""}`}
                                            aria-labelledby={`heading${id}`}
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">{answer}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const faqData = [
    {
        id: "One",
        question: "Tại sao lại chọn Phgmnhd Film?",
        answer:
            "Phgmnhd Film mang lại trải nghiệm xem phim không có quảng cáo nền trên mọi ứng dụng",
        show: true,
    },
    {
        id: "Two",
        question: "Phgmnhd Film có mất phí không?",
        answer:
            "Hướng đến sự tiện lợi cho người xem, Phgmnhd Film sẽ không mất bất cứ khoản phí nào!",
        show: false,
    },
    {
        id: "Three",
        question: "Tôi có thể xem Phgmnhd Film ở mọi nơi không?",
        answer:
            "Phgmnhd Film có thể xem ở mọi nơi, mọi thiết bị. Nhưng hiện tại chỉ đang hoạt động đúng trên nền tảng Windows và Android, còn IOS thì tạm thời chưa hoạt động đúng",
        show: false,
    },
    {
        id: "Four",
        question: "Làm thế nào để liên hệ với Admin?",
        answer:
            "Người dùng có thể liên hệ với thông tin cá nhân qua các đường dẫn được đính kèm trên Website",
        show: false,
    },
    {
        id: "Five",
        question: "Tôi có thể xem những gì trên Phgmnhd Film?",
        answer:
            "Người dùng có thể xem các thể loại phim từ các quốc gia, chương trình truyền hình,..",
        show: false,
    },
    {
        id: "Six",
        question: "Phgmnhd Film có tốt cho trẻ em?",
        answer:
            "Phgmnhd Film có các thể loại dành cho trẻ em như hoạt hình, thiếu nhi,...",
        show: false,
    },
];

export default HomeComponent