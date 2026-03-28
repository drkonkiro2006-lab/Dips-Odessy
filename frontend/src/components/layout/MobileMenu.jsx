import { Link } from 'react-router-dom'
import { X, ChevronRight } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About Us' },
  { to: '/gallery', label: 'Gallery' },

  { to: '/insights', label: 'Insights' },
  { to: '/contact', label: 'Contact' }
]

export default function MobileMenu({ open, onClose }) {
  return (
    <div
      className={`lg:hidden fixed inset-0 z-[60] bg-black/20 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      onClick={onClose}
    >
      <div
        className={`absolute inset-y-0 left-0 w-[85%] max-w-sm p-6 transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] 
          bg-white/40 dark:bg-slate-900/40 
          backdrop-blur-2xl backdrop-saturate-150
          border-r border-white/20 dark:border-slate-800/50 shadow-2xl ${open ? 'translate-x-0' : '-translate-x-full'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Area */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-sm font-bold tracking-tight text-slate-400 uppercase">Navigation</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-900 dark:text-white active:scale-90 transition-all"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Nav Links as iOS List Items */}
        <nav className="space-y-1">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className="flex items-center justify-between py-4 px-2 rounded-lg active:bg-slate-200/40 dark:active:bg-slate-800/40 transition-colors group"
            >
              <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {item.label}
              </span>
              <ChevronRight size={18} className="text-slate-400 group-active:translate-x-1 transition-transform" />
            </Link>
          ))}

          <div className="pt-8">
            <Link
              to="/contact"
              onClick={onClose}
              className="block w-full py-4 rounded-2xl bg-blue-600 dark:bg-blue-500 text-white text-center font-bold shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all"
            >
              Book Consultation
            </Link>

            <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
              © 2026 Your Brand Name
            </p>
          </div>
        </nav>
      </div>
    </div>
  )
}