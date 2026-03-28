import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-20">
      <div className="text-6xl font-bold text-brand">404</div>
      <div className="mt-3 text-ink">Page not found</div>
      <p className="text-ink-soft mt-2">The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary mt-6">Go Home</Link>
    </div>
  )
}
