
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Server, Laptop, Terminal, Snowflake, Gift } from 'lucide-react';

interface CodeExplanationProps {
  isChristmas?: boolean;
}

const ALGO_LINES = [
    { id: 0, html: '<span class="text-purple-400">def</span> <span class="text-yellow-200">bwt</span>(s):', indent: 0 },
    { id: 1, html: 's = s + <span class="text-emerald-400">"$"</span>', indent: 1 },
    { id: 2, html: 'n = <span class="text-cyan-400">len</span>(s)', indent: 1 },
    { id: 3, html: 'rotazioni = [s[i:] + s[:i] <span class="text-purple-400">for</span> i <span class="text-purple-400">in</span> <span class="text-cyan-400">range</span>(n)]', indent: 1 },
    { id: 4, html: 'rotazioni.<span class="text-cyan-400">sort</span>()', indent: 1 },
    { id: 5, html: '<span class="text-purple-400">return</span> <span class="text-emerald-400">""</span>.join(r[<span class="text-red-400">-1</span>] <span class="text-purple-400">for</span> r <span class="text-purple-400">in</span> rotazioni)', indent: 1 },
];

const ALGO_STEPS = [
  {
    lineIndex: 0,
    title: "Definizione Funzione",
    description: "Iniziamo definendo la funzione. L'algoritmo BWT opera su blocchi di dati, tipicamente stringhe.",
  },
  {
    lineIndex: 1,
    title: "Marcatore di Fine",
    description: "Il carattere `$` viene aggiunto come terminatore univoco, essenziale per l'invertibilità.",
  },
  {
    lineIndex: 2,
    title: "Calcolo Lunghezza",
    description: "La lunghezza `n` determina quante rotazioni cicliche genereremo.",
  },
  {
    lineIndex: 3,
    title: "Slicing & Comprehension",
    description: "Per ogni indice `i`, la stringa viene tagliata e la parte iniziale spostata in coda.",
    hasVisualizer: true 
  },
  {
    lineIndex: 4,
    title: "Sorting",
    description: "La lista delle rotazioni viene ordinata alfabeticamente per raggruppare i caratteri.",
  },
  {
    lineIndex: 5,
    title: "Risultato BWT",
    description: "L'ultima colonna della matrice ordinata è il risultato finale.",
  }
];

const SERVER_FULL_LINES = [
    { html: '<span class="text-purple-400">import</span> socket', indent: 0 },
    { html: '<span class="text-purple-400">import</span> pickle', indent: 0 },
    { html: '<span class="text-purple-400">import</span> time', indent: 0 },
    { html: '', indent: 0 },
    { html: 'HOST = <span class="text-emerald-400">"127.0.0.1"</span>', indent: 0 },
    { html: 'PORT = <span class="text-orange-400">65432</span>', indent: 0 },
    { html: '', indent: 0 },
    { html: '<span class="text-purple-400">def</span> <span class="text-yellow-200">bwt</span>(s):', indent: 0 },
    { html: '<span class="text-slate-500 italic"># ... logica bwt ...</span>', indent: 1 },
    { html: '', indent: 0 },
    { html: '<span class="text-purple-400">def</span> <span class="text-yellow-200">handle_client</span>(conn, addr):', indent: 0 },
    { html: '<span class="text-purple-400">with</span> conn:', indent: 1 },
    { html: 'data = conn.<span class="text-cyan-400">recv</span>(<span class="text-orange-400">4096</span>)', indent: 2 },
    { html: 'text = data.<span class="text-cyan-400">decode</span>()', indent: 2 },
    { html: 'result = <span class="text-yellow-200">bwt</span>(text)', indent: 2 },
    { html: 'conn.<span class="text-cyan-400">sendall</span>(pickle.<span class="text-cyan-400">dumps</span>(result))', indent: 2 },
    { html: '', indent: 0 },
    { html: '<span class="text-purple-400">with</span> socket.socket() <span class="text-purple-400">as</span> s:', indent: 0 },
    { html: 's.<span class="text-cyan-400">bind</span>((HOST, PORT))', indent: 1 },
    { html: 's.<span class="text-cyan-400">listen</span>()', indent: 1 },
    { html: '<span class="text-purple-400">while</span> <span class="text-yellow-400">True</span>:', indent: 1 },
    { html: 'conn, addr = s.<span class="text-cyan-400">accept</span>()', indent: 2 },
    { html: '<span class="text-yellow-200">handle_client</span>(conn, addr)', indent: 2 },
];

