"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Facebook, Instagram, Phone, Mail, MapPin, Clock } from 'lucide-react';

const socialLinks = [
  { icon: Linkedin, href: "#", color: "hover:text-[#0077b5]", shadow: "hover:shadow-blue-500/50" },
  { icon: Twitter, href: "#", color: "hover:text-[#1DA1F2]", shadow: "hover:shadow-sky-400/50" },
  { icon: Facebook, href: "#", color: "hover:text-[#1877F2]", shadow: "hover:shadow-blue-700/50" },
  { icon: Instagram, href: "#", color: "hover:text-[#E4405F]", shadow: "hover:shadow-pink-500/50" },
];

export default function InfoStrip() {
  // Animation variants for floating text
  const floatingText = {
    animate: {
      y: [0, -2, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hidden lg:block w-full border-b overflow-hidden bg-gradient-to-r from-white via-blue-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative"
    >
      {/* Animated subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#80808033_1px,transparent_1px)] [background-size:20px_20px] bg-[size:24px_24px]"></div>

      <div className="max-w-[1440px] mx-auto h-10 flex items-center justify-between px-8 relative z-10">
        
        {/* Socials with Neon Hover */}
        <div className="flex items-center gap-6">
          {socialLinks.map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              whileHover={{ scale: 1.3, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className={`text-slate-400 transition-all duration-300 ${social.color} drop-shadow-sm`}
            >
              <social.icon size={18} strokeWidth={2.5} />
            </motion.a>
          ))}
        </div>

        {/* Dynamic Center Text with Gradient Animation */}
        <motion.div 
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="bg-gradient-to-r from-blue-600 via-purple-500 to-orange-500 bg-[length:200%_auto] bg-clip-text text-transparent font-extrabold text-sm uppercase tracking-[0.2em]"
        >
          ⚡ Professional Financial Solutions ⚡
        </motion.div>

        {/* Right Side: Animated Contacts & Emojis */}
        <div className="flex items-center gap-8 font-semibold text-xs text-slate-700 dark:text-slate-300">
          
          {/* Phone */}
          <motion.a 
            href="tel:+919000000000"
            className="flex items-center gap-2 hover:text-green-500 transition-colors group"
            variants={floatingText}
            animate="animate"
          >
            <span className="text-lg group-hover:animate-bounce">📞</span>
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">+91 90000 00000</span>
          </motion.a>

          {/* Email */}
          <motion.a 
            href="mailto:support@finfirm.in"
            className="flex items-center gap-2 hover:text-blue-500 transition-colors group"
            variants={floatingText}
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <span className="text-lg group-hover:skew-x-12">✉️</span>
            <span className="underline decoration-blue-500/30 underline-offset-4">support@finfirm.in</span>
          </motion.a>

          {/* Location */}
          <div className="flex items-center gap-2 group">
            <motion.span 
              animate={{ rotate: [0, 10, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-lg"
            >
              📍
            </motion.span>
            <span className="bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              Kolkata, West Bengal
            </span>
          </div>

          {/* Work Hours */}
          <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full border border-orange-200 dark:border-orange-800/50 shadow-inner">
            <motion.span 
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ repeat: Infinity, duration: 1.5 }}
               className="text-base"
            >
              ⏰
            </motion.span>
            <span className="text-orange-700 dark:text-orange-400 font-bold">10:00 — 19:00 IST</span>
          </div>

        </div>
      </div>
    </motion.div>
  );
}