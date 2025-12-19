import React from 'react';

export const WarpOverlay: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div 
      className={`fixed inset-0 z-[100] pointer-events-none transition-opacity duration-500 flex items-center justify-center overflow-hidden
        ${active ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {/* Background radial gradient for speed sensation */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/0 via-cyan-900/10 to-indigo-950/0 mix-blend-overlay" />
      
      {/* Central Flash */}
      <div className={`absolute inset-0 bg-white transition-opacity duration-200 ${active ? 'opacity-10' : 'opacity-0'}`} />

      {/* Speed Lines (simulated via scaling a radial gradient) */}
      <div className={`absolute w-[200vw] h-[200vw] rounded-full border-[100px] border-cyan-500/5 opacity-0 scale-0 transition-transform duration-1000 ease-in
         ${active ? 'scale-100 opacity-100' : ''}
      `} />

      {/* Text Indicator */}
      <div className={`relative z-10 font-mono text-cyan-400 text-sm tracking-[0.5em] font-bold uppercase
         ${active ? 'animate-pulse' : 'hidden'}
      `}>
        Warping...
      </div>
    </div>
  );
};