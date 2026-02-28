import { BrowserRouter } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import AppRoutes from './routes'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <AppRoutes />
        <SpeedInsights />
      </div>
    </BrowserRouter>
  )
}
