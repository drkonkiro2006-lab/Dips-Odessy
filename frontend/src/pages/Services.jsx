import { Link } from 'react-router-dom';
import itrImg from '../assets/images/service-itr.jpg'
import gstRegImg from '../assets/images/service-gst-registration.jpg'
import gstRetImg from '../assets/images/service-gst-returns.jpg'
import taxPlanImg from '../assets/images/service-tax-planning.jpg'
import accountingImg from '../assets/images/service-accounting.jpg'
import consultingImg from '../assets/images/service-business-consulting.jpg'

const services = [
  {
    slug: 'Tax-Calculation',
    title: 'Income Tax Calculator',
    image: itrImg,
    desc: 'Calculate your tax with free of cost',
    features: ['Form selection', 'Document review', 'Deduction mapping', 'E-verification'],
    price: '₹0'
  },
  {
    slug: 'itr-filing',
    title: 'Income Tax Return Filing',
    image: itrImg,
    desc: 'Accurate filing with deduction optimization and e-verification.',
    features: ['Form selection', 'Document review', 'Deduction mapping', 'E-verification'],
    price: '₹1,499'
  },
  {
    slug: 'gst-registration',
    title: 'GST Registration',
    image: gstRegImg,
    desc: 'Complete registration with validation and ARN tracking.',
    features: ['GSTIN application', 'Document verification', 'GST portal support', 'ARN tracking'],
    price: '₹2,999'
  },
  {
    slug: 'gst-returns',
    title: 'GST Returns',
    image: gstRetImg,
    desc: 'Monthly/quarterly filing with reconciliation and compliance.',
    features: ['GSTR-1/3B filing', 'Reconciliation', 'Late fee tracking', 'Compliance updates'],
    price: '₹1,999'
  },
  {
    slug: 'tax-planning',
    title: 'Tax Planning & Advisory',
    image: taxPlanImg,
    desc: 'Proactive planning to minimize liabilities within regulations.',
    features: ['Personalized strategy', 'Investment advisory', 'Regulatory guidance', 'Periodic review'],
    price: '₹4,999'
  },
  {
    slug: 'accounting-compliance',
    title: 'Accounting & Compliance',
    image: accountingImg,
    desc: 'Books, reconciliations, and filings for compliant operations.',
    features: ['Bookkeeping', 'Bank reconciliation', 'Year-end closure', 'Regulatory filings'],
    price: '₹3,999'
  },
  {
    slug: 'business-consulting',
    title: 'Business & Financial Consulting',
    image: consultingImg,
    desc: 'Strategic insight for growth, profitability, and risk.',
    features: ['Business diagnosis', 'Financial models', 'Risk mitigation', 'Board presentations'],
    price: '₹7,999'
  }
]

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export default function Services() {
  return (
    <div className="min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-[#020202] py-20 px-6">
      {/* Header */}
      {/* Header Section */}
      <div className="max-w-5xl mx-auto text-center mb-20">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400 dark:text-amber-500/60 mb-4">
          ZariMunya LexTax Advisory
        </h2>
        <h1 className="text-4xl md:text-6xl font-serif font-light text-[#001f3f] dark:text-white mb-6 tracking-tight">
          Strategic <span className="italic">Tax & Legal</span> Portfolio
        </h1>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#001f3f] dark:via-amber-500 to-transparent mx-auto mb-8"></div>
        <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 font-light leading-relaxed">
          Navigate the complexities of GST, Income Tax, and Corporate Compliance with absolute 
          certainty. We provide the structural integrity your financial legacy requires.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const isCalculator = s.slug === 'Tax-Calculation';

          return (
            <div 
              key={s.slug} 
              className="group relative flex flex-col bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 transition-all duration-500 
                         hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,31,63,0.15)] 
                         dark:hover:shadow-[0_40px_80px_-20px_rgba(180,150,50,0.1)]"
            >
              {/* Refined Horizontal Badge */}
              {isCalculator && (
                <div className="absolute top-0 left-0 z-20 bg-emerald-600 dark:bg-amber-600 text-white text-[9px] font-bold px-4 py-1.5 tracking-[0.2em] uppercase">
                  Complimentary Access
                </div>
              )}

              {/* Image with 3D Parallax feel */}
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={s.image} 
                  alt={s.title} 
                  className="w-full h-full object-cover opacity-90 transition-all duration-1000 scale-110 group-hover:scale-100 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-transparent to-transparent opacity-40"></div>
              </div>

              {/* Content Section */}
              <div className="p-10 flex-grow[1] flex flex-col">
                <h3 className="text-2xl font-serif text-[#001f3f] dark:text-white mb-4 tracking-wide group-hover:text-blue-800 dark:group-hover:text-amber-500 transition-colors">
                  {s.title}
                </h3>
                
                <p className="text-slate-500 dark:text-gray-400 font-light text-sm leading-relaxed mb-8 h-12 overflow-hidden">
                  {s.desc}
                </p>

                <ul className="space-y-4 mb-12 flex-grow">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center text-[10px] tracking-[0.15em] text-slate-600 dark:text-gray-400 uppercase font-medium">
                      <span className="mr-3 text-[#001f3f] dark:text-amber-500 opacity-60"><CheckIcon /></span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Bottom Section - Guaranteed Alignment */}
                <div className="pt-8 border-t border-slate-100 dark:border-white/5">
                  <div className="flex justify-between items-baseline mb-8">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Consultation Fee</span>
                    <span className={`text-2xl font-light ${isCalculator ? 'text-emerald-600 dark:text-amber-500' : 'text-[#001f3f] dark:text-white'}`}>
                      {isCalculator ? '₹0 ' : s.price}
                      {isCalculator && <span className="text-xs uppercase tracking-widest italic ml-1">(Free)</span>}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    {isCalculator ? (
                      <Link 
                        to={`/services/${s.slug}`} 
                        className="w-full py-4 text-center text-xs font-bold uppercase tracking-widest bg-emerald-700 dark:bg-amber-600 text-white dark:text-black hover:bg-emerald-800 dark:hover:bg-amber-500 transition-all shadow-lg"
                      >
                        Calculate Your Tax
                      </Link>
                    ) : (
                      <>
                        <Link 
                          to="/contact" 
                          className="w-full py-4 text-center text-xs font-bold uppercase tracking-widest bg-[#001f3f] dark:bg-white text-white dark:text-black border border-transparent hover:bg-blue-900 dark:hover:bg-amber-500 transition-all shadow-xl"
                        >
                          Request Appointment
                        </Link>
                        <Link 
                          to={`/services/${s.slug}`} 
                          className="w-full text-center text-[10px] uppercase tracking-[0.4em] text-slate-400 hover:text-[#001f3f] dark:hover:text-amber-500 transition-colors"
                        >
                          View Details →
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}