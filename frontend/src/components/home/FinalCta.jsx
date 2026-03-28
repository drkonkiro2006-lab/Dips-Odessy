import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function FinalCta() {
  return (
    <section className="w-full bg-gradient-to-br from-slate-900 to-blue-900 rounded-none">
      <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="rounded-xl bg-white/10 backdrop-blur border border-white/20 p-8 text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">Ready to simplify your tax & compliance?</div>
            <div className="text-white/80 mt-2">Start now or schedule a consultation with our experts.</div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/services" className="inline-flex items-center justify-center rounded-md bg-white text-blue-900 px-5 py-2.5 font-medium shadow-soft hover:shadow-elevate transition">
                  Get Started
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/contact" className="inline-flex items-center justify-center rounded-md border border-white/50 text-white px-5 py-2.5 font-medium hover:bg-white/10 transition">
                  Book Consultation
                </Link>
              </motion.div>
            </div>
          </div>
      </div>
    </section>
  )
}