const CLIENT_FULL_LINES = [
    { html: '<span class="text-purple-400">import</span> socket', indent: 0 },
    { html: 'HOST = <span class="text-emerald-400">"127.0.0.1"</span>', indent: 0 },
    { html: 'PORT = <span class="text-orange-400">65432</span>', indent: 0 },
    { html: '', indent: 0 },
    { html: '<span class="text-purple-400">with</span> socket.socket() <span class="text-purple-400">as</span> s:', indent: 0 },
    { html: 's.<span class="text-cyan-400">connect</span>((HOST, PORT))', indent: 1 },
    { html: 's.<span class="text-cyan-400">send</span>(<span class="text-emerald-400">"banana"</span>.<span class="text-cyan-400">encode</span>())', indent: 1 },
    { html: 'data = s.<span class="text-cyan-400">recv</span>(<span class="text-orange-400">1024</span>)', indent: 1 },
];

const NETWORK_STEPS = [
    {
        id: 0,
        title: "Setup Server",
        file: 'server',
        highlightLines: [18, 19], 
        description: "Il server si lega all'indirizzo e porta e si mette in ascolto di connessioni."
    },
    {
        id: 1,
        title: "Connessione Client",
        file: 'client',
        highlightLines: [5], 
        description: "Il client tenta l'handshake TCP verso il server."
    },
    {
        id: 2,
        title: "Loop di Accettazione",
        file: 'server',
        highlightLines: [20, 21, 22],
        description: "Il server accetta una connessione e delega la gestione dell'utente."
    },
    {
        id: 3,
        title: "Scambio Dati",
        file: 'server',
        highlightLines: [12, 13, 14, 15],
        description: "Ricezione stringa, calcolo BWT e invio del risultato serializzato."
    }
];

const DynamicSlicingVisualizer = ({ isChristmas }: { isChristmas?: boolean }) => {
    const [cutIndex, setCutIndex] = useState(2);
    const text = isChristmas ? "CHRISTMAS$" : "BANANA$";
    const chars = text.split('');
    const boxWidth = 32; 
    const gap = 4;

    const getPosition = (originalIndex: number) => {
        if (originalIndex >= cutIndex) {
            return (originalIndex - cutIndex) * (boxWidth + gap);
        } else {
            return (originalIndex + (text.length - cutIndex)) * (boxWidth + gap);
        }
    };

    return (
        <div className={`mt-4 border rounded-xl p-4 shadow-inner overflow-hidden transition-colors ${isChristmas ? 'bg-red-950/40 border-red-500/20' : 'bg-black/40 border-white/5'}`}>
            <div className="flex justify-center mb-6 font-mono text-[10px] md:text-xs">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${isChristmas ? 'bg-red-900 border-red-500/20' : 'bg-slate-900 border-white/5'}`}>
                    <span className={isChristmas ? 'text-green-400' : 'text-cyan-400'}>s[{cutIndex}:]</span>
                    <span className="text-slate-600">+</span>
                    <span className={isChristmas ? 'text-red-400' : 'text-purple-400'}>s[:{cutIndex}]</span>
                </div>
            </div>

            <div className="relative h-16 w-full max-w-[320px] mx-auto">
                {chars.map((char, index) => {
                    const isHead = index < cutIndex;
                    const finalX = getPosition(index);
                    return (
                        <div
                            key={index}
                            className={`
                                absolute top-0 flex items-center justify-center
                                w-[30px] h-[38px] rounded-md font-bold text-xs
                                transition-all duration-500 ease-out border
                                ${isHead 
                                    ? (isChristmas ? 'bg-red-900/40 text-red-400 border-red-500/20' : 'bg-indigo-900/30 text-indigo-400 border-indigo-500/20') 
                                    : (isChristmas ? 'bg-green-900/40 text-green-400 border-green-500/20' : 'bg-cyan-900/30 text-cyan-400 border-cyan-500/20')}
                            `}
                            style={{ transform: `translateX(${finalX}px)` }}
                        >
                            {char}
                        </div>
                    );
                })}
            </div>
            <div className="mt-6">
                <input 
                    type="range" min="0" max={text.length - 1} value={cutIndex}
                    onChange={(e) => setCutIndex(parseInt(e.target.value))}
                    className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-current ${isChristmas ? 'bg-red-900 text-red-500' : 'bg-slate-800 text-cyan-500'}`}
                />
            </div>
        </div>
    );
};

