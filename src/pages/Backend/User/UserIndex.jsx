import React, { useEffect, useState } from "react"
import apiService from "@api/apiBackend";
import Breadcrumb from "@components/Frontend/Breadcrumb/Breadcrumb"
import Loader from "@components/Frontend/Loader/Loader"
import { toast } from "react-toastify"

const UserIndex = () => {

    const [listUser, setListUser] = useState([])
    const [loading, setLoading] = useState()

    // useEffect(() => {
    const fetchDataUser = async (endpoint, params = {}) => {
        setLoading(true)
        try {
            const data = await apiService.get("/user/")
            const dataUsers = data
            setListUser(dataUsers)
            setLoading(false)
        } catch (error) {
            toast.error("Không thể lấy dữ liệu người dùng! Vui lòng thử lại.")
            setLoading(false)
        }
    }
    // })

    useEffect(() => {
        fetchDataUser("/user/");
    }, []);


    return (
        <>
            <Breadcrumb name={"Quản Lý Người Dùng"} />
            <div className="row">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary mx-2 my-2 px-3 py-2">Thêm mới</button>
                </div>
            </div>

            <table className="table table-bordered my-3">
                <thead>
                    <tr>
                        <th className="text-center">Tên đăng nhập</th>
                        <th className="text-center">Họ tên</th>
                        <th className="text-center">Gmail</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Option</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUser.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td className="text-center">{user.username}</td>
                                    <td className="text-center">{user.name}</td>
                                    <td className="text-center">{user.email}</td>
                                    <td className="text-center">{user.status}</td>
                                    <td className="text-center">
                                        <button className="btn btn-warning ml-10"><i class="zmdi zmdi-edit"></i></button>
                                        <button className="btn btn-danger ml-10"><i class="zmdi zmdi-delete"></i></button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default UserIndex