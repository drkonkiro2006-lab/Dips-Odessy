import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

// Assets Imports
import itrBg from "../../assets/images/services/itr.png";
import gstRegBg from "../../assets/images/services/gst-registration.png";
import gstReturnBg from "../../assets/images/services/gst-returns.png";
import taxPlanningBg from "../../assets/images/services/tax-planning.png";

const serviceList = [
  {
    slug: "Tax-Calculation",
    title: "Income Tax Calculator",
    bg: itrBg,
    desc: "Easily estimate your tax liability with our free, user-friendly tool.",
    price: "Free",
    tag: "Tool",
  },
  {
    slug: "itr-filing",
    title: "ITR Filing",
    desc: "Accurate, compliant ITR filing with expert guidance.",
    price: "₹1,499",
    bg: itrBg,
    tag: "Popular",
  },
  {
    slug: "gst-registration",
    title: "GST Registration",
    desc: "Fast, error-free GST registration with documentation.",
    price: "₹2,999",
    bg: gstRegBg,
    tag: "Business",
  },
  {
    slug: "gst-returns",
    title: "GST Returns",
    desc: "Monthly/quarterly GST returns filing and reconciliation.",
    price: "₹1,999",
    bg: gstReturnBg,
    tag: "Compliance",
  },
  {
    slug: "tax-planning",
    title: "Tax Planning",
    desc: "Optimize taxes with proactive advisory and strategy.",
    price: "₹4,999",
    bg: taxPlanningBg,
    tag: "Strategy",
  },
  {
    slug: "accounting-compliance",
    title: "Accounting",
    bg: taxPlanningBg,
    desc: "Stay audit-ready with comprehensive bookkeeping.",
    price: "₹3,999",
    tag: "Audit",
  },
];

export default function ServiceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayDelay = 5000;

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % serviceList.length);
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const changeSlide = (newIndex) => {
    setActiveIndex((newIndex + serviceList.length) % serviceList.length);
  };

  return (
    <section className="w-full py-0 bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4[0]"
          >
            <span className="p-1.5 rounded-lg bg-blue-600/10 dark:bg-amber-500/10 text-blue-600 dark:text-amber-500">
              <Sparkles size={16} />
            </span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-blue-600 dark:text-amber-500">
              Premium Solutions
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-amber-200 dark:to-amber-500">
              Core Expertise
            </span>
          </h2>
        </div>

        <Link
          to="/services"
          className="group flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold hover:text-blue-600 dark:hover:text-amber-500 transition-colors"
        >
          View all Services
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      <div
        className="relative h-[500px] flex items-center justify-center perspective-[1500px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
          {serviceList.map((service, index) => (
            <Card
              key={service.slug}
              service={service}
              index={index}
              activeIndex={activeIndex}
              totalCards={serviceList.length}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 mt-12">
        <div className="flex items-center gap-6">
          <button
            onClick={() => changeSlide(activeIndex - 1)}
            className="p-4 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-blue-600 dark:hover:bg-amber-500 hover:text-white dark:hover:text-black transition-all shadow-xl shadow-slate-200/50 dark:shadow-none"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex gap-3">
            {serviceList.map((_, index) => (
              <button
                key={index}
                onClick={() => changeSlide(index)}
                className={`transition-all duration-500 rounded-full ${
                  activeIndex === index
                    ? "w-10 bg-blue-600 dark:bg-amber-500 h-2"
                    : "w-2 bg-slate-300 dark:bg-slate-800 h-2 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => changeSlide(activeIndex + 1)}
            className="p-4 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-blue-600 dark:hover:bg-amber-500 hover:text-white dark:hover:text-black transition-all shadow-xl shadow-slate-200/50 dark:shadow-none"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Card({ service, index, activeIndex, totalCards }) {
  let offset = index - activeIndex;
  if (offset > totalCards / 2) offset -= totalCards;
  if (offset < -totalCards / 2) offset += totalCards;

  const isActive = offset === 0;
  const isSide = Math.abs(offset) === 1;
  const isVisible = Math.abs(offset) <= 2;

  return (
    <motion.div
      className="absolute w-[320px] md:w-[420px] h-[450px]"
      animate={{
        x: `${offset * 90}%`,
        scale: isActive ? 1 : 0.8,
        zIndex: 10 - Math.abs(offset),
        opacity: isVisible ? 1 : 0,
        rotateY: offset * 25,
        filter: isActive ? "blur(0px)" : "blur(2px)",
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="group relative w-full h-full rounded-[2.5rem] p-3 bg-white dark:bg-white/5 border border-white/50 dark:border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
          <img
            src={service.bg}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute top-6 left-6">
            <span className="px-3 py-0 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-black uppercase tracking-widest text-white">
              {service.tag}
            </span>
          </div>

          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <AnimatePresence mode="wait">
              {(isActive || isSide) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isActive ? 1 : 0.6,
                    y: 0,
                  }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3
                    className={`text-3xl font-black mb-2 leading-tight transition-all duration-300 ${
                      isActive ? "text-white" : "text-white/70"
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`text-sm line-clamp-2 mb-6 font-medium leading-relaxed transition-all duration-300 ${
                      isActive ? "text-slate-300" : "text-slate-400"
                    }`}
                  >
                    {service.desc}
                  </p>

                  <div
                    className={`flex items-center justify-between border-t pt-6 transition-all duration-300 ${
                      isActive
                        ? "border-white/10 opacity-100"
                        : "border-white/5 opacity-60"
                    }`}
                  >
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">
                        Starting from
                      </p>
                      <span
                        className={`text-2xl font-black ${
                          isActive
                            ? "text-white dark:text-amber-400"
                            : "text-white/70"
                        }`}
                      >
                        {service.price}
                      </span>
                    </div>

                    {isActive && (
                      <div className="flex gap-2">
                        <Link
                          to={`/services/${service.slug}`}
                          className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white"
                        >
                          <ArrowRight size={20} />
                        </Link>
                        <Link
                          to="/contact"
                          className="px-6 py-3 rounded-xl bg-blue-600 dark:bg-amber-500 text-white dark:text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                        >
                          Start
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
