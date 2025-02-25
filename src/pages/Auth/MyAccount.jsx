import React, { useEffect, useState } from "react"
import apiService from "@api/apiBackend";
import Breadcrumb from "@components/Frontend/Breadcrumb/Breadcrumb"
import Loader from "@components/Frontend/Loader/Loader"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from "@context/AuthContext";

const MyAccount = () => {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState()
    const [dataUser, setDataUser] = useState([])

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [reNewPassword, setReNewPassword] = useState("")


    useEffect(() => {
        const getDataUser = async () => {
            setLoading(true)
            try {
                const user = JSON.parse(localStorage.getItem("user"))
                const id = user.id
                const data = await apiService.get(`/user/${id}`)
                setDataUser(data)
                console.log(data);
                setName(data.name)
                setEmail(data.email)
                setLoading(false)
            } catch (error) {
                toast.error("Không thể lấy dữ liệu! Vui lòng thử lại.")
                console.error("ERR :", error)
                setLoading(false)
            }
        }
        getDataUser()
    }, [])

    const handleAccount = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem("user"))
            const id = user.id
            const data = await apiService.patch(`/user/${id}`, { name, email });
            const userData = {
                id: data.data._id,
                username: data.data.username,
                email: data.data.email,
                name: data.data.name
            };
            updateUser(userData);
            toast.success(data.message)
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error(error.response.data.message)
                }
            } else {
                toast.error("Không thể kết nối đến server.")
                console.log(error);
            }
        }
    };

    const handlePassword = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem("user"))
            const id = user.id
            const data = await apiService.patch(`/user/${id}`, { password, newPassword, reNewPassword });
            toast.success(data.message)
            setReNewPassword("")
            setNewPassword("")
            setPassword("")
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error(error.response.data.message)
                }
            } else {
                toast.error("Không thể kết nối đến server.")
            }
        }
    };

    return (
        <>
            <Breadcrumb name={"Quản Lý Tài Khoản"} />
            {loading ? (
                <Loader />
            ) : (
                <main className="my-account-wrapper section-pt-90 section-pb-90 bg-black">
                    <div className="container">
                        <div className="col-md-12 col-lg-12">
                            <ul role="tablist" className="nav dashboard-list white mb--60">
                                <li className="active" role="presentation">
                                    <a href="#account-details" data-bs-toggle="tab" className="tablist-btn active">
                                        Thông tin tài khoản
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a href="#password-info" data-bs-toggle="tab" className="tablist-btn">
                                        Đổi mật khẩu
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="tab-content dashboard-content">
                            <div className="tab-pane active" id="account-details">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="account-form-container-wrapper our-product-left_m">
                                            <div className="login">
                                                <div className="account-form-container">
                                                    <div className="account-login-form">
                                                        <form onSubmit={handleAccount}>
                                                            <div className="my-account-form-wrap border-bottom-2 white pb--30">
                                                                <h3>Thông tin tài khoản</h3>
                                                                <p className="text-danger">
                                                                    *Chú ý: Bạn chỉ có thể thay đổi tên hiển thị và Email
                                                                </p>
                                                                <div className="row account-input-box">
                                                                    <div className="col-md-6 single-input-box">
                                                                        <label>Họ và tên</label>
                                                                        <input
                                                                            type="text"
                                                                            name="name"
                                                                            value={name}
                                                                            onChange={(e) => setName(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-6 single-input-box">
                                                                        <label>Username</label>
                                                                        <input type="text" defaultValue={dataUser.username} disabled />
                                                                    </div>
                                                                    <div className="col-md-6 single-input-box mt--15">
                                                                        <label>Email</label>
                                                                        <input
                                                                            type="email"
                                                                            value={email}
                                                                            onChange={(e) => setEmail(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-6 single-input-box mt--15">
                                                                        <label>Trạng thái</label>
                                                                        <input type="text" name="last-name" defaultValue={dataUser.status} disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="button-box mt--30">
                                                                <button type="submit" className="btn theme-color-four">Lưu thông tin</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane" id="password-info">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="account-form-container-wrapper our-product-left_m">
                                            <div className="login">
                                                <div className="account-form-container">
                                                    <div className="account-login-form">
                                                        <form onSubmit={handlePassword}>
                                                            <div className="my-account-form-wrap border-bottom-2 white pb--30">
                                                                <h3>Đổi mật khẩu</h3>
                                                                <div className="row account-input-box">
                                                                    <div className="col-md-4 single-input-box mt--15">
                                                                        <label>Mật khẩu cũ</label>
                                                                        <input
                                                                            type="password"
                                                                            name="current-password"
                                                                            value={password}
                                                                            onChange={(e) => setPassword(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-4 single-input-box mt--15">
                                                                        <label>Mật khẩu mới</label>
                                                                        <input
                                                                            type="password"
                                                                            name="new-password"
                                                                            value={newPassword}
                                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-4 single-input-box mt--15">
                                                                        <label>Nhập lại mật khẩu</label>
                                                                        <input
                                                                            type="password"
                                                                            name="confirm-password"
                                                                            value={reNewPassword}
                                                                            onChange={(e) => setReNewPassword(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="button-box mt--30">
                                                                <button type="submit" className="btn theme-color-four">Lưu thông tin</button>
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
                    </div >
                </main >
            )}
        </>
    )
}


export default MyAccount