import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import AppRouter from './routes/AppRouter';


const App = () => {
  return (
    <Router>
      <Layout>
        <AppRouter />
      </Layout>
    </Router>
  )
}

export default App