const NetworkVisualizer = ({ step, isChristmas }: { step: number, isChristmas?: boolean }) => {
    return (
        <div className={`relative h-48 md:h-56 rounded-xl border mt-4 overflow-hidden flex items-center justify-center p-6 select-none transition-colors ${isChristmas ? 'bg-red-950/40 border-red-500/20' : 'bg-slate-900/50 border-white/5'}`}>
            <div className="flex items-center justify-between w-full max-w-sm relative z-10">
                <div className={`flex flex-col items-center gap-1.5 transition-opacity ${step >= 1 ? 'opacity-100' : 'opacity-20'}`}>
                    <div className={`p-2.5 border rounded-lg shadow-sm ${isChristmas ? 'bg-green-900/30 border-green-500/30 text-green-400' : 'bg-cyan-900/30 border-cyan-500/30 text-cyan-400'}`}>
                        <Laptop className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-mono ${isChristmas ? 'text-green-500' : 'text-cyan-500'}`}>CLIENT</span>
                </div>
                <div className="flex-1 h-px bg-slate-800 mx-3 relative">
                    {step >= 1 && <div className={`absolute inset-0 animate-pulse ${isChristmas ? 'bg-red-500/40' : 'bg-cyan-500/40'}`} />}
                </div>
                <div className="flex flex-col items-center gap-1.5">
                    <div className={`p-2.5 border rounded-lg transition-all ${step === 0 ? (isChristmas ? 'bg-red-900/30 border-red-500/30 text-red-400' : 'bg-emerald-900/30 border-emerald-500/30 text-emerald-400') : (isChristmas ? 'bg-green-900/30 border-green-500/30 text-green-400' : 'bg-indigo-900/30 border-indigo-500/30 text-indigo-400')}`}>
                        <Server className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-mono ${isChristmas ? 'text-red-500' : 'text-indigo-500'}`}>SERVER</span>
                </div>
            </div>
            {isChristmas && (
                <div className="absolute top-4 flex gap-4 opacity-20">
                    <Snowflake className="w-4 h-4 animate-bounce" />
                    <Snowflake className="w-4 h-4 animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
            )}
            <div className={`absolute bottom-3 text-[9px] font-mono px-3 py-1 rounded-full border ${isChristmas ? 'text-green-500 bg-red-950/60 border-red-500/10' : 'text-slate-500 bg-slate-950/60 border-white/5'}`}>
                {step === 0 ? 'LISTENING' : step === 3 ? 'TRANSFERRING' : 'CONNECTED'}
            </div>
        </div>
    );
};

