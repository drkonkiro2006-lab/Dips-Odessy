import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { firebaseEnabled } from '../firebase/config.js'

export default function Login() {
  const { login, loginWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard'

  const submit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch {
      setError('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const google = async () => {
    setError('')
    setLoading(true)
    try {
      await loginWithGoogle()
      navigate(from, { replace: true })
    } catch {
      setError('Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-ink">Login</h1>
      <form onSubmit={submit} className="mt-6 rounded-lg border p-6 bg-white shadow-soft">
        {!firebaseEnabled && (
          <div className="mb-4 rounded border border-warning bg-yellow-50 text-sm text-warning px-3 py-2">
            Authentication is not configured. Add Firebase keys in .env.
          </div>
        )}
        <div>
          <label className="block text-sm text-ink-soft">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2"
            required
          />
        </div>
        <div className="mt-3">
          <label className="block text-sm text-ink-soft">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2"
            required
          />
        </div>
        {error && <div className="mt-3 text-danger">{error}</div>}
        <button type="submit" className="btn-primary mt-4" disabled={loading || !firebaseEnabled}>
          {loading ? 'Signing in...' : 'Login'}
        </button>
        <button type="button" className="btn-outline mt-3 w-full" onClick={google} disabled={loading || !firebaseEnabled}>
          Continue with Google
        </button>
        <div className="mt-4 text-sm text-ink-soft">
          No account? <Link to="/signup" className="text-brand">Sign up</Link>
        </div>
      </form>
    </div>
  )
}
