import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Code2, Network, Server, Laptop, Terminal } from 'lucide-react';

// --- DATA: ALGORITHM (BWT) ---
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
    description: "Il carattere `$` viene aggiunto come terminatore univoco. È essenziale che sia lessicograficamente minore di tutti gli altri caratteri.",
  },
  {
    lineIndex: 2,
    title: "Calcolo Lunghezza",
    description: "La lunghezza `n` determina quante rotazioni cicliche genereremo.",
  },
  {
    lineIndex: 3,
    title: "Slicing & List Comprehension",
    description: "Per ogni indice `i`, la stringa viene tagliata e la parte iniziale viene spostata in coda.",
    hasVisualizer: true 
  },
  {
    lineIndex: 4,
    title: "Ordinamento (Sorting)",
    description: "La lista delle rotazioni viene ordinata alfabeticamente. Questo raggruppa i caratteri simili.",
  },
  {
    lineIndex: 5,
    title: "Risultato BWT",
    description: "L'ultima colonna della matrice ordinata è la BWT.",
  }
];

// --- DATA: NETWORK CODE LINES (FULL USER CODE) ---

const SERVER_FULL_LINES = [
    { html: '<span class="text-purple-400">import</span> socket', indent: 0 },
    { html: '<span class="text-purple-400">import</span> pickle', indent: 0 },
    { html: '<span class="text-purple-400">import</span> time', indent: 0 },
    { html: '', indent: 0 },
    { html: 'HOST = <span class="text-emerald-400">"127.0.0.1"</span>', indent: 0 },
    { html: 'PORT = <span class="text-orange-400">65432</span>', indent: 0 },
    { html: '', indent: 0 },
    { html: '<span class="text-purple-400">def</span> <span class="text-yellow-200">bwt</span>(s):', indent: 0 },
    { html: 's = s + <span class="text-emerald-400">"$"</span>', indent: 1 },
    { html: 'n = <span class="text-cyan-400">len</span>(s)', indent: 1 },
    { html: 'rotazioni = [s[i:] + s[:i] <span class="text-purple-400">for</span> i <span class="text-purple-400">in</span> <span class="text-cyan-400">range</span>(n)]', indent: 1 },
    { html: 'rotazioni.<span class="text-cyan-400">sort</span>()', indent: 1 },
    { html: '<span class="text-purple-400">return</span> <span class="text-emerald-400">""</span>.join(r[<span class="text-red-400">-1</span>] <span class="text-purple-400">for</span> r <span class="text-purple-400">in</span> rotazioni)', indent: 1 },
    { html: '', indent: 0 },
    { html: '<span class="text-purple-400">def</span> <span class="text-yellow-200">handle_client</span>(conn, addr):', indent: 0 },
    { html: '<span class="text-purple-400">with</span> conn:', indent: 1 },
    { html: 'data = conn.<span class="text-cyan-400">recv</span>(<span class="text-orange-400">4096</span>)', indent: 2 },
    { html: '<span class="text-purple-400">if</span> <span class="text-purple-400">not</span> data:', indent: 2 },
    { html: '<span class="text-cyan-400">print</span>(<span class="text-emerald-400">f"Connessione interrotta per: {addr}"</span>)', indent: 3 },
    { html: '<span class="text-purple-400">return</span>', indent: 3 },
    { html: '', indent: 2 },
    { html: 'text = data.<span class="text-cyan-400">decode</span>()', indent: 2 },
    { html: '<span class="text-cyan-400">print</span>(<span class="text-emerald-400">f"Messaggio ricevuto da {addr}: {text}"</span>)', indent: 2 },
    { html: '', indent: 2 },
    { html: 'start = time.<span class="text-cyan-400">perf_counter</span>()', indent: 2 },
    { html: 'result = <span class="text-yellow-200">bwt</span>(text)', indent: 2 },
    { html: 'end = time.<span class="text-cyan-400">perf_counter</span>()', indent: 2 },
    { html: '', indent: 2 },
    { html: '<span class="text-slate-500 italic"># Risposta al client: risultato BWT e tempo</span>', indent: 2 },
    { html: 'response = (result, end - start)', indent: 2 },
    { html: 'conn.<span class="text-cyan-400">sendall</span>(pickle.<span class="text-cyan-400">dumps</span>(response))', indent: 2 },
    { html: '', indent: 0 },
    { html: '<span class="text-cyan-400">print</span>(<span class="text-emerald-400">f"Server in ascolto su {HOST}:{PORT}"</span>)', indent: 0 },
    { html: '', indent: 0 },
    { html: '<span class="text-purple-400">with</span> socket.socket(socket.AF_INET, socket.SOCK_STREAM) <span class="text-purple-400">as</span> s:', indent: 0 },
    { html: 's.<span class="text-cyan-400">bind</span>((HOST, PORT))', indent: 1 },
    { html: 's.<span class="text-cyan-400">listen</span>()', indent: 1 },
    { html: '', indent: 1 },
    { html: '<span class="text-purple-400">while</span> <span class="text-yellow-400">True</span>:', indent: 1 },
    { html: 'conn, addr = s.<span class="text-cyan-400">accept</span>()', indent: 2 },
    { html: '<span class="text-yellow-200">handle_client</span>(conn, addr)', indent: 2 },
];

