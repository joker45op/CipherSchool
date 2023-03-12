import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import NavB from './components/NavB'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavB />
    <App />
  </React.StrictMode>
)
