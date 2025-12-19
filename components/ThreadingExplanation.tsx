import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Cpu, Database, Server, FileJson, ArrowDown, Layers, HardDrive, User, ArrowRight, Settings, Save } from 'lucide-react';

// --- DATA: SERVER CODE (THREADING & JSON) ---
const THREAD_SERVER_LINES = [
    { id: 0, html: '<span class="text-purple-400">import</span> socket', indent: 0 },
    { id: 1, html: '<span class="text-purple-400">import</span> threading', indent: 0 },
    { id: 2, html: '<span class="text-purple-400">import</span> json', indent: 0 },
    { id: 3, html: '<span class="text-purple-400">import</span> os', indent: 0 },
    { id: 4, html: '', indent: 0 },
    { id: 5, html: '<span class="text-purple-400">def</span> <span class="text-yellow-200">salva_record</span>(record):', indent: 0 },
    { id: 6, html: 'file_name = <span class="text-emerald-400">"output.json"</span>', indent: 1 },
    { id: 7, html: '<span class="text-purple-400">if</span> os.path.exists(file_name):', indent: 1 },
    { id: 8, html: '<span class="text-purple-400">with</span> <span class="text-cyan-400">open</span>(file_name, <span class="text-emerald-400">"r"</span>) <span class="text-purple-400">as</span> f:', indent: 2 },
    { id: 9, html: 'data = json.<span class="text-cyan-400">load</span>(f)', indent: 3 },
    { id: 10, html: '<span class="text-purple-400">else</span>:', indent: 1 },
    { id: 11, html: 'data = []', indent: 2 },
    { id: 12, html: 'data.<span class="text-cyan-400">append</span>(record)', indent: 1 },
    { id: 13, html: '<span class="text-purple-400">with</span> <span class="text-cyan-400">open</span>(file_name, <span class="text-emerald-400">"w"</span>) <span class="text-purple-400">as</span> f:', indent: 1 },
    { id: 14, html: 'json.<span class="text-cyan-400">dump</span>(data, f, indent=<span class="text-orange-400">4</span>)', indent: 2 },
    { id: 15, html: '', indent: 0 },
    { id: 16, html: '<span class="text-purple-400">def</span> <span class="text-yellow-200">handle_client</span>(conn, addr):', indent: 0 },
    { id: 17, html: '<span class="text-slate-500 italic"># ... ricezione e calcolo BWT ...</span>', indent: 1 },
    { id: 18, html: 'data_to_save = { ... }', indent: 1 },
    { id: 19, html: '<span class="text-yellow-200">salva_record</span>(data_to_save)', indent: 1 },
    { id: 20, html: '', indent: 0 },
    { id: 21, html: '<span class="text-slate-500 italic"># Main Loop Multithread</span>', indent: 0 },
    { id: 22, html: '<span class="text-purple-400">while</span> <span class="text-yellow-400">True</span>:', indent: 1 },
    { id: 23, html: 'conn, addr = s.<span class="text-cyan-400">accept</span>()', indent: 2 },
    { id: 24, html: 't = threading.<span class="text-cyan-400">Thread</span>(target=<span class="text-yellow-200">handle_client</span>, args=(conn, addr))', indent: 2 },
    { id: 25, html: 't.<span class="text-cyan-400">start</span>()', indent: 2 },
];

const THREADING_STEPS = [
  {
    title: "Import Threading",
    description: "Per permettere al server di gestire più client contemporaneamente, importiamo il modulo `threading`. Questo ci permette di creare flussi di esecuzione paralleli indipendenti.",
    highlightLines: [1],
    visualizer: 'threads'
  },
  {
    title: "Il Main Loop Non-Bloccante",
    description: "Il ciclo `while True` accetta le connessioni. Appena un client arriva (`accept`), non lo gestiamo direttamente nel loop principale, altrimenti il server si bloccherebbe per gli altri utenti durante l'elaborazione.",
    highlightLines: [22, 23],
    visualizer: 'threads'
  },
  {
    title: "Creazione del Thread",
    description: "Creiamo un oggetto `Thread` assegnandogli la funzione `handle_client` e i relativi argomenti. Con `t.start()`, il sistema operativo avvia l'esecuzione parallela, liberando subito il Main Loop per la prossima connessione.",
    highlightLines: [24, 25],
    visualizer: 'threads'
  }
];

