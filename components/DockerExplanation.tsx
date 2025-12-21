import React, { useState, useEffect, useRef } from 'react';
import { Box, FileCode, Container, Share2, Database, ChevronRight, Snowflake, Gift, Rocket, Globe, Terminal, HardDrive, ArrowRight, Settings, Activity, Server, Layers, CheckCircle2 } from 'lucide-react';

interface DockerExplanationProps {
  isChristmas?: boolean;
}

const DOCKERFILE_LINES = [
    { id: 0, html: '<span class="text-purple-400">FROM</span> python:3.11-slim', indent: 0 },
    { id: 1, html: '<span class="text-purple-400">WORKDIR</span> /app', indent: 0 },
    { id: 2, html: '<span class="text-purple-400">COPY</span> server.py .', indent: 0 },
    { id: 3, html: '<span class="text-purple-400">EXPOSE</span> <span class="text-orange-400">65432</span>', indent: 0 },
    { id: 4, html: '<span class="text-purple-400">ENV</span> PYTHONUNBUFFERED=<span class="text-orange-400">1</span>', indent: 0 },
    { id: 5, html: '<span class="text-purple-400">CMD</span> [<span class="text-emerald-400">"python"</span>, <span class="text-emerald-400">"server.py"</span>]', indent: 0 },
];

const COMPOSE_LINES = [
    { id: 0, html: 'version: <span class="text-emerald-400">"3.3"</span>', indent: 0 },
    { id: 1, html: 'services:', indent: 0 },
    { id: 2, html: '  server:', indent: 0 },
    { id: 3, html: '    container_name: bwt-server', indent: 1 },
    { id: 4, html: '    ports:', indent: 1 },
    { id: 5, html: '- <span class="text-emerald-400">"65432:65432"</span>', indent: 2 },
    { id: 6, html: '    volumes:', indent: 1 },
    { id: 7, html: '- ./data:/data', indent: 2 },
];

const BRIDGE_LINES = [
    { id: 0, html: '<span class="text-purple-400">def</span> <span class="text-yellow-200">connect_to_socket</span>(message):', indent: 0 },
    { id: 1, html: '    <span class="text-purple-400">with</span> socket.socket(socket.AF_INET) <span class="text-purple-400">as</span> s:', indent: 0 },
    { id: 2, html: '        s.connect((SOCKET_HOST, SOCKET_PORT))', indent: 1 },
    { id: 3, html: '        s.send(message.encode())', indent: 1 },
    { id: 4, html: '        <span class="text-slate-500 italic"># Converte HTTP in TCP Socket</span>', indent: 1 },
    { id: 5, html: '        <span class="text-purple-400">return</span> pickle.loads(s.recv(<span class="text-orange-400">4096</span>))', indent: 1 },
    { id: 6, html: '', indent: 0 },
    { id: 7, html: '<span class="text-purple-400">@app.route</span>(<span class="text-emerald-400">"/api/bwt"</span>, methods=[<span class="text-emerald-400">"POST"</span>])', indent: 0 },
    { id: 8, html: '<span class="text-purple-400">def</span> <span class="text-yellow-200">api_bwt</span>():', indent: 0 },
    { id: 9, html: '    text = request.get_json().get(<span class="text-emerald-400">"text"</span>)', indent: 1 },
    { id: 10, html: '    response = <span class="text-yellow-200">connect_to_socket</span>(text)', indent: 1 },
    { id: 11, html: '    <span class="text-purple-400">return</span> jsonify(response)', indent: 1 },
    { id: 12, html: '', indent: 0 },
    { id: 13, html: '<span class="text-purple-400">@app.route</span>(<span class="text-emerald-400">"/api/output"</span>, methods=[<span class="text-emerald-400">"GET"</span>])', indent: 0 },
    { id: 14, html: '<span class="text-purple-400">def</span> <span class="text-yellow-200">api_output</span>():', indent: 0 },
    { id: 15, html: '    <span class="text-purple-400">return</span> <span class="text-yellow-200">connect_to_socket</span>(<span class="text-emerald-400">"GET_OUTPUT"</span>)', indent: 1 },
];

const STEPS = [
    {
        id: 'dockerfile',
        title: 'Packaging & Layers',
        desc: 'Il Dockerfile automatizza la creazione di una "immagine" immutabile. Ogni istruzione crea un layer che viene cachato per build fulminee.',
        lines: DOCKERFILE_LINES,
        fileName: 'Dockerfile',
        visualizer: 'build'
    },
    {
        id: 'compose',
        title: 'Orchestration & Persistence',
        desc: 'Docker Compose gestisce il ciclo di vita del container e mappa i volumi: i dati scritti dentro /data sopravvivono al riavvio del container perché salvati sull\'host.',
        lines: COMPOSE_LINES,
        fileName: 'docker-compose.yml',
        visualizer: 'compose'
    },
    {
        id: 'bridge',
        title: 'API Gateway Bridge',
        desc: 'Il bridge Flask converte le richieste HTTP Web in comandi Socket TCP per il server BWT, agendo come interprete tra il browser e la logica core.',
        lines: BRIDGE_LINES,
        fileName: 'api_bridge.py',
        visualizer: 'bridge'
    }
];

const BuildVisualizer = ({ isChristmas }: { isChristmas?: boolean }) => {
    const [progress, setProgress] = useState(0);
    const [log, setLog] = useState<string[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p < 100) return p + 2;
                return 100;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const logIndex = Math.min(Math.floor(progress / 15), 6);
        const currentLogs = [
            "Step 1/6 : FROM python:3.11-slim",
            "Step 2/6 : WORKDIR /app",
            "Step 3/6 : COPY server.py .",
            "Step 4/6 : EXPOSE 65432",
            "Step 5/6 : ENV PYTHONUNBUFFERED=1",
            "Step 6/6 : CMD [\"python\", \"server.py\"]",
            "Build finished. Image ID: sha256:7f8a..."
        ];
        setLog(currentLogs.slice(0, logIndex + 1));
    }, [progress]);

    return (
        <div className="flex flex-col h-[220px] p-4 font-mono">
            <div className="flex-1 overflow-hidden space-y-1 mb-4">
                {log.map((line, i) => (
                    <div key={i} className={`text-[9px] md:text-[10px] flex items-center gap-2 ${i === log.length - 1 && progress < 100 ? 'animate-pulse' : ''} ${i === 6 ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                        {i === 6 && progress === 100 ? <CheckCircle2 className="w-3 h-3" /> : <ChevronRight className="w-3 h-3 opacity-30" />}
                        {line}
                    </div>
                ))}
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span>{progress === 100 ? 'Image Ready' : 'Building Image...'}</span>
                    <span>{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-300 ${isChristmas ? 'bg-red-500' : 'bg-cyan-500'}`} style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    );
};

const ComposeVisualizer = ({ isChristmas }: { isChristmas?: boolean }) => {
    return (
        <div className="flex flex-col items-center justify-center h-[220px] space-y-6">
            <div className="flex items-center gap-6 relative">
                <div className="flex flex-col items-center gap-2">
                    <HardDrive className="w-10 h-10 text-slate-500" />
                    <span className="text-[9px] font-bold text-slate-400">HOST DISK</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className={`h-0.5 w-16 mb-1 ${isChristmas ? 'bg-red-500/40' : 'bg-cyan-500/40'}`} />
                    <span className={`text-[8px] font-black ${isChristmas ? 'text-red-400' : 'text-cyan-400'}`}>VOLUME BINDING</span>
                    <ArrowRight className={`w-4 h-4 mt-1 ${isChristmas ? 'text-red-500' : 'text-cyan-500'}`} />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Box className={`w-12 h-12 ${isChristmas ? 'text-green-400' : 'text-cyan-400'}`} />
                    <span className="text-[9px] font-bold text-slate-400">CONTAINER</span>
                </div>
            </div>
            <div className={`px-4 py-2 rounded-lg border text-[10px] font-mono ${isChristmas ? 'bg-red-900/20 border-red-500/20 text-red-300' : 'bg-slate-900 border-white/5 text-slate-400'}`}>
                path: <span className="text-white">./data</span> (Host) <span className="mx-2">→</span> <span className="text-white">/data</span> (Guest)
            </div>
        </div>
    );
};

const BridgeVisualizer = ({ isChristmas }: { isChristmas?: boolean }) => {
    const [active, setActive] = useState(false);
    return (
        <div className="flex flex-col items-center justify-center h-[220px] space-y-6 p-4">
            <div className="w-full max-w-sm grid grid-cols-3 gap-2 items-center">
                <div className="flex flex-col items-center gap-2">
                    <Globe className={`w-6 h-6 ${active ? 'text-blue-400 animate-pulse' : 'text-slate-600'}`} />
                    <span className="text-[8px] font-black text-slate-500">HTTP REQUEST</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Share2 className={`w-10 h-10 ${active ? (isChristmas ? 'text-red-400' : 'text-cyan-400') : 'text-slate-700'}`} />
                    <span className="text-[8px] font-black text-slate-500">FLASK BRIDGE</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Server className={`w-6 h-6 ${active ? 'text-emerald-400 animate-pulse' : 'text-slate-600'}`} />
                    <span className="text-[8px] font-black text-slate-500">SOCKET SERVER</span>
                </div>
            </div>
            <div className="w-full flex justify-center">
                 <div className={`h-1 flex-1 max-w-[200px] rounded-full overflow-hidden bg-slate-800 relative`}>
                    {active && <div className={`absolute inset-y-0 w-1/4 animate-[flow_1s_linear_infinite] ${isChristmas ? 'bg-red-500' : 'bg-cyan-500'}`} />}
                 </div>
            </div>
            <button 
                onClick={() => { setActive(true); setTimeout(() => setActive(false), 2000); }} 
                className={`group flex items-center gap-3 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 ${isChristmas ? 'bg-red-600 hover:bg-red-500 shadow-red-900/40 text-white' : 'bg-cyan-500 hover:bg-cyan-400 shadow-cyan-900/40 text-slate-950'}`}
            >
                {active ? 'Transmitting Data...' : 'Simulate API Call'}
                <Activity className={`w-4 h-4 ${active ? 'animate-spin' : ''}`} />
            </button>
            <style>{`@keyframes flow { from { left: -25%; } to { left: 100%; } }`}</style>
        </div>
    );
};

export const DockerExplanation: React.FC<DockerExplanationProps> = ({ isChristmas }) => {
  const [stepIdx, setStepIdx] = useState(0);
  const currentStep = STEPS[stepIdx];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="flex justify-center">
          <div className={`flex p-1 rounded-xl border backdrop-blur-md shadow-lg transition-all duration-1000 ${isChristmas ? 'bg-red-950/90 border-red-500/30' : 'bg-slate-900/90 border-white/10'}`}>
              {STEPS.map((s, idx) => (
                  <button key={s.id} onClick={() => setStepIdx(idx)} className={`px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${stepIdx === idx ? (isChristmas ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20') : 'text-slate-500'}`}>
                    {idx === 0 ? 'Build' : idx === 1 ? 'Persistence' : 'Gateway'}
                  </button>
              ))}
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className={`rounded-2xl border overflow-hidden shadow-2xl backdrop-blur-md h-[400px] md:h-[450px] flex flex-col order-2 lg:order-1 transition-all duration-1000 ${isChristmas ? 'bg-red-950/80 border-red-500/20' : 'bg-slate-950/80 border-white/10'}`}>
             <div className={`px-4 py-2.5 border-b flex items-center justify-between text-[10px] font-mono transition-colors ${isChristmas ? 'bg-red-900/40 border-red-500/10 text-red-400' : 'bg-slate-900 border-white/5 text-slate-500'}`}>
                <span className="flex items-center gap-2">
                    <Box className="w-3 h-3" />
                    {currentStep.fileName}
                </span>
                <span className="opacity-50 uppercase tracking-widest text-[8px]">Configuration File</span>
             </div>
             <div className="p-4 md:p-6 font-mono text-[11px] md:text-sm leading-relaxed overflow-y-auto flex-1 no-scrollbar">
                {currentStep.lines.map((line, idx) => (
                    <div key={idx} className={`py-0.5 rounded px-2 transition-colors ${stepIdx === 2 && idx >= 7 ? (isChristmas ? 'bg-red-500/20 border-l-2 border-red-500' : 'bg-cyan-500/10 border-l-2 border-cyan-500') : 'hover:bg-white/5'}`}>
                        <span dangerouslySetInnerHTML={{ __html: '&nbsp;'.repeat((line.indent || 0) * 4) + line.html }} />
                    </div>
                ))}
             </div>
          </div>

          <div className="flex flex-col gap-4 order-1 lg:order-2">
                <div className={`p-5 md:p-6 rounded-2xl border backdrop-blur-md transition-all duration-1000 flex flex-col h-full ${isChristmas ? 'bg-red-900/40 border-red-500/10' : 'bg-slate-900/40 border-white/5'}`}>
                    <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2">{currentStep.title}</h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">{currentStep.desc}</p>
                        <div className="rounded-xl border border-white/5 bg-black/40 overflow-hidden shadow-inner">
                            {currentStep.visualizer === 'build' && <BuildVisualizer isChristmas={isChristmas} />}
                            {currentStep.visualizer === 'compose' && <ComposeVisualizer isChristmas={isChristmas} />}
                            {currentStep.visualizer === 'bridge' && <BridgeVisualizer isChristmas={isChristmas} />}
                        </div>
                    </div>
                    <div className="mt-8 flex justify-between items-center">
                        <div className="flex gap-1">
                            {STEPS.map((_, i) => (
                                <div key={i} className={`h-1 w-4 rounded-full transition-all ${stepIdx === i ? (isChristmas ? 'bg-red-500 w-8' : 'bg-cyan-500 w-8') : 'bg-slate-800'}`} />
                            ))}
                        </div>
                        <button onClick={() => setStepIdx(s => (s + 1) % STEPS.length)} className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${isChristmas ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-white text-slate-950 hover:bg-slate-200'}`}>
                            {stepIdx === STEPS.length - 1 ? 'Ricomincia' : 'Approfondisci'} <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
          </div>
      </div>
    </div>
  );
};
