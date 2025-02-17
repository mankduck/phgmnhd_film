import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        const apiUrl = import.meta.env.VITE_API_URL;

        console.log(apiUrl);

        try {
            const { data } = await axios.post(`${apiUrl}/api/v1/auth/login`, { email, password });

            localStorage.setItem("admin_token", data.token);
            navigate("/admin-phim-cu");
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setError("Vui lòng nhập email và mật khẩu.");
                } else if (error.response.status === 401) {
                    setError("Email hoặc mật khẩu không đúng.");
                } else {
                    setError("Lỗi server, vui lòng thử lại sau.");
                }
            } else {
                setError("Không thể kết nối đến server.");
            }
        }
    };


    return (
        <div className="main-wrapper">
            <main className="page-content">
                <div className="register-page section-ptb">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 m-auto">
                                <div className="login-register-wrapper">
                                    <div className="login-register-tab-list nav">
                                        <a className="active" data-bs-toggle="tab" href="#lg1">
                                            <h4>Login</h4>
                                        </a>
                                    </div>
                                    <div className="tab-content">
                                        <div id="lg1" className="tab-pane active">
                                            <div className="login-form-container">
                                                <div className="login-register-form">
                                                    <form onSubmit={handleLogin}>
                                                        <div className="login-input-box">
                                                            <input type="email"
                                                                name="email"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                required
                                                                placeholder="Email của bạn" />
                                                            <input type="password"
                                                                name="password"
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                required
                                                                placeholder="Password" />
                                                        </div>
                                                        {error && <p className="text-red-500 text-center">{error}</p>}
                                                        <div className="button-box">
                                                            <button className="login-btn btn" type="submit">
                                                                <span>Login</span>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="footer-area">
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <p className="copyright-text">Bản quyền của &copy; PHIM CŨ | Cấm sao chép dưới mọi hình thức</p>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <ul className="footer-bottom-list">
                                    <li>
                                        <a href="/">Về trang chủ</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        // <div className="flex items-center justify-center min-h-screen bg-gray-100">
        //     <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        //         <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        //         {error && <p className="text-red-500 text-center">{error}</p>}
        //         <form onSubmit={handleLogin}>
        //             <div className="mb-4">
        //                 <label className="block text-gray-700">Email:</label>
        //                 <input
        //                     type="email"
        //                     className="w-full p-2 border rounded mt-1"
        //                     value={email}
        //                     onChange={(e) => setEmail(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <div className="mb-4">
        //                 <label className="block text-gray-700">Mật khẩu:</label>
        //                 <input
        //                     type="password"
        //                     className="w-full p-2 border rounded mt-1"
        //                     value={password}
        //                     onChange={(e) => setPassword(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <button
        //                 type="submit"
        //                 className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        //             >
        //                 Đăng nhập
        //             </button>
        //         </form>
        //     </div>
        // </div>
    );
};

export default AdminLogin;
