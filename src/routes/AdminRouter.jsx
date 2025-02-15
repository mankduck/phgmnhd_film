import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LayoutAdmin from "../components/Layout/LayoutAdmin";
import AdminLogin from "../pages/Backend/Auth/AdminLogin";

const isAuthenticated = () => {
    return localStorage.getItem("admin_token"); // Kiểm tra có token đăng nhập không
};

const AdminRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Định tuyến cho Admin */}
                <Route
                    path="/admin-phim-cu/*"
                    element={isAuthenticated() ? <LayoutAdmin /> : <Navigate to="/admin-phim-cu/login" />}
                />
                <Route path="/admin-phim-cu/login" element={<AdminLogin />} />

                {/* Các route khác */}
            </Routes>
        </Router>
    );
};

export default AdminRouter;