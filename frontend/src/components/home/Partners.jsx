import { motion } from 'framer-motion'
import logosGov from '../../assets/images/logos-gov.svg'
import logosGstn from '../../assets/images/logos-gstn.svg'
import logosMca from '../../assets/images/logos-mca.svg'
import logosBank from '../../assets/images/logos-bank.svg'
import logosCa from '../../assets/images/logos-ca.svg'

export default function Partners() {
  const logos = [logosGov, logosGstn, logosMca, logosBank, logosCa]
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-ink">Partners & Certifications</h2>
        <p className="text-ink-soft mt-2">Aligned with portals and associations for compliant operations.</p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-6">
          {logos.map((src, i) => (
            <motion.div
              key={i}
              className="rounded-lg border bg-white/70 backdrop-blur p-4 flex items-center justify-center shadow-soft"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <img src={src} alt="Certification logo" className="h-10 w-auto filter grayscale hover:grayscale-0 transition" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
