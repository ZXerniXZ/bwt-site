
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Cpu, Database, Server, FileJson, ArrowDown, Layers, HardDrive, User, Settings, Save, Gift, Snowflake } from 'lucide-react';

interface ThreadingExplanationProps {
  isChristmas?: boolean;
}

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
    { id: 17, html: '<span class="text-slate-500 italic"># ... calcolo BWT ...</span>', indent: 1 },
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
    description: "Per gestire più client contemporaneamente, usiamo il modulo `threading`.",
    highlightLines: [1],
    visualizer: 'threads'
  },
  {
    title: "Il Main Loop",
    description: "Il ciclo `while True` accetta le connessioni. Appena un client arriva, deleghiamo il lavoro.",
    highlightLines: [22, 23],
    visualizer: 'threads'
  },
  {
    title: "Esecuzione Parallela",
    description: "Con `t.start()`, il sistema operativo avvia l'esecuzione parallela.",
    highlightLines: [24, 25],
    visualizer: 'threads'
  }
];

const IO_STEPS = [
  {
    title: "Import JSON & OS",
    description: "La persistenza avviene tramite file JSON. Verifichiamo l'esistenza del file fisico.",
    highlightLines: [2, 3],
    visualizer: 'json'
  },
  {
    title: "Update in RAM",
    description: "Carichiamo la lista dal file JSON. Se il file non esiste, iniziamo con una lista vuota.",
    highlightLines: [7, 8, 9, 10, 11, 12],
    visualizer: 'json'
  },
  {
    title: "Salvataggio Fisico",
    description: "Serializziamo la struttura dati e la scriviamo sul disco in modo persistente.",
    highlightLines: [13, 14],
    visualizer: 'json'
  }
];

