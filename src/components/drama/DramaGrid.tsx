import type { Drama } from '@/types'
import DramaCard from './DramaCard'

export default function DramaGrid({ dramas }: { dramas: Drama[] }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {dramas.map(d => <DramaCard key={d.bookId} drama={d} />)}
    </div>
  )
}
