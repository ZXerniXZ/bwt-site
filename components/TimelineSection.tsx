import React from "react";
import { Timeline } from "./ui/timeline";
import { Terminal, Code, Sparkles, Rocket, Cpu } from "lucide-react";
import { CodeExplanation } from "./CodeExplanation";
import { ThreadingExplanation } from "./ThreadingExplanation";

export function TimelineSection() {
  const data = [
    {
      title: "v0.1 - Core Logic",
      content: (
        <div className="w-full">
          <div className="flex items-center gap-2 mb-6 text-emerald-400">
             <Terminal className="w-5 h-5" />
             <span className="font-mono text-sm font-bold uppercase tracking-wider">Analisi Codice Python & Networking</span>
          </div>
          <p className="text-slate-300 text-sm md:text-base font-normal mb-8 leading-relaxed max-w-3xl">
            Questa fase è il cuore della tesina. Qui analizziamo l'implementazione matematica dell'algoritmo BWT e l'architettura Client-Server base su Socket TCP/IP utilizzata per la comunicazione tra i nodi.
          </p>
          
          {/* Integrated Code Analysis Component */}
          <div className="mt-8 -ml-4 md:ml-0 w-[90vw] md:w-full max-w-5xl">
             <CodeExplanation />
          </div>
        </div>
      ),
    },
    {
      title: "v0.2 - Multithreading & I/O",
      content: (
        <div>
           <div className="flex items-center gap-2 mb-4 text-cyan-400">
             <Cpu className="w-5 h-5" />
             <span className="font-mono text-sm font-bold uppercase tracking-wider">Parallelismo e Persistenza</span>
          </div>
          <p className="text-slate-300 text-sm md:text-base font-normal mb-8 leading-relaxed">
            Evoluzione del server per gestire <strong>connessioni multiple</strong> simultanee tramite <code>threading</code>. 
            Inoltre, implementazione del sistema di salvataggio su file JSON per storicizzare i record delle elaborazioni (Input, BWT, Tempo di esecuzione).
          </p>
          
           {/* Integrated Threading Explanation Component */}
           <div className="mt-8 -ml-4 md:ml-0 w-[90vw] md:w-full max-w-5xl">
             <ThreadingExplanation />
          </div>
        </div>
      ),
    },
    {
      title: "v0.3 - Final Release",
      content: (
        <div>
           <div className="flex items-center gap-2 mb-4 text-purple-400">
             <Sparkles className="w-5 h-5" />
             <span className="font-mono text-sm font-bold uppercase tracking-wider">WebGL & Polish</span>
          </div>
          <p className="text-slate-300 text-sm md:text-base font-normal mb-8 leading-relaxed">
            Rifinitura estetica e performance. Introduzione di <strong>Three.js</strong> per gli sfondi dinamici (GLSL Shaders) e animazioni Framer Motion.
            Ottimizzazione del bundle tramite Code Splitting e design pienamente responsive per la presentazione finale.
          </p>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-purple-900/10 rounded-lg p-6 border border-purple-500/20 flex flex-col items-center justify-center text-center">
                <Rocket className="w-8 h-8 text-purple-400 mb-2" />
                <span className="text-purple-300 text-xs font-bold">Performance Boost</span>
             </div>
             <div className="bg-slate-900 rounded-lg p-6 border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"></div>
                <span className="text-slate-300 text-xs font-bold relative z-10">Shader Backgrounds</span>
             </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}