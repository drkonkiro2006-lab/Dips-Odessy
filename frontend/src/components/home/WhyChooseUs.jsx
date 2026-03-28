import { motion } from 'framer-motion'
import { BadgeCheck, Tag, Clock, Shield, Headset, FileCheck, ArrowUpRight } from 'lucide-react'

export default function WhyChooseUs() {
  const items = [
    { 
      icon: BadgeCheck, 
      title: 'Certified Professionals', 
      desc: 'Top-tier CA/CS experts ensuring every filing meets peak regulatory standards.',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Tag, 
      title: 'Transparent Pricing', 
      desc: 'Zero hidden fees. Flat-rate pricing models tailored for startups and enterprises.',
      color: 'from-amber-400 to-orange-500'
    },
    { 
      icon: Clock, 
      title: 'On-Time Guarantee', 
      desc: 'Punctuality is our signature. We guarantee filing before deadlines, every time.',
      color: 'from-indigo-500 to-purple-600'
    },
    { 
      icon: Shield, 
      title: 'Secure Data Handling', 
      desc: 'Bank-grade encryption protecting your most sensitive financial information.',
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      icon: Headset, 
      title: 'Dedicated Support', 
      desc: 'A personal account manager for your business, not just an automated bot.',
      color: 'from-rose-500 to-pink-600'
    },
    { 
      icon: FileCheck, 
      title: 'Govt-Compliant', 
      desc: 'Methodical workflows designed to prevent notices and minimize audit risks.',
      color: 'from-sky-500 to-blue-700'
    }
  ]

  return (
    <section className="w-full bg-white dark:bg-[#020617] transition-colors duration-500 pt-0 pb-24">
      {/* Visual Separator - Subtle gradient line to blend from previous section */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent mb-24" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-0 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-amber-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 dark:text-amber-500">
                The Elite Standard
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
              Why Global Firms <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-amber-200 dark:to-amber-500">Choose Our Precision.</span>
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-sm lg:mb-2">
            Credible, compliant, and client-focused operations designed for financial clarity at scale.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card Background with Glassmorphism */}
              <div className="relative z-10 h-full p-8 rounded-[2.5rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden transition-all duration-500 group-hover:border-blue-500/30 dark:group-hover:border-amber-500/30">
                
                {/* Hover Gradient Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-500/[0.03] to-transparent dark:from-amber-500/[0.03]" />

                {/* Icon Box */}
                <div className={`relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} p-[1px] mb-8 shadow-lg transition-transform duration-500 group-hover:rotate-6`}>
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-[#0f172a] flex items-center justify-center">
                    <item.icon className="text-slate-800 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-amber-500" size={26} />
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                  {item.desc}
                </p>

                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  Read Protocol <ArrowUpRight size={14} />
                </div>

                {/* Background Numbering */}
                <span className="absolute bottom-4 right-8 text-8xl font-black text-slate-100 dark:text-white/[0.02] pointer-events-none transition-colors group-hover:text-blue-500/5 dark:group-hover:text-amber-500/5">
                  0{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}