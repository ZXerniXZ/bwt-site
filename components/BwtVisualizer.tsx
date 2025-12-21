
import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, RefreshCw, Play, RotateCw, ListOrdered, FileOutput, Lightbulb, Zap, Snowflake, Gift, TreePine, Info } from 'lucide-react';

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
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={`flex items-center justify-center w-10 h-10 rounded-xl text-xl font-bold transition-all ${isChristmas ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'}`}>
              {isChristmas ? '🎄' : '01'}
          </span>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {isChristmas ? 'Magia BWT' : 'Sandbox Algoritmica'}
            </h2>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Interactive Lab v0.5</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Visualizer Area */}
          <div className={`lg:col-span-8 rounded-3xl flex flex-col border transition-all duration-700 ${isChristmas ? 'bg-red-950/30 border-red-500/20' : 'bg-slate-900/60 border-white/5'}`}>
            
            {/* Header Controls */}
            <div className={`p-4 md:p-6 border-b flex flex-col md:flex-row gap-4 items-center justify-between ${isChristmas ? 'bg-red-900/10 border-red-500/10' : 'bg-slate-800/20 border-white/5'}`}>
                <div className="flex items-center gap-3 w-full md:w-auto">
                     <div className="relative flex-1">
                        <input 
                            aria-label="Input per BWT"
                            type="text" 
                            value={originalString}
                            onChange={(e) => setInput(e.target.value)}
                            className={`w-full md:w-48 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 tracking-widest font-mono font-black uppercase transition-all border text-lg ${isChristmas ? 'bg-red-950 text-white border-red-500/30 focus:ring-red-500/40' : 'bg-slate-950 text-white border-white/10 focus:ring-cyan-500/40'}`}
                            placeholder="BANANA"
                            maxLength={9}
                        />
                        <span className={`absolute right-4 top-1/2 -translate-y-1/2 font-black font-mono text-xl ${isChristmas ? 'text-green-400' : 'text-yellow-500'}`}>$</span>
                     </div>
                     <button 
                        onClick={() => setInput(isChristmas ? "BANANA" : "CHRISTMAS")}
                        className={`p-2.5 rounded-xl border transition-all ${isChristmas ? 'text-red-400 border-red-500/20 hover:bg-red-500/10' : 'text-slate-300 border-white/10 hover:text-white hover:bg-white/5'}`}
                     >
                        {isChristmas ? <RefreshCw className="w-5 h-5" /> : <Gift className="w-5 h-5" />}
                     </button>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                     <button 
                        onClick={prevStep}
                        disabled={step === Step.INPUT}
                        className="px-4 py-2.5 text-xs font-bold rounded-xl disabled:opacity-20 border text-slate-300 border-white/10"
                     >
                        Indietro
                     </button>
                     <button 
                        onClick={nextStep}
                        disabled={step === Step.RESULT}
                        className={`flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-black rounded-xl transition-all active:scale-95 ${isChristmas ? 'bg-green-600 text-white' : 'bg-cyan-500 text-slate-950'}`}
                     >
                        Avanti <ChevronRight className="w-4 h-4" />
                     </button>
                </div>
            </div>

            {/* Steps Nav - Simplified for performance */}
            <div className="px-4 py-3 flex items-center justify-center gap-2 overflow-x-auto border-b bg-black/20 no-scrollbar">
                <StepIndicator current={step} target={Step.INPUT} icon={isChristmas ? <Snowflake className="w-4 h-4"/> : <Play className="w-4 h-4" />} label="Start" isChristmas={isChristmas} />
                <StepIndicator current={step} target={Step.ROTATIONS} icon={isChristmas ? <TreePine className="w-4 h-4"/> : <RotateCw className="w-4 h-4" />} label="Rotazioni" isChristmas={isChristmas} />
                <StepIndicator current={step} target={Step.SORT} icon={isChristmas ? <Gift className="w-4 h-4"/> : <ListOrdered className="w-4 h-4" />} label="Sort" isChristmas={isChristmas} />
                <StepIndicator current={step} target={Step.RESULT} icon={isChristmas ? '🦌' : <FileOutput className="w-4 h-4" />} label="Output" isChristmas={isChristmas} />
            </div>

            {/* Display Area - Optimized animations */}
            <div className="flex-1 p-6 md:p-8 min-h-[350px] flex items-center justify-center relative bg-gradient-to-b from-transparent to-black/10">
                <div className="relative z-10 w-full max-w-3xl mx-auto flex items-center justify-center">
                    {step === Step.INPUT && (
                         <div className="text-center space-y-6 animate-fade-in w-full">
                            <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] ${isChristmas ? 'text-red-400' : 'text-cyan-400'}`}>
                                Parola in Ingresso
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2 md:gap-4 py-2">
                                {originalString.split('').map((char, i) => (
                                    <CharBox key={i} char={char} isChristmas={isChristmas} />
                                ))}
                                <CharBox char="$" isMarker isChristmas={isChristmas} />
                            </div>
                         </div>
                    )}

                    {(step === Step.ROTATIONS || step === Step.SORT) && (
                        <div className="space-y-4 animate-fade-in w-full py-2">
                            <div className="grid gap-1 justify-center font-mono">
                                {(step === Step.ROTATIONS ? rotations : sortedRotations).map((row, i) => (
                                    <div key={i} className={`flex items-center text-xs md:text-base px-4 py-1.5 rounded-lg border border-transparent transition-colors ${isChristmas ? 'hover:bg-red-500/10' : 'hover:bg-white/5'}`}>
                                        <span className={`w-6 text-[8px] font-black mr-2 opacity-30 ${isChristmas ? 'text-red-400' : 'text-slate-500'}`}>{i}</span>
                                        {row.split('').map((c, idx) => (
                                            <span key={idx} className={`w-6 md:w-8 text-center font-bold ${c === '$' ? (isChristmas ? 'text-green-400' : 'text-yellow-400') : 'text-slate-100'} ${step === Step.SORT && idx === 0 ? (isChristmas ? 'text-red-400' : 'text-cyan-400') : ''}`}>{c}</span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === Step.RESULT && (
                        <div className="space-y-8 animate-fade-in w-full py-2">
                            <div className="flex justify-center font-mono">
                                 <div className="grid gap-1">
                                    {sortedRotations.map((row, i) => (
                                        <div key={i} className="flex items-center p-1 rounded-lg bg-black/20 border border-white/5">
                                            {row.split('').map((c, idx) => {
                                                const isLast = idx === row.length - 1;
                                                return isLast ? null : (
                                                    <span key={idx} className="w-6 md:w-8 text-center font-bold opacity-10 scale-90">{c}</span>
                                                )
                                            })}
                                            <div className={`w-10 h-8 md:w-12 md:h-10 flex items-center justify-center font-black rounded-md ml-2 border transition-all text-xs md:text-base ${isChristmas ? 'text-green-300 bg-green-500/10 border-green-500' : 'text-cyan-300 bg-cyan-500/10 border-cyan-500'}`}>
                                                {row[row.length-1]}
                                            </div>
                                        </div>
                                    ))}
                                 </div>
                            </div>
                            
                            <div className={`max-w-2xl mx-auto text-center p-6 md:p-8 rounded-3xl border transition-all ${isChristmas ? 'bg-red-950/40 border-green-600/30' : 'bg-slate-900/60 border-cyan-500/20'}`}>
                                <div className="text-3xl md:text-5xl font-mono font-black text-white tracking-[0.2em] break-all">
                                    {result}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
          </div>

          {/* Info Panel - Optimized for mobile */}
          <div className="lg:col-span-4">
            <div className={`p-6 md:p-8 rounded-3xl border flex flex-col gap-6 transition-all ${isChristmas ? 'bg-green-950/20 border-red-500/20' : 'bg-slate-800/40 border-white/5'}`}>
                <div className={`flex items-center gap-3 ${isChristmas ? 'text-red-400' : 'text-cyan-400'}`}>
                    <Lightbulb className="w-5 h-5" />
                    <h3 className="font-black text-xl text-white tracking-tight leading-none">Concetto</h3>
                </div>
                
                <div className="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                    <p>
                        {isChristmas 
                          ? "Sposta i caratteri simili vicini tra loro, come ordinare i regali per tipo." 
                          : "La BWT raggruppa simboli con contesti simili, massimizzando la ridondanza locale."}
                    </p>
                    <p className={`p-4 rounded-xl border leading-relaxed ${isChristmas ? 'bg-red-500/5 border-red-500/10' : 'bg-white/5 border-white/5'}`}>
                        Non riduce i dati da sola, ma li prepara per algoritmi come <strong>RLE</strong> o <strong>Move-To-Front</strong>.
                    </p>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

const CharBox: React.FC<{char: string, isMarker?: boolean, isChristmas?: boolean}> = ({ char, isMarker, isChristmas }) => (
    <div className={`
        relative w-10 h-14 md:w-16 md:h-24 flex items-center justify-center text-xl md:text-4xl font-mono font-black rounded-xl md:rounded-2xl transition-transform border-2 will-change-transform
        ${isMarker 
            ? (isChristmas ? 'text-green-400 bg-green-400/5 border-green-500/50' : 'text-yellow-400 bg-yellow-400/5 border-yellow-500/50') 
            : (isChristmas ? 'text-white bg-red-900/80 border-red-500/50' : 'text-white bg-slate-800 border-white/10')}
    `}>
        {char}
    </div>
);

const StepIndicator: React.FC<{current: Step, target: Step, icon: React.ReactNode, label: string, isChristmas?: boolean}> = ({ current, target, icon, label, isChristmas }) => {
    const isActive = current === target;
    const isCompleted = current > target;
    
    return (
        <div className={`flex items-center gap-1.5 transition-opacity ${isActive ? 'opacity-100 scale-105' : isCompleted ? 'opacity-60' : 'opacity-30'}`}>
            <div className={`p-2 rounded-lg border transition-colors ${isActive ? (isChristmas ? 'bg-red-600 border-red-400' : 'bg-cyan-500 border-cyan-400 text-slate-950') : 'bg-transparent border-white/5'}`}>
                {icon}
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">{label}</span>
        </div>
    );
};
