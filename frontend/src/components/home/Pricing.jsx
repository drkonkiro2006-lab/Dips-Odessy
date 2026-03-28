import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

export default function Pricing() {
  const plans = [
    { name: 'Starter', price: '₹1,499', popular: false, features: ['ITR filing', 'Basic support', 'Email updates'] },
    { name: 'Business', price: '₹4,999', popular: true, features: ['GST returns', 'Priority support', 'Compliance tracker'] },
    { name: 'Enterprise', price: '₹9,999', popular: false, features: ['Accounting & MIS', 'Dedicated manager', 'Quarterly reviews'] }
  ]
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-ink">Pricing</h2>
        <p className="text-ink-soft mt-2">Confidence-driven plans for different stages of your journey.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <motion.div
              key={plan.name}
              className={`card card-interactive p-6 hover:scale-[1.02] ${plan.popular ? 'ring-2 ring-brand' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold text-ink">{plan.name}</div>
                {plan.popular && <span className="text-xs px-2 py-1 rounded-full bg-brand text-white">Most Popular</span>}
              </div>
              <div className="mt-3 text-3xl font-bold text-ink">{plan.price}</div>
              <ul className="mt-4 space-y-2 text-ink-soft">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <ShieldCheck className="text-brand" size={16} /> <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3">
                <Link to="/contact" className="btn-primary">Get Started</Link>
                <Link to="/services" className="btn-outline">Learn More</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
