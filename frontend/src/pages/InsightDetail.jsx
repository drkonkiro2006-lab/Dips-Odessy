import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, FileText, Share2, Maximize2, Download, Eye } from 'lucide-react';

const getDriveDirectLink = (id) => {
    if (!id) return '';
    // Optimized for high-res images/thumbnails
    return `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
};

export default function InsightDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbxImFk820iwFc8XFU4i8wsNGM-QczFIYP50ET12Kw5xsAhTWvwyGVZ0VJSb8Gjjh0Wklg/exec');
                const data = await response.json();
                const folder = data.find(f => f.folderName === id);

                if (!folder) throw new Error("Folder not found");

                const pdfFile = folder.pdfs && folder.pdfs.length > 0 ? folder.pdfs[0] : null;
                
                // FIX 1: Explicitly look for an actual image file for the thumbnail/hero
                // We prioritize files in folder.images over the PDF preview
                const thumbImg = folder.images.find(img => img.name.toLowerCase().includes('thumbnail')) || folder.images[0];
                
                const fileId = pdfFile?.url.match(/[-\w]{25,}/)?.[0];

                // FIX 2: Limit title to 50 characters
                let cleanTitle = folder.title.split('\n')[0];
                if (cleanTitle.length > 50) {
                    cleanTitle = cleanTitle.substring(0, 47) + "...";
                }

                setContent({
                    title: cleanTitle,
                    paragraphs: folder.title.split('\n').filter(p => p.trim() !== '').slice(1),
                    // FIX 3: Always use actual image for hero if available
                    image: thumbImg ? getDriveDirectLink(thumbImg.id) : (fileId ? getDriveDirectLink(fileId) : ''),
                    // Improved PDF Preview URL
                    pdfUrl: fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null,
                    rawPdfUrl: pdfFile ? pdfFile.url : null,
                    date: 'March 2026',
                    author: 'Zarimunya Intelligence',
                });
                setLoading(false);
            } catch (err) {
                setError(true);
                setLoading(false);
            }
        }
        loadData();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-400 text-xs tracking-widest uppercase">Loading Document...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
            <h2 className="text-xl font-bold mb-4">Content Unavailable</h2>
            <button onClick={() => navigate('/insights')} className="text-blue-600 font-bold">Return to Library</button>
        </div>
    );

    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            {/* --- HERO SECTION --- */}
            <div className="relative h-[50vh] w-full overflow-hidden bg-slate-900">
                <motion.img 
                    initial={{ scale: 1.1, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    src={content.image} 
                    className="w-full h-full object-cover opacity-60"
                    alt="Hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-6xl mx-auto px-6 mb-16 w-full">
                        <button onClick={() => navigate('/insights')} className="mb-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs font-bold tracking-tighter uppercase">
                            <ArrowLeft size={14} /> Back to Library
                        </button>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl tracking-tight">{content.title}</h1>
                        <div className="flex gap-6 text-white/60 text-xs font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-2"><User size={14} className="text-blue-500" /> {content.author}</span>
                            <span className="flex items-center gap-2"><Calendar size={14} className="text-blue-500" /> {content.date}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
                <div className="rounded-[2rem] p-8 md:p-12   backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 border border-white/40 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] ring-1 ring-white/20">  
                    {content.pdfUrl ? (
                        <div className="space-y-12">
                            <div className="flex flex-col md:flex-row gap-8 items-center bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <div className="w-full md:w-1/3 aspect-[3/4] rounded-lg overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
                                    <img src={content.image} className="w-full h-full object-cover" alt="Document Cover" />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        <FileText size={12} /> Resource Document
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Publication Summary</h3>
                                    <div className="text-slate-500 dark:text-slate-400 leading-relaxed max-h-32 overflow-hidden">
                                        {content.paragraphs[0] || "Review the full digital document below."}
                                    </div>
                                    <div className="flex gap-4 pt-2">
                                        <a href={content.rawPdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all">
                                            <Download size={16} /> Download PDF
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-2">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                                        <Eye size={16} /> Interactive Reader
                                    </h4>
                                    <button onClick={() => window.open(content.rawPdfUrl, '_blank')} className="text-xs text-blue-600 font-bold flex items-center gap-1 hover:underline">
                                        Open Fullscreen <Maximize2 size={12} />
                                    </button>
                                </div>
                                {/* PREVIEW BOX */}
                                <div className="w-full aspect-[3/4] md:aspect-video rounded-2xl overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-inner bg-slate-200">
                                    <iframe 
                                        src={content.pdfUrl}
                                        className="w-full h-full"
                                        title="Zarimunya Document Viewer"
                                        allow="autoplay"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <article className="max-w-none">
                            {content.paragraphs.map((p, i) => (
                                <p key={i} className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                    {p}
                                </p>
                            ))}
                        </article>
                    )}
                </div>
            </div>
        </motion.main>
    );
}