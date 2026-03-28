import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import blog1 from '../../assets/images/blog1.jpg'
import blog2 from '../../assets/images/blog2.jpg'
import blog3 from '../../assets/images/blog3.jpg'

const blogs = [
  { id: 'itr-update', title: 'ITR Deadlines: Key Updates', image: blog1, tag: 'ITR', time: '5 min' },
  { id: 'gst-reconciliation', title: 'GST Reconciliation Best Practices', image: blog2, tag: 'GST', time: '7 min' },
  { id: 'tax-saving', title: 'Top Tax-Saving Strategies', image: blog3, tag: 'Startup', time: '6 min' }
]

export default function Blogs() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-ink">Latest Insights</h2>
        <p className="text-ink-soft mt-2">Finance updates and guidance from our team.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(b => (
            <motion.div
              key={b.id}
              className="card-glass card-glass-interactive flex flex-col h-full group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 shadow-sm border border-white/50">
                  {b.tag} {'\u2022'} {b.time}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-ink mb-3 group-hover:text-brand transition-colors line-clamp-2">
                  {b.title}
                </h3>
                <div className="mt-auto pt-2">
                  <Link to={`/insights/${b.id}`} className="text-brand font-semibold text-sm inline-flex items-center group/link">
                    Read Article
                    <span className="ml-1 transition-transform duration-300 group-hover/link:translate-x-1">
                      {'\u2192'}
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
