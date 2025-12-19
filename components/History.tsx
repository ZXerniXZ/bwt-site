
import React from 'react';
import { Clock, FileArchive, Dna } from 'lucide-react';

export const History: React.FC = () => {
  return (
    <div className="space-y-10 md:space-y-12">
      <div className="flex items-center gap-3 mb-6 md:mb-10">
         <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/30 text-emerald-400 text-lg font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">1</span>
         <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Storia e Applicazioni</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        
        {/* Main History Card */}
        <div className="relative group bg-slate-900/90 p-6 md:p-10 rounded-2xl md:rounded-3xl border border-white/15 hover:border-emerald-500/30 transition-all duration-300 shadow-2xl">
            <div className="space-y-6 md:space-y-8">
                <div className="flex items-center justify-between">
                    <span className="text-4xl md:text-5xl font-black text-slate-700 font-mono tracking-tighter">1994</span>
                    <div className="p-2.5 md:p-3 bg-emerald-400/10 rounded-xl md:rounded-2xl text-emerald-400 border border-emerald-400/20">
                        <Clock className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">L'Invenzione</h3>
                
                <p className="text-slate-200 text-base md:text-lg leading-relaxed font-medium">
                    Introdotta da <strong>Burrows</strong> e <strong>Wheeler</strong>, la trasformata fu concepita presso i laboratori DEC. Non comprime direttamente, ma riorganizza i blocchi per massimizzare la ridondanza.
                </p>
                
                <div className="pt-4 border-t border-white/5">
                    <p className="text-xs md:text-sm text-slate-500 italic font-medium">
                        "A block-sorting lossless data compression algorithm" — Palo Alto, CA
                    </p>
                </div>
            </div>
        </div>

        {/* Applications Column */}
        <div className="space-y-6 md:space-y-8">
            
            {/* bzip2 Card */}
            <div className="flex gap-4 md:gap-6 group p-6 md:p-8 rounded-2xl md:rounded-3xl bg-slate-900/90 border border-white/15 hover:border-indigo-500/30 transition-all shadow-xl">
                <div className="flex-shrink-0 p-3 md:p-4 bg-indigo-500/10 rounded-xl md:rounded-2xl h-fit text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-all">
                    <FileArchive className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                    <h4 className="text-lg md:text-xl font-black text-white mb-2 group-hover:text-indigo-300 transition-colors tracking-tight">La rivoluzione bzip2</h4>
                    <p className="text-slate-300 leading-relaxed text-sm md:text-base font-medium">
                        Celebre con <strong>bzip2</strong> (1996), surclassando i formati dell'epoca nel mondo UNIX/Linux.
                    </p>
                </div>
            </div>

            {/* Genomics Card */}
            <div className="flex gap-4 md:gap-6 group p-6 md:p-8 rounded-2xl md:rounded-3xl bg-slate-900/90 border border-white/15 hover:border-cyan-500/30 transition-all shadow-xl">
                <div className="flex-shrink-0 p-3 md:p-4 bg-cyan-500/10 rounded-xl md:rounded-2xl h-fit text-cyan-400 border border-cyan-400/20 group-hover:bg-cyan-500/20 transition-all">
                    <Dna className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                    <h4 className="text-lg md:text-xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors tracking-tight">Bioinformatica</h4>
                    <p className="text-slate-300 leading-relaxed text-sm md:text-base font-medium">
                        Cuore di <strong>BWA</strong> e <strong>Bowtie</strong>, allinea miliardi di frammenti di DNA al genoma in tempi record.
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};
