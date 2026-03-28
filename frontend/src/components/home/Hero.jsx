import { useState, useEffect } from 'react' // 1. Added imports
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import hero from '../../assets/images/hero.jpg'
import { ShieldCheck, BadgeCheck, Lock, Award, ArrowUpRight, CheckCircle2, Star, TrendingUp } from 'lucide-react'
import VideoText from './VideoText'

export default function Hero() {
  // 2. State to track screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint is usually 1024px
    };

    checkScreenSize(); // Check on mount
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-start justify-center overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500 pt-12 md:pt-40 lg:pt-2 pb-20">
      {/* ... Background elements remain same ... */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 dark:bg-indigo-600/10 blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Content */}
        <motion.div 
          className="pt-8 max-w-md mx-auto text-center lg:max-w-none lg:mx-0 lg:text-left"
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* ... Star Badge remains same ... */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-md"
          >
            <Star className="text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400" size={14} />
            <span className="text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">Premium Financial Excellence</span>
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
            Elevate Your 
            <VideoText 
              src="https://media.istockphoto.com/id/1321117519/video/swirly-particles-purple-blue-glitter-loopable-background-animation.mp4?s=mp4-640x640-is&k=20&c=SEDwGDkkVWN58CxYRwagPzK0es4eZqln0GLmdfq4WjY=" 
              fontSize={isMobile ? "3.1em" : "4.8em"} // 3. Conditional font size
              fontFamily="inherit"
            >
              Financial Future
            </VideoText>
            with Precision.
          </h1>
          
          {/* ... Rest of the component remains same ... */}
          <p className="mt-8 text-slate-600 dark:text-slate-400 text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
            Experience elite-tier accounting and tax strategies. We transform complex compliance into your competitive advantage with proactive, certified expertise.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/contact" className="group flex items-center gap-2 bg-blue-600 dark:bg-white text-white dark:text-slate-950 px-8 py-4 rounded-full font-bold transition-all hover:bg-blue-700 dark:hover:bg-blue-50 shadow-xl shadow-blue-500/20 dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Book Consultation
                <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={18} />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/services" className="flex items-center gap-2 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-full font-bold hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all shadow-sm">
                Explore Services
              </Link>
            </motion.div>
          </div>

          <div className="mt-12 pt-10 border-t border-slate-200 dark:border-slate-800/60">
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              {[
                { icon: ShieldCheck, label: 'Govt-Compliant', desc: 'Full Regulatory Adherence' },
                { icon: Lock, label: 'Secure Data', desc: 'Military-Grade Encryption' },
                { icon: Award, label: 'Certified Experts', desc: 'Top 1% Financial Analysts' },
                { icon: BadgeCheck, label: 'Trusted by 5,000+', desc: 'Proven Success Records' }
              ].map((t, i) => (
                <motion.div 
                  key={t.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 p-2 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-sm shadow-sm">
                    <t.icon className="text-blue-600 dark:text-blue-400" size={18} />
                  </div>
                  <div>
                    <div className="text-slate-900 dark:text-white font-semibold text-sm">{t.label}</div>
                    <div className="text-slate-500 dark:text-slate-500 text-xs">{t.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Visual Component */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative z-10 p-2 sm:p-4 rounded-[2.5rem] bg-white/30 dark:bg-white/5 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-2xl">
            <div className="rounded-[1.8rem] overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
              <img 
                src={hero} 
                alt="Professional finance consulting" 
                className="w-full h-auto lg:h-[650px] object-cover scale-105 hover:scale-100 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 dark:from-[#020617]/80 via-transparent to-transparent" />
            </div>

            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 z-20 bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/50 dark:border-slate-700 p-6 rounded-2xl shadow-2xl max-w-[260px]"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-green-500/20 rounded-full">
                  <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <div className="text-slate-900 dark:text-white font-extrabold text-3xl italic">99.9%</div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-snug">
                Accuracy rate in high-stakes auditing for 2025.
              </p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 z-20 bg-blue-600/90 dark:bg-blue-500/20 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl hidden sm:block"
            >
              <div className="flex items-center gap-3 text-white">
                <TrendingUp size={20} />
                <span className="font-bold text-sm tracking-wide">Market Leader</span>
              </div>
            </motion.div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-400/10 dark:bg-blue-500/20 blur-[120px] -z-10 rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}