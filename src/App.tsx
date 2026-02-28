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
              <a href="https://github.com/reelapi/DramaBox" target="_blank" rel="noopener noreferrer" className="inline-block text-zinc-400 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg></a>
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
