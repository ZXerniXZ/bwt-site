
import React from 'react';
import { Binary, Github } from 'lucide-react';

interface NavbarProps {
  isChristmas?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isChristmas }) => {
  return (
    <nav className={`fixed top-0 z-[100] w-full transition-colors duration-1000 ${isChristmas ? 'bg-red-950/90 border-red-500/20' : 'bg-slate-900/90 border-white/15'} backdrop-blur-xl border-b shadow-2xl`}>
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-6xl">
        <a href="#hero" className={`flex items-center gap-2.5 transition-all relative group ${isChristmas ? 'text-green-400' : 'text-cyan-400'} font-black text-2xl hover:scale-105`}>
          {isChristmas && (
             <span className="absolute -top-4 -left-4 text-2xl -rotate-12 transition-transform group-hover:rotate-0">🎅</span>
          )}
          <Binary className="w-7 h-7" />
          <span className="tracking-tight">BWT<span className="text-white">.Thesis</span></span>
        </a>
        
        <div className="flex items-center gap-6 text-sm font-bold text-slate-300">
           <span className={`hidden md:inline-block text-[10px] uppercase tracking-[0.2em] font-black transition-colors ${isChristmas ? 'text-red-400' : 'text-slate-500'}`}>
             {isChristmas ? '🎄 Edizione Natalizia 🎄' : '5HT-i Informatica'}
           </span>
           <div className={`h-5 w-px hidden md:block transition-colors ${isChristmas ? 'bg-red-500/30' : 'bg-white/15'}`} />
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
