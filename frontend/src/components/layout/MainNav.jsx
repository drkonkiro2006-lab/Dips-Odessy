import { NavLink, Link } from 'react-router-dom'
import { ChevronDown, Sun, Moon, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext.jsx'
import logo from "../../assets/images/DipsOdyssey-Logo-Final.png"

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
        className={`fixed left-0 right-0 z-[100] transition-all duration-500 flex items-center justify-between px-10
        ${scrolled 
            ? 'top-0 h-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-white/10 shadow-sm' 
            : 'top-10 h-24 bg-transparent' /* top-10 pushes it below the info bar */
        }`}
      >
        {/* Logo Section - Forced Center */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="Logo"
              className="h-28 md:h-22 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Center Pill Menu - Forced Center */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <div className="flex items-center gap-1 px-2 py-1.5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-white/10 shadow-lg">
            
            <NavButton to="/" label="Home" />

            {/* Services Dropdown */}
            <div
              className="relative flex items-center"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold uppercase transition-all
                ${open
                  ? 'bg-blue-600 dark:bg-amber-500 text-white dark:text-black shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-amber-400'
                }`}
              >
                Services
                <ChevronDown size={14} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[500px]
                    bg-white dark:bg-slate-900 rounded-[2rem] p-5 shadow-2xl border border-slate-200 dark:border-white/10 z-[110]"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          className="p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/10 group"
                        >
                          <p className="font-black text-sm text-slate-900 dark:text-white uppercase group-hover:text-blue-600 dark:group-hover:text-amber-500">
                            {s.name}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">
                            {s.desc}
                          </p>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-between items-center p-4 bg-blue-50/50 dark:bg-white/5 rounded-2xl border border-blue-100 dark:border-white/5">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tight">
                        Need expert advice?
                      </span>
                      <Link to="/contact" className="text-blue-600 dark:text-amber-500 text-xs font-black flex items-center gap-1 group">
                        FREE CONSULT <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
        </div>

        {/* Right Section - Forced Center */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-amber-500 dark:hover:text-black transition-all shadow-inner"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-full bg-[#0f172a] dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-900/10"
          >
            Book Consultation
          </Link>
        </div>
      </nav>

      {/* Spacer - Fixed to handle the gap created by top-10 */}
      <div className="h-32" />
    </>
  )
}

function NavButton({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-5 py-2.5 rounded-full text-sm font-bold uppercase transition-all flex items-center
        ${isActive
          ? 'bg-white dark:bg-white/10 text-blue-600 dark:text-amber-400 shadow-sm'
          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
        }`
      }
    >
      {label}
    </NavLink>
  )
}