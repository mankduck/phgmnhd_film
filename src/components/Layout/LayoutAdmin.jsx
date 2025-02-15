import { Outlet, useNavigate } from "react-router-dom";

const LayoutAdmin = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        navigate("/admin-phim-cu/login");
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
                <nav>
                    <ul>
                        <li className="mb-2"><a href="/admin-phim-cu" className="block p-2 hover:bg-gray-700 rounded">Dashboard</a></li>
                        <li className="mb-2"><a href="/admin-phim-cu/movies" className="block p-2 hover:bg-gray-700 rounded">Movies</a></li>
                    </ul>
                </nav>
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-600">
                    Đăng xuất
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
};

export default LayoutAdmin;