const CLIENT_FULL_LINES = [
    { html: '<span class="text-purple-400">import</span> socket', indent: 0 },
    { html: '', indent: 0 },
    { html: 'HOST = <span class="text-emerald-400">"127.0.0.1"</span>      <span class="text-slate-500 italic"># indirizzo del server</span>', indent: 0 },
    { html: 'PORT = <span class="text-orange-400">65432</span>            <span class="text-slate-500 italic"># porta del server</span>', indent: 0 },
    { html: 'message = <span class="text-emerald-400">"banana"</span>      <span class="text-slate-500 italic"># porta locale fissa del client</span>', indent: 0 },
    { html: '', indent: 0 },
    { html: '<span class="text-purple-400">with</span> socket.socket(socket.AF_INET, socket.SOCK_STREAM) <span class="text-purple-400">as</span> s:', indent: 0 },
    { html: '', indent: 0 },
    { html: '', indent: 1 },
    { html: '<span class="text-slate-500 italic"># Connessione al server</span>', indent: 1 },
    { html: 's.<span class="text-cyan-400">connect</span>((HOST, PORT))', indent: 1 },
    { html: '<span class="text-cyan-400">print</span>(<span class="text-emerald-400">f"Connesso al server {HOST}:{PORT}"</span>)', indent: 1 },
    { html: '', indent: 1 },
    { html: 's.<span class="text-cyan-400">send</span>(message.<span class="text-cyan-400">encode</span>())', indent: 1 },
    { html: 'data = s.<span class="text-cyan-400">recv</span>(<span class="text-orange-400">1024</span>)', indent: 1 },
    { html: '<span class="text-cyan-400">print</span>(<span class="text-emerald-400">f"bwt of {message}: {data}"</span>)', indent: 1 },
];

const NETWORK_STEPS = [
    {
        id: 0,
        title: "Setup & Binding",
        file: 'server',
        highlightLines: [34, 35, 36], 
        description: "Il server inizializza la comunicazione. `bind()` associa il socket a IP/Porta specifici, mentre `listen()` lo mette in attesa di chiamate in ingresso."
    },
    {
        id: 1,
        title: "Connessione (Client)",
        file: 'client',
        highlightLines: [6, 10], 
        description: "Il client crea il suo socket e tenta la connessione con `connect()`. Questo avvia l'handshake TCP per stabilire un canale affidabile."
    },
    {
        id: 2,
        title: "Loop & Accept",
        file: 'server',
        highlightLines: [38, 39, 40],
        description: "Il server gira in un ciclo infinito (`while True`). `accept()` è il punto critico: blocca l'esecuzione finché un client non si connette, restituendo poi un oggetto `conn` dedicato."
    },
    {
        id: 3,
        title: "Logica BWT (Server)",
        file: 'server',
        highlightLines: [14, 16, 21, 24, 25, 26, 30],
        description: "Dentro `handle_client`, il server riceve i dati grezzi (`recv`), li decodifica in stringa, calcola la BWT misurando il tempo di esecuzione, e spedisce il risultato serializzato (`pickle`) indietro al client."
    }
];

// --- VISUALIZERS ---

