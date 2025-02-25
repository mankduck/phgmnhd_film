import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const PopupNotification = () => {
    const [showPopup, setShowPopup] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem("seenPopup");
        const expireTime = localStorage.getItem("popupExpireTime");
        const currentTime = Date.now();
        const expireDuration = 2 * 60 * 60 * 1000;

        if (location.pathname === "/" && (!hasSeenPopup || currentTime > expireTime)) {
            setShowPopup(true);
            localStorage.setItem("seenPopup", "true");
            localStorage.setItem("popupExpireTime", currentTime + expireDuration);
        }
    }, [location.pathname]);

    if (!showPopup) return null;

    return (
        <div className="modal fade show" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowPopup(false)}></button>
                    </div>
                    <div className="modal-body">
                        <h3 className="text-center">PHIM CŨ thông báo!</h3>
                        <p>
                            Cờ bạc, cá độ bóng đá là hành vi phạm pháp theo quy định của pháp luật Việt Nam.
                            Mọi người cần nâng cao nhận thức, tránh xa cờ bạc dưới mọi hình thức và không tuyên truyền,
                            lôi kéo người khác tham gia. Hãy chọn lối sống lành mạnh, tuân thủ pháp luật để bảo vệ chính mình và cộng đồng.
                        </p>
                        <p className="text-danger">*Chú ý: Trong phim có đoạn ngắn về giới thiệu cờ bạc online, do link chưa kiểm soát được nên còn thiếu sót.
                            PHIM CŨ sẽ cố gắng khắc phục sớm nhất có thể.
                            Xin cảm ơn.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        // )}
        // </Popup>
    );
};

export default PopupNotification;
