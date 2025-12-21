import { useState, useEffect } from 'react';
import Hero, { ShaderBackground } from './components/ui/neural-network-hero';
import { BwtVisualizer } from './components/BwtVisualizer';
import { History } from './components/History';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TimelineSection } from './components/TimelineSection';

export default function App() {
  const [isChristmas, setIsChristmas] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcola l'opacità della sfuocatura basata sullo scroll
  const blurValue = Math.min(scrollY / 100, 16); 
  const overlayOpacity = Math.min(scrollY / 600, 0.85);

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isChristmas ? 'bg-[#1a0505]/10 christmas-theme' : 'bg-transparent'} text-slate-200 overflow-x-hidden font-sans relative`}>
      
      {/* BACKGROUND GENERATIVO FISSO */}
      <ShaderBackground />

      {/* OVERLAY DI SFOCATURA DINAMICA */}
      <div 
        className="fixed inset-0 pointer-events-none z-[-5] transition-all duration-300"
        style={{ 
          backdropFilter: `blur(${blurValue}px)`,
          backgroundColor: isChristmas 
            ? `rgba(26, 5, 5, ${overlayOpacity})` 
            : `rgba(0, 0, 0, ${overlayOpacity})`
        }}
      />

      {isChristmas && <GlobalSnowfall />}

      <Navbar isChristmas={isChristmas} />

      <main className="relative z-10 w-full">
          
          <section id="hero">
             <Hero 
                title={isChristmas ? "Burrows-Wheeler Christmas" : "Burrows-Wheeler Transform"}
                description={isChristmas 
                    ? "L'arte di impacchettare i dati per Natale. Un algoritmo reversibile come i regali indesiderati."
                    : "L'arte di riordinare l'informazione. Un algoritmo rivoluzionario per la compressione dei dati e la genomica."}
                badgeLabel={isChristmas ? "Edizione" : "Informatica"}
                badgeText={isChristmas ? "Speciale Natale" : "Tesina 5HT"}
                ctaButtons={[
                    { text: isChristmas ? "Apri i Regali" : "Inizia il Lab", href: "#visualizer", primary: true },
                    { text: "La Storia", href: "#history" }
                ]}
                microDetails={isChristmas ? ["Merry BWT", "Snow Shaders", "Gift RLE"] : ["BWT Core", "Python Network", "Dockerized"]}
             />
          </section>

          {/* TOP ATMOSPHERIC BRIDGE - Transizione Hero -> Contenuto (ridotto) */}
          <div 
            className={`h-[25vh] w-full pointer-events-none relative z-10 -mt-[25vh] ${
                isChristmas 
                ? 'bg-gradient-to-t from-[#1a0505] via-[#1a0505]/60 to-transparent' 
                : 'bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent'
            }`}
          />

          {/* Contenitore sezioni centrali */}
          <div className={`w-full relative ${isChristmas ? 'bg-[#1a0505]' : 'bg-slate-950'}`}>
              <div className="container mx-auto px-4 max-w-[1440px] space-y-20 md:space-y-32 pb-16">
                
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
                        <p className="text-slate-300 mt-3 md:mt-4 max-w-3xl text-sm md:text-lg leading-relaxed font-medium">
                            {isChristmas 
                                ? "Sperimenta il riordino dei regali natalizi. Un approccio festivo alla compressione."
                                : "Sperimenta la riorganizzazione dei dati. Inserisci una parola e segui il processo nella nostra sandbox."}
                        </p>
                    </div>
                    <BwtVisualizer onChristmasChange={setIsChristmas} isChristmas={isChristmas} />
                </section>
              </div>

              {/* BOTTOM ATMOSPHERIC BRIDGE - Transizione Contenuto -> Timeline (molto ridotto) */}
              <div 
                className={`h-[20vh] w-full pointer-events-none absolute bottom-0 left-0 translate-y-full z-20 ${
                    isChristmas 
                    ? 'bg-gradient-to-b from-[#1a0505] via-[#1a0505]/80 to-transparent' 
                    : 'bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent'
                }`}
              />
          </div>

          <section id="timeline" className="scroll-mt-24 md:scroll-mt-32 w-full mt-[10vh]">
             <TimelineSection isChristmas={isChristmas} />
          </section>

          {isChristmas && (
            <div className="fixed bottom-0 left-0 right-0 h-16 pointer-events-none z-[60] flex justify-between px-10 items-end overflow-hidden opacity-80">
                <span className="text-3xl animate-bounce" style={{ animationDuration: '2s' }}>🐧</span>
                <span className="text-4xl animate-bounce hidden md:block" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>🎅</span>
                <span className="text-3xl animate-bounce" style={{ animationDuration: '2.2s', animationDelay: '0.2s' }}>🐧</span>
            </div>
          )}
      </main>

      <Footer />
//ciaooo
      <style>{`
        @keyframes global-snow {
            0% { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translate3d(0, 110vh, 0) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

const GlobalSnowfall = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {[...Array(15)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute text-white/30 font-serif will-change-transform"
                    style={{
                        left: `${(i * 7) % 100}%`,
                        fontSize: `${Math.random() * 10 + 10}px`,
                        animation: `global-snow ${Math.random() * 5 + 7}s linear infinite`,
                        animationDelay: `${Math.random() * 5}s`,
                        top: '-20px'
                    }}
                >
                    ❄
                </div>
            ))}
        </div>
    );
};