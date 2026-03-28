import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'

export default function Faqs() {
  const items = [
    { q: 'Is my data secure?', a: 'Absolute security is our baseline. We utilize military-grade encryption, secure document intake portals, and strict NDAs for all certified experts handling your sensitive financial records.' },
    { q: 'What documents are required?', a: 'Requirements vary by service. For individuals, we typically need Form 16 and investment proofs; for businesses, we require GST ledgers, bank statements, and purchase/sales invoices. We provide a custom checklist upon onboarding.' },
    { q: 'How long does filing take?', a: 'Efficiency meets accuracy. Standard tax filings are typically finalized within 2–5 business days once all required documentation is verified by our compliance team.' },
    { q: 'Do you provide post-filing support?', a: 'Yes. Our partnership doesn’t end at filing. We provide year-round support, including handling department clarifications, responding to notices, and proactive tax planning for the next quarter.' }
  ]

  const [open, setOpen] = useState(null)

  return (
    // Reduced top padding (pt-10) to move the section up
    <section className="relative w-full pt-10 pb-24 bg-white dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 dark:bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
          >
            <HelpCircle size={14} className="text-blue-600 dark:text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">Information Center</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">
            Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-amber-200 dark:to-amber-500">Queries</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg text-lg font-medium leading-relaxed">
            Everything you need to know about our premium financial advisory and compliance process.
          </p>
        </div>

        {/* FAQ Grid Section (Side by Side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {items.map((it, idx) => {
            const isOpen = open === idx
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`group rounded-2xl border transition-all duration-500 overflow-hidden ${
                  isOpen 
                  ? 'bg-white dark:bg-white/[0.04] border-blue-200 dark:border-amber-500/30 shadow-xl shadow-blue-500/5' 
                  : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className={`text-base font-bold transition-colors duration-300 ${
                    isOpen ? 'text-blue-600 dark:text-amber-500' : 'text-slate-800 dark:text-slate-200'
                  }`}>
                    {it.q}
                  </span>
                  <div className={`p-1.5 ml-3 rounded-full transition-all duration-500 ${
                    isOpen ? 'bg-blue-600 dark:bg-amber-500 text-white dark:text-black rotate-180' : 'bg-slate-200 dark:bg-white/10 text-slate-500'
                  }`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4">
                        {it.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Support Footer with WhatsApp Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 p-6 md:p-8 rounded-[2rem] bg-blue-600 dark:bg-amber-500 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-blue-500/20 dark:shadow-amber-500/10"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <MessageCircle className="text-white dark:text-black" size={24} />
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-lg md:text-xl font-black text-white dark:text-black">Still have questions?</h4>
              <p className="text-white/80 dark:text-black/70 font-medium text-sm md:text-base">Our certified experts are ready to assist you.</p>
            </div>
          </div>
          
          {/* CHANGED: Converted button to <a> tag for WhatsApp link */}
          <a 
            href="https://wa.me/910000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 md:px-8 md:py-4 bg-white dark:bg-black text-blue-600 dark:text-amber-500 font-black text-xs md:text-sm uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform active:scale-95 shadow-xl inline-block text-center"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  )
}