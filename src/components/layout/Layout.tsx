import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'

export default function Layout() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      <main className="pt-16 pb-20 px-4 max-w-md mx-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
