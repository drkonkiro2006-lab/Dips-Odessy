
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { FileText, ArrowUpRight, ShieldCheck, Clock } from 'lucide-react';

const stats = [
  { label: "Returns Filed", value: 829, suffix: "+", icon: FileText, delay: 0.1, desc: "Successfully processed tax filings for HNI clients." },
  { label: "Managed", value: 15, prefix: "₹", suffix: "cr+", icon: ArrowUpRight, delay: 0.2, desc: "Total assets under management in 2024-25." },
  { label: "Accuracy", value: 99.8, suffix: "%", icon: ShieldCheck, delay: 0.3, desc: "Precision rate in high-stakes financial auditing." },
  { label: "Experience", value: 5, suffix: "Yrs+", icon: Clock, delay: 0.4, desc: "Dedicated expertise in Indian tax compliance." },
];

const bengaliFirstNames = [
  "Arjun", "Sohini", "Pritam", "Ananya", "Rahul", "Ishita", "Ayan", "Moumita",
  "Sourav", "Tiyasha", "Deepak", "Riya", "Subho", "Payel", "Joy", "Sneha",
  "Abhi", "Pooja", "Vikram", "Tanwi", "Amit", "Bishal", "Kavita", "Sagar",
  "Dipa", "Kunal", "Tania", "Rohan", "Sathi", "Niloy"
];

function AnimatedNumber({ value, precision = 0 }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 80 });
  const isInView = useInView(ref, { once: true });
  useEffect(() => { if (isInView) motionValue.set(value); }, [isInView, value, motionValue]);
  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = latest.toFixed(precision).toLocaleString();
    });
  }, [springValue, precision]);
  return <span ref={ref}>0</span>;
}

function NetworkVisualization() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const dimensions = useMemo(() => {
    if (size.width === 0) return null;
    return {
      // Adjusted radii to keep 30 nodes within the smaller height
      rings: [
        { rx: size.width * 0.45, ry: size.height * 0.35, count: 18 }, 
        { rx: size.width * 0.25, ry: size.height * 0.20, count: 12 }
      ],
      avatarSize: 28,
      centerX: size.width / 2,
      centerY: size.height / 2
    };
  }, [size]);

  useEffect(() => {
    const updateSize = () => {
      const parent = document.getElementById('network-outer-wrapper');
      if (parent) setSize({ width: parent.offsetWidth, height: parent.offsetHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const avatars = useMemo(() => {
    if (!dimensions) return [];
    let list = [];
    let nameIdx = 0;
    dimensions.rings.forEach((ring, ringIdx) => {
      for (let i = 0; i < ring.count; i++) {
        const angle = (i / ring.count) * 2 * Math.PI + (ringIdx * 0.5);
        list.push({
          id: `node-${ringIdx}-${i}`,
          name: bengaliFirstNames[nameIdx % bengaliFirstNames.length],
          image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nameIdx + 10}&backgroundColor=b6e3f4,c0aede`,
          cx: dimensions.centerX + ring.rx * Math.cos(angle),
          cy: dimensions.centerY + ring.ry * Math.sin(angle)
        });
        nameIdx++;
      }
    });
    return list;
  }, [dimensions]);

  const allPositions = useMemo(() => {
    if (!dimensions) return {};
    const pos = { center: { cx: dimensions.centerX, cy: dimensions.centerY } };
    avatars.forEach(a => { pos[a.id] = { cx: a.cx, cy: a.cy }; });
    return pos;
  }, [dimensions, avatars]);

  const [activeConnections, setActiveConnections] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const ids = [...avatars.map(a => a.id), 'center'];
      if (ids.length < 2) return;
      const pairs = Array.from({ length: 10 }, () => ({
        from: ids[Math.floor(Math.random() * ids.length)],
        to: ids[Math.floor(Math.random() * ids.length)]
      })).filter(p => p.from !== p.to);
      setActiveConnections(pairs);
    }, 1200);
    return () => clearInterval(interval);
  }, [avatars]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <svg className="absolute inset-0 w-full h-full z-10">
        <AnimatePresence>
          {activeConnections.map((conn, idx) => {
            const from = allPositions[conn.from], to = allPositions[conn.to];
            return from && to && (
              <motion.line key={`${conn.from}-${conn.to}-${idx}`} x1={from.cx} y1={from.cy} x2={to.cx} y2={to.cy} 
                className="stroke-blue-500/30 dark:stroke-yellow-400/30" strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ opacity: 0 }}
              />
            );
          })}
        </AnimatePresence>
      </svg>
      {dimensions && avatars.map(avatar => (
        <div key={avatar.id} className="absolute flex flex-col items-center" 
             style={{ left: avatar.cx, top: avatar.cy, transform: 'translate(-50%, -50%)' }}>
          <div className="rounded-full border border-blue-200 dark:border-white/10 overflow-hidden bg-white dark:bg-slate-800 shadow-sm" 
               style={{ width: dimensions.avatarSize, height: dimensions.avatarSize }}>
            <img src={avatar.image} className="w-full h-full object-cover" alt=""/>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PremiumStats() {
  return (
    <section className="w-full bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Wrapper: Back to original compact height */}
        <div id="network-outer-wrapper" 
             className="relative flex items-center justify-center min-h-[320px] md:min-h-[280px] w-full border-2 border-blue-500/20 dark:border-yellow-500/30 rounded-[2.5rem] overflow-hidden p-6 shadow-2xl">
          
          {/* Background Layer: Sharp, densely populated network */}
          <div className="absolute inset-0 z-0 bg-white dark:bg-[#020617]">
             <div className="absolute inset-0" 
                  style={{ background: 'linear-gradient(135deg, rgba(136, 174, 225, 0.05) 0%, rgba(255, 253, 236, 0.1) 100%)' }} />
             <NetworkVisualization />
          </div>

          {/* Foreground Layer: Your Glass Card configuration */}
          <div className="relative z-30 w-full max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
                  className="bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl[1px] border-white/20 dark:border-slate-600/30 shadow-xl rounded-2xl p-6 flex flex-col justify-between h-full transition-all duration-300 hover:bg-white/20 dark:hover:bg-slate-900/30 hover:shadow-2xl"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-100/35 dark:bg-yellow-500/10 shrink-0">
                      <stat.icon className="w-5 h-5 text-blue-600 dark:text-yellow-500" />
                    </div>
                    <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-none flex items-baseline whitespace-nowrap">
                      {stat.prefix && <span className="text-xl align-top mr-0.5">{stat.prefix}</span>}
                      <AnimatedNumber value={stat.value} precision={stat.value % 1 === 0 ? 0 : 1} />
                      <span className="text-xl align-top ml-0.5">{stat.suffix}</span>
                    </div>
                  </div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-slate-100 mb-2">
                    {stat.label}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-[18rem]">
                    {stat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
