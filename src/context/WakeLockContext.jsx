import { createContext, useContext, useEffect } from "react";

const WakeLockContext = createContext(null);

export const WakeLockProvider = ({ children }) => {
  let wakeLock = null;

  const requestWakeLock = async () => {
    if ("wakeLock" in navigator) {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("Wake Lock is active");

        // Khi wakeLock bị mất (ví dụ: người dùng khóa màn hình)
        wakeLock.addEventListener("release", () => {
          console.log("Wake Lock was released");
          requestWakeLock(); // Yêu cầu lại
        });
      } catch (err) {
        console.error("Wake Lock request failed:", err);
      }
    } else {
      console.warn("Wake Lock API is not supported in this browser.");
    }
  };

  useEffect(() => {
    requestWakeLock();
  }, []); // Chạy duy nhất khi app load

  return (
    <WakeLockContext.Provider value={requestWakeLock}>
      {children}
    </WakeLockContext.Provider>
  );
};

export const useWakeLock = () => useContext(WakeLockContext);
