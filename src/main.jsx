import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AdminApp from './AdminApp'

const url = window.location.pathname;

const RootComponent = url.startsWith("/admin-phim-cu") ? <AdminApp /> : <App />;

ReactDOM.createRoot(document.getElementById("root")).render(RootComponent);