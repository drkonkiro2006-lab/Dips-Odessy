import { motion } from 'framer-motion'
import { FileCheck, Upload, UserCheck, ClipboardCheck, ShieldCheck, ArrowRight } from 'lucide-react'
import gallery1 from '../../assets/images/gallery1.jpg'
import blog1 from '../../assets/images/blog1.jpg'
import aboutTeam from '../../assets/images/about-team.jpg'
import blog2 from '../../assets/images/blog2.jpg'
import blog3 from '../../assets/images/blog3.jpg'

export default function HowItWorks() {
  const steps = [
    { 
      icon: FileCheck, 
      image: gallery1, 
      title: 'Choose Service', 
      text: 'Select from ITR, GST, or bespoke Advisory.',
      color: 'from-blue-600 to-indigo-600'
    },
    { 
      icon: Upload, 
      image: blog1, 
      title: 'Upload Docs', 
      text: 'Encrypted & secure document intake.',
      color: 'from-indigo-600 to-purple-600'
    },
    { 
      icon: UserCheck, 
      image: aboutTeam, 
      title: 'Expert Review', 
      text: 'Certified professionals validate data.',
      color: 'from-purple-600 to-pink-600'
    },
    { 
      icon: ClipboardCheck, 
      image: blog2, 
      title: 'Submission', 
      text: 'Filed on govt portals with precision.',
      color: 'from-pink-600 to-rose-600'
    },
    { 
      icon: ShieldCheck, 
      image: blog3, 
      title: 'Confirmation', 
      text: 'Success receipt and ongoing support.',
      color: 'from-rose-600 to-orange-600'
    }
  ]

  return (
    <section className="relative w-full py-24 bg-white dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-[-10%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-[-10%] w-[30%] h-[30%] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-4"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-amber-500">The Workflow</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-amber-200 dark:to-amber-500">Streamlined</span> Process
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto text-lg font-medium">
            Experience a friction-free transition from raw documents to compliant success.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Animated Line (Desktop) */}
          <div className="hidden md:block absolute top-[120px] left-[10%] right-[10%] h-0.5 bg-slate-100 dark:bg-white/5 z-0 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500"
              initial={{ x: '-100%' }}
              whileInView={{ x: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                className="group flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Step Circle & Icon */}
                <div className="relative mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} p-[1px] shadow-xl shadow-blue-500/10 transition-transform duration-500 group-hover:rotate-12`}>
                    <div className="w-full h-full rounded-2xl bg-white dark:bg-[#0f172a] flex items-center justify-center">
                      <s.icon className="text-slate-800 dark:text-white" size={24} />
                    </div>
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black flex items-center justify-center border-4 border-white dark:border-[#020617]">
                    0{i + 1}
                  </div>
                </div>

                {/* Card Content */}
                <div className="w-full bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-[2rem] p-5 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/5 group-hover:-translate-y-2">
                  <div className="relative h-32 w-full overflow-hidden rounded-2xl mb-5">
                    <img 
                      src={s.image} 
                      alt={s.title} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  </div>
                  
                  <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tighter text-sm mb-2 group-hover:text-blue-600 dark:group-hover:text-amber-500 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold leading-relaxed">
                    {s.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA for Process Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 flex justify-center"
        >
          <button className="flex items-center gap-3 px-10 py-4 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-600 dark:hover:bg-amber-500 hover:text-white dark:hover:text-black transition-all group">
            Ready to Begin?
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}