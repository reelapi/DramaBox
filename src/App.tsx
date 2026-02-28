import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import AppRoutes from './routes'
import './index.css'

export default function App() {
  const [show, setShow] = useState(true)
  const [clicked, setClicked] = useState(false)
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <AppRoutes />
        <SpeedInsights />
        {show && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 rounded-xl p-6 max-w-sm w-full text-center">
              <p className="text-white mb-1 font-semibold text-lg">Hey there! 👋</p>
              <p className="text-zinc-400 text-sm mb-3">Welcome to DramaBox Web! Just so you know, all the drama content you're enjoying here is served through our awesome API. Feel free to explore and binge-watch to your heart's content! 🍿✨</p>
              <p className="text-zinc-500 text-xs mb-4">Powered by</p>
              <a href="https://reelapi.it.com/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 underline font-medium">reelapi.it.com</a>
              {clicked ? (
                <button onClick={() => setShow(false)} className="mt-5 w-full btn-primary">Close</button>
              ) : (
                <button onClick={() => { window.open('https://reelapi.it.com/', '_blank'); setClicked(true); }} className="mt-5 w-full btn-primary">Click to Continue</button>
              )}
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  )
}
