let wakeLock = null;
let hiddenVideo = null;

export const requestWakeLock = async () => {
    try {
        if ("wakeLock" in navigator) {
            // Wake Lock API hỗ trợ trên Chrome, Edge, Android
            wakeLock = await navigator.wakeLock.request("screen");
            wakeLock.addEventListener("release", () => { });
        } else if (/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)) {
            // Nếu là iOS hoặc Safari, sử dụng video ẩn để giữ màn hình sáng
            hiddenVideo = document.createElement("video");
            hiddenVideo.src = "data:video/mp4;base64,AAAA"; // Video rỗng
            hiddenVideo.loop = true;
            hiddenVideo.muted = true;
            hiddenVideo.playsInline = true;
            document.body.appendChild(hiddenVideo);
            
            const playHiddenVideo = () => {
                hiddenVideo.play().catch(err => console.warn("Không thể phát video ẩn:", err));
            };

            // Lắng nghe sự kiện `visibilitychange` để phát lại nếu bị tạm dừng
            document.addEventListener("visibilitychange", playHiddenVideo);
            
            // iOS yêu cầu người dùng tương tác để chạy video => Thêm sự kiện `touchstart`
            document.addEventListener("touchstart", () => {
                playHiddenVideo();
                enterFullscreen(); // Kích hoạt fullscreen khi có tương tác
            }, { once: true });

            // Phát video lần đầu
            playHiddenVideo();
        } else {
            console.warn("Wake Lock API không được hỗ trợ.");
        }
    } catch (err) {
        console.error(`Wake Lock error: ${err.message}`);
    }
};

export const releaseWakeLock = async () => {
    if (wakeLock) {
        await wakeLock.release();
        wakeLock = null;
    }
    if (hiddenVideo) {
        hiddenVideo.pause();
        hiddenVideo.remove();
        hiddenVideo = null;
    }
};
