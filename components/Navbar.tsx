
import React from 'react';
import { Binary, Github } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 z-[100] w-full bg-slate-900/90 backdrop-blur-xl border-b border-white/15 shadow-2xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-6xl">
        <a href="#hero" className="flex items-center gap-2.5 text-cyan-400 font-black text-2xl hover:scale-105 transition-transform">
          <Binary className="w-7 h-7" />
          <span className="tracking-tight">BWT<span className="text-white">.Thesis</span></span>
        </a>
        
        <div className="flex items-center gap-6 text-sm font-bold text-slate-300">
           <span className="hidden md:inline-block text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black">
             5HT-i Informatica
           </span>
           <div className="h-5 w-px bg-white/15 hidden md:block" />
           <a 
            href="https://github.com/ZXerniXZ/bwt-school-prj" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white hover:scale-110 transition-all p-1"
            aria-label="GitHub Repository"
           >
             <Github className="w-6 h-6" />
           </a>
        </div>
      </div>
    </nav>
  );
};
