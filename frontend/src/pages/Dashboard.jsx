import { useAuth } from '../context/AuthContext.jsx'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const { user, logout } = useAuth()
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Dashboard</h1>
          <p className="text-ink-soft mt-1">Welcome, {user?.email}</p>
        </div>
        <button className="btn-outline" onClick={logout}>Logout</button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          className="rounded-lg border p-6 bg-white shadow-soft"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-lg font-semibold text-ink">Your Services</div>
          <p className="text-ink-soft mt-2">Track active filings and engagements.</p>
        </motion.div>
        <motion.div
          className="rounded-lg border p-6 bg-white shadow-soft"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-lg font-semibold text-ink">Documents</div>
          <p className="text-ink-soft mt-2">Upload and manage compliance documents.</p>
        </motion.div>
        <motion.div
          className="rounded-lg border p-6 bg-white shadow-soft"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-lg font-semibold text-ink">Support</div>
          <p className="text-ink-soft mt-2">Get assistance from our team.</p>
        </motion.div>
      </div>
    </div>
  )
}
