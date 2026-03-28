// import { useEffect, useState, useMemo } from 'react'
// import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
// import { 
//   FileText, Maximize2, ArrowRight, Layers, Layout, Grid, 
//   X, ChevronLeft, ChevronRight, Monitor, Smartphone, Compass 
// } from 'lucide-react'

// export default function UltimateGallery() {
//   const [galleryData, setGalleryData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeHero, setActiveHero] = useState(0);
//   const [selectedImg, setSelectedImg] = useState(null);

//   // Scroll Progress
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

//   useEffect(() => {
//     // Replace with your Google Script URL
//     fetch('https://script.google.com/macros/s/AKfycbwXi55Bpz8XaxuP9AqMm_JnIosmrP9WrsAxSCjwDyEA6OnEzw2R0676b0YfuC9CkL_Q/exec')
//       .then(res => res.json())
//       .then(data => {
//         setGalleryData(data);
//         setLoading(false);
//       })
//       .catch(err => console.error("Drive Fetch Error:", err));
//   }, []);

//   const allImages = useMemo(() => {
//     return galleryData.flatMap(folder => folder.images.map(img => img.url));
//   }, [galleryData]);

//   useEffect(() => {
//     if (allImages.length === 0) return;
//     const id = setInterval(() => setActiveHero(i => (i + 1) % allImages.length), 5000);
//     return () => clearInterval(id);
//   }, [allImages]);

//   if (loading) return (
//     <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
//       <div className="flex flex-col items-center gap-4">
//         <motion.div 
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//           className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full"
//         />
//         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Experience</span>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-700 font-sans pb-20 overflow-x-hidden">
      
//       {/* 1. LIGHTBOX COMPONENT */}
//       <AnimatePresence>
//         {selectedImg && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-white/80 dark:bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
//             onClick={() => setSelectedImg(null)}
//           >
//             <motion.button 
//               className="absolute top-8 right-8 p-3 rounded-full bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white"
//               whileHover={{ scale: 1.1 }}
//             >
//               <X size={24} />
//             </motion.button>
//             <motion.img 
//               layoutId={selectedImg}
//               src={selectedImg}
//               className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-indigo-600 origin-left z-[100]" style={{ scaleX }} />

