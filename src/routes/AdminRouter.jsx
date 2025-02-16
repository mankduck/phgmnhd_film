import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LayoutAdmin from "@components/Layout/LayoutAdmin";
import AdminLogin from "../pages/Backend/Auth/AdminLogin";
import HomeAdmin from "../pages/Backend/Home/HomeAdmin";
import UserIndex from "../pages/Backend/User/UserIndex";

const isAuthenticated = () => {
    return localStorage.getItem("admin_token"); // Kiểm tra có token đăng nhập không
};

const AdminRouter = () => {
    return (
        <Routes>
            {/* <Route
                path="/admin-phim-cu/*"
                element={isAuthenticated() ? <HomeAdmin /> : <Navigate to="/admin-phim-cu/login" />}
            />
            <Route path="/admin-phim-cu/login" element={<AdminLogin />} /> */}
            <Route path="/admin-phim-cu/tai-khoan" element={<UserIndex />} />

        </Routes>
    );
};

export default AdminRouter;