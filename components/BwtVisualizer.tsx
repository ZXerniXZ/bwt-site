
import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, RefreshCw, Play, RotateCw, ListOrdered, FileOutput, Lightbulb, Zap, Snowflake, Gift, TreePine } from 'lucide-react';

enum Step {
  INPUT = 0,
  ROTATIONS = 1,
  SORT = 2,
  RESULT = 3
}

interface BwtVisualizerProps {
  onChristmasChange?: (active: boolean) => void;
  isChristmas?: boolean;
}

export const BwtVisualizer: React.FC<BwtVisualizerProps> = ({ onChristmasChange, isChristmas }) => {
  const [input, setInput] = useState("BANANA");
  const [step, setStep] = useState<Step>(Step.INPUT);

  const originalString = input.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 9);
  
  useEffect(() => {
    if (originalString === "CHRISTMAS") {
      onChristmasChange?.(true);
    } else {
      onChristmasChange?.(false);
    }
  }, [originalString, onChristmasChange]);

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
    <div className={`space-y-6 md:space-y-8 relative transition-all duration-1000`}>
      
      <div className="flex items-center gap-3 relative z-10">
        <span className={`flex items-center justify-center w-8 h-8 rounded-lg text-lg font-bold transition-colors ${isChristmas ? 'bg-red-500/30 text-red-400' : 'bg-cyan-500/30 text-cyan-400'}`}>
            {isChristmas ? '🎄' : '2'}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {isChristmas ? 'Magia di Natale BWT' : 'Sandbox Interattiva'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          <div className={`lg:col-span-2 rounded-2xl md:rounded-3xl overflow-hidden flex flex-col border shadow-2xl backdrop-blur-md transition-all duration-1000 ${isChristmas ? 'bg-red-950/40 border-red-500/30 shadow-red-500/10' : 'bg-slate-900/90 border-white/10'}`}>
            
            {/* Header / Controls */}
            <div className={`p-4 md:p-5 border-b flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between transition-colors ${isChristmas ? 'bg-red-900/20 border-red-500/20' : 'bg-slate-800/40 border-white/10'}`}>
                <div className="flex items-center gap-3">
                     <div className="relative flex-1 md:flex-none">
                        <input 
                            aria-label="Input per BWT"
                            type="text" 
                            value={originalString}
                            onChange={(e) => setInput(e.target.value)}
                            className={`w-full md:w-44 px-4 py-3 md:py-2.5 rounded-lg focus:outline-none focus:ring-2 tracking-widest font-mono font-bold uppercase transition-all border shadow-inner text-lg md:text-base ${isChristmas ? 'bg-red-950 text-white border-red-500/40 focus:ring-red-500/50' : 'bg-slate-950 text-white border-white/20 focus:ring-cyan-500/50'}`}
                            placeholder="BANANA"
                            maxLength={9}
                        />
                        <span className={`absolute right-4 md:right-3 top-1/2 -translate-y-1/2 font-bold font-mono text-xl md:text-base ${isChristmas ? 'text-green-400' : 'text-yellow-500'}`}>$</span>
                     </div>
                     <button 
                        onClick={() => setInput(isChristmas ? "BANANA" : "CHRISTMAS")}
                        className={`p-3 md:p-2.5 rounded-lg transition-colors border bg-slate-900/50 md:bg-transparent ${isChristmas ? 'text-red-400 border-red-500/20 hover:bg-red-500/10' : 'text-slate-300 border-white/5 hover:text-white hover:bg-white/10'}`}
                        title={isChristmas ? "Disattiva Natale" : "Attiva Natale"}
                     >
                        {isChristmas ? <RefreshCw className="w-5 h-5 md:w-4 md:h-4" /> : <Gift className="w-5 h-5 md:w-4 md:h-4" />}
                     </button>
                </div>

                <div className="flex gap-2 md:gap-3">
                     <button 
                        onClick={prevStep}
                        disabled={step === Step.INPUT}
                        className={`flex-1 md:flex-none px-4 md:px-5 py-3 md:py-2 text-sm font-bold rounded-lg disabled:opacity-20 disabled:cursor-not-allowed transition-colors border md:border-transparent ${isChristmas ? 'text-red-300 border-red-500/20 bg-red-900/20' : 'text-slate-300 border-white/10 bg-slate-800/50'}`}
                     >
                        Indietro
                     </button>
                     <button 
                        onClick={nextStep}
                        disabled={step === Step.RESULT}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 md:px-6 py-3 md:py-2 text-sm font-bold rounded-lg transition shadow-lg active:scale-95 ${isChristmas ? 'bg-green-500 text-white hover:bg-green-400 shadow-green-500/20' : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-cyan-500/20'}`}
                     >
                        Avanti <ChevronRight className="w-4 h-4" />
                     </button>
                </div>
            </div>

            {/* Breadcrumbs */}
            <div className={`px-2 md:px-4 py-3 flex items-center justify-center gap-1 md:gap-2 overflow-x-auto border-b bg-slate-950/40 no-scrollbar ${isChristmas ? 'border-red-500/10' : 'border-white/10'}`}>
                <StepIndicator current={step} target={Step.INPUT} icon={isChristmas ? <Snowflake className="w-3 h-3"/> : <Play className="w-3 h-3" />} label="Start" isChristmas={isChristmas} />
                <div className="w-4 md:w-8 h-px bg-white/10" />
                <StepIndicator current={step} target={Step.ROTATIONS} icon={isChristmas ? <TreePine className="w-3 h-3"/> : <RotateCw className="w-3 h-3" />} label="Rot" isChristmas={isChristmas} />
                <div className="w-4 md:w-8 h-px bg-white/10" />
                <StepIndicator current={step} target={Step.SORT} icon={isChristmas ? <Gift className="w-3 h-3"/> : <ListOrdered className="w-3 h-3" />} label="Sort" isChristmas={isChristmas} />
                <div className="w-4 md:w-8 h-px bg-white/10" />
                <StepIndicator current={step} target={Step.RESULT} icon={isChristmas ? '🦌' : <FileOutput className="w-3 h-3" />} label="Out" isChristmas={isChristmas} />
            </div>

            <div className="flex-1 p-4 md:p-8 min-h-[380px] md:min-h-[420px] flex items-center justify-center relative bg-gradient-to-b from-slate-900/20 to-slate-950/80">
                <div className="relative z-10 w-full max-w-xl">
                    {step === Step.INPUT && (
                         <div className="text-center space-y-8 md:space-y-10 animate-fade-in px-2">
                            <h3 className="text-lg md:text-xl text-white font-bold tracking-wide">
                                {isChristmas ? 'Preparazione dei Regali' : 'Preparazione'}
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                                {originalString.split('').map((char, i) => (
                                    <CharBox key={i} char={char} isChristmas={isChristmas} />
                                ))}
                                <CharBox char="$" isMarker isChristmas={isChristmas} />
                            </div>
                            <p className="text-slate-300 text-sm md:text-base max-w-md mx-auto leading-relaxed">
                                {isChristmas 
                                    ? "Anche a Natale, il terminatore speciale $ rende tutto reversibile!"
                                    : "Aggiungiamo il terminatore speciale $ per rendere l'algoritmo invertibile."}
                            </p>
                         </div>
                    )}

                    {step === Step.ROTATIONS && (
                        <div className="space-y-4 md:space-y-6 animate-fade-in overflow-x-hidden">
                            <h3 className="text-lg md:text-xl text-center text-white font-bold">Rotazioni Natalizie</h3>
                            <div className="grid gap-1 md:gap-2 justify-center">
                                {rotations.map((row, i) => (
                                    <div key={i} className={`flex font-mono text-base md:text-lg p-1 md:p-1.5 rounded-lg border border-transparent transition-all ${isChristmas ? 'hover:border-red-500/20' : 'hover:border-white/10'}`}>
                                        <span className={`w-6 md:w-8 text-[10px] md:text-xs flex items-center font-bold ${isChristmas ? 'text-red-400' : 'text-slate-500'}`}>{i}</span>
                                        {row.split('').map((c, idx) => (
                                            <span key={idx} className={`w-7 md:w-9 text-center font-bold ${c === '$' ? (isChristmas ? 'text-green-400' : 'text-yellow-400') : 'text-slate-100'}`}>{c}</span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === Step.SORT && (
                        <div className="space-y-4 md:space-y-6 animate-fade-in">
                            <h3 className="text-lg md:text-xl text-center text-white font-bold">Slitta in Ordine</h3>
                            <div className="flex gap-4 md:gap-8 justify-center items-center flex-col md:flex-row">
                                 <div className="grid gap-1 md:gap-2">
                                    {sortedRotations.map((row, i) => (
                                        <div key={i} className={`flex font-mono text-base md:text-lg p-1 md:p-1.5 rounded-lg border shadow-sm ${isChristmas ? 'bg-red-900/10 border-red-500/10' : 'bg-slate-800/30 border-white/5'}`}>
                                            <span className={`w-6 md:w-8 text-[10px] md:text-xs flex items-center font-bold ${isChristmas ? 'text-red-500' : 'text-slate-500'}`}>{i}</span>
                                            {row.split('').map((c, idx) => (
                                                <span key={idx} className={`w-7 md:w-9 text-center font-bold ${c === '$' ? (isChristmas ? 'text-green-400' : 'text-yellow-400') : 'text-slate-200'} ${idx === 0 ? (isChristmas ? 'text-red-400' : 'text-cyan-400') : ''}`}>{c}</span>
                                            ))}
                                        </div>
                                    ))}
                                 </div>
                            </div>
                        </div>
                    )}

                    {step === Step.RESULT && (
                        <div className="space-y-6 md:space-y-10 animate-fade-in px-2">
                            <h3 className="text-lg md:text-xl text-center text-white font-bold">L'ultima Colonna (di Neve)</h3>
                            <div className="flex justify-center scale-90 md:scale-100 origin-center">
                                 <div className="grid gap-1 md:gap-2">
                                    {sortedRotations.map((row, i) => (
                                        <div key={i} className="flex font-mono text-base md:text-lg p-1 rounded-lg bg-slate-800/10 border border-white/5">
                                            {row.split('').map((c, idx) => {
                                                const isLast = idx === row.length - 1;
                                                return (
                                                    <span key={idx} className={`w-7 md:w-9 text-center font-bold ${isLast ? 'hidden' : 'opacity-20'} ${c === '$' ? (isChristmas ? 'text-green-400' : 'text-yellow-400') : 'text-slate-400'}`}>{c}</span>
                                                )
                                            })}
                                            <div className={`w-10 h-8 md:w-12 md:h-10 flex items-center justify-center font-black rounded-lg ml-2 border transition-all ${isChristmas ? 'text-green-300 bg-green-500/20 border-green-400/30 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'text-cyan-300 bg-cyan-500/20 border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.3)]'}`}>
                                                {row[row.length-1]}
                                            </div>
                                        </div>
                                    ))}
                                 </div>
                            </div>
                            
                            <div className={`text-center p-6 md:p-8 rounded-2xl md:rounded-3xl border shadow-2xl transition-all ${isChristmas ? 'bg-red-900/40 border-green-500/30' : 'bg-slate-800/50 border-cyan-400/20'}`}>
                                <span className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] block mb-2 md:mb-3 ${isChristmas ? 'text-green-400' : 'text-slate-400'}`}>RISULTATO NATALIZIO</span>
                                <div className="text-3xl md:text-5xl font-mono font-black text-white tracking-widest break-all">
                                    {result}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
          </div>

          <div className={`p-6 md:p-8 rounded-2xl md:rounded-3xl border flex flex-col gap-6 backdrop-blur-md shadow-2xl transition-all duration-1000 ${isChristmas ? 'bg-green-950/40 border-red-500/30' : 'bg-slate-800/60 border-white/15'}`}>
              <div className={`flex items-center gap-3 ${isChristmas ? 'text-red-400' : 'text-cyan-400'}`}>
                  <div className={`p-2 rounded-lg ${isChristmas ? 'bg-red-400/10' : 'bg-cyan-400/10'}`}>
                    {isChristmas ? <Snowflake className="w-5 h-5 md:w-6 md:h-6" /> : <Lightbulb className="w-5 h-5 md:w-6 md:h-6" />}
                  </div>
                  <h3 className="font-black text-lg md:text-xl text-white tracking-tight">{isChristmas ? 'Sorpresa!' : 'Il Segreto'}</h3>
              </div>
              
              <div className="space-y-4 text-sm md:text-base text-slate-200 leading-relaxed font-medium">
                  <p>
                      {isChristmas 
                        ? "Hai trovato l'Easter Egg! Sapevi che anche i pinguini amano ordinare i regali alfabeticamente?" 
                        : "La BWT non è una compressione, ma una permutazione reversibile."}
                  </p>
                  <p>
                      {isChristmas 
                        ? "In un mare di neve, la BWT raggruppa i fiocchi simili vicini tra loro, proprio come i regali sotto l'albero."
                        : "Sposta i simboli con lo stesso contesto a posizioni vicine, creando lunghe sequenze di lettere ripetute."}
                  </p>
              </div>

              <div className={`mt-auto border-t pt-6 space-y-4 ${isChristmas ? 'border-red-500/20' : 'border-white/10'}`}>
                  <div className="flex items-center gap-3 text-slate-100 font-bold text-sm md:text-base">
                      {isChristmas ? <Gift className="w-4 h-4 md:w-5 md:h-5 text-red-400" /> : <Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />}
                      <span>{isChristmas ? 'Buone Feste' : 'Ottimizzazione'}</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                      {isChristmas 
                        ? "Goditi l'algoritmo più festoso dell'informatica mentre Babbo Natale ordina i pacchi." 
                        : "Stringhe raggruppate sono ideali per algoritmi come RLE o MTF, rendendo i dati molto più compatti."}
                  </p>
              </div>
          </div>

      </div>
    </div>
  );
};

const CharBox: React.FC<{char: string, isMarker?: boolean, isChristmas?: boolean}> = ({ char, isMarker, isChristmas }) => (
    <div className={`
        relative w-10 h-12 md:w-14 md:h-16 flex items-center justify-center text-xl md:text-3xl font-mono font-black rounded-lg md:rounded-xl transition-all shadow-xl border-2
        ${isMarker 
            ? (isChristmas ? 'text-green-400 bg-green-400/10 border-green-500/40 shadow-green-500/10' : 'text-yellow-400 bg-yellow-400/10 border-yellow-500/40 shadow-yellow-500/10') 
            : (isChristmas ? 'text-white bg-red-900/40 border-red-500/40 shadow-red-900/20' : 'text-white bg-slate-800 border-white/10 shadow-black/40')}
    `}>
        {isChristmas && !isMarker && (
            <span className="absolute -top-3 -right-2 text-xl select-none rotate-12 drop-shadow-md">🎅</span>
        )}
        {char}
    </div>
);

const StepIndicator: React.FC<{current: Step, target: Step, icon: React.ReactNode, label: string, isChristmas?: boolean}> = ({ current, target, icon, label, isChristmas }) => {
    const isActive = current === target;
    const isCompleted = current > target;
    
    return (
        <div className={`flex items-center gap-1 md:gap-2.5 transition-all duration-300 ${isActive ? 'text-white scale-105' : isCompleted ? (isChristmas ? 'text-green-600' : 'text-slate-400') : (isChristmas ? 'text-red-900' : 'text-slate-600')}`}>
            <div className={`p-1.5 md:p-2 rounded-lg border-2 transition-all ${isActive ? (isChristmas ? 'bg-red-500 border-red-400 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.4)]') : isCompleted ? 'bg-slate-700 border-slate-600' : 'bg-transparent border-slate-800'}`}>
                {icon}
            </div>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-wider">{label}</span>
        </div>
    );
};