//       {/* 2. HERO SECTION */}
//       <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
//         <AnimatePresence mode="wait">
//           <motion.img
//             key={allImages[activeHero]}
//             src={allImages[activeHero]}
//             initial={{ opacity: 0, filter: 'blur(30px) scale(1.15)' }}
//             animate={{ opacity: 1, filter: 'blur(0px) scale(1)' }}
//             exit={{ opacity: 0, filter: 'blur(30px)' }}
//             transition={{ duration: 1.8 }}
//             className="absolute inset-0 w-full h-full object-cover brightness-[0.7] dark:brightness-[0.5]"
//           />
//         </AnimatePresence>
        
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-[#020617]" />
        
//         <div className="relative z-10 text-center px-6">
//           <motion.h1 
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             className="text-8xl md:text-[12rem] font-black text-white leading-none tracking-tighter mix-blend-overlay italic"
//           >
//             VISUALS
//           </motion.h1>
//           <p className="mt-4 text-white font-black uppercase tracking-[0.5em] text-xs opacity-60">High-Fidelity Portfolio</p>
//         </div>

//         <div className="absolute bottom-20 flex gap-2 px-6 py-3 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-3xl border border-white/20">
//           {allImages.slice(0, 10).map((_, i) => (
//             <div key={i} className={`h-1 transition-all duration-700 rounded-full ${i === activeHero % 10 ? 'w-12 bg-indigo-500' : 'w-2 bg-white/20'}`} />
//           ))}
//         </div>
//       </section>

//       {/* 3. DYNAMIC FOLDER ENGINE */}
//       <main className="max-w-7xl mx-auto px-6 space-y-40 -mt-10 relative z-20">
//         {galleryData.map((folder, index) => {
//           const layoutType = index % 5; // Cycles through 5 different looks

//           return (
//             <section key={index} className="w-full">
//               {/* Folder Title UI */}
//               <div className="flex items-baseline justify-between mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
//                 <div className="flex items-center gap-4">
//                     <span className="text-4xl font-black text-indigo-600/30">0{index + 1}</span>
//                     <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
//                         {folder.title}
//                     </h2>
//                 </div>
//                 <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-black uppercase text-slate-500">
//                     <Compass size={12} /> {folder.images.length} Assets
//                 </div>
//               </div>

//               {/* Layout Router */}
//               <div className="w-full">
//                 {/* LOOK 1: THE BENTO BOX (Modern Apple Style) */}
//                 {layoutType === 0 && (
//                   <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
//                     {folder.images.map((img, i) => (
//                       <ImageBox 
//                         key={img.id} img={img} 
//                         onClick={() => setSelectedImg(img.url)}
//                         className={i === 0 ? "md:col-span-8 md:row-span-2" : i === 3 ? "md:col-span-8" : "md:col-span-4"}
//                       />
//                     ))}
//                     {folder.pdfs.map(pdf => <PDFCard key={pdf.id} pdf={pdf} />)}
//                   </div>
//                 )}

//                 {/* LOOK 2: THE OFFSET MASONRY */}
//                 {layoutType === 1 && (
//                   <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
//                     {folder.images.map((img) => (
//                       <ImageBox key={img.id} img={img} onClick={() => setSelectedImg(img.url)} isMasonry />
//                     ))}
//                     {folder.pdfs.map(pdf => <PDFCard key={pdf.id} pdf={pdf} />)}
//                   </div>
//                 )}

//                 {/* LOOK 3: CINEMATIC FILMSTRIP */}
//                 {layoutType === 2 && (
//                   <div className="flex gap-8 overflow-x-auto pb-10 scrollbar-hide snap-x px-4">
//                     {folder.images.map((img) => (
//                       <div key={img.id} className="min-w-[80vw] md:min-w-[700px] h-[500px] snap-center">
//                         <ImageBox img={img} onClick={() => setSelectedImg(img.url)} className="h-full" />
//                       </div>
//                     ))}
//                     {folder.pdfs.map(pdf => <div key={pdf.id} className="min-w-[400px] h-[500px]"><PDFCard pdf={pdf} /></div>)}
//                   </div>
//                 )}

//                 {/* LOOK 4: THE TRIAD GRID */}
//                 {layoutType === 3 && (
//                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//                     {folder.images.map((img) => (
//                       <ImageBox key={img.id} img={img} onClick={() => setSelectedImg(img.url)} className="aspect-[3/4]" />
//                     ))}
//                     {folder.pdfs.map(pdf => <PDFCard key={pdf.id} pdf={pdf} />)}
//                   </div>
//                 )}

//                 {/* LOOK 5: THE SHOWCASE (1 large, 4 small) */}
//                 {layoutType === 4 && (
//                   <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                     <div className="md:col-span-4 aspect-video">
//                         {folder.images[0] && <ImageBox img={folder.images[0]} onClick={() => setSelectedImg(folder.images[0].url)} className="h-full" />}
//                     </div>
//                     {folder.images.slice(1).map(img => (
//                         <ImageBox key={img.id} img={img} onClick={() => setSelectedImg(img.url)} className="aspect-square" />
//                     ))}
//                     {folder.pdfs.map(pdf => <PDFCard key={pdf.id} pdf={pdf} />)}
//                   </div>
//                 )}
//               </div>
//             </section>
//           )
//         })}
//       </main>

//       <footer className="py-32 text-center border-t border-slate-200 dark:border-slate-900 mt-20">
//         <p className="text-[10px] font-black uppercase tracking-[1em] text-slate-400">FINFIRM VISUALS ARCHIVE</p>
//       </footer>
//     </div>
//   )
// }

// // ---------------- SUB-COMPONENTS ----------------

// function ImageBox({ img, onClick, className = "", isMasonry = false }) {
//   return (
//     <motion.div
//       // --- BLUR FADE LOGIC START ---
//       initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
//       whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//       exit={{ opacity: 0, y: 20, filter: "blur(10px)" }}
//       transition={{ 
//         duration: 0.8, 
//         ease: [0.21, 0.47, 0.32, 0.98] 
//       }}
//       viewport={{ once: false, amount: 0.15 }} // "once: false" allows to-and-fro animation
//       // --- BLUR FADE LOGIC END ---
//       whileHover={{ y: -10, scale: 0.99 }}
//       onClick={onClick}
//       className={`relative group rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl cursor-pointer ${className}`}
//     >
//       <img 
//         src={img.url} 
//         alt={img.name} 
//         className={`w-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isMasonry ? 'h-auto' : 'h-full'}`} 
//       />
//       <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center">
//         <div className="p-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-full text-white scale-50 group-hover:scale-100 transition-transform duration-500">
//             <Maximize2 size={24} />
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// function PDFCard({ pdf }) {
//   return (
//     <motion.div 
//       // --- BLUR FADE LOGIC START ---
//       initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
//       whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//       exit={{ opacity: 0, y: 20, filter: "blur(10px)" }}
//       transition={{ 
//         duration: 0.8, 
//         ease: [0.21, 0.47, 0.32, 0.98] 
//       }}
//       viewport={{ once: false, amount: 0.15 }}
//       // --- BLUR FADE LOGIC END ---
//       whileHover={{ scale: 0.98 }}
//       className="flex flex-col items-center justify-center p-10 bg-white/40 dark:bg-white/5 backdrop-blur-3xl border border-white dark:border-white/10 rounded-[3rem] shadow-xl text-center h-full min-h-[300px]"
//     >
//       <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-500/40 mb-8">
//         <FileText className="text-white" size={36} />
//       </div>
//       <h4 className="text-slate-900 dark:text-white font-black text-xs mb-8 uppercase tracking-widest px-4 line-clamp-2">{pdf.name}</h4>
//       <a 
//         href={pdf.url} 
//         target="_blank" 
//         rel="noreferrer"
//         className="flex items-center gap-3 px-8 py-4 bg-slate-950 dark:bg-white text-white dark:text-slate-900 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all group shadow-lg"
//       >
//         Open PDF <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//       </a>
//     </motion.div>
//   )
// }

























import { useEffect, useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { 
  FileText, Maximize2, ArrowRight, Layers, Layout, Grid, 
  X, ChevronLeft, ChevronRight, Monitor, Smartphone, Compass 
} from 'lucide-react'

export default function UltimateGallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeHero, setActiveHero] = useState(0);
  const [selectedImg, setSelectedImg] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbwXi55Bpz8XaxuP9AqMm_JnIosmrP9WrsAxSCjwDyEA6OnEzw2R0676b0YfuC9CkL_Q/exec')
      .then(res => res.json())
      .then(data => {
        setGalleryData(data);
        setLoading(false);
      })
      .catch(err => console.error("Drive Fetch Error:", err));
  }, []);

  const allImages = useMemo(() => {
    return galleryData.flatMap(folder => folder.images.map(img => img.url));
  }, [galleryData]);

  // Handle Manual Navigation
  const navigateHero = useCallback((direction) => {
    setUserInteracted(true);
    if (direction === 'next') {
      setActiveHero((prev) => (prev + 1) % allImages.length);
    } else {
      setActiveHero((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  }, [allImages.length]);

  // Smart Auto-play Logic
  useEffect(() => {
    if (allImages.length === 0) return;

    let interval;
    let timeout;

    if (!userInteracted) {
      interval = setInterval(() => {
        setActiveHero(i => (i + 1) % allImages.length);
      }, 5000);
    } else {
      // Resume auto-play after 10 seconds of no interaction
      timeout = setTimeout(() => {
        setUserInteracted(false);
      }, 10000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [allImages.length, userInteracted]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full"
        />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Experience</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-700 font-sans pb-20 overflow-x-hidden">
      
      {/* 1. LIGHTBOX COMPONENT */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/80 dark:bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImg(null)}
          >
            <motion.button 
              className="absolute top-8 right-8 p-3 rounded-full bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white"
              whileHover={{ scale: 1.1 }}
            >
              <X size={24} />
            </motion.button>
            <motion.img 
              layoutId={selectedImg}
              src={selectedImg}
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-indigo-600 origin-left z-[100]" style={{ scaleX }} />

      {/* 2. HERO SECTION */}
      <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={allImages[activeHero]}
            src={allImages[activeHero]}
            initial={{ opacity: 0, filter: 'blur(30px) scale(1.15)' }}
            animate={{ opacity: 1, filter: 'blur(0px) scale(1)' }}
            exit={{ opacity: 0, filter: 'blur(30px)' }}
            transition={{ duration: 1.8 }}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.7] dark:brightness-[0.5]"
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-[#020617]" />
        
        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10 z-30 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateHero('prev')}
            className="p-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 pointer-events-auto transition-colors"
          >
            <ChevronLeft size={32} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateHero('next')}
            className="p-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 pointer-events-auto transition-colors"
          >
            <ChevronRight size={32} />
          </motion.button>
        </div>

        {/* <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-8xl md:text-[12rem] font-black text-white leading-none tracking-tighter mix-blend-overlay italic"
          >
            VISUALS
          </motion.h1>
          <p className="mt-4 text-white font-black uppercase tracking-[0.5em] text-xs opacity-60">
            {userInteracted ? "Manual Control Active" : "High-Fidelity Portfolio"}
          </p>
        </div> */}

        <div className="absolute bottom-20 flex gap-2 px-6 py-3 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-3xl border border-white/20">
          {allImages.slice(0, 10).map((_, i) => (
            <div key={i} className={`h-1 transition-all duration-700 rounded-full ${i === activeHero % 10 ? 'w-12 bg-indigo-500' : 'w-2 bg-white/20'}`} />
          ))}
        </div>
      </section>

      {/* 3. DYNAMIC FOLDER ENGINE */}
      <main className="max-w-7xl mx-auto px-6 space-y-40 mt-20 relative z-20">
        {galleryData.map((folder, index) => {
          const layoutType = index % 5; 

          return (
            <section key={index} className="w-full">
              <div className="flex items-baseline justify-between mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
                <div className="flex items-center gap-4">
                    <span className="text-4xl font-black text-indigo-600/30 dark:text-amber-500/20">0{index + 1}</span>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        {folder.title}
                    </h2>
                </div>
                <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-black uppercase text-slate-500">
                    <Compass size={12} /> {folder.images.length} Assets
                </div>
              </div>

              <div className="w-full">
                {layoutType === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
                    {folder.images.map((img, i) => (
                      <ImageBox 
                        key={img.id} img={img} 
                        onClick={() => setSelectedImg(img.url)}
                        className={i === 0 ? "md:col-span-8 md:row-span-2" : i === 3 ? "md:col-span-8" : "md:col-span-4"}
                      />
                    ))}
                    {folder.pdfs.map(pdf => <PDFCard key={pdf.id} pdf={pdf} />)}
                  </div>
                )}

                {layoutType === 1 && (
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {folder.images.map((img) => (
                      <ImageBox key={img.id} img={img} onClick={() => setSelectedImg(img.url)} isMasonry />
                    ))}
                    {folder.pdfs.map(pdf => <PDFCard key={pdf.id} pdf={pdf} />)}
                  </div>
                )}

                {layoutType === 2 && (
                  <div className="flex gap-8 overflow-x-auto pb-10 scrollbar-hide snap-x px-4">
                    {folder.images.map((img) => (
                      <div key={img.id} className="min-w-[80vw] md:min-w-[700px] h-[500px] snap-center">
                        <ImageBox img={img} onClick={() => setSelectedImg(img.url)} className="h-full" />
                      </div>
                    ))}
                    {folder.pdfs.map(pdf => <div key={pdf.id} className="min-w-[400px] h-[500px]"><PDFCard pdf={pdf} /></div>)}
                  </div>
                )}

                {layoutType === 3 && (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {folder.images.map((img) => (
                      <ImageBox key={img.id} img={img} onClick={() => setSelectedImg(img.url)} className="aspect-[3/4]" />
                    ))}
                    {folder.pdfs.map(pdf => <PDFCard key={pdf.id} pdf={pdf} />)}
                  </div>
                )}

                {layoutType === 4 && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-4 aspect-video">
                        {folder.images[0] && <ImageBox img={folder.images[0]} onClick={() => setSelectedImg(folder.images[0].url)} className="h-full" />}
                    </div>
                    {folder.images.slice(1).map(img => (
                        <ImageBox key={img.id} img={img} onClick={() => setSelectedImg(img.url)} className="aspect-square" />
                    ))}
                    {folder.pdfs.map(pdf => <PDFCard key={pdf.id} pdf={pdf} />)}
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </main>

      <footer className="py-32 text-center border-t border-slate-200 dark:border-slate-900 mt-20">
        <p className="text-[10px] font-black uppercase tracking-[1em] text-slate-400">FINFIRM VISUALS ARCHIVE</p>
      </footer>
    </div>
  )
}

// ---------------- SUB-COMPONENTS ----------------

function ImageBox({ img, onClick, className = "", isMasonry = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      viewport={{ once: false, amount: 0.15 }}
      whileHover={{ y: -10, scale: 0.99 }}
      onClick={onClick}
      className={`relative group rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl cursor-pointer ${className}`}
    >
      <img 
        src={img.url} 
        alt={img.name} 
        className={`w-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isMasonry ? 'h-auto' : 'h-full'}`} 
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center">
        <div className="p-4 bg-white/20 backdrop-blur-xl border border-white/40 rounded-full text-white scale-50 group-hover:scale-100 transition-transform duration-500">
            <Maximize2 size={24} />
        </div>
      </div>
    </motion.div>
  )
}

function PDFCard({ pdf }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      viewport={{ once: false, amount: 0.15 }}
      whileHover={{ scale: 0.98 }}
      className="flex flex-col items-center justify-center p-10 bg-white/40 dark:bg-white/5 backdrop-blur-3xl border border-white dark:border-white/10 rounded-[3rem] shadow-xl text-center h-full min-h-[300px]"
    >
      <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-500/40 mb-8">
        <FileText className="text-white" size={36} />
      </div>
      <h4 className="text-slate-900 dark:text-white font-black text-xs mb-8 uppercase tracking-widest px-4 line-clamp-2">{pdf.name}</h4>
      <a 
        href={pdf.url} 
        target="_blank" 
        rel="noreferrer"
        className="flex items-center gap-3 px-8 py-4 bg-slate-950 dark:bg-white text-white dark:text-slate-900 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all group shadow-lg"
      >
        Open PDF <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  )
}