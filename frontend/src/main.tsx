import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import './index.css'
import App from './App.tsx'
import SideBarContext from './context/SideBarContext.tsx'

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SideBarContext>
          <App />
      </SideBarContext>
    </BrowserRouter>
  </StrictMode>,
)
