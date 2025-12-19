import React from 'react';
import { ArrowDown } from 'lucide-react';
import AnimatedShaderBackground from './ui/animated-shader-background';

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-slate-950">
      {/* Background Layer */}
      <AnimatedShaderBackground />

      {/* Content Layer */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center space-y-8 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 text-cyan-300 text-xs font-medium uppercase tracking-wider backdrop-blur-md animate-float border border-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
          Tesina di Informatica
        </div>
        
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-white max-w-6xl leading-tight">
          Burrows-Wheeler <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 drop-shadow-sm">
            Transform
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed font-medium">
          L'arte di riordinare l'informazione. <br className="hidden md:block"/>
          Un algoritmo rivoluzionario che ha cambiato per sempre la compressione dei dati e la genomica.
        </p>

        <div className="pt-12 animate-bounce text-slate-600">
          <ArrowDown className="w-8 h-8" />
        </div>
      </div>
      
      {/* Decorative fade at the bottom to blend with the next section (Slate-950) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-10" />
    </div>
  );
};