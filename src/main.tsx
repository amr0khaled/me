import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/globals.css'
import App from './App.tsx'

createRoot(document.body!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
