import { NavLink, Link } from 'react-router-dom'
import { ChevronDown, Sun, Moon, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext.jsx'
import logo from '../../../src/assets/images/mybrand 2.png'

const services = [
  { slug: 'Tax-Calculation', name: 'Tax Calculation', desc: 'Instant precision estimates' },
  { slug: 'itr-filing', name: 'ITR Filing', desc: 'Compliant personal returns' },
  { slug: 'gst-registration', name: 'GST Registration', desc: 'Seamless business onboarding' },
  { slug: 'gst-returns', name: 'GST Returns', desc: 'Monthly filing & reconciliation' },
  { slug: 'tax-planning', name: 'Tax Planning', desc: 'Strategic wealth optimization' },
  { slug: 'accounting-compliance', name: 'Accounting', desc: 'Audit-ready bookkeeping' },
  { slug: 'business-consulting', name: 'Consulting', desc: 'Scale-up growth strategies' }
]

export default function MainNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 
        ${scrolled ? 'bg-transparent h-20' : 'bg-transparent h-20'} 
        hidden lg:flex items-center justify-between pt-16 px-10`}
      >
        {/* Brand */}
        <Link to="/" className="relative group flex items-center gap-3">
          <div className="absolute -inset-2 bg-blue-500/20 dark:bg-amber-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src={logo}
            alt="Brand Logo"
            className="relative h-14 md:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="flex lg:flex items-center gap-2 p-1.5 bg-slate-100/50 dark:bg-white/5 backdrop-blur-md rounded-full border border-slate-200 dark:border-white/10 transition-colors">
          <NavButton to="/" label="Home" />

          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all uppercase
              ${open
                ? 'bg-blue-600 dark:bg-amber-500 text-white dark:text-black'
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-amber-500'}`}>
              Services
              <ChevronDown size={14} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[520px] 
                             rounded-[2rem] overflow-hidden z-50 p-4
                             bg-white/95 dark:bg-slate-900/85 
                             backdrop-blur-2xl backdrop-saturate-150
                             border border-white/40 dark:border-white/10
                             shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                  <div className="grid grid-cols-2 gap-2">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="group flex flex-col p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/10"
                      >
                        <span className="text-[15px] font-black text-slate-900 dark:text-white uppercase group-hover:text-blue-600 dark:group-hover:text-amber-500">
                          {s.name}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-tight">
                          {s.desc}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-4 p-4 bg-blue-600/5 dark:bg-amber-500/5 rounded-2xl flex items-center justify-between border border-blue-600/10 dark:border-amber-500/10">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      Need expert advice?
                    </span>
                    <Link to="/contact" className="text-xs font-black text-blue-600 dark:text-amber-500 flex items-center gap-1">
                      FREE CONSULT <ArrowRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavButton to="/about" label="About" />
          <NavButton to="/gallery" label="Gallery" />
          <NavButton to="/insights" label="Insights" />

          <NavButton to="/contact" label="Contact" />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-amber-500 dark:hover:text-black transition-all duration-300 shadow-inner"
          >
            {theme === 'dark' ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
          </button>

          <Link
            to="/contact"
            className="relative group overflow-hidden px-8 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/10 transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Book Consultation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-amber-400 dark:to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        </div>
      </nav>

      {/* 🔥 THIS DIV FIXES THE OVERLAP ISSUE */}
      <div className={`${scrolled ? 'h-20' : 'h-24'} transition-all duration-500`} />
    </>
  )
}

function NavButton({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all uppercase
        ${isActive
          ? 'bg-white dark:bg-white/10 text-blue-600 dark:text-amber-400 shadow-sm'
          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
        }
      `}
    >
      {label}
    </NavLink>
  )
}
