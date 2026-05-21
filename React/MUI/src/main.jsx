import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MUI from './component/MUI.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <MUI/>
  </StrictMode>,
)
