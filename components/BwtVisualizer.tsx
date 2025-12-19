import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, RefreshCw, Play, RotateCw, ArrowRightLeft, ListOrdered, FileOutput, Lightbulb, Zap } from 'lucide-react';

enum Step {
  INPUT = 0,
  ROTATIONS = 1,
  SORT = 2,
  RESULT = 3
}

export const BwtVisualizer: React.FC = () => {
  const [input, setInput] = useState("BANANA");
  const [step, setStep] = useState<Step>(Step.INPUT);

  // Derived state logic
  const originalString = input.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 8); // Limit length for UI
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

  // Reset when input changes
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
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 text-lg font-bold shadow-[0_0_15px_rgba(34,211,238,0.2)]">2</span>
        <h2 className="text-3xl font-bold text-white">Visualizzazione Interattiva</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Visualizer Panel - Semi-transparent dark slate background */}
          <div className="lg:col-span-2 bg-slate-900/60 rounded-3xl overflow-hidden flex flex-col border border-white/5 shadow-2xl backdrop-blur-md">
            {/* Controls Toolbar */}
            <div className="p-4 bg-slate-950/30 border-b border-white/5 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                     <div className="relative group">
                        <input 
                            type="text" 
                            value={originalString}
                            onChange={(e) => setInput(e.target.value)}
                            className="bg-slate-950 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500/50 w-40 tracking-widest font-mono uppercase transition-all placeholder-slate-600 border border-white/5 shadow-inner"
                            placeholder="BANANA"
                            maxLength={8}
                        />
                        <span className="absolute right-3 top-2.5 text-slate-500 text-xs font-mono">$</span>
                     </div>
                     <button 
                        onClick={() => setInput("BANANA")}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        title="Reset Example"
                     >
                        <RefreshCw className="w-4 h-4" />
                     </button>
                </div>

                <div className="flex gap-2">
                     <button 
                        onClick={prevStep}
                        disabled={step === Step.INPUT}
                        className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                     >
                        Indietro
                     </button>
                     <button 
                        onClick={nextStep}
                        disabled={step === Step.RESULT}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                     >
                        Avanti <ChevronRight className="w-4 h-4" />
                     </button>
                </div>
            </div>

            {/* Stepper Progress */}
            <div className="px-4 py-3 flex items-center justify-center gap-2 overflow-x-auto border-b border-white/5 bg-slate-950/20">
                 <StepIndicator current={step} target={Step.INPUT} icon={<Play className="w-3 h-3" />} label="Input" />
                <div className="w-8 h-px bg-white/10" />
                <StepIndicator current={step} target={Step.ROTATIONS} icon={<RotateCw className="w-3 h-3" />} label="Rotazioni" />
                <div className="w-8 h-px bg-white/10" />
                <StepIndicator current={step} target={Step.SORT} icon={<ListOrdered className="w-3 h-3" />} label="Sort" />
                <div className="w-8 h-px bg-white/10" />
                <StepIndicator current={step} target={Step.RESULT} icon={<FileOutput className="w-3 h-3" />} label="Output" />
            </div>

            {/* Visualization Area */}
            <div className="flex-1 p-8 min-h-[400px] flex items-center justify-center relative bg-gradient-to-b from-slate-900/0 to-slate-950/50">
                
                <div className="relative z-10 w-full max-w-xl">
                    {step === Step.INPUT && (
                         <div className="text-center space-y-8 animate-fade-in">
                            <h3 className="text-xl text-slate-300 font-light tracking-wide">Preparazione Stringa</h3>
                            <div className="flex justify-center gap-2">
                                {originalString.split('').map((char, i) => (
                                    <CharBox key={i} char={char} />
                                ))}
                                <CharBox char="$" isMarker />
                            </div>
                            <p className="text-slate-500 text-sm">Aggiungiamo il terminatore speciale <span className="text-yellow-500 font-mono font-bold">$</span></p>
                         </div>
                    )}

                    {step === Step.ROTATIONS && (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="text-xl text-center text-slate-300 font-light">Generazione Rotazioni</h3>
                            <div className="grid gap-2 justify-center">
                                {rotations.map((row, i) => (
                                    <div key={i} className="flex font-mono text-lg p-1 rounded hover:bg-white/5 transition-colors">
                                        <span className="w-6 text-slate-600 text-xs flex items-center">{i}</span>
                                        {row.split('').map((c, idx) => (
                                            <span key={idx} className={`w-8 text-center ${c === '$' ? 'text-yellow-600' : 'text-slate-400'}`}>{c}</span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === Step.SORT && (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="text-xl text-center text-slate-300 font-light">Ordinamento Lessicografico</h3>
                            <div className="flex gap-8 justify-center items-center flex-col md:flex-row">
                                 {/* Hint of Unsorted */}
                                 <div className="hidden md:block opacity-20 scale-90 blur-[2px]">
                                    {rotations.map((row, i) => (
                                        <div key={`u-${i}`} className="flex font-mono text-sm">
                                            {row.split('').map((c, idx) => <span key={idx} className="w-4 text-center text-slate-500">{c}</span>)}
                                        </div>
                                    ))}
                                 </div>
                                 
                                 <ArrowRightLeft className="hidden md:block w-6 h-6 text-slate-600" />

                                 <div className="grid gap-2">
                                    {sortedRotations.map((row, i) => (
                                        <div key={i} className="flex font-mono text-lg p-1 rounded hover:bg-white/5">
                                            <span className="w-6 text-slate-600 text-xs flex items-center">{i}</span>
                                            {row.split('').map((c, idx) => (
                                                <span key={idx} className={`w-8 text-center ${c === '$' ? 'text-yellow-500' : 'text-slate-400'} ${idx === 0 ? 'text-white font-bold' : ''}`}>{c}</span>
                                            ))}
                                        </div>
                                    ))}
                                 </div>
                            </div>
                        </div>
                    )}

                    {step === Step.RESULT && (
                        <div className="space-y-8 animate-fade-in">
                            <h3 className="text-xl text-center text-slate-300 font-light">Ultima Colonna</h3>
                            <div className="flex justify-center">
                                 <div className="grid gap-2">
                                    {sortedRotations.map((row, i) => (
                                        <div key={i} className="flex font-mono text-lg p-1 rounded opacity-60">
                                            {row.split('').map((c, idx) => {
                                                const isLast = idx === row.length - 1;
                                                return (
                                                    <span key={idx} className={`w-8 text-center ${isLast ? 'opacity-0 w-0' : ''} ${c === '$' ? 'text-yellow-600' : 'text-slate-500'}`}>{c}</span>
                                                )
                                            })}
                                            {/* Highlighted Last Column */}
                                            <div className="w-10 flex items-center justify-center font-bold text-cyan-300 bg-cyan-950/50 rounded ml-2 shadow-[0_0_8px_rgba(34,211,238,0.2)]">
                                                {row[row.length-1]}
                                            </div>
                                        </div>
                                    ))}
                                 </div>
                            </div>
                            
                            <div className="mt-8 text-center p-6 bg-cyan-950/10 rounded-2xl border border-cyan-500/10 inline-block mx-auto">
                                <span className="text-slate-500 text-xs uppercase tracking-widest block mb-2">Output BWT</span>
                                <div className="text-4xl font-mono font-bold text-cyan-400 tracking-wider drop-shadow-lg">
                                    {result}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
          </div>

          {/* Explanation Sidebar - Card Style */}
          <div className="bg-slate-900/40 p-6 rounded-3xl border border-white/5 flex flex-col gap-6 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                  <Lightbulb className="w-5 h-5" />
                  <h3 className="font-bold text-lg">Il Segreto</h3>
              </div>
              
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                  <p>
                      Hai notato come l'output spesso presenta <strong>lettere uguali vicine</strong>? (es. "NN", "AA").
                  </p>
                  <p>
                      La BWT raggruppa caratteri che hanno lo <em>stesso contesto successivo</em>. Se "AN" appare molte volte, la 'N' si raggruppa.
                  </p>
              </div>

              <div className="mt-auto border-t border-white/10 pt-6">
                  <div className="flex items-center gap-2 text-slate-200 mb-2 font-bold text-sm">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span>Perché è utile?</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                      Le stringhe con caratteri ripetuti ("BBNNAAA$") sono banali da comprimere (Run-Length Encoding).
                  </p>
              </div>
          </div>

      </div>
    </div>
  );
};

const CharBox: React.FC<{char: string, isMarker?: boolean}> = ({ char, isMarker }) => (
    <div className={`
        w-12 h-14 flex items-center justify-center text-2xl font-mono font-bold rounded-lg transition-all shadow-lg
        ${isMarker 
            ? 'text-yellow-500 bg-yellow-950/30 border border-yellow-500/20' 
            : 'text-slate-200 bg-slate-800 border border-slate-700'}
    `}>
        {char}
    </div>
);

const StepIndicator: React.FC<{current: Step, target: Step, icon: React.ReactNode, label: string}> = ({ current, target, icon, label }) => {
    const isActive = current === target;
    const isCompleted = current > target;
    
    return (
        <div className={`flex items-center gap-2 ${isActive ? 'text-white' : isCompleted ? 'text-slate-500' : 'text-slate-700'}`}>
            <div className={`p-1.5 rounded-full ${isActive ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : isCompleted ? 'bg-slate-800' : 'bg-transparent border border-slate-800'}`}>
                {icon}
            </div>
            <span className="hidden md:block text-xs font-bold uppercase tracking-wider">{label}</span>
        </div>
    );
};