const DynamicSlicingVisualizer = () => {
    const [cutIndex, setCutIndex] = useState(2);
    const text = "BANANA$";
    const chars = text.split('');
    const boxWidth = 36; 
    const gap = 4;

    const getPosition = (originalIndex: number) => {
        if (originalIndex >= cutIndex) {
            return (originalIndex - cutIndex) * (boxWidth + gap);
        } else {
            return (originalIndex + (text.length - cutIndex)) * (boxWidth + gap);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            let step = 0;
            const interval = setInterval(() => {
                step = (step + 1) % text.length;
                setCutIndex(step);
                if (step === 2) clearInterval(interval); 
            }, 600);
            return () => clearInterval(interval);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="mt-6 border border-white/5 rounded-xl p-6 select-none bg-black/40 shadow-inner">
            <div className="flex justify-center mb-8 font-mono text-sm md:text-base">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/50 border border-white/5">
                    <span className="text-slate-500">i = {cutIndex}</span>
                    <span className="text-slate-600">|</span>
                    <span className="text-cyan-400">s[{cutIndex}:]</span>
                    <span className="text-slate-600">+</span>
                    <span className="text-purple-400">s[:{cutIndex}]</span>
                </div>
            </div>

            <div className="relative h-20 w-full max-w-[350px] mx-auto overflow-hidden md:overflow-visible">
                {chars.map((char, index) => {
                    const isHead = index < cutIndex;
                    const finalX = getPosition(index);
                    return (
                        <div
                            key={index}
                            className={`
                                absolute top-0 flex items-center justify-center
                                w-[36px] h-[48px] rounded-md font-bold text-lg
                                transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                                ${isHead 
                                    ? 'bg-indigo-900/30 text-indigo-400 z-0 opacity-80 scale-90 border border-indigo-500/20' 
                                    : 'bg-cyan-900/30 text-cyan-400 z-10 scale-100 border border-cyan-500/20'}
                            `}
                            style={{ transform: `translateX(${finalX}px)` }}
                        >
                            {char}
                        </div>
                    );
                })}
            </div>
            <div className="mt-10 px-4">
                <input 
                    type="range" 
                    min="0" 
                    max={text.length} 
                    value={cutIndex}
                    onChange={(e) => setCutIndex(parseInt(e.target.value) % text.length)}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
            </div>
        </div>
    );
};

const NetworkVisualizer = ({ step }: { step: number }) => {
    return (
        <div className="relative h-64 bg-slate-900/50 rounded-xl border border-white/5 mt-6 overflow-hidden flex items-center justify-center p-8 select-none">
            
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

            <div className="flex items-center justify-between w-full max-w-md relative z-10">
                
                {/* CLIENT NODE */}
                <div className={`flex flex-col items-center gap-2 transition-all duration-700 ease-out ${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-20 -translate-x-10 grayscale'}`}>
                    <div className="p-3 bg-cyan-900/30 border border-cyan-500/30 rounded-lg text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                        <Laptop className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-mono text-cyan-500">CLIENT</span>
                </div>

                {/* CONNECTION LINE */}
                <div className="flex-1 h-px bg-slate-800 mx-4 relative overflow-hidden">
                    {step >= 1 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-50 animate-pulse" />
                    )}
                    
                    {/* Data Packet Animation */}
                    {step === 3 && (
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_white] animate-[pingpong_2s_linear_infinite]" />
                    )}
                    <style>{`
                        @keyframes pingpong {
                            0% { left: 10%; opacity: 0; }
                            10% { opacity: 1; }
                            50% { left: 90%; }
                            90% { opacity: 1; }
                            100% { left: 10%; opacity: 0; }
                        }
                    `}</style>
                </div>

                {/* SERVER NODE */}
                <div className="relative">
                    <div className="flex flex-col items-center gap-2 z-20 relative">
                        <div className={`p-3 border rounded-lg transition-all duration-500 ${step === 0 ? 'bg-emerald-900/30 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-indigo-900/30 border-indigo-500/30 text-indigo-400'}`}>
                            <Server className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-mono text-indigo-500">SERVER</span>
                    </div>
                </div>

            </div>

            {/* Status Badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950/80 border border-white/10 text-[10px] font-mono text-slate-400 flex items-center gap-2 backdrop-blur-sm">
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${step === 0 ? 'bg-emerald-500 animate-pulse' : step === 3 ? 'bg-white animate-bounce' : 'bg-indigo-500'}`} />
                {step === 0 ? 'LISTENING on 65432' : step === 1 ? 'HANDSHAKE ESTABLISHED' : step === 2 ? 'CONNECTION ACCEPTED' : 'DATA TRANSFER'}
            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---

export const CodeExplanation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'algo' | 'network'>('algo');
  const [algoStep, setAlgoStep] = useState(0);
  const [netStep, setNetStep] = useState(0);

  const algoContainerRef = useRef<HTMLDivElement>(null);
  const netContainerRef = useRef<HTMLDivElement>(null);

  // Helper to determine which lines to display
  const currentNetworkLines = NETWORK_STEPS[netStep].file === 'server' ? SERVER_FULL_LINES : CLIENT_FULL_LINES;
  const currentFilename = NETWORK_STEPS[netStep].file === 'server' ? 'server.py' : 'client.py';

  // SCROLL LOGIC: Uses container.scrollTo instead of element.scrollIntoView to prevent main page jumping
  const scrollToElement = (container: HTMLDivElement | null, elementId: string) => {
    if (!container) return;
    const element = document.getElementById(elementId);
    if (!element) return;

    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    // Calculate offset relative to the container
    const offsetRelativeToContainer = elementRect.top - containerRect.top;
    
    // Center the element in the container
    // targetScrollTop = currentScrollTop + relativeOffset - (containerHeight/2) + (elementHeight/2)
    const targetScrollTop = container.scrollTop + offsetRelativeToContainer - (container.clientHeight / 2) + (elementRect.height / 2);
    
    container.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    });
  };

  // Effect to auto-scroll in Algorithm tab
  useEffect(() => {
    if (activeTab === 'algo') {
        scrollToElement(algoContainerRef.current, `algo-line-${algoStep}`);
    }
  }, [algoStep, activeTab]);

  // Effect to auto-scroll in Network tab
  useEffect(() => {
    if (activeTab === 'network') {
        const highlights = NETWORK_STEPS[netStep].highlightLines;
        if (highlights.length > 0) {
            scrollToElement(netContainerRef.current, `net-line-${highlights[0]}`);
        }
    }
  }, [netStep, activeTab]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      
      {/* Tabs Switcher */}
      <div className="flex justify-center">
          <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-white/10 backdrop-blur-sm shadow-xl">
             <button 
                onClick={() => setActiveTab('algo')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'algo' ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)] border border-cyan-500/20' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'}`}
             >
                <Code2 className="w-4 h-4" />
                Algoritmo BWT
             </button>
             <button 
                onClick={() => setActiveTab('network')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'network' ? 'bg-indigo-500/10 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.15)] border border-indigo-500/20' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'}`}
             >
                <Network className="w-4 h-4" />
                Socket TCP/IP
             </button>
          </div>
      </div>

      {/* CONTENT: ALGORITHM */}
      {activeTab === 'algo' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
          {/* Left: Code Block */}
          <div className="relative group bg-slate-900/60 rounded-2xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950/50 border-b border-white/5">
              <span className="text-xs font-mono text-slate-500 flex items-center gap-2"><Code2 className="w-3 h-3"/> bwt_logic.py</span>
            </div>
            
            <div 
                ref={algoContainerRef}
                className="p-6 font-mono text-sm md:text-base leading-relaxed overflow-x-auto overflow-y-auto h-[450px]"
            >
              {ALGO_LINES.map((line) => (
                <div 
                  key={line.id}
                  id={`algo-line-${line.id}`}
                  onClick={() => setAlgoStep(line.id)}
                  className={`relative pl-4 py-1 cursor-pointer transition-colors duration-200 rounded-md
                    ${algoStep === line.id ? 'bg-cyan-500/10' : 'hover:bg-white/5'}
                  `}
                >
                   {algoStep === line.id && (
                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 rounded-l-md shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                   )}
                   <span className="text-slate-600 select-none mr-4 w-6 inline-block text-right opacity-50">{line.id + 1}</span>
                   <span 
                      style={{ paddingLeft: `${line.indent * 1.5}rem` }}
                      dangerouslySetInnerHTML={{ __html: line.html }} 
                   />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Explanation Panel */}
          <div className="flex flex-col gap-6">
             <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 h-full flex flex-col backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-3">
                   <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <ChevronRight className="w-5 h-5" />
                   </div>
                   <h3 className="text-xl font-bold text-white">{ALGO_STEPS[algoStep].title}</h3>
                </div>
                
                <p className="text-slate-400 leading-relaxed mb-6">
                   {ALGO_STEPS[algoStep].description}
                </p>

                {ALGO_STEPS[algoStep].hasVisualizer && (
                    <DynamicSlicingVisualizer />
                )}

                <div className="mt-auto flex justify-between pt-6 border-t border-white/5">
                    <button 
                        onClick={() => setAlgoStep(l => Math.max(0, l - 1))}
                        disabled={algoStep === 0}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white disabled:opacity-30 transition-colors flex items-center gap-2"
                    >
                        <ChevronLeft className="w-4 h-4" /> Precedente
                    </button>
                    <button 
                         onClick={() => setAlgoStep(l => Math.min(ALGO_LINES.length - 1, l + 1))}
                         disabled={algoStep === ALGO_LINES.length - 1}
                         className="px-4 py-2 rounded-lg text-sm font-medium bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 disabled:opacity-30 transition-colors flex items-center gap-2"
                    >
                        Successivo <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* CONTENT: NETWORK */}
      {activeTab === 'network' && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
             
             {/* LEFT: EXPLANATION & CONTROLS */}
             <div className="flex flex-col gap-6 order-2 md:order-1">
                 <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 h-full flex flex-col backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                            {netStep + 1}
                        </span>
                        <h3 className="text-xl font-bold text-white">{NETWORK_STEPS[netStep].title}</h3>
                    </div>

                    <p className="text-slate-300 leading-relaxed min-h-[60px] text-sm md:text-base">
                        {NETWORK_STEPS[netStep].description}
                    </p>

                    <NetworkVisualizer step={netStep} />

                    <div className="mt-6 flex justify-between pt-6 border-t border-white/5">
                        <button 
                            onClick={() => setNetStep(s => Math.max(0, s - 1))}
                            disabled={netStep === 0}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white disabled:opacity-30 transition-colors flex items-center gap-2"
                        >
                            <ChevronLeft className="w-4 h-4" /> Indietro
                        </button>
                        <button 
                            onClick={() => setNetStep(s => Math.min(NETWORK_STEPS.length - 1, s + 1))}
                            disabled={netStep === NETWORK_STEPS.length - 1}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 disabled:opacity-30 transition-colors flex items-center gap-2 shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                        >
                            Avanti <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                 </div>
             </div>

             {/* RIGHT: FOCUSED CODE SNIPPET */}
             <div className="order-1 md:order-2 flex flex-col justify-center">
                 <div className="relative group h-[450px]">
                     {/* Glow Effect */}
                     <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                     
                     <div className="relative bg-slate-950/80 rounded-2xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md h-full flex flex-col">
                        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-indigo-400" />
                                <span className="text-xs font-mono text-slate-400">{currentFilename}</span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-slate-700" />
                                <div className="w-2 h-2 rounded-full bg-slate-700" />
                            </div>
                        </div>

                        {/* Updated to display structured lines instead of raw HTML dump */}
                        <div 
                            ref={netContainerRef}
                            className="p-6 overflow-x-auto overflow-y-auto flex-1 font-mono text-sm leading-relaxed text-slate-300 scroll-smooth"
                        >
                             {currentNetworkLines.map((line, idx) => {
                                 // Check if this line should be highlighted based on the current step
                                 const isHighlighted = NETWORK_STEPS[netStep].highlightLines.includes(idx);
                                 
                                 return (
                                     <div 
                                         key={idx} 
                                         id={`net-line-${idx}`}
                                         className={`transition-all duration-500 ${isHighlighted ? 'opacity-100 bg-indigo-500/10 -mx-6 px-6 border-l-2 border-indigo-400' : 'opacity-30'}`}
                                     >
                                        <span 
                                            style={{ paddingLeft: `${line.indent * 1.5}rem` }}
                                            dangerouslySetInnerHTML={{ __html: line.html || '&nbsp;' }} 
                                        />
                                     </div>
                                 );
                             })}
                        </div>
                     </div>
                 </div>
             </div>

         </div>
      )}

    </div>
  );
};