import React from 'react';
import { Hero } from './components/Hero';
// CodeExplanation removed from here, moved to TimelineSection
import { BwtVisualizer } from './components/BwtVisualizer';
import { History } from './components/History';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TimelineSection } from './components/TimelineSection';
import AnimatedShaderBackground from './components/ui/animated-shader-background';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      
      {/* Global Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <AnimatedShaderBackground />
      </div>

      <Navbar />

      <main className="relative z-10 w-full">
          
          {/* Section 0: Hero (Clean Background) */}
          <section id="hero">
             <Hero />
          </section>

          {/* Blur Wrapper for Content below Hero - Reduced blur to sm */}
          <div className="w-full backdrop-blur-sm bg-slate-950/60 border-t border-white/5 pb-32 transition-all duration-700">
              
              <div className="container mx-auto px-4 max-w-6xl space-y-40 pt-32">
                
                {/* Section 1: History & Apps */}
                <section id="history" className="scroll-mt-32">
                    <History />
                </section>

                {/* Section 2: Interactive Visualizer */}
                {/* Note: The Code Explanation has been moved inside the Timeline (v0.1) */}
                <section id="visualizer" className="scroll-mt-32">
                     <div className="mb-12 border-l-4 border-cyan-500 pl-6">
                        <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Live Demo</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mt-2">Visualizer</h2>
                        <p className="text-slate-400 mt-4 max-w-2xl text-lg">
                            Prova l'algoritmo in tempo reale. Inserisci una stringa e osserva la magia delle rotazioni.
                        </p>
                    </div>
                    <BwtVisualizer />
                </section>

              </div>
          </div>

          {/* Section 3: Timeline (Full Width) */}
          <section id="timeline" className="scroll-mt-32 bg-slate-950/90 backdrop-blur-xl border-t border-white/5">
             <TimelineSection />
          </section>

      </main>

      <Footer />
    </div>
  );
}