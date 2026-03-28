// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { postContact } from '../services/api.js'
// import kolkata from '../assets/images/kolkata.jpg'
// import logoEmailPng from '../assets/images/download-removebg-preview.png'
// import logoLinkedinPng from '../assets/images/linkedin-logo.png'
// import logoGooglemapsPng from '../assets/images/Google_Maps_icon_(2020).svg.png'
// import logoWhatsappPng from '../assets/images/images-removebg-preview.png'

// const init = { name: '', email: '', phone: '', subject: '', message: '' }

// export default function Contact() {
//   const [form, setForm] = useState(init)
//   const [loading, setLoading] = useState(false)
//   const [result, setResult] = useState(null)

//   const onChange = e => {
//     const { name, value } = e.target
//     setForm(prev => ({ ...prev, [name]: value }))
//   }

//   const validate = () => {
//     const errs = {}
//     if (!form.name || form.name.length < 2) errs.name = 'Enter a valid name'
//     if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) errs.email = 'Enter a valid email'
//     if (!/^\+?\d{10,14}$/.test(form.phone)) errs.phone = 'Enter a valid phone'
//     if (!form.subject || form.subject.length < 3) errs.subject = 'Enter a valid subject'
//     if (!form.message || form.message.length < 10) errs.message = 'Message is too short'
//     return errs
//   }

//   const submit = async e => {
//     e.preventDefault()
//     const errs = validate()
//     if (Object.keys(errs).length) {
//       setResult({ ok: false, message: 'Fix errors and try again' })
//       return
//     }
//     setLoading(true)
//     setResult(null)
//     try {
//       const { data } = await postContact(form)
//       setResult({ ok: true, message: data.message || 'Submitted' })
//       setForm(init)
//     } catch (err) {
//       setResult({ ok: false, message: 'Submission failed' })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <>
//       <section className="w-full">
//         <div className="max-w-7xl mx-auto px-6 py-12">
//           <div className="grid md:grid-cols-2 gap-8">
//             <div>
//               <h1 className="text-3xl font-bold text-ink dark:text-white transition-colors duration-200">Contact</h1>
//               <p className="text-ink-soft dark:text-slate-300 mt-2 transition-colors duration-200">
//                 Kolkata, West Bengal, India • +91-90000 00000 • support@finfirm.in
//               </p>
//               <div className="mt-6 rounded-lg overflow-hidden border">
//                 <img
//                   src={kolkata}
//                   alt="Kolkata business district"
//                   className="w-full h-48 object-cover object-center"
//                 />
//               </div>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
//                 {/* Email */}
//                 <a 
//                   href="mailto:support@finfirm.in" 
//                   className="flex flex-col items-center gap-2 group" 
//                   aria-label="Email"
//                 >
//                   <div className="w-14 h-14 flex items-center justify-center">
//                     <img src={logoEmailPng} alt="Email" className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110" />
//                   </div>
//                   <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Email</span>
//                 </a>

//                 {/* LinkedIn */}
//                 <a 
//                   href="https://www.linkedin.com/company/finfirm" 
//                   target="_blank" 
//                   rel="noreferrer" 
//                   className="flex flex-col items-center gap-2 group" 
//                   aria-label="LinkedIn"
//                 >
//                   <div className="w-14 h-14 flex items-center justify-center">
//                     <img src={logoLinkedinPng} alt="LinkedIn" className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110" />
//                   </div>
//                   <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">LinkedIn</span>
//                 </a>

//                 {/* Visit Office */}
//                 <a 
//                   href="https://maps.google.com/?q=Kolkata,India" 
//                   target="_blank" 
//                   rel="noreferrer" 
//                   className="flex flex-col items-center gap-2 group" 
//                   aria-label="Visit Office"
//                 >
//                   <div className="w-14 h-14 flex items-center justify-center">
//                     <img src={logoGooglemapsPng} alt="Visit Office" className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110" />
//                   </div>
//                   <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Visit Office</span>
//                 </a>

