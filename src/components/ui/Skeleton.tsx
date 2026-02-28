export default function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-800 rounded-lg ${className}`} />
}
