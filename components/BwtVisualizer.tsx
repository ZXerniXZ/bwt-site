
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
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/30 text-cyan-400 text-lg font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)]">2</span>
        <h2 className="text-3xl font-bold text-white">Visualizzazione Interattiva</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-slate-900/80 rounded-3xl overflow-hidden flex flex-col border border-white/15 shadow-2xl backdrop-blur-md">
            <div className="p-5 bg-slate-800/40 border-b border-white/10 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                     <div className="relative group">
                        <input 
                            aria-label="Input per BWT"
                            type="text" 
                            value={originalString}
                            onChange={(e) => setInput(e.target.value)}
                            className="bg-slate-950 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 w-44 tracking-widest font-mono font-bold uppercase transition-all border border-white/20 shadow-inner"
                            placeholder="BANANA"
                            maxLength={8}
                        />
                        <span className="absolute right-3 top-3 text-yellow-500 font-bold font-mono">$</span>
                     </div>
                     <button 
                        onClick={() => setInput("BANANA")}
                        className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-white/5"
                        title="Reset Esempio"
                     >
                        <RefreshCw className="w-4 h-4" />
                     </button>
                </div>

                <div className="flex gap-2">
                     <button 
                        onClick={prevStep}
                        disabled={step === Step.INPUT}
                        className="px-5 py-2 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 rounded-lg disabled:opacity-20 disabled:cursor-not-allowed transition-colors border border-transparent"
                     >
                        Indietro
                     </button>
                     <button 
                        onClick={nextStep}
                        disabled={step === Step.RESULT}
                        className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition shadow-lg shadow-cyan-500/20 active:scale-95"
                     >
                        Avanti <ChevronRight className="w-4 h-4" />
                     </button>
                </div>
            </div>

            <div className="px-4 py-3 flex items-center justify-center gap-2 overflow-x-auto border-b border-white/10 bg-slate-950/40">
                <StepIndicator current={step} target={Step.INPUT} icon={<Play className="w-3 h-3" />} label="Input" />
                <div className="w-8 h-px bg-white/10" />
                <StepIndicator current={step} target={Step.ROTATIONS} icon={<RotateCw className="w-3 h-3" />} label="Rotazioni" />
                <div className="w-8 h-px bg-white/10" />
                <StepIndicator current={step} target={Step.SORT} icon={<ListOrdered className="w-3 h-3" />} label="Sort" />
                <div className="w-8 h-px bg-white/10" />
                <StepIndicator current={step} target={Step.RESULT} icon={<FileOutput className="w-3 h-3" />} label="Output" />
            </div>

            <div className="flex-1 p-8 min-h-[420px] flex items-center justify-center relative bg-gradient-to-b from-slate-900/20 to-slate-950/80">
                
                <div className="relative z-10 w-full max-w-xl">
                    {step === Step.INPUT && (
                         <div className="text-center space-y-10 animate-fade-in">
                            <h3 className="text-xl text-white font-bold tracking-wide">Preparazione della Stringa</h3>
                            <div className="flex justify-center gap-3">
                                {originalString.split('').map((char, i) => (
                                    <CharBox key={i} char={char} />
                                ))}
                                <CharBox char="$" isMarker />
                            </div>
                            <p className="text-slate-300 text-base max-w-md mx-auto leading-relaxed">
                                Aggiungiamo il terminatore speciale <span className="text-yellow-400 font-mono font-bold">$</span> per rendere la trasformazione invertibile univocamente.
                            </p>
                         </div>
                    )}

                    {step === Step.ROTATIONS && (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="text-xl text-center text-white font-bold">Generazione Rotazioni Cicliche</h3>
                            <div className="grid gap-2 justify-center">
                                {rotations.map((row, i) => (
                                    <div key={i} className="flex font-mono text-lg p-1.5 rounded-lg border border-transparent hover:border-white/10 hover:bg-slate-800/50 transition-all">
                                        <span className="w-8 text-slate-500 text-xs flex items-center font-bold">{i}</span>
                                        {row.split('').map((c, idx) => (
                                            <span key={idx} className={`w-9 text-center font-bold ${c === '$' ? 'text-yellow-400' : 'text-slate-100'}`}>{c}</span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === Step.SORT && (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="text-xl text-center text-white font-bold">Ordinamento Lessicografico (Sort)</h3>
                            <div className="flex gap-8 justify-center items-center flex-col md:flex-row">
                                 <div className="hidden md:block opacity-10 scale-90 blur-[1px]">
                                    {rotations.map((row, i) => (
                                        <div key={`u-${i}`} className="flex font-mono text-sm">
                                            {row.split('').map((c, idx) => <span key={idx} className="w-4 text-center text-slate-400">{c}</span>)}
                                        </div>
                                    ))}
                                 </div>
                                 
                                 <div className="p-2 bg-slate-800 rounded-full text-cyan-400 border border-white/10 shadow-lg">
                                    <ArrowRightLeft className="w-5 h-5 rotate-90 md:rotate-0" />
                                 </div>

                                 <div className="grid gap-2">
                                    {sortedRotations.map((row, i) => (
                                        <div key={i} className="flex font-mono text-lg p-1.5 rounded-lg bg-slate-800/30 border border-white/5 shadow-sm">
                                            <span className="w-8 text-slate-500 text-xs flex items-center font-bold">{i}</span>
                                            {row.split('').map((c, idx) => (
                                                <span key={idx} className={`w-9 text-center font-bold ${c === '$' ? 'text-yellow-400' : 'text-slate-200'} ${idx === 0 ? 'text-cyan-400' : ''}`}>{c}</span>
                                            ))}
                                        </div>
                                    ))}
                                 </div>
                            </div>
                        </div>
                    )}

                    {step === Step.RESULT && (
                        <div className="space-y-10 animate-fade-in">
                            <h3 className="text-xl text-center text-white font-bold">Estrazione dell'Ultima Colonna</h3>
                            <div className="flex justify-center">
                                 <div className="grid gap-2">
                                    {sortedRotations.map((row, i) => (
                                        <div key={i} className="flex font-mono text-lg p-1.5 rounded-lg bg-slate-800/10 border border-white/5">
                                            {row.split('').map((c, idx) => {
                                                const isLast = idx === row.length - 1;
                                                return (
                                                    <span key={idx} className={`w-9 text-center font-bold ${isLast ? 'opacity-0 w-0' : 'opacity-20'} ${c === '$' ? 'text-yellow-400' : 'text-slate-400'}`}>{c}</span>
                                                )
                                            })}
                                            <div className="w-12 h-10 flex items-center justify-center font-black text-cyan-300 bg-cyan-500/20 rounded-lg ml-2 border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                                                {row[row.length-1]}
                                            </div>
                                        </div>
                                    ))}
                                 </div>
                            </div>
                            
                            <div className="text-center p-8 bg-slate-800/50 rounded-3xl border border-cyan-400/20 shadow-2xl animate-pulse-slow">
                                <span className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] block mb-3">RISULTATO TRASFORMATA</span>
                                <div className="text-5xl font-mono font-black text-white tracking-widest">
                                    {result}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
          </div>

          <div className="bg-slate-800/60 p-8 rounded-3xl border border-white/15 flex flex-col gap-6 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-3 text-cyan-400 mb-2">
                  <div className="p-2 bg-cyan-400/10 rounded-lg">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-xl text-white">Il Segreto</h3>
              </div>
              
              <div className="space-y-5 text-base text-slate-200 leading-relaxed">
                  <p>
                      La BWT non è una compressione, ma una <strong>permutazione reversibile</strong> che raggruppa simboli simili.
                  </p>
                  <p>
                      Caratteri che hanno contesti successivi identici finiscono vicini, creando lunghe sequenze di lettere ripetute nell'output.
                  </p>
              </div>

              <div className="mt-auto border-t border-white/10 pt-8 space-y-4">
                  <div className="flex items-center gap-3 text-slate-100 font-bold text-base">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span>Ottimizzazione</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                      Stringhe come "NNNAAA$" sono ideali per algoritmi come <strong>RLE</strong> (Run-Length Encoding) o <strong>Move-to-Front</strong>, rendendo il file finale molto più piccolo.
                  </p>
              </div>
          </div>

      </div>
    </div>
  );
};

const CharBox: React.FC<{char: string, isMarker?: boolean}> = ({ char, isMarker }) => (
    <div className={`
        w-14 h-16 flex items-center justify-center text-3xl font-mono font-black rounded-xl transition-all shadow-xl border-2
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
        <div className={`flex items-center gap-2.5 transition-all duration-300 ${isActive ? 'text-white scale-105' : isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
            <div className={`p-2 rounded-lg border-2 transition-all ${isActive ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : isCompleted ? 'bg-slate-700 border-slate-600' : 'bg-transparent border-slate-800'}`}>
                {icon}
            </div>
            <span className="hidden md:block text-xs font-black uppercase tracking-wider">{label}</span>
        </div>
    );
};
