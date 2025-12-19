
import React from 'react';
import { ArrowDown } from 'lucide-react';
import AnimatedShaderBackground from './ui/animated-shader-background';

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 opacity-40 md:opacity-60">
        <AnimatedShaderBackground />
      </div>

      {/* Radial Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,_rgba(30,41,59,0.4)_0%,_transparent_80%)]" />

      {/* Content Layer - Centered vertically and horizontally */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center space-y-8 md:space-y-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.1)] animate-fade-in">
          Tesina di Informatica
        </div>
        
        <div className="w-full">
          <h1 className="text-4xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white leading-[1.1] md:leading-[0.9] drop-shadow-2xl break-words">
            Burrows-Wheeler <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-indigo-400">
              Transform
            </span>
          </h1>
        </div>
        
        <p className="text-sm sm:text-lg md:text-2xl text-slate-200 max-w-xl md:max-w-2xl leading-relaxed font-semibold drop-shadow-md px-2">
          L'arte di riordinare l'informazione. <br className="hidden md:block"/>
          Un algoritmo rivoluzionario per la compressione dei dati e la genomica.
        </p>

        <div className="pt-8 md:pt-16 animate-bounce text-cyan-400/50">
          <ArrowDown className="w-8 h-8 md:w-10 md:h-10" />
        </div>
      </div>
      
      {/* Decorative fade at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none z-10" />
    </div>
  );
};
