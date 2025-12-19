
import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { BwtVisualizer } from './components/BwtVisualizer';
import { History } from './components/History';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TimelineSection } from './components/TimelineSection';
import AnimatedShaderBackground from './components/ui/animated-shader-background';

export default function App() {
  const [isChristmas, setIsChristmas] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isChristmas ? 'bg-[#1a0505] christmas-theme' : 'bg-[#020617]'} text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden font-sans relative`}>
      
      {/* Snowfall Effect - Global */}
      {isChristmas && <GlobalSnowfall />}

      {/* Global Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 md:opacity-40">
         <AnimatedShaderBackground />
      </div>

      {/* Atmospheric lighting overlay */}
      <div className={`fixed inset-0 z-[1] pointer-events-none transition-colors duration-1000 ${isChristmas ? 'bg-[radial-gradient(circle_at_50%_50%,_rgba(20,83,45,0.1)_0%,_rgba(26,5,5,0.9)_100%)]' : 'bg-[radial-gradient(circle_at_50%_50%,_rgba(15,23,42,0)_0%,_rgba(2,6,23,0.8)_100%)]'}`} />

      <Navbar isChristmas={isChristmas} />

      <main className="relative z-10 w-full">
          
          <section id="hero">
             <Hero isChristmas={isChristmas} />
          </section>

          {/* Content Wrapper */}
          <div className={`w-full transition-colors duration-1000 ${isChristmas ? 'bg-green-950/20 border-red-500/20' : 'bg-slate-900/40 border-white/10'} border-t pb-20 md:pb-32`}>
              
              <div className="container mx-auto px-4 max-w-6xl space-y-24 md:space-y-48 pt-16 md:pt-32">
                
                <section id="history" className="scroll-mt-24 md:scroll-mt-32">
                    <History isChristmas={isChristmas} />
                </section>

                <section id="visualizer" className="scroll-mt-24 md:scroll-mt-32">
                     <div className={`mb-8 md:mb-12 border-l-4 pl-4 md:pl-6 transition-colors ${isChristmas ? 'border-red-500' : 'border-cyan-500'}`}>
                        <span className={`${isChristmas ? 'text-red-400' : 'text-cyan-400'} font-mono text-[10px] md:text-sm tracking-widest uppercase font-bold`}>
                            {isChristmas ? 'Laboratorio dei Regali' : 'Laboratorio Interattivo'}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-white mt-2 tracking-tight">
                            {isChristmas ? 'Trasformata di Babbo Natale' : 'Trasformata BWT'}
                        </h2>
                        <p className="text-slate-200 mt-3 md:mt-4 max-w-2xl text-base md:text-lg leading-relaxed font-medium">
                            {isChristmas 
                                ? "Inserisci 'CHRISTMAS' per attivare la magia! Sperimenta il riordino dei regali natalizi."
                                : "Sperimenta la riorganizzazione dei dati. Inserisci una parola e segui il processo nella nostra sandbox."}
                        </p>
                    </div>
                    <BwtVisualizer onChristmasChange={setIsChristmas} isChristmas={isChristmas} />
                </section>

              </div>
          </div>

          <section id="timeline" className={`scroll-mt-24 md:scroll-mt-32 backdrop-blur-md border-t transition-colors duration-1000 ${isChristmas ? 'bg-red-950/50 border-red-500/20' : 'bg-slate-900/80 border-white/10'}`}>
             <TimelineSection isChristmas={isChristmas} />
          </section>

          {/* Wandering Penguins Easter Egg */}
          {isChristmas && (
            <div className="fixed bottom-0 left-0 right-0 h-20 pointer-events-none z-[60] flex justify-between px-10 md:px-20 items-end overflow-hidden">
                <span className="text-4xl animate-bounce" style={{ animationDelay: '0s', marginBottom: '10px' }}>🐧</span>
                <span className="text-5xl animate-bounce hidden md:block" style={{ animationDelay: '0.4s' }}>🎅</span>
                <span className="text-3xl animate-bounce" style={{ animationDelay: '0.2s', marginBottom: '5px' }}>🐧</span>
                <span className="text-4xl animate-bounce hidden lg:block" style={{ animationDelay: '0.7s' }}>🎁</span>
                <span className="text-3xl animate-bounce" style={{ animationDelay: '0.1s', marginBottom: '15px' }}>🐧</span>
            </div>
          )}
      </main>

      <Footer />

      <style>{`
        @keyframes global-snow {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        .christmas-theme ::selection {
            background: rgba(239, 68, 68, 0.3) !important;
            color: #fca5a5 !important;
        }
      `}</style>
    </div>
  );
}

const GlobalSnowfall = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {[...Array(40)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute text-white/40 font-serif"
                    style={{
                        left: `${Math.random() * 100}%`,
                        fontSize: `${Math.random() * 15 + 10}px`,
                        animation: `global-snow ${Math.random() * 5 + 5}s linear infinite`,
                        animationDelay: `${Math.random() * 10}s`,
                        top: '-20px'
                    }}
                >
                    ❄
                </div>
            ))}
        </div>
    );
};
