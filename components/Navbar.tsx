import React from 'react';
import { Binary, Github } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        <a href="#hero" className="flex items-center gap-2 text-cyan-400 font-bold text-xl hover:opacity-80 transition-opacity">
          <Binary className="w-6 h-6" />
          <span>BWT.Thesis</span>
        </a>
        
        <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
           <span className="hidden md:inline-block text-xs uppercase tracking-widest text-slate-600">
             Informatica 5HT-i
           </span>
           <div className="h-4 w-px bg-white/10 hidden md:block" />
           <a href="https://github.com/ZXerniXZ/bwt-school-prj" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
             <Github className="w-5 h-5" />
           </a>
        </div>
      </div>
    </nav>
  );
};