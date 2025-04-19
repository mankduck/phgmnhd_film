export const sendIpToTelegram = async () => {
    const TELEGRAM_BOT_TOKEN = "7646223120:AAE1w-IMqMXtA5mDNvIayWat68xjLuphqvM"; // Thay token bot của bạn
    const CHAT_ID = "5941591238"; // Thay bằng Chat ID

    try {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();
        console.log(data)

        if (data.status === "fail") throw new Error("Không thể lấy địa chỉ IP");

        const { ip, country, region, city, connection } = data;

        const message = `
            🌍 **Truy cập mới**:
            📍 **IP:** ${ip}
            📌 **Quốc gia:** ${country}
            🏙 **Tỉnh/Thành phố:**  ${city}, ${region}, ${country}
            🔗 **Nhà mạng:** ${connection.isp}
        `;

        // await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: "Markdown" })
        // });

        // console.log("Gửi thông tin đến Telegram thành công!");
    } catch (err) {
        // console.error("Lỗi:", err);
    }
};
