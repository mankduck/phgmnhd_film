import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { requestWakeLock, releaseWakeLock } from "./utils/screen-lock.js";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)