//                 {/* WhatsApp */}
//                 <a 
//                   href="https://wa.me/919000000000" 
//                   target="_blank" 
//                   rel="noreferrer" 
//                   className="flex flex-col items-center gap-2 group" 
//                   aria-label="WhatsApp"
//                 >
//                   <div className="w-14 h-14 flex items-center justify-center">
//                     <img src={logoWhatsappPng} alt="WhatsApp" className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110" />
//                   </div>
//                   <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">WhatsApp</span>
//                 </a>
//               </div>
//             </div>
//             <motion.form
//               onSubmit={submit}
//               className="rounded-lg border bg-white dark:bg-slate-800 dark:border-slate-700 p-6 shadow-soft transition-colors duration-200"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm text-ink-soft">Name</label>
//                   <input
//                     name="name"
//                     value={form.name}
//                     onChange={onChange}
//                     className="mt-1 w-full rounded border px-3 py-2"
//                     placeholder="Your full name"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm text-ink-soft">Email</label>
//                   <input
//                     name="email"
//                     value={form.email}
//                     onChange={onChange}
//                     className="mt-1 w-full rounded border px-3 py-2"
//                     placeholder="name@email.com"
//                     type="email"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm text-ink-soft">Phone</label>
//                   <input
//                     name="phone"
//                     value={form.phone}
//                     onChange={onChange}
//                     className="mt-1 w-full rounded border px-3 py-2"
//                     placeholder="+91XXXXXXXXXX"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm text-ink-soft">Subject</label>
//                   <input
//                     name="subject"
//                     value={form.subject}
//                     onChange={onChange}
//                     className="mt-1 w-full rounded border px-3 py-2"
//                     placeholder="How can we help?"
//                     required
//                   />
//                 </div>
//                 <div className="col-span-2">
//                   <label className="block text-sm text-ink-soft">Message</label>
//                   <textarea
//                     name="message"
//                     value={form.message}
//                     onChange={onChange}
//                     className="mt-1 w-full rounded border px-3 py-2 h-32"
//                     placeholder="Share details"
//                     required
//                   />
//                 </div>
//               </div>
//               <button type="submit" className="btn-primary mt-6" disabled={loading}>
//                 {loading ? 'Sending...' : 'Submit'}
//               </button>
//               {result && (
//                 <div className={`mt-3 ${result.ok ? 'text-success' : 'text-danger'}`}>{result.message}</div>
//               )}
//             </motion.form>
//           </div>
//         </div>
//       </section>
//       <section className="w-full bg-slate-100 dark:bg-slate-900 transition-colors duration-200">
//         <div className="max-w-7xl mx-auto px-6 py-20">
//           <div className="w-full h-[420px] rounded-xl overflow-hidden shadow-lg">
//             <iframe
//               title="Office Location"
//               src="https://www.google.com/maps?q=Kolkata,India&output=embed"
//               className="w-full h-full border-0"
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//             />
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }


import { useState } from 'react'
import { motion } from 'framer-motion'
import { postContact } from '../services/api.js'
import { Mail, Linkedin, MapPin, MessageCircle, Phone, ArrowRight, Sparkles } from 'lucide-react'
import kolkata from '../assets/images/kolkata.jpg'
import logoEmailPng from '../assets/images/download-removebg-preview.png'
import logoLinkedinPng from '../assets/images/linkedin-logo.png'
import logoGooglemapsPng from '../assets/images/Google_Maps_icon_(2020).svg.png'
import logoWhatsappPng from '../assets/images/images-removebg-preview.png'

const init = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(init)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const onChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name || form.name.length < 2) errs.name = 'Enter a valid name'
    if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!/^\+?\d{10,14}$/.test(form.phone)) errs.phone = 'Enter a valid phone'
    if (!form.subject || form.subject.length < 3) errs.subject = 'Enter a valid subject'
    if (!form.message || form.message.length < 10) errs.message = 'Message is too short'
    return errs
  }

  const submit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setResult({ ok: false, message: 'Please refine the details above.' })
      return
    }
    setLoading(true)
    setResult(null)
    try {
      const { data } = await postContact(form)
      setResult({ ok: true, message: data.message || 'Message delivered successfully.' })
      setForm(init)
    } catch (err) {
      setResult({ ok: false, message: 'Connectivity issue. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const SocialCard = ({ href, icon, title, label, target = "_self" }) => (
    <motion.a 
      whileHover={{ y: -5 }}
      href={href} 
      target={target}
      rel={target === "_blank" ? "noreferrer" : ""}
      className="group flex flex-col items-center p-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-indigo-500/30 transition-all duration-300"
    >
      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 group-hover:bg-indigo-600 transition-colors duration-500">
        <img src={icon} alt={title} className="w-7 h-7 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-500" />
      </div>
      <span className="mt-4 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 dark:text-slate-500">{title}</span>
      <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{label}</span>
    </motion.a>
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-700 font-sans">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Context */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 mb-6"
                >
                  <Sparkles size={14} className="text-indigo-600 dark:text-indigo-400" />
                  <span className="text-[10px] font-black text-indigo-700 dark:text-indigo-400 uppercase tracking-widest">Connect with Experts</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl font-black text-slate-900 dark:text-white leading-[1.1]"
                >
                  Ready to scale <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 animate-gradient-x">together?</span>
                </motion.h1>

                {/* ADDED ADMIN BUTTON HERE */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/adminupload'}
                  className="mt-6 px-6 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Admin Login
                </motion.button>

                <p className="text-slate-500 dark:text-slate-400 mt-8 text-xl leading-relaxed font-medium">
                  Experience seamless financial consulting. Reach out today and let’s simplify your growth journey.
                </p>
              </div>

              {/* Visual Card */}
              <div className="relative rounded-[2.5rem] overflow-hidden group shadow-2xl border-4 border-white dark:border-slate-800">
                <img src={kolkata} alt="Kolkata HQ" className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8 text-white">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full w-fit">
                    <MapPin size={16} className="text-indigo-400" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Kolkata, India</span>
                  </div>
                  <p className="mt-4 text-slate-300 font-medium max-w-[200px]">Strategic Business Hub, West Bengal</p>
                </div>
              </div>

              {/* Action Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <SocialCard href="mailto:support@finfirm.in" icon={logoEmailPng} title="Email" label="Support" />
                <SocialCard href="https://linkedin.com/company/finfirm" icon={logoLinkedinPng} title="LinkedIn" label="Connect" target="_blank" />
                <SocialCard href="https://wa.me/919000000000" icon={logoWhatsappPng} title="WhatsApp" label="Chat" target="_blank" />
                <SocialCard href="http://googleusercontent.com/maps.google.com/4" icon={logoGooglemapsPng} title="Office" label="Visit" target="_blank" />
              </div>
            </div>

            {/* Right Column: Premium Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7"
            >
              <form
                onSubmit={submit}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Full Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium"
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Email Address</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      type="email"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Phone</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium"
                      placeholder="+91"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Subject</label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={onChange}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium"
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white h-40 focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none font-medium"
                    placeholder="Type your message here..."
                    required
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-slate-900 dark:hover:bg-indigo-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 transition-all transform active:scale-[0.98] disabled:opacity-70 shadow-2xl shadow-indigo-600/30"
                  >
                    {loading ? 'Processing...' : 'Send Message'}
                    {!loading && <ArrowRight size={18} />}
                  </button>
                </div>

                {result && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-2xl text-center text-sm font-bold border ${result.ok ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20' : 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-500/10 dark:border-rose-500/20'}`}
                  >
                    {result.message}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Map Section */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full h-[550px] rounded-[4rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
            <iframe
              title="Global Office"
              src="https://www.google.com/maps?q=bankura,India&output=embed"
              className="w-full h-full border-0 contrast-[1.1] grayscale hover:grayscale-0 transition-all duration-1000 dark:invert-[0.92] dark:hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  )
}