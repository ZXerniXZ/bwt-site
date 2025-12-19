
import { Timeline } from "./ui/timeline";
import { Terminal, Sparkles, Rocket, Cpu, Snowflake, Gift } from "lucide-react";
import { CodeExplanation } from "./CodeExplanation";
import { ThreadingExplanation } from "./ThreadingExplanation";

interface TimelineSectionProps {
  isChristmas?: boolean;
}

export function TimelineSection({ isChristmas }: TimelineSectionProps) {
  const data = [
    {
      title: "v0.1 - Core Logic",
      content: (
        <div className="w-full">
          <div className={`flex items-center gap-2 mb-4 transition-colors ${isChristmas ? 'text-red-400' : 'text-emerald-400'}`}>
             {isChristmas ? <Snowflake className="w-4 h-4 md:w-5 md:h-5" /> : <Terminal className="w-4 h-4 md:w-5 md:h-5" />}
             <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-wider">
                 {isChristmas ? 'Codice di Natale & Networking' : 'Analisi Codice Python & Networking'}
             </span>
          </div>
          <p className="text-slate-300 text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            Questa fase è il cuore della tesina. Analizziamo l'implementazione matematica dell'algoritmo BWT e l'architettura Client-Server base su Socket TCP/IP.
          </p>
          
          <div className="w-full">
             <CodeExplanation isChristmas={isChristmas} />
          </div>
        </div>
      ),
    },
    {
      title: "v0.2 - Multithreading & I/O",
      content: (
        <div className="w-full">
           <div className={`flex items-center gap-2 mb-4 transition-colors ${isChristmas ? 'text-green-400' : 'text-cyan-400'}`}>
             {isChristmas ? <Gift className="w-4 h-4 md:w-5 md:h-5" /> : <Cpu className="w-4 h-4 md:w-5 md:h-5" />}
             <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-wider">
                 {isChristmas ? 'Connessioni Parallele sotto l\'Albero' : 'Parallelismo e Persistenza'}
             </span>
          </div>
          <p className="text-slate-300 text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            Evoluzione del server per gestire <strong>connessioni multiple</strong> tramite <code>threading</code> e persistenza dati JSON.
          </p>
          
           <div className="w-full">
             <ThreadingExplanation isChristmas={isChristmas} />
          </div>
        </div>
      ),
    },
    {
      title: "v0.3 - Final Release",
      content: (
        <div className="w-full">
           <div className={`flex items-center gap-2 mb-4 transition-colors ${isChristmas ? 'text-red-500' : 'text-purple-400'}`}>
             {isChristmas ? <Snowflake className="w-4 h-4 md:w-5 md:h-5" /> : <Sparkles className="w-4 h-4 md:w-5 md:h-5" />}
             <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-wider">WebGL & Polish</span>
          </div>
          <p className="text-slate-300 text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            Rifinitura estetica e performance. Introduzione di <strong>Three.js</strong> e animazioni per una UX professionale.
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-lg">
             <div className={`rounded-lg p-4 md:p-6 border flex flex-col items-center justify-center text-center transition-colors ${isChristmas ? 'bg-red-900/10 border-red-500/20' : 'bg-purple-900/10 border-purple-500/20'}`}>
                <Rocket className={`w-6 h-6 md:w-8 md:h-8 mb-2 ${isChristmas ? 'text-red-400' : 'text-purple-400'}`} />
                <span className={`text-[10px] md:text-xs font-bold uppercase ${isChristmas ? 'text-red-300' : 'text-purple-300'}`}>Performance Boost</span>
             </div>
             <div className={`rounded-lg p-4 md:p-6 border flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors ${isChristmas ? 'bg-green-900/10 border-green-500/20' : 'bg-slate-900 border-white/5'}`}>
                <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000 ${isChristmas ? 'from-red-500/10 to-green-500/10' : 'from-cyan-500/10 to-purple-500/10'}`}></div>
                <span className="text-slate-300 text-[10px] md:text-xs font-bold uppercase relative z-10">Shader Graphics</span>
             </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      <Timeline data={data} isChristmas={isChristmas} />
    </div>
  );
}