const IO_STEPS = [
  {
    title: "Import JSON & OS",
    description: "Per la persistenza dei dati usiamo il formato JSON. `os` ci serve per verificare se il file `output.json` è già presente sul disco rigido.",
    highlightLines: [2, 3],
    visualizer: 'json'
  },
  {
    title: "Lettura e Aggiornamento",
    description: "Carichiamo la lista esistente dal file JSON. Se il file non esiste, iniziamo con una lista vuata. Aggiungiamo poi il nuovo record calcolato in RAM.",
    highlightLines: [7, 8, 9, 10, 11, 12],
    visualizer: 'json'
  },
  {
    title: "Salvataggio Fisico",
    description: "Infine, serializziamo la struttura dati e la scriviamo fisicamente sul disco. Il parametro `indent=4` rende il file facilmente leggibile aprendolo con un editor.",
    highlightLines: [13, 14],
    visualizer: 'json'
  }
];

// --- VISUALIZERS ---

const ThreadsVisualizer = () => {
    const [threads, setThreads] = useState<{id: number, active: boolean, status: string}[]>([]);
    const [incomingPulse, setIncomingPulse] = useState(false);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setIncomingPulse(true);
            setTimeout(() => setIncomingPulse(false), 300);

            const newId = Date.now();
            setThreads(prev => [...prev, {id: newId, active: true, status: 'spawned'}].slice(-3)); 
            
            setTimeout(() => {
                setThreads(prev => prev.map(t => t.id === newId ? {...t, status: 'working'} : t));
            }, 600);

            setTimeout(() => {
                setThreads(prev => prev.map(t => t.id === newId ? {...t, active: false} : t));
            }, 4000);

        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-4 border border-white/5 rounded-2xl p-6 bg-slate-950/60 relative overflow-hidden h-[260px] flex flex-col shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.02)_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Top Bar: Client & Server Listener */}
            <div className="flex items-center justify-between mb-8 relative z-10 px-2">
                <div className="flex flex-col items-center gap-1">
                    <div className={`p-3 rounded-full transition-all duration-300 ${incomingPulse ? 'bg-cyan-500/20 scale-110 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-slate-900/50'}`}>
                        <User className={`w-5 h-5 ${incomingPulse ? 'text-cyan-400' : 'text-slate-600'}`} />
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest">Client</span>
                </div>

                <div className="flex-1 px-4 flex justify-center">
                    <div className="w-full max-w-[100px] h-px bg-slate-800 relative overflow-hidden">
                        {incomingPulse && <div className="absolute inset-0 bg-cyan-400 animate-[move_0.5s_linear_infinite]" />}
                        <style>{`@keyframes move { from { transform: translateX(-100%); } to { transform: translateX(100%); } }`}</style>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <div className={`p-3 rounded-xl border-2 transition-all duration-300 ${incomingPulse ? 'border-cyan-400 bg-cyan-950/30' : 'border-slate-800 bg-slate-900/80'}`}>
                        <Server className={`w-5 h-5 ${incomingPulse ? 'text-cyan-400' : 'text-slate-400'}`} />
                    </div>
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Server (accept)</span>
                </div>
            </div>

            {/* Bottom Section: Dedicated Worker Slots */}
            <div className="flex-1 grid grid-cols-3 gap-3 relative z-10">
                {[0, 1, 2].map((slotIndex) => {
                    const thread = threads[slotIndex];
                    const isOccupied = thread && thread.active;
                    
                    return (
                        <div 
                            key={slotIndex}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-500 h-full
                                ${isOccupied 
                                    ? (thread.status === 'working' ? 'bg-indigo-950/30 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'bg-slate-900 border-slate-700 opacity-60') 
                                    : 'bg-slate-950/50 border-white/5 opacity-20'}
                            `}
                        >
                            <Cpu className={`w-6 h-6 mb-2 ${isOccupied && thread.status === 'working' ? 'text-indigo-400 animate-pulse' : 'text-slate-600'}`} />
                            <div className="flex flex-col items-center text-center">
                                <span className={`text-[10px] font-bold ${isOccupied ? 'text-indigo-300' : 'text-slate-700'}`}>
                                    {isOccupied ? `Thread-${slotIndex + 1}` : 'IDLE'}
                                </span>
                                {isOccupied && (
                                    <span className="text-[8px] text-slate-500 font-mono mt-1 leading-tight">
                                        {thread.status === 'working' ? 'Executing BWT' : 'Spawning...'}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] text-slate-700 font-mono uppercase tracking-[0.3em]">
                Parallel Execution Layer
            </div>
        </div>
    );
};

const JsonVisualizer = () => {
    const [isSaving, setIsSaving] = useState(false);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setIsSaving(true);
            setTimeout(() => setIsSaving(false), 2000);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-4 border border-white/5 rounded-2xl p-6 bg-slate-950/40 relative overflow-hidden h-[260px] flex flex-col shadow-inner select-none">
            {/* Background Data Flow */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isSaving ? 'opacity-10' : 'opacity-0'}`}>
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-emerald-500/50 blur-[2px] animate-pulse" />
            </div>

            <div className="relative z-10 flex-1 grid grid-cols-1 gap-6 items-center">
                
                {/* 1. RAM State */}
                <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg transition-colors duration-500 ${isSaving ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                            <Database className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-300 uppercase">Memory (RAM)</span>
                            <span className="text-[9px] text-slate-500 font-mono">List: 12 records</span>
                        </div>
                    </div>
                    {isSaving && (
                        <div className="flex items-center gap-1">
                            <span className="text-[8px] text-emerald-400 font-mono font-bold animate-pulse">JSON.DUMP()</span>
                            <ArrowDown className="w-3 h-3 text-emerald-500 animate-bounce" />
                        </div>
                    )}
                </div>

                {/* 2. IO Operations */}
                <div className="flex justify-center relative py-2">
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full border transition-all duration-700 ${isSaving ? 'bg-indigo-950/40 border-indigo-500/50 scale-110' : 'bg-slate-900 border-white/5'}`}>
                            <Settings className={`w-5 h-5 ${isSaving ? 'text-indigo-400 animate-spin-slow' : 'text-slate-600'}`} />
                        </div>
                        <style>{`@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .animate-spin-slow { animation: spin-slow 3s linear infinite; }`}</style>
                        <div className={`h-px w-12 bg-gradient-to-r transition-opacity duration-500 ${isSaving ? 'from-indigo-500/50 to-emerald-500/50 opacity-100' : 'from-transparent to-transparent opacity-0'}`} />
                        <div className={`p-2 rounded-full border transition-all duration-700 ${isSaving ? 'bg-emerald-950/40 border-emerald-500/50 scale-110' : 'bg-slate-900 border-white/5'}`}>
                            <Save className={`w-5 h-5 ${isSaving ? 'text-emerald-400' : 'text-slate-600'}`} />
                        </div>
                    </div>
                </div>

                {/* 3. Disk Persistence */}
                <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-white/10 group">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500/80">
                            <HardDrive className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">output.json</span>
                            <span className="text-[9px] text-slate-500 font-mono">Size: 2.4 KB</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <FileJson className={`w-5 h-5 transition-all duration-500 ${isSaving ? 'text-yellow-400 scale-125' : 'text-slate-700'}`} />
                        {isSaving && (
                             <div className="px-1.5 py-0.5 rounded bg-emerald-500 text-[8px] font-black text-slate-950 animate-bounce">
                                UPDATED
                             </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export const ThreadingExplanation: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'threading' | 'io'>('threading');
    const [step, setStep] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentSteps = activeTab === 'threading' ? THREADING_STEPS : IO_STEPS;
    const currentStepData = currentSteps[step] || currentSteps[0];

    const scrollToLine = (lineIndex: number) => {
        if (!containerRef.current) return;
        const element = document.getElementById(`thread-line-${lineIndex}`);
        if (!element) return;
        
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const offset = elementRect.top - containerRect.top;
        const targetScroll = container.scrollTop + offset - (container.clientHeight / 2) + (elementRect.height / 2);

        container.scrollTo({ top: targetScroll, behavior: 'smooth' });
    };

    useEffect(() => {
        setStep(0);
    }, [activeTab]);

    useEffect(() => {
        if (currentStepData && currentStepData.highlightLines && currentStepData.highlightLines.length > 0) {
            scrollToLine(currentStepData.highlightLines[0]);
        }
    }, [step, activeTab, currentStepData]);

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
            
            {/* Tabs Switcher - Reduced bottom margin */}
            <div className="flex justify-center">
                <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/10 backdrop-blur-md shadow-2xl">
                    <button 
                        onClick={() => setActiveTab('threading')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'threading' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <Layers className="w-4 h-4" />
                        Multithreading
                    </button>
                    <button 
                        onClick={() => setActiveTab('io')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'io' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <HardDrive className="w-4 h-4" />
                        I/O Persistenza
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* LEFT: Code View - Robust Height and Layout */}
                <div className="relative bg-slate-900/60 rounded-2xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md h-[550px] flex flex-col">
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-950/50 border-b border-white/5">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Server className="w-4 h-4 text-purple-400" />
                            <span className="text-xs font-mono font-bold">server_v0.2.py</span>
                        </div>
                    </div>

                    <div ref={containerRef} className="p-4 font-mono text-[13px] md:text-sm leading-relaxed overflow-y-auto flex-1 scroll-smooth">
                        {THREAD_SERVER_LINES.map((line) => {
                             const isHighlighted = currentStepData?.highlightLines?.includes(line.id);
                             return (
                                <div 
                                    key={line.id}
                                    id={`thread-line-${line.id}`}
                                    className={`relative pl-4 py-0.5 transition-all duration-300 rounded-sm
                                        ${isHighlighted 
                                            ? (activeTab === 'threading' ? 'bg-cyan-500/10 border-l-2 border-cyan-400' : 'bg-emerald-500/10 border-l-2 border-emerald-400') 
                                            : 'opacity-30'}
                                    `}
                                >
                                    <span className="text-slate-600 select-none mr-4 w-6 inline-block text-right text-[10px] opacity-50">{line.id + 1}</span>
                                    <span 
                                        style={{ paddingLeft: `${line.indent * 1.5}rem` }}
                                        dangerouslySetInnerHTML={{ __html: line.html || '&nbsp;' }} 
                                    />
                                </div>
                             );
                        })}
                    </div>
                </div>

                {/* RIGHT: Explanation Panel - Balanced height to match Code View */}
                <div className="flex flex-col gap-6 h-full lg:h-[550px]">
                    <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 h-full flex flex-col backdrop-blur-sm shadow-xl">
                        <div className="mb-4 flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${activeTab === 'threading' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                <ChevronRight className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-black text-white">{currentStepData?.title}</h3>
                        </div>
                        
                        <p className="text-slate-300 leading-relaxed mb-6 text-sm md:text-base">
                            {currentStepData?.description}
                        </p>

                        <div className="flex-1 flex flex-col justify-center">
                            {currentStepData?.visualizer === 'threads' && <ThreadsVisualizer />}
                            {currentStepData?.visualizer === 'json' && <JsonVisualizer />}
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5 flex justify-between">
                             <button 
                                onClick={() => setStep(s => Math.max(0, s - 1))}
                                disabled={step === 0}
                                className="px-4 py-2 rounded-lg text-sm font-bold text-slate-500 hover:text-white disabled:opacity-20 flex items-center gap-2 transition-all"
                            >
                                <ChevronLeft className="w-4 h-4" /> Indietro
                            </button>
                            <button 
                                 onClick={() => setStep(s => Math.min(currentSteps.length - 1, s + 1))}
                                 disabled={step === currentSteps.length - 1}
                                 className={`px-6 py-2 rounded-lg text-sm font-bold shadow-lg disabled:opacity-20 flex items-center gap-2 transition-all ${activeTab === 'threading' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'}`}
                            >
                                Avanti <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};