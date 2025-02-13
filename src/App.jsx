import React, { useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import AppRouter from './routes/AppRouter';
import { requestWakeLock, releaseWakeLock } from "./utils/screen-lock"

const App = () => {
  useEffect(() => {
    requestWakeLock();

    return () => {
      releaseWakeLock();
    };
  }, []);
  return (
    <Router>
      <Layout>
        <AppRouter />
      </Layout>
    </Router>
  )
}

export default App
