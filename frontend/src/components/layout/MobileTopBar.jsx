import { NavLink, Link } from 'react-router-dom'
import { ChevronDown, Sun, Moon, ArrowRight, Menu, MoreVertical } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../assets/images/mybrand.png'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function MobileTopBar({ onMenu, onInfo }) {
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b pt-safe-top
        ${scrolled 
          ? 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150 border-slate-200/50 dark:border-slate-800/50 shadow-sm' 
          : 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-transparent'
        }`}
    >
      <div className="relative h-14 px-4 flex items-center justify-between">
        
        {/* LEFT SIDE: Menu Trigger */}
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open navigation menu"
          className="p-2 rounded-full text-slate-900 dark:text-slate-100 active:scale-95 active:bg-slate-200/50 dark:active:bg-slate-700/50 transition-all"
        >
          <Menu size={22} strokeWidth={2} />
        </button>

        {/* CENTER: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none flex items-center justify-center">
          <img
            src={logo}
            alt="Brand Logo"
            className="h-8 w-auto max-w-[130px] object-contain"
          />
        </div>

        {/* RIGHT SIDE: Action Buttons Group */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 active:scale-90 transition-all duration-300 flex items-center justify-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                transition={{ duration: 0.15 }}
              >
                {theme === 'dark' 
                  ? <Sun size={20} strokeWidth={2} className="text-amber-400" /> 
                  : <Moon size={20} strokeWidth={2} className="text-indigo-600" />
                }
              </motion.div>
            </AnimatePresence>
          </button>

          <button
            type="button"
            onClick={onInfo}
            aria-label="Open info panel"
            className="p-2 rounded-full text-slate-900 dark:text-slate-100 active:bg-slate-200/50 dark:active:bg-slate-700/50 transition-colors"
          >
            <MoreVertical size={22} strokeWidth={2} />
          </button>
        </div>

      </div>
    </div>
  )
}