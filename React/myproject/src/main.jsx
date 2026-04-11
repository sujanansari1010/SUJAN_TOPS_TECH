import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import compo1,{compo2} from './compo1.jsx'
import Css from './Css.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <compo1 />
    <Css />
  </StrictMode>,
)
