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
        const expireDuration = 6 * 60 * 60 * 1000; // 6 tiếng

        if (location.pathname === "/" && (!hasSeenPopup || currentTime > expireTime)) {
            setShowPopup(true);
            localStorage.setItem("seenPopup", "true");
            localStorage.setItem("popupExpireTime", currentTime + expireDuration);
        }
    }, [location.pathname]);

      if (!showPopup) return null;

    return (
        // <Popup open={showPopup} modal closeOnDocumentClick onClose={() => setShowPopup(false)}>
        // {(close) => (
        <div className="modal fade show" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowPopup(false)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Đây là nội dung modal!</p>
                        <p>Đây là nội dung modal!</p>
                        <p>Đây là nội dung modal!</p>
                        <p>Đây là nội dung modal!</p>
                        <p>Đây là nội dung modal!</p>
                        <p>Đây là nội dung modal!</p>
                        <p>Đây là nội dung modal!</p>
                        <p>Đây là nội dung modal!</p>
                        <p>Đây là nội dung modal!</p>
                        <p>Đây là nội dung modal!</p>
                        <p>Đây là nội dung modal!</p>
                    </div>
                </div>
            </div>
        </div>
        // )}
        // </Popup>
    );
};

export default PopupNotification;
