import { MotionConfig } from 'motion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ComputerPage } from './pages/ComputerPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      {window.location.pathname.replace(/\/$/, '') === '/computer' ? <ComputerPage /> : <HomePage />}
    </MotionConfig>
  </StrictMode>,
)
