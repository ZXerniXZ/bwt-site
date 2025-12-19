
import { Hero } from './components/Hero';
import { BwtVisualizer } from './components/BwtVisualizer';
import { History } from './components/History';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TimelineSection } from './components/TimelineSection';
import AnimatedShaderBackground from './components/ui/animated-shader-background';

export default function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden font-sans">
      
      {/* Global Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 md:opacity-40">
         <AnimatedShaderBackground />
      </div>

      {/* Atmospheric lighting overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(15,23,42,0)_0%,_rgba(2,6,23,0.8)_100%)]" />

      <Navbar />

      <main className="relative z-10 w-full">
          
          <section id="hero">
             <Hero />
          </section>

          {/* Content Wrapper */}
          <div className="w-full bg-slate-900/40 border-t border-white/10 pb-20 md:pb-32 transition-all duration-700">
              
              <div className="container mx-auto px-4 max-w-6xl space-y-24 md:space-y-48 pt-16 md:pt-32">
                
                <section id="history" className="scroll-mt-24 md:scroll-mt-32">
                    <History />
                </section>

                <section id="visualizer" className="scroll-mt-24 md:scroll-mt-32">
                     <div className="mb-8 md:mb-12 border-l-4 border-cyan-500 pl-4 md:pl-6">
                        <span className="text-cyan-400 font-mono text-[10px] md:text-sm tracking-widest uppercase font-bold">Laboratorio Interattivo</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white mt-2 tracking-tight">Trasformata BWT</h2>
                        <p className="text-slate-200 mt-3 md:mt-4 max-w-2xl text-base md:text-lg leading-relaxed font-medium">
                            Sperimenta la riorganizzazione dei dati. Inserisci una parola e segui il processo nella nostra sandbox.
                        </p>
                    </div>
                    <BwtVisualizer />
                </section>

              </div>
          </div>

          <section id="timeline" className="scroll-mt-24 md:scroll-mt-32 bg-slate-900/80 backdrop-blur-md border-t border-white/10">
             <TimelineSection />
          </section>

      </main>

      <Footer />
    </div>
  );
}
