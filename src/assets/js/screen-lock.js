let wakeLock = null;

async function keepScreenOn() {
    try {
        wakeLock = await navigator.wakeLock.request("screen");
    } catch (err) {
        console.error(`Lỗi khi bật Wake Lock: ${err}`);
    }
}

// Khi thoát hoặc dừng video, giải phóng Wake Lock
function releaseWakeLock() {
    if (wakeLock !== null) {
        wakeLock.release();
        wakeLock = null;
    }
}

// Gọi khi bắt đầu xem phim
keepScreenOn();

// Tắt Wake Lock khi người dùng thoát trang
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        releaseWakeLock();
    }
});
