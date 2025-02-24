let wakeLock = null;
let hiddenVideo = null;

export const requestWakeLock = async () => {
    try {
        if ("wakeLock" in navigator) {
            // Wake Lock API hỗ trợ (Chrome, Edge, Android)
            wakeLock = await navigator.wakeLock.request("screen");
            wakeLock.addEventListener("release", () => { });
        } else if (/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)) {
            // Nếu là Safari hoặc iOS, dùng cách chạy video ẩn
            hiddenVideo = document.createElement("video");
            hiddenVideo.src = "data:video/mp4;base64,AAAA"; // Video trống
            hiddenVideo.loop = true;
            hiddenVideo.play().catch((err) => console.warn("Không thể phát video:", err));
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
