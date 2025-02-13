let wakeLock = null;

export const requestWakeLock = async () => {
    try {
        if ("wakeLock" in navigator) {
            wakeLock = await navigator.wakeLock.request("screen");
            wakeLock.addEventListener("release", () => {
            });
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
};