const ThreadsVisualizer = ({ isChristmas }: { isChristmas?: boolean }) => {
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
        <div className={`mt-4 border rounded-xl p-4 md:p-6 relative h-[200px] flex flex-col shadow-inner transition-colors overflow-hidden ${isChristmas ? 'bg-red-950/40 border-red-500/20' : 'bg-slate-950/60 border-white/5'}`}>
            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`p-3 rounded-full ${incomingPulse ? (isChristmas ? 'bg-green-500/30' : 'bg-cyan-500/30') : 'bg-slate-900/50'}`}>
                    {isChristmas ? <Gift className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div className="flex-1 px-4">
                    <div className="w-full h-1 bg-slate-800 relative overflow-hidden rounded-full">
                        {incomingPulse && <div className={`absolute inset-0 animate-[move_0.5s_linear_infinite] ${isChristmas ? 'bg-green-400' : 'bg-cyan-400'}`} />}
                    </div>
                </div>
                <div className={`p-3 rounded-lg border transition-all ${incomingPulse ? (isChristmas ? 'border-red-400' : 'border-cyan-400') : 'border-slate-800'}`}>
                    <Server className="w-5 h-5" />
                </div>
            </div>

            <div className="flex-1 grid grid-cols-3 gap-3 relative z-10 overflow-visible">
                {[0, 1, 2].map((slotIndex) => {
                    const thread = threads[slotIndex];
                    const isOccupied = thread && thread.active;
                    return (
                        <div key={slotIndex} className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-700 h-full ${isOccupied ? (thread.status === 'working' ? (isChristmas ? 'bg-green-950/50 border-green-500/60 scale-105' : 'bg-indigo-950/50 border-indigo-500/60 scale-105') : 'bg-slate-900 border-slate-700 opacity-60') : 'bg-slate-950/50 border-white/5 opacity-20'}`}>
                            <Cpu className={`w-6 h-6 mb-1 ${isOccupied && thread.status === 'working' ? (isChristmas ? 'text-green-400 animate-pulse' : 'text-indigo-400 animate-pulse') : 'text-slate-600'}`} />
                            <span className="text-[8px] font-black">{isOccupied ? 'THREAD' : 'IDLE'}</span>
                        </div>
                    );
                })}
            </div>
            <style>{`@keyframes move { from { transform: translateX(-100%); } to { transform: translateX(100%); } }`}</style>
        </div>
    );
};

const JsonVisualizer = ({ isChristmas }: { isChristmas?: boolean }) => {
    const [isSaving, setIsSaving] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setIsSaving(true);
            setTimeout(() => setIsSaving(false), 2000);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`mt-4 border rounded-xl p-4 md:p-6 relative overflow-hidden h-[200px] flex flex-col shadow-inner transition-colors duration-1000 ${isChristmas ? 'bg-red-950/40 border-red-500/20' : 'bg-slate-950/40 border-white/5'}`}>
            <div className="relative z-10 flex-1 flex flex-col justify-between gap-2">
                <div className={`flex items-center gap-3 p-3 rounded-xl border ${isChristmas ? 'bg-red-900/60 border-red-500/30' : 'bg-slate-900/60 border-white/10'}`}>
                    <Database className={`w-6 h-6 ${isSaving ? (isChristmas ? 'text-green-400' : 'text-emerald-400') : 'text-slate-500'}`} />
                    <span className="text-[10px] font-bold text-slate-100 uppercase tracking-widest">Memory RAM</span>
                </div>
                <div className="flex justify-center">
                    <Save className={`w-5 h-5 ${isSaving ? 'text-indigo-400 animate-bounce' : 'text-slate-700'}`} />
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-xl border ${isChristmas ? 'bg-red-950 border-red-500' : 'bg-slate-950 border-white/10'}`}>
                    <HardDrive className="w-6 h-6 text-white" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">output.json</span>
                </div>
            </div>
        </div>
    );
};

export const ThreadingExplanation: React.FC<ThreadingExplanationProps> = ({ isChristmas }) => {
    const [activeTab, setActiveTab] = useState<'threading' | 'io'>('threading');
    const [step, setStep] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const currentSteps = activeTab === 'threading' ? THREADING_STEPS : IO_STEPS;
    const currentStepData = currentSteps[step] || currentSteps[0];

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6">
            <div className="flex justify-center">
                <div className={`flex p-1 rounded-xl border backdrop-blur-md shadow-lg transition-colors duration-1000 ${isChristmas ? 'bg-red-950/80 border-red-500/20' : 'bg-slate-900/80 border-white/10'}`}>
                    <button onClick={() => { setActiveTab('threading'); setStep(0); }} className={`px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${activeTab === 'threading' ? (isChristmas ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20') : 'text-slate-50'}`}>
                        Multithread
                    </button>
                    <button onClick={() => { setActiveTab('io'); setStep(0); }} className={`px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${activeTab === 'io' ? (isChristmas ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20') : 'text-slate-500'}`}>
                        Persistenza
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div className={`rounded-2xl border overflow-hidden shadow-2xl backdrop-blur-md h-[400px] md:h-[450px] flex flex-col order-2 lg:order-1 transition-colors duration-1000 ${isChristmas ? 'bg-red-950/80 border-red-500/20' : 'bg-slate-950/80 border-white/10'}`}>
                    <div className={`px-4 py-2.5 border-b flex items-center justify-between text-[10px] font-mono transition-colors ${isChristmas ? 'bg-red-900/40 border-red-500/10 text-red-400' : 'bg-slate-900 border-white/5 text-slate-500'}`}>
                        <span className="flex items-center gap-2">
                            <Settings className="w-3 h-3" />
                            server_v2.py
                        </span>
                    </div>
                    <div ref={containerRef} className="p-4 md:p-6 font-mono text-[11px] md:text-sm leading-relaxed overflow-y-auto flex-1 no-scrollbar">
                        {THREAD_SERVER_LINES.map((line) => (
                            <div key={line.id} className={`py-0.5 rounded px-2 transition-all ${currentStepData?.highlightLines?.includes(line.id) ? (isChristmas ? 'bg-red-500/20 border-l-2 border-red-500 opacity-100' : 'bg-cyan-500/10 border-l-2 border-cyan-500 opacity-100') : 'opacity-30'}`}>
                                <span dangerouslySetInnerHTML={{ __html: '&nbsp;'.repeat(line.indent * 4) + line.html || '&nbsp;' }} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4 order-1 lg:order-2">
                    <div className={`p-5 md:p-6 rounded-2xl border backdrop-blur-md transition-colors duration-1000 ${isChristmas ? 'bg-red-900/40 border-red-500/10' : 'bg-slate-900/40 border-white/5'}`}>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2">{currentStepData?.title}</h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4 font-medium">{currentStepData?.description}</p>
                        
                        {currentStepData?.visualizer === 'threads' && <ThreadsVisualizer isChristmas={isChristmas} />}
                        {currentStepData?.visualizer === 'json' && <JsonVisualizer isChristmas={isChristmas} />}

                        <div className={`flex justify-between mt-6 pt-4 border-t ${isChristmas ? 'border-red-500/10' : 'border-white/5'}`}>
                            <button onClick={() => setStep(s => Math.max(0, s - 1))} className={`px-4 py-2 text-xs font-bold transition-colors ${isChristmas ? 'text-red-400' : 'text-slate-400'}`} disabled={step === 0}>
                                Precedente
                            </button>
                            <button onClick={() => setStep(s => Math.min(currentSteps.length - 1, s + 1))} className={`px-6 py-2 text-xs font-bold bg-white/5 text-white rounded-lg border transition-colors ${isChristmas ? 'border-red-500/20' : 'border-white/10'}`} disabled={step === currentSteps.length - 1}>
                                Successivo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
