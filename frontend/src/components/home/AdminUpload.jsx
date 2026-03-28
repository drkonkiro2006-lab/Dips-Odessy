'use client';

import React, { useState, useRef } from 'react';
import { ImagePlus, FileText, Upload, X, CheckCircle2 } from 'lucide-react';

// --- CUSTOM ICONS FROM REFERENCE ---
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600 dark:text-[#D4AF37]">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

export default function AdminUpload() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('gallery');
  const [showPassword, setShowPassword] = useState(false);
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Gallery Upload State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (username === "AdminZM" && password === "Admin#Z05") {
      setIsAuthenticated(true);
    } else {
      setLoginError('Unauthorized access. Invalid credentials.');
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (selectedImages.length + files.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }
    setSelectedImages([...selectedImages, ...files]);
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (selectedImages.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    selectedImages.forEach((file) => formData.append('images', file));

    try {
      const response = await fetch('http://localhost:5000/api/admin/upload-gallery', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert(`Success! Gallery "${title}" has been created.`);
        setTitle('');
        setDescription('');
        setSelectedImages([]);
      } else {
        alert("Upload failed: " + data.message);
      }
    } catch (err) {
      alert("Connection error. Is the backend server running?");
    } finally {
      setIsUploading(false);
    }
  };

  // --- LOGIN UI (WITH UPDATED LOOK) ---
  if (!isAuthenticated) {
    return (
      <div className="relative w-full min-h-screen flex items-center justify-center font-sans overflow-hidden bg-slate-50 dark:bg-zinc-950 px-4">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-yellow-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 dark:bg-yellow-600/5 rounded-full blur-[120px]" />

        <div className="relative w-full max-w-sm p-8 space-y-8 bg-white dark:bg-black rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-blue-500/5 dark:shadow-yellow-500/5">
          <div className="text-center space-y-3">
            <div className="inline-flex p-3 bg-blue-50 dark:bg-zinc-900 rounded-xl border border-blue-100 dark:border-yellow-900/30">
              <ShieldIcon />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white uppercase">
                Admin <span className="text-blue-600 dark:text-[#D4AF37]">Portal</span>
              </h1>
              <p className="text-xs font-bold text-zinc-500 dark:text-zinc-500 mt-2 uppercase tracking-[0.1em]">
                Zarimunya FinanceHub
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Admin Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                placeholder="Enter your ID" 
                className="flex h-12 w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-4 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#D4AF37] dark:text-white" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Secret Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="Enter your Password" 
                  className="flex h-12 w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-4 py-2 pr-10 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#D4AF37] dark:text-white" 
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-blue-600 dark:hover:text-[#D4AF37] transition-colors">
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="text-[10px] font-bold text-red-500 bg-red-500/10 p-2 rounded border border-red-500/20 text-center">
                {loginError}
              </div>
            )}

            <button type="submit" className="flex items-center justify-center w-full h-12 rounded-lg text-xs font-black uppercase tracking-widest transition-all bg-blue-600 text-white hover:bg-zinc-900 dark:bg-[#D4AF37] dark:text-black dark:hover:bg-white shadow-lg active:scale-[0.98]">
              Authenticate
            </button>
          </form>

          <div className="text-center">
            <p className="text-[9px] text-zinc-400 uppercase tracking-[0.2em]">Authorized Personnel Only</p>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD UI (UNCHANGED) ---
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-12 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black dark:text-white uppercase tracking-tighter">
              Content <span className="text-blue-600 dark:text-[#D4AF37]">Manager</span>
            </h1>
            <p className="text-zinc-500 text-sm font-medium">Zarimunya FinanceHub Control Panel</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-xs font-bold text-zinc-400 hover:text-red-500 uppercase tracking-widest transition-colors">
            Logout
          </button>
        </div>

        <div className="relative bg-zinc-200 dark:bg-zinc-900 p-1 rounded-2xl flex mb-10 w-full max-w-md mx-auto shadow-inner">
          <div className={`absolute top-1 bottom-1 w-[49%] bg-white dark:bg-zinc-800 rounded-xl shadow-lg transition-all duration-300 ease-out z-0 ${activeTab === 'blog' ? 'left-[50%]' : 'left-1'}`} />
          <button onClick={() => setActiveTab('gallery')} className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black uppercase tracking-widest transition-colors ${activeTab === 'gallery' ? 'text-blue-600 dark:text-[#D4AF37]' : 'text-zinc-500'}`}>
            <ImagePlus size={16} /> Gallery
          </button>
          <button onClick={() => setActiveTab('blog')} className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black uppercase tracking-widest transition-colors ${activeTab === 'blog' ? 'text-blue-600 dark:text-[#D4AF37]' : 'text-zinc-500'}`}>
            <FileText size={16} /> Blog Posts
          </button>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          {activeTab === 'gallery' ? (
            <form onSubmit={handleGallerySubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Folder Title</label>
                    <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Annual Tax Summit 2026" className="w-full bg-slate-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl px-5 py-4 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#D4AF37] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Description (Optional)</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief details..." className="w-full bg-slate-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl px-5 py-4 dark:text-white h-32 outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#D4AF37] transition-all resize-none" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex justify-between">Upload Assets <span>{selectedImages.length} / 10</span></label>
                  <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-2xl h-48 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/50 hover:bg-blue-50 dark:hover:bg-zinc-800 cursor-pointer transition-all group">
                    <Upload className="text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-[#D4AF37] mb-2 transition-colors" />
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Click to browse images</p>
                    <input type="file" multiple hidden ref={fileInputRef} accept="image/*" onChange={handleImageChange} />
                  </div>
                  <div className="grid grid-cols-5 gap-2 mt-4">
                    {selectedImages.map((file, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-white">
                        <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="preview" />
                        <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:scale-110 transition-transform"><X size={10} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button type="submit" disabled={isUploading} className={`w-full ${isUploading ? 'bg-zinc-400' : 'bg-blue-600 dark:bg-[#D4AF37]'} text-white dark:text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-blue-500/20 dark:shadow-none hover:bg-zinc-900 transition-all flex items-center justify-center gap-3 group`}>
                {isUploading ? "Uploading..." : <><CheckCircle2 size={18} /> Publish to Gallery</>}
              </button>
            </form>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center animate-in fade-in duration-500">
              <FileText size={48} className="text-zinc-200 dark:text-zinc-800 mb-4" />
              <h2 className="text-zinc-400 font-bold uppercase tracking-widest text-sm">Blog Editor Module</h2>
              <p className="text-zinc-500 text-xs mt-2">Section is currently in development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}