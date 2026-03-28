import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Clock, Twitter, X } from 'lucide-react'

const social = [
  { href: 'https://www.linkedin.com', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://twitter.com', label: 'Twitter', Icon: Twitter },
  { href: 'https://facebook.com', label: 'Facebook', Icon: Facebook },
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram }
]

export default function MobileInfoPanel({ open, onClose }) {
  return (
    <div
      className={`lg:hidden fixed inset-0 z-[60] bg-black/30 transition-opacity duration-500 ${
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute inset-y-0 right-0 w-3/4 max-w-xs p-8 transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] 
          bg-white/40 dark:bg-slate-900/40 
          backdrop-blur-2xl backdrop-saturate-150
          border-l border-white/20 dark:border-slate-800/50 shadow-2xl ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button with iOS style hover/active circle */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close info panel"
          className="mb-8 p-2 -ml-2 rounded-full text-slate-500 dark:text-slate-400 active:bg-slate-200/50 dark:active:bg-slate-800/50 transition-all"
        >
          <X size={24} strokeWidth={1.5} />
        </button>

        <div className="space-y-6">
          {/* Header Label - subtle iOS detail */}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
            Connect With Us
          </p>

          <div className="flex items-center gap-5">
            {social.map(({ href, label, Icon }) => (
              <a 
                key={label} 
                href={href} 
                aria-label={label} 
                className="text-slate-700 dark:text-slate-200 active:scale-90 transition-transform"
              >
                <Icon size={20} strokeWidth={2} />
              </a>
            ))}
          </div>

          <hr className="border-slate-200/50 dark:border-slate-800/50" />

          <div className="space-y-5 text-[15px] font-medium text-slate-800 dark:text-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Phone size={18} />
              </div>
              <span>+91-90000 00000</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Mail size={18} />
              </div>
              <span className="truncate">support@finfirm.in</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <MapPin size={18} />
              </div>
              <span>Kolkata, India</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Clock size={18} />
              </div>
              <span className="text-sm">Mon-Sat 10:00-19:00 IST</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}