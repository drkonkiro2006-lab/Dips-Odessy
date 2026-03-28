import { motion } from 'framer-motion'
import { Star, Quote, ShieldCheck } from 'lucide-react'

const data = [
  { name: 'Rohan Gupta', business: 'D2C Retail', service: 'GST Returns', text: 'Their reconciliation process reduced notices significantly. Filing has been timely.', rating: 5, initials: 'RG', gradient: 'from-blue-500 to-indigo-600' },
  { name: 'Ananya Sen', business: 'Tech Services', service: 'ITR & Advisory', text: 'Clear, proactive tax planning. They saved us significant time and money.', rating: 4, initials: 'AS', gradient: 'from-amber-400 to-orange-600' },
  { name: 'Vikram Mehta', business: 'Manufacturing', service: 'Compliance', text: 'Books and filings are now streamlined. The team is responsive and professional.', rating: 5, initials: 'VM', gradient: 'from-emerald-400 to-teal-600' },
  { name: 'Sana Khan', business: 'E-commerce', service: 'Audit Support', text: 'Highly professional team. They handled our complex audits with total ease.', rating: 5, initials: 'SK', gradient: 'from-purple-500 to-pink-600' },
  { name: 'Arjun Das', business: 'Logistics', service: 'TDS Filing', text: 'Precision and speed. Exactly what we needed for our expanding operations.', rating: 4, initials: 'AD', gradient: 'from-cyan-400 to-blue-600' },
  { name: 'Priya Rai', business: 'Consultancy', service: 'Company Inc.', text: 'The best partner for new startups. They made registration look simple.', rating: 5, initials: 'PR', gradient: 'from-rose-400 to-red-600' },
]

// 1. Shimmering Star Component
const ShimmerStar = ({ filled }) => (
  <div className="relative w-4 h-4">
    {/* Base Star (Grey if empty, Amber if filled) */}
    <Star 
      size={16} 
      className={`${filled ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`} 
    />
    
    {/* The Shine Layer - Only rendered if filled */}
    {filled && (
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          // This mask ensures the shine only shows up inside the star shape
          maskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'black\' stroke=\'black\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolygon points=\'12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\'%3E%3C/polygon%3E%3C/svg%3E")',
          WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'black\' stroke=\'black\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolygon points=\'12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\'%3E%3C/polygon%3E%3C/svg%3E")',
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat'
        }}
      >
        <motion.div
          initial={{ x: '-150%' }}
          animate={{ x: '150%' }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: "easeInOut", 
            repeatDelay: 2 
          }}
          className="w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-[45deg]"
        />
      </div>
    )}
  </div>
)

const ReviewCard = ({ item }) => (
  <div className="relative w-[350px] md:w-[450px] shrink-0 bg-white dark:bg-white/[0.03] backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200 dark:border-white/10 shadow-xl mx-4">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.gradient} opacity-5 blur-2xl`} />
    <Quote size={40} className="absolute top-4 right-4 text-slate-900/5 dark:text-white/5" />
    
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <ShimmerStar key={i} filled={i < item.rating} />
      ))}
    </div>

    <p className="text-lg font-medium text-slate-800 dark:text-slate-200 leading-relaxed mb-6 italic">
      "{item.text}"
    </p>

    <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-white/10">
      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-black text-sm shadow-md`}>
        {item.initials}
      </div>
      <div>
        <div className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">
          {item.name}
        </div>
        <div className="text-[10px] text-blue-600 dark:text-amber-500 font-bold uppercase tracking-widest mt-0.5">
          {item.business} • {item.service}
        </div>
      </div>
    </div>
  </div>
)

const MarqueeRow = ({ items, reverse = false }) => (
  /* 1. Added a wrapper to ensure the row stays centered on large screens */
  <div className="w-full flex justify-center overflow-hidden">
    <div className="flex w-full max-w-[1800px]"> 
      <motion.div 
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 items-center justify-center"
      >
        {/* We use 4 sets of items instead of 2 to ensure no gaps on ultra-wide screens */}
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <ReviewCard key={i} item={item} />
        ))}
      </motion.div>
    </div>
  </div>
)

export default function Testimonials() {
  return (
    <section className="relative w-full py-24 bg-slate-50 dark:bg-[#020617] overflow-hidden">
      {/* Background Accents (Keep these absolute) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full">
        {/* Header Section - Already Centered */}
        <div className="flex flex-col items-center text-center mb-20 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm"
          >
            <ShieldCheck size={14} className="text-blue-600 dark:text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">Compliance Verified</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-amber-200 dark:to-amber-500">Industry Leaders</span>
          </h2>
          
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg font-medium leading-relaxed">
            Join 5,000+ businesses who have streamlined their financial compliance with our expert-led tax solutions.
          </p>
        </div>

        {/* Marquee Rows Container - Centered Alignment */}
        <div className="flex flex-col gap-10 w-full overflow-hidden">
          <MarqueeRow items={data.slice(0, 3)} />
          <MarqueeRow items={data.slice(3, 6)} reverse />
        </div>
      </div>

      {/* Premium Edge Fades (Updated to be slightly wider for better centering feel) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-slate-50 dark:from-[#020617] to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-slate-50 dark:from-[#020617] to-transparent z-20" />
    </section>
  )
}