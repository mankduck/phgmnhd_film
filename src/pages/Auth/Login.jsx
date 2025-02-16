import { React, useState } from "react";
import Breadcrumb from "@components/Frontend/Breadcrumb/Breadcrumb"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        const apiUrl = import.meta.env.VITE_API_URL; // Nếu dùng Vite
        console.log(apiUrl);

        try {
            const { data } = await axios.post(`${apiUrl}/api/v1/auth/login`, { email, password });
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user)); // Lưu toàn bộ thông tin user
            }
            console.log(data);
            navigate("/");
            toast.success("Đăng nhập thành công!")
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setError("Vui lòng nhập email và mật khẩu.");
                } else if (error.response.status === 401) {
                    setError("Email hoặc mật khẩu không đúng.");
                } else {
                    setError("Lỗi server, vui lòng thử lại sau.");
                    console.error("ERR: " + error)
                }
            } else {
                setError("Không thể kết nối đến server.");
                console.error("ERR: " + error)
            }
        }
    };

    return (
        <>
            <Breadcrumb name={"Đăng Nhập / Đăng Kí"} />
            <div className="register-page bg-black section-pt-90 section-pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-md-12 m-auto">
                            <div className="login-register-wrapper">
                                <div className="login-register-tab-list white nav">
                                    <a className="active" data-bs-toggle="tab" href="#lg1">
                                        <h4> Đăng Nhập </h4>
                                    </a>
                                    <a data-bs-toggle="tab" href="#lg2">
                                        <h4> Đăng Kí </h4>
                                    </a>
                                </div>
                                <div className="tab-content">
                                    <div id="lg1" className="tab-pane active">
                                        <div className="login-form-container border-black">
                                            <div className="login-register-form black-style">
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
                                                    <div className="button-box">
                                                        {/* <div className="login-toggle-btn">
                                                            <input type="checkbox" />
                                                            <label>Remember me</label>
                                                            <a href="#">Forgot Password?</a>
                                                        </div> */}
                                                        {error && <p className="text-red-500 text-center">{error}</p>}
                                                        <div className="button-box">
                                                            <button className="login-btn btn" type="submit">
                                                                <span>Đăng Nhập</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="lg2" className="tab-pane">
                                        <div className="login-form-container border-black">
                                            <div className="login-register-form black-style">
                                                <form action="#" method="post">
                                                    <div className="login-input-box">
                                                        <input type="text" name="user-name" placeholder="User Name" />
                                                        <input type="password" name="user-password" placeholder="Password" />
                                                        <input name="user-email" placeholder="Email" type="email" />
                                                    </div>
                                                    <div className="button-box">
                                                        <button className="register-btn btn" type="submit">
                                                            <span>Đăng Kí</span>
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
        </>
    )
}

export default Login