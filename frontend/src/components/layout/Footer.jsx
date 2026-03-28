import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'
import logo from '../../../src/assets/images/mybrand.png'

export default function Footer() {
  return (
    <footer className="mt-10 bg-slate-900 text-white">
      <div className="container py-14 grid gap-12 md:grid-cols-4 items-start">

        {/* Left Big Logo Section */}
        <div className="flex flex-col items-start">
          <img
            src={logo}
            alt="Brand Logo"
            className="h-24 md:h-32 w-auto object-contain mb-6"
          />

          <p className="text-white/70 max-w-xs">
            Trusted professionals for ITR, GST, advisory, and compliance with enterprise-grade standards.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <a href="https://www.linkedin.com" className="text-white/60 hover:text-white transition">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" className="text-white/60 hover:text-white transition">
              <Twitter size={20} />
            </a>
            <a href="https://facebook.com" className="text-white/60 hover:text-white transition">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com" className="text-white/60 hover:text-white transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="font-semibold text-lg">Services</div>
          <ul className="mt-4 space-y-2 text-white/70">
            <li><a href="/services/itr-filing" className="hover:text-white transition">ITR Filing</a></li>
            <li><a href="/services/gst-registration" className="hover:text-white transition">GST Registration</a></li>
            <li><a href="/services/gst-returns" className="hover:text-white transition">GST Returns</a></li>
            <li><a href="/services/accounting-compliance" className="hover:text-white transition">Accounting & Compliance</a></li>
            <li><a href="/services/tax-planning" className="hover:text-white transition">Tax Planning & Advisory</a></li>
            <li><a href="/services/business-consulting" className="hover:text-white transition">Business & Financial Consulting</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <div className="font-semibold text-lg">Quick Links</div>
          <ul className="mt-4 space-y-2 text-white/70">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/gallery" className="hover:text-white transition">Gallery</a></li>
            <li><a href="/insights" className="hover:text-white transition">Insights</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            <li><a href="/login" className="hover:text-white transition">Login</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="font-semibold text-lg">Legal & Contact</div>
          <ul className="mt-4 space-y-2 text-white/70">
            <li>Kolkata, West Bengal, India</li>
            <li>+91-90000 00000</li>
            <li>support@finfirm.in</li>
            <li>Mon–Sat: 10:00–19:00 IST</li>
            <li>
              <a href="#" className="hover:text-white transition">Terms</a> •{" "}
              <a href="#" className="hover:text-white transition">Privacy</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6 text-sm text-white/60">
          © {new Date().getFullYear()} Finance & Tax Services. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
