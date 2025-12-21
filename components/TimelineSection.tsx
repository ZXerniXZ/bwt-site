
import { Timeline } from "./ui/timeline";
import { Terminal, Sparkles, Cpu, Snowflake, Gift, Container } from "lucide-react";
import { CodeExplanation } from "./CodeExplanation";
import { ThreadingExplanation } from "./ThreadingExplanation";
import { DockerExplanation } from "./DockerExplanation";

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
             {isChristmas ? <Snowflake className="w-4 h-4 md:w-5 md:h-5" /> : <Container className="w-4 h-4 md:w-5 md:h-5" />}
             <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-wider">
               {isChristmas ? 'Container di Natale & Web UI' : 'Docker, Flask & Web Architecture'}
             </span>
          </div>
          <p className="text-slate-300 text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            L'ultima release trasforma il progetto in un'applicazione moderna. Introduciamo <strong>Docker</strong> per la portabilità, un client <strong>Flask</strong> come bridge API e persistenza dei dati tramite volumi.
          </p>
          
          <div className="w-full">
             <DockerExplanation isChristmas={isChristmas} />
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
