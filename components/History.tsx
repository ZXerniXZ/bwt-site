import React from 'react';
import { Clock, FileArchive, Dna } from 'lucide-react';

export const History: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="flex items-center gap-3 mb-8">
         <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-lg font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]">1</span>
         <h2 className="text-3xl font-bold text-white">Storia e Applicazioni</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Main History Card - Soft Glassy Look */}
        <div className="relative group bg-slate-900/40 p-8 rounded-3xl backdrop-blur-sm border border-white/5 hover:bg-slate-900/60 transition-colors shadow-2xl">
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <span className="text-4xl font-black text-slate-800/80 font-mono">1994</span>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-full text-emerald-400">
                            <Clock className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-white">L'Invenzione</h3>
                    </div>
                </div>
                <p className="text-slate-400 leading-relaxed">
                    Introdotta da <strong>Michael Burrows</strong> e <strong>David Wheeler</strong>, la trasformata fu originariamente concepita per la compressione dei dati. A differenza degli approcci precedenti, non comprimeva direttamente i dati, ma li <em>permutava</em> per renderli estremamente facili da comprimere per algoritmi successivi.
                </p>
                <div className="pt-2">
                    <p className="text-sm text-slate-500 italic">
                        "A block-sorting lossless data compression algorithm"
                    </p>
                </div>
            </div>
        </div>

        {/* Applications Column */}
        <div className="space-y-6">
            
            {/* bzip2 Card */}
            <div className="flex gap-5 group p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm hover:bg-slate-900/60 transition-colors shadow-xl">
                <div className="mt-1 p-3 bg-indigo-500/10 rounded-xl h-fit text-indigo-400 group-hover:text-indigo-300 transition-colors">
                    <FileArchive className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">La rivoluzione bzip2</h4>
                    <p className="text-slate-400 leading-relaxed text-sm">
                        La BWT divenne famosa grazie a <strong>bzip2</strong> (1996), superando gzip in efficienza e diventando lo standard per la distribuzione di software Linux.
                    </p>
                </div>
            </div>

            {/* Genomics Card */}
            <div className="flex gap-5 group p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm hover:bg-slate-900/60 transition-colors shadow-xl">
                <div className="mt-1 p-3 bg-cyan-500/10 rounded-xl h-fit text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    <Dna className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">Bioinformatica Moderna</h4>
                    <p className="text-slate-400 leading-relaxed text-sm">
                        Negli anni 2000, la BWT si rivelò cruciale per la genomica. Oggi è il cuore di <strong>Bowtie</strong> e <strong>BWA</strong>, usati per mappare il DNA umano.
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};