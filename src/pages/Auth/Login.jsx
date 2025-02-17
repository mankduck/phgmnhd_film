import { React, useState } from "react";
import Breadcrumb from "@components/Frontend/Breadcrumb/Breadcrumb"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@context/AuthContext";

const Login = () => {

    const { login } = useAuth()
    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const [emailReg, setEmailReg] = useState("");
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [errorReg, setErrorReg] = useState("");

    const apiUrl = import.meta.env.VITE_API_URL;


    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorLogin("");

        try {

            const { data } = await axios.post(`${apiUrl}/api/v1/auth/login`, { emailLogin, passwordLogin });
            if (data.user) {
                login(data.user);
                navigate("/");
                toast.success("Đăng nhập thành công!");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setErrorLogin(error.response.data.message);
                } else if (error.response.status === 401) {
                    setErrorLogin(error.response.data.message);
                } else {
                    setErrorLogin("Lỗi server, vui lòng thử lại sau.");
                    console.error("ERR: " + error)
                }
            } else {
                setErrorLogin("Không thể kết nối đến server.");
                console.error("ERR: " + error)
            }
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorReg("");

        try {
            const { data } = await axios.post(`${apiUrl}/api/v1/auth/register`, { emailReg, passwordReg, usernameReg });
            if (data) {
                setEmailReg("")
                setPasswordReg("")
                setUsernameReg("")
                toast.success("Đăng kí thành công, vui lòng quay lại đăng nhập!");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setErrorReg(error.response.data.message);
                } else {
                    setErrorReg("Lỗi server, vui lòng thử lại sau.");
                    console.error("ERR: " + error)
                }
            } else {
                setErrorReg("Không thể kết nối đến server.");
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
                                                            value={emailLogin}
                                                            onChange={(e) => setEmailLogin(e.target.value)}
                                                            required
                                                            placeholder="Email của bạn" />
                                                        <input type="password"
                                                            name="password"
                                                            value={passwordLogin}
                                                            onChange={(e) => setPasswordLogin(e.target.value)}
                                                            required
                                                            placeholder="Password" />
                                                    </div>
                                                    <div className="button-box">
                                                        {/* <div className="login-toggle-btn">
                                                            <input type="checkbox" />
                                                            <label>Remember me</label>
                                                            <a href="#">Forgot Password?</a>
                                                        </div> */}
                                                        {errorLogin && <p className="text-red-500 text-center">{errorLogin}</p>}
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
                                                <form onSubmit={handleRegister}>
                                                    <div className="login-input-box">
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            value={usernameReg}
                                                            onChange={(e) => setUsernameReg(e.target.value)}
                                                            required
                                                            placeholder="Username của bạn"
                                                        />
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            value={passwordReg}
                                                            onChange={(e) => setPasswordReg(e.target.value)}
                                                            required
                                                            placeholder="Password của bạn"
                                                        />
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={emailReg}
                                                            onChange={(e) => setEmailReg(e.target.value)}
                                                            required
                                                            placeholder="Email của bạn"
                                                        />
                                                    </div>
                                                    {errorReg && <p className="text-red-500 text-center">{errorReg}</p>}

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