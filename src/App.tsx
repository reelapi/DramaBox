import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import AppRoutes from './routes'
import './index.css'

export default function App() {
  const [show, setShow] = useState(true)
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <AppRoutes />
        <SpeedInsights />
        {show && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 rounded-xl p-6 max-w-sm w-full text-center">
              <p className="text-white mb-2 font-semibold">API Powered by</p>
              <a href="https://reelapi.it.com/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">reelapi.it.com</a>
              <button onClick={() => setShow(false)} className="mt-5 w-full bg-purple-600 text-white py-2.5 rounded-lg font-medium hover:bg-purple-500 transition-colors">OK</button>
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  )
}
