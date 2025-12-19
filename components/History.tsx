
import React from 'react';
import { Clock, FileArchive, Dna } from 'lucide-react';

export const History: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="flex items-center gap-3 mb-10">
         <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/30 text-emerald-400 text-lg font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">1</span>
         <h2 className="text-3xl font-bold text-white">Storia e Applicazioni</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Main History Card */}
        <div className="relative group bg-slate-900/90 p-10 rounded-3xl border border-white/15 hover:border-emerald-500/30 transition-all duration-300 shadow-2xl">
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <span className="text-5xl font-black text-slate-700 font-mono tracking-tighter">1994</span>
                    <div className="p-3 bg-emerald-400/10 rounded-2xl text-emerald-400 border border-emerald-400/20">
                        <Clock className="w-6 h-6" />
                    </div>
                </div>
                
                <h3 className="text-2xl font-black text-white tracking-tight">L'Invenzione</h3>
                
                <p className="text-slate-200 text-lg leading-relaxed">
                    Introdotta da <strong>Michael Burrows</strong> e <strong>David Wheeler</strong>, la trasformata fu originariamente concepita presso i laboratori DEC. A differenza degli approcci classici, non comprime direttamente i dati, ma li <em>permutava</em> in blocchi per massimizzare la ridondanza locale.
                </p>
                
                <div className="pt-4 border-t border-white/5">
                    <p className="text-sm text-slate-500 italic font-medium">
                        "A block-sorting lossless data compression algorithm" — Palo Alto, CA
                    </p>
                </div>
            </div>
        </div>

        {/* Applications Column */}
        <div className="space-y-8">
            
            {/* bzip2 Card */}
            <div className="flex gap-6 group p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-indigo-500/30 transition-all shadow-xl">
                <div className="flex-shrink-0 p-4 bg-indigo-500/10 rounded-2xl h-fit text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-all">
                    <FileArchive className="w-8 h-8" />
                </div>
                <div>
                    <h4 className="text-xl font-black text-white mb-3 group-hover:text-indigo-300 transition-colors">La rivoluzione bzip2</h4>
                    <p className="text-slate-300 leading-relaxed text-base">
                        La BWT divenne celebre con <strong>bzip2</strong> (1996), surclassando i formati dell'epoca per efficienza di compressione e affidabilità nel mondo UNIX/Linux.
                    </p>
                </div>
            </div>

            {/* Genomics Card */}
            <div className="flex gap-6 group p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-cyan-500/30 transition-all shadow-xl">
                <div className="flex-shrink-0 p-4 bg-cyan-500/10 rounded-2xl h-fit text-cyan-400 border border-cyan-400/20 group-hover:bg-cyan-500/20 transition-all">
                    <Dna className="w-8 h-8" />
                </div>
                <div>
                    <h4 className="text-xl font-black text-white mb-3 group-hover:text-cyan-300 transition-colors">Bioinformatica Moderna</h4>
                    <p className="text-slate-300 leading-relaxed text-base">
                        Cruciale per la genomica: oggi è il cuore di software come <strong>BWA</strong> e <strong>Bowtie</strong>, permettendo di allineare miliardi di frammenti di DNA al genoma umano in tempi record.
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};
