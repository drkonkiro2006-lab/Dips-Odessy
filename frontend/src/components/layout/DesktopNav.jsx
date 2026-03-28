import { motion, AnimatePresence } from 'framer-motion';
import InfoStrip from './InfoStrip.jsx';
import MainNav from './MainNav.jsx';

export default function DesktopNav({ stuck }) {
  return (
    <header className="hidden lg:block fixed top-0 left-0 right-0 z-[100] transition-colors duration-300">
      {/* 1. InfoStrip: Slides up and fades out when scrolling */}
      <AnimatePresence>
        {!stuck && (
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <InfoStrip />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Navigation: Moves up to take the place of the InfoStrip */}
      <motion.div
        animate={{ 
          y: stuck ? -40 : 0, // Moves up exactly the height of the InfoStrip (10rem/40px)
          backgroundColor: stuck ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`w-full border-b transition-all duration-300 ${
          stuck 
            ? 'dark:bg-slate-900/80 backdrop-blur-xl border-slate-200/50 dark:border-white/10 shadow-lg py-3' 
            : 'dark:bg-transparent border-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-8">
          <MainNav stuck={stuck} />
        </div>
      </motion.div>
    </header>
  );
}