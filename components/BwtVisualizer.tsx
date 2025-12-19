
import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, RefreshCw, Play, RotateCw, ArrowRightLeft, ListOrdered, FileOutput, Lightbulb, Zap, ChevronLeft } from 'lucide-react';

enum Step {
  INPUT = 0,
  ROTATIONS = 1,
  SORT = 2,
  RESULT = 3
}

export const BwtVisualizer: React.FC = () => {
  const [input, setInput] = useState("BANANA");
  const [step, setStep] = useState<Step>(Step.INPUT);

  const originalString = input.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 8);
  const stringWithMarker = originalString + "$";
  
  const rotations = useMemo(() => {
    const res = [];
    const n = stringWithMarker.length;
    for (let i = 0; i < n; i++) {
      res.push(stringWithMarker.slice(i) + stringWithMarker.slice(0, i));
    }
    return res;
  }, [stringWithMarker]);

  const sortedRotations = useMemo(() => {
    return [...rotations].sort();
  }, [rotations]);

  const result = sortedRotations.map(r => r[r.length - 1]).join("");

  useEffect(() => {
    setStep(Step.INPUT);
  }, [originalString]);

  const nextStep = () => {
    if (step < Step.RESULT) setStep(s => s + 1);
  };

  const prevStep = () => {
    if (step > Step.INPUT) setStep(s => s - 1);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/30 text-cyan-400 text-lg font-bold">2</span>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Sandbox Interattiva</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl md:rounded-3xl overflow-hidden flex flex-col border border-white/10 shadow-2xl backdrop-blur-md">
            
            {/* Header / Controls */}
            <div className="p-4 md:p-5 bg-slate-800/40 border-b border-white/10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                <div className="flex items-center gap-3">
                     <div className="relative flex-1 md:flex-none">
                        <input 
                            aria-label="Input per BWT"
                            type="text" 
                            value={originalString}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full md:w-44 bg-slate-950 text-white px-4 py-3 md:py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 tracking-widest font-mono font-bold uppercase transition-all border border-white/20 shadow-inner text-lg md:text-base"
                            placeholder="BANANA"
                            maxLength={8}
                        />
                        <span className="absolute right-4 md:right-3 top-1/2 -translate-y-1/2 text-yellow-500 font-bold font-mono text-xl md:text-base">$</span>
                     </div>
                     <button 
                        onClick={() => setInput("BANANA")}
                        className="p-3 md:p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-white/5 bg-slate-900/50 md:bg-transparent"
                        title="Reset Esempio"
                     >
                        <RefreshCw className="w-5 h-5 md:w-4 md:h-4" />
                     </button>
                </div>

                <div className="flex gap-2 md:gap-3">
                     <button 
                        onClick={prevStep}
                        disabled={step === Step.INPUT}
                        className="flex-1 md:flex-none px-4 md:px-5 py-3 md:py-2 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 rounded-lg disabled:opacity-20 disabled:cursor-not-allowed transition-colors border border-white/10 md:border-transparent bg-slate-800/50 md:bg-transparent"
                     >
                        Indietro
                     </button>
                     <button 
                        onClick={nextStep}
                        disabled={step === Step.RESULT}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 md:px-6 py-3 md:py-2 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition shadow-lg shadow-cyan-500/20 active:scale-95"
                     >
                        Avanti <ChevronRight className="w-4 h-4" />
                     </button>
                </div>
            </div>

            {/* Mobile-friendly Steps Breadcrumbs */}
            <div className="px-2 md:px-4 py-3 flex items-center justify-center gap-1 md:gap-2 overflow-x-auto border-b border-white/10 bg-slate-950/40 no-scrollbar">
                <StepIndicator current={step} target={Step.INPUT} icon={<Play className="w-3 h-3" />} label="In" />
                <div className="w-4 md:w-8 h-px bg-white/10" />
                <StepIndicator current={step} target={Step.ROTATIONS} icon={<RotateCw className="w-3 h-3" />} label="Rot" />
                <div className="w-4 md:w-8 h-px bg-white/10" />
                <StepIndicator current={step} target={Step.SORT} icon={<ListOrdered className="w-3 h-3" />} label="Sort" />
                <div className="w-4 md:w-8 h-px bg-white/10" />
                <StepIndicator current={step} target={Step.RESULT} icon={<FileOutput className="w-3 h-3" />} label="Out" />
            </div>

            <div className="flex-1 p-4 md:p-8 min-h-[380px] md:min-h-[420px] flex items-center justify-center relative bg-gradient-to-b from-slate-900/20 to-slate-950/80">
                <div className="relative z-10 w-full max-w-xl">
                    {step === Step.INPUT && (
                         <div className="text-center space-y-8 md:space-y-10 animate-fade-in px-2">
                            <h3 className="text-lg md:text-xl text-white font-bold tracking-wide">Preparazione</h3>
                            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                                {originalString.split('').map((char, i) => (
                                    <CharBox key={i} char={char} />
                                ))}
                                <CharBox char="$" isMarker />
                            </div>
                            <p className="text-slate-300 text-sm md:text-base max-w-md mx-auto leading-relaxed">
                                Aggiungiamo il terminatore speciale <span className="text-yellow-400 font-mono font-bold">$</span> per rendere l'algoritmo invertibile.
                            </p>
                         </div>
                    )}

                    {step === Step.ROTATIONS && (
                        <div className="space-y-4 md:space-y-6 animate-fade-in overflow-x-hidden">
                            <h3 className="text-lg md:text-xl text-center text-white font-bold">Rotazioni Cicliche</h3>
                            <div className="grid gap-1 md:gap-2 justify-center">
                                {rotations.map((row, i) => (
                                    <div key={i} className="flex font-mono text-base md:text-lg p-1 md:p-1.5 rounded-lg border border-transparent hover:border-white/10 transition-all">
                                        <span className="w-6 md:w-8 text-slate-500 text-[10px] md:text-xs flex items-center font-bold">{i}</span>
                                        {row.split('').map((c, idx) => (
                                            <span key={idx} className={`w-7 md:w-9 text-center font-bold ${c === '$' ? 'text-yellow-400' : 'text-slate-100'}`}>{c}</span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === Step.SORT && (
                        <div className="space-y-4 md:space-y-6 animate-fade-in">
                            <h3 className="text-lg md:text-xl text-center text-white font-bold">Ordinamento Lessicografico</h3>
                            <div className="flex gap-4 md:gap-8 justify-center items-center flex-col md:flex-row">
                                 <div className="grid gap-1 md:gap-2">
                                    {sortedRotations.map((row, i) => (
                                        <div key={i} className="flex font-mono text-base md:text-lg p-1 md:p-1.5 rounded-lg bg-slate-800/30 border border-white/5 shadow-sm">
                                            <span className="w-6 md:w-8 text-slate-500 text-[10px] md:text-xs flex items-center font-bold">{i}</span>
                                            {row.split('').map((c, idx) => (
                                                <span key={idx} className={`w-7 md:w-9 text-center font-bold ${c === '$' ? 'text-yellow-400' : 'text-slate-200'} ${idx === 0 ? 'text-cyan-400' : ''}`}>{c}</span>
                                            ))}
                                        </div>
                                    ))}
                                 </div>
                            </div>
                        </div>
                    )}

                    {step === Step.RESULT && (
                        <div className="space-y-6 md:space-y-10 animate-fade-in px-2">
                            <h3 className="text-lg md:text-xl text-center text-white font-bold">L'ultima Colonna</h3>
                            <div className="flex justify-center scale-90 md:scale-100 origin-center">
                                 <div className="grid gap-1 md:gap-2">
                                    {sortedRotations.map((row, i) => (
                                        <div key={i} className="flex font-mono text-base md:text-lg p-1 rounded-lg bg-slate-800/10 border border-white/5">
                                            {row.split('').map((c, idx) => {
                                                const isLast = idx === row.length - 1;
                                                return (
                                                    <span key={idx} className={`w-7 md:w-9 text-center font-bold ${isLast ? 'hidden' : 'opacity-20'} ${c === '$' ? 'text-yellow-400' : 'text-slate-400'}`}>{c}</span>
                                                )
                                            })}
                                            <div className="w-10 h-8 md:w-12 md:h-10 flex items-center justify-center font-black text-cyan-300 bg-cyan-500/20 rounded-lg ml-2 border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                                                {row[row.length-1]}
                                            </div>
                                        </div>
                                    ))}
                                 </div>
                            </div>
                            
                            <div className="text-center p-6 md:p-8 bg-slate-800/50 rounded-2xl md:rounded-3xl border border-cyan-400/20 shadow-2xl">
                                <span className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] block mb-2 md:mb-3">RISULTATO</span>
                                <div className="text-3xl md:text-5xl font-mono font-black text-white tracking-widest break-all">
                                    {result}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
          </div>

          <div className="bg-slate-800/60 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/15 flex flex-col gap-6 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-3 text-cyan-400">
                  <div className="p-2 bg-cyan-400/10 rounded-lg">
                    <Lightbulb className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="font-black text-lg md:text-xl text-white tracking-tight">Il Segreto</h3>
              </div>
              
              <div className="space-y-4 text-sm md:text-base text-slate-200 leading-relaxed font-medium">
                  <p>
                      La BWT non è una compressione, ma una <strong>permutazione reversibile</strong>.
                  </p>
                  <p>
                      Sposta i simboli con lo stesso contesto a posizioni vicine, creando lunghe sequenze di lettere ripetute.
                  </p>
              </div>

              <div className="mt-auto border-t border-white/10 pt-6 space-y-4">
                  <div className="flex items-center gap-3 text-slate-100 font-bold text-sm md:text-base">
                      <Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                      <span>Ottimizzazione</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                      Stringhe raggruppate sono ideali per algoritmi come <strong>RLE</strong> o <strong>MTF</strong>, rendendo i dati molto più compatti.
                  </p>
              </div>
          </div>

      </div>
    </div>
  );
};

const CharBox: React.FC<{char: string, isMarker?: boolean}> = ({ char, isMarker }) => (
    <div className={`
        w-10 h-12 md:w-14 md:h-16 flex items-center justify-center text-xl md:text-3xl font-mono font-black rounded-lg md:rounded-xl transition-all shadow-xl border-2
        ${isMarker 
            ? 'text-yellow-400 bg-yellow-400/10 border-yellow-500/40 shadow-yellow-500/10' 
            : 'text-white bg-slate-800 border-white/10 shadow-black/40'}
    `}>
        {char}
    </div>
);

const StepIndicator: React.FC<{current: Step, target: Step, icon: React.ReactNode, label: string}> = ({ current, target, icon, label }) => {
    const isActive = current === target;
    const isCompleted = current > target;
    
    return (
        <div className={`flex items-center gap-1 md:gap-2.5 transition-all duration-300 ${isActive ? 'text-white scale-105' : isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
            <div className={`p-1.5 md:p-2 rounded-lg border-2 transition-all ${isActive ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.4)]' : isCompleted ? 'bg-slate-700 border-slate-600' : 'bg-transparent border-slate-800'}`}>
                {icon}
            </div>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-wider">{label}</span>
        </div>
    );
};