export const CodeExplanation: React.FC<CodeExplanationProps> = ({ isChristmas }) => {
  const [activeTab, setActiveTab] = useState<'algo' | 'network'>('algo');
  const [algoStep, setAlgoStep] = useState(0);
  const [netStep, setNetStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elId = activeTab === 'algo' ? `algo-line-${algoStep}` : `net-line-${NETWORK_STEPS[netStep].highlightLines[0]}`;
    const el = document.getElementById(elId);
    if (el && containerRef.current) {
      const top = el.offsetTop - (containerRef.current.clientHeight / 2) + (el.clientHeight / 2);
      containerRef.current.scrollTo({ top, behavior: 'smooth' });
    }
  }, [algoStep, netStep, activeTab]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      <div className="flex justify-center">
          <div className={`flex p-1 rounded-xl border backdrop-blur-md shadow-lg transition-colors duration-1000 ${isChristmas ? 'bg-red-950/80 border-red-500/20' : 'bg-slate-900/80 border-white/10'}`}>
             <button onClick={() => setActiveTab('algo')} className={`px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${activeTab === 'algo' ? (isChristmas ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20') : 'text-slate-500'}`}>
                {isChristmas ? 'Regole' : 'Algoritmo'}
             </button>
             <button onClick={() => setActiveTab('network')} className={`px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${activeTab === 'network' ? (isChristmas ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20') : 'text-slate-500'}`}>
                {isChristmas ? 'Consegna' : 'Networking'}
             </button>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          <div className={`rounded-2xl border overflow-hidden shadow-2xl backdrop-blur-md h-[400px] md:h-[450px] flex flex-col order-2 lg:order-1 transition-colors duration-1000 ${isChristmas ? 'bg-red-950/80 border-red-500/20' : 'bg-slate-950/80 border-white/10'}`}>
            <div className={`px-4 py-2.5 border-b flex items-center justify-between text-[10px] font-mono transition-colors ${isChristmas ? 'bg-red-900/40 border-red-500/10 text-red-400' : 'bg-slate-900 border-white/5 text-slate-500'}`}>
                <span className="flex items-center gap-2">
                    {isChristmas ? <Gift className="w-3 h-3" /> : <Terminal className="w-3 h-3" />}
                    {isChristmas ? 'natale.py' : 'logic.py'}
                </span>
            </div>
            <div ref={containerRef} className="p-4 md:p-6 font-mono text-[11px] md:text-sm leading-relaxed overflow-y-auto flex-1 no-scrollbar">
              {(activeTab === 'algo' ? ALGO_LINES : (NETWORK_STEPS[netStep].file === 'server' ? SERVER_FULL_LINES : CLIENT_FULL_LINES)).map((line, idx) => (
                <div 
                  key={idx} 
                  id={activeTab === 'algo' ? `algo-line-${idx}` : `net-line-${idx}`}
                  className={`py-0.5 rounded px-2 transition-all ${
                    (activeTab === 'algo' ? algoStep === idx : NETWORK_STEPS[netStep].highlightLines.includes(idx)) 
                    ? (isChristmas ? 'bg-red-500/20 border-l-2 border-red-500 opacity-100' : 'bg-cyan-500/10 border-l-2 border-cyan-500 opacity-100') 
                    : 'opacity-30'
                  }`}
                >
                  <span dangerouslySetInnerHTML={{ __html: '&nbsp;'.repeat(line.indent * 4) + line.html || '&nbsp;' }} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 order-1 lg:order-2">
             <div className={`p-5 md:p-6 rounded-2xl border backdrop-blur-md transition-colors duration-1000 ${isChristmas ? 'bg-red-900/40 border-red-500/10' : 'bg-slate-900/40 border-white/5'}`}>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    {activeTab === 'algo' ? ALGO_STEPS[algoStep].title : NETWORK_STEPS[netStep].title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4 font-medium">
                    {activeTab === 'algo' ? ALGO_STEPS[algoStep].description : NETWORK_STEPS[netStep].description}
                </p>

                {activeTab === 'algo' && ALGO_STEPS[algoStep].hasVisualizer && <DynamicSlicingVisualizer isChristmas={isChristmas} />}
                {activeTab === 'network' && <NetworkVisualizer step={netStep} isChristmas={isChristmas} />}

                <div className={`flex justify-between mt-6 pt-4 border-t ${isChristmas ? 'border-red-500/10' : 'border-white/5'}`}>
                    <button 
                        onClick={() => activeTab === 'algo' ? setAlgoStep(s => Math.max(0, s - 1)) : setNetStep(s => Math.max(0, s - 1))}
                        className={`px-4 py-2 text-xs font-bold transition-colors ${isChristmas ? 'text-red-400 hover:text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        Precedente
                    </button>
                    <button 
                        onClick={() => activeTab === 'algo' ? setAlgoStep(s => Math.min(ALGO_STEPS.length - 1, s + 1)) : setNetStep(s => Math.min(NETWORK_STEPS.length - 1, s + 1))}
                        className={`px-6 py-2 text-xs font-bold bg-white/5 text-white rounded-lg border transition-colors ${isChristmas ? 'border-red-500/20 hover:border-red-500/40' : 'border-white/10 hover:border-white/20'}`}
                    >
                        Successivo
                    </button>
                </div>
             </div>
          </div>

      </div>
    </div>
  );
};
