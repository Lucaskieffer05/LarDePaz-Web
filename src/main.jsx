import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './pages/app/App.jsx'
import '@fontsource/roboto/500.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
