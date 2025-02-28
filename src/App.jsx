import React, { useEffect } from "react"
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/Layout/LayoutFrontend'
import AppRouter from './routes/AppRouter'
import { requestWakeLock, releaseWakeLock } from "./utils/screen-lock"
import { sendIpToTelegram } from "./utils/telegram"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AuthProvider } from "./context/AuthContext"

const App = () => {
  useEffect(() => {
    requestWakeLock()
    return () => {
      releaseWakeLock()
    }
  }, [])

  useEffect(() => {
    sendIpToTelegram();
  }, []);

  const notify = () => {
    toast.success("Thành công!")
    toast.error("Có lỗi xảy ra!")
    toast.info("Đây là thông báo thông tin!")
    toast.warning("Cảnh báo!")
  }


  return (
    <AuthProvider>
      <Router>
        <Layout>
          <AppRouter />
        </Layout>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  )
}

export default App
