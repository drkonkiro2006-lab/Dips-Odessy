import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const getDriveDirectLink = (id) => {
    if (!id) return '';
    return `https://lh3.googleusercontent.com/u/0/d/${id}=w1000`;
};

export default function Insights() {
    const [vlogs, setVlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://script.google.com/macros/s/AKfycbxImFk820iwFc8XFU4i8wsNGM-QczFIYP50ET12Kw5xsAhTWvwyGVZ0VJSb8Gjjh0Wklg/exec')
            .then(res => res.json())
            .then(data => {
                const formattedData = data.map(folder => {
                    const thumbFile = folder.images.find(img => img.name.toLowerCase().includes('thumbnail')) || folder.images[0];
                    
                    return {
                        id: folder.folderName,
                        title: folder.title.split('\n')[0],
                        excerpt: folder.title.split('\n').slice(1, 3).join(' ') || "Click to view more details...",
                        thumbnail: thumbFile ? getDriveDirectLink(thumbFile.id) : '', 
                        type: folder.pdfs.length > 0 ? 'document' : 'insight'
                    };
                });
                setVlogs(formattedData);
                setLoading(false);
            })
            .catch(err => {
                console.error("Drive Fetch Error:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-slate-500 bg-slate-50 dark:bg-slate-950">
            <div className="animate-pulse font-bold tracking-widest uppercase text-sm">Synchronizing Insights...</div>
        </div>
    );

    return (
        <>
            <section className="w-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
                    <span className="text-blue-400 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Knowledge Base</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Updates.</span></h1>
                    <p className="text-white/60 mt-6 max-w-xl text-lg leading-relaxed">Explore our latest research, documents, and company updates directly from the source.</p>
                </div>
            </section>

            <section className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {vlogs.map((vlog) => (
                            <Link 
                                to={`/insights/${vlog.id}`} 
                                key={vlog.id} 
                                className="group flex flex-col h-full overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                            >
                                <div className="h-64 overflow-hidden relative bg-slate-200">
                                    <img
                                        src={vlog.thumbnail}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt={vlog.title}
                                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80&w=1000&auto=format&fit=crop'; }}
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                                            {vlog.type}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                                        {vlog.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 line-clamp-2 leading-relaxed">
                                        {vlog.excerpt}
                                    </p>
                                    <div className="mt-auto flex items-center text-blue-600 font-bold text-xs tracking-widest uppercase">
                                        {vlog.type === 'document' ? 'Review Document' : 'Read Insight'}
                                        <span className="ml-2 transform transition-transform group-hover:translate-x-2">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}