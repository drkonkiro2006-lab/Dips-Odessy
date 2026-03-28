import { useEffect, useState } from 'react';
import DesktopNav from './DesktopNav.jsx';
import MobileTopBar from './MobileTopBar.jsx';
import MobileMenu from './MobileMenu.jsx';
import MobileInfoPanel from './MobileInfoPanel.jsx';
import { Linkedin, Twitter, Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import logo from "../../../src/assets/images/DipsOdyssey-Logo-Final.png";
import Wblogo from "../../../src/assets/images/images-removebg-preview.png";
export default function Layout({ children }) {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger "stuck" mode slightly earlier for smoother transition
      setStuck(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col transition-colors duration-300">
      {/* Mobile Nav Components */}
      <MobileTopBar onMenu={() => setMenuOpen(true)} onInfo={() => setInfoOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <MobileInfoPanel open={infoOpen} onClose={() => setInfoOpen(false)} />

      {/* Desktop Navigation */}
      <DesktopNav stuck={stuck} />

      {/* Main Content Area: Padding top matches the total header height (40px info + ~80px nav) */}
      <main className="flex-1 w-full pt-20 lg:pt-[120px]">
        {children}
      </main>

      {/* Professional Footer */}
      <footer className="bg-slate-50 dark:bg-[#020617] border-t border-slate-200 dark:border-white/5 pt-20 pb-10">
        <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <img src={logo} alt="Brand" className="h-16 w-auto" />
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Premium financial services providing tax compliance, audit readiness, and strategic growth consulting for enterprises and individuals.
            </p>
            <div className="flex gap-3">
              <SocialBtn Icon={Linkedin} />
              <SocialBtn Icon={Twitter} />
              <SocialBtn Icon={Instagram} />
            </div>
          </div>

          <FooterLinkGroup title="Services" links={['ITR Filing', 'GST Returns', 'Tax Planning', 'Business Consulting']} />
          <FooterLinkGroup title="Company" links={['About Us', 'Our Gallery', 'Insights', 'Contact Support']} />

          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest dark:text-white">Office</h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-2"><MapPin size={16} /> Kolkata, West Bengal</li>
              <li className="flex items-center gap-2"><Phone size={16} /> +91 90000 00000</li>
              <li className="flex items-center gap-2"><Mail size={16} /> support@finfirm.in</li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-8 mt-20 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <p>© {new Date().getFullYear()} Finance & Tax Services</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}

      {/* Floating WhatsApp - Premium Version */}
<a 
  href="https://wa.me/918918593565" 
  target="_blank" 
  rel="noopener noreferrer"
  className="group fixed bottom-8 right-8 z-[90] flex items-center justify-center w-16 h-16 
             rounded-full transition-all duration-500 ease-out
             bg-white/80 dark:bg-slate-900/80 backdrop-blur-md
             border border-white/20 dark:border-white/10
             hover:-translate-y-3 hover:scale-110
             /* Multi-layered Premium Shadow */
             shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]
             dark:shadow-[0_20px_30px_-10px_rgba(0,0,0,0.5)]
             hover:shadow-[0_20px_40px_-10px_rgba(37,211,102,0.4)]"
>
  {/* Inner Pulse Animation */}
  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/30 opacity-75 duration-[2000ms]"></span>
  
  {/* Glass Reflection Overlay */}
  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

  {/* Logo */}
  <img 
    src={Wblogo} 
    alt="WhatsApp" 
    className="w-8 h-8 z-10 drop-shadow-md group-hover:rotate-[12deg] transition-transform duration-300"
  />
</a>
    </div>
  );
}

function SocialBtn({ Icon }) {
  return (
    <a href="#" className="w-10 h-10 rounded-full bg-slate-200/50 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-amber-500 dark:hover:text-black transition-all">
      <Icon size={18} />
    </a>
  );
}

function FooterLinkGroup({ title, links }) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-black uppercase tracking-widest dark:text-white">{title}</h4>
      <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
        {links.map(link => (
          <li key={link}><a href="#" className="hover:text-blue-600 dark:hover:text-amber-500 transition-colors">{link}</a></li>
        ))}
      </ul>
    </div>
  );
}
