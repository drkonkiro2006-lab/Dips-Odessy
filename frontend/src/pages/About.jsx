import aboutTeam from '../assets/images/about-team.jpg'

const achievements = [
  { name: 'ISO Certified', logo: '/src/assets/images/compliance.svg' },
  { name: 'NSU Certified', logo: '/src/assets/images/office.svg' },
  { name: 'Professional Accreditation', logo: '/src/assets/images/consulting.svg' }
]

export default function About() {
  return (
    <>
      <section className="w-full bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-800 rounded-none">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">About Us</h1>
            <p className="text-white/80 mt-3">
              A professional finance and tax advisory firm serving Indian businesses with
              end-to-end services across ITR, GST, accounting, and strategic consulting.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {achievements.map(a => (
                <div key={a.name} className="rounded-lg border border-white/20 bg-white/10 p-3 text-center">
                  <img src={a.logo} alt={a.name} className="h-12 mx-auto" />
                  <div className="mt-2 text-sm font-medium text-white">{a.name}</div>
                </div>
              ))}
            </div>
          </div>
          <img src={aboutTeam} alt="Professional team in office" className="w-full rounded-lg shadow-soft object-cover object-center" />
        </div>
      </section>

      <section className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-lg border dark:border-slate-700 p-6 transition-colors duration-200">
              <div className="text-lg font-semibold text-ink dark:text-white">Mission</div>
              <p className="text-ink-soft dark:text-slate-300 mt-2 transition-colors duration-200">
                Deliver clarity, compliance, and confidence through meticulous finance services.
              </p>
            </div>
            <div className="rounded-lg border dark:border-slate-700 p-6 transition-colors duration-200">
              <div className="text-lg font-semibold text-ink dark:text-white">Vision</div>
              <p className="text-ink-soft dark:text-slate-300 mt-2 transition-colors duration-200">
                Become India's most trusted partner for tax and financial advisory.
              </p>
            </div>
            <div className="rounded-lg border dark:border-slate-700 p-6 transition-colors duration-200">
              <div className="text-lg font-semibold text-ink dark:text-white">Values</div>
              <p className="text-ink-soft dark:text-slate-300 mt-2 transition-colors duration-200">
                Integrity, precision, client-centricity, and continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-lg border dark:border-slate-700 p-6 flex gap-4 items-center transition-colors duration-200">
              <div className="h-20 w-20 rounded-full bg-brand" />
              <div>
                <div className="text-lg font-semibold text-ink dark:text-white transition-colors duration-200">Founder</div>
                <div className="text-ink-soft dark:text-slate-300 transition-colors duration-200">FCA, MBA Finance</div>
                <p className="text-ink-soft dark:text-slate-300 mt-1 transition-colors duration-200">
                  12+ years in taxation and compliance. Led transformations for SMEs and corporates.
                </p>
              </div>
            </div>
            <div className="rounded-lg border dark:border-slate-700 p-6 flex gap-4 items-center transition-colors duration-200">
              <div className="h-20 w-20 rounded-full bg-brand" />
              <div>
                <div className="text-lg font-semibold text-ink dark:text-white transition-colors duration-200">Developer</div>
                <div className="text-ink-soft dark:text-slate-300 transition-colors duration-200">Senior UI/UX Engineer</div>
                <p className="text-ink-soft dark:text-slate-300 mt-1 transition-colors duration-200">
                  Builds premium-grade SaaS experiences with performance and trust at the core.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
