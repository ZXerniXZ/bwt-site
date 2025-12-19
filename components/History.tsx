
import React from 'react';
import { Clock, FileArchive, Dna, Gift, Snowflake } from 'lucide-react';

interface HistoryProps {
  isChristmas?: boolean;
}

export const History: React.FC<HistoryProps> = ({ isChristmas }) => {
  return (
    <div className="space-y-10 md:space-y-12">
      <div className="flex items-center gap-3 mb-6 md:mb-10">
         <span className={`flex items-center justify-center w-8 h-8 rounded-lg text-lg font-bold shadow-lg transition-all ${isChristmas ? 'bg-red-500/30 text-red-400' : 'bg-emerald-500/30 text-emerald-400'}`}>
            {isChristmas ? '🎁' : '1'}
         </span>
         <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {isChristmas ? 'Un Dono del 1994' : 'Storia e Applicazioni'}
         </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        
        {/* Main History Card */}
        <div className={`relative group p-6 md:p-10 rounded-2xl md:rounded-3xl border transition-all duration-300 shadow-2xl ${isChristmas ? 'bg-red-950/40 border-red-500/20 hover:border-green-500/30' : 'bg-slate-900/90 border-white/15 hover:border-emerald-500/30'}`}>
            <div className="space-y-6 md:space-y-8">
                <div className="flex items-center justify-between">
                    <span className={`text-4xl md:text-5xl font-black font-mono tracking-tighter transition-colors ${isChristmas ? 'text-green-800' : 'text-slate-700'}`}>1994</span>
                    <div className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl border transition-all ${isChristmas ? 'bg-red-400/10 text-red-400 border-red-400/20' : 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'}`}>
                        {isChristmas ? <Snowflake className="w-5 h-5 md:w-6 md:h-6" /> : <Clock className="w-5 h-5 md:w-6 md:h-6" />}
                    </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">L'Invenzione</h3>
                
                <p className="text-slate-200 text-base md:text-lg leading-relaxed font-medium">
                    Introdotta da <strong>Burrows</strong> e <strong>Wheeler</strong>, la trasformata fu concepita presso i laboratori DEC. Non comprime direttamente, ma riorganizza i blocchi per massimizzare la ridondanza.
                </p>
                
                <div className={`pt-4 border-t ${isChristmas ? 'border-red-500/10' : 'border-white/5'}`}>
                    <p className="text-xs md:text-sm text-slate-500 italic font-medium">
                        "A block-sorting lossless data compression algorithm" — Palo Alto, CA
                    </p>
                </div>
            </div>
        </div>

        {/* Applications Column */}
        <div className="space-y-6 md:space-y-8">
            
            {/* bzip2 Card */}
            <div className={`flex gap-4 md:gap-6 group p-6 md:p-8 rounded-2xl md:rounded-3xl border transition-all shadow-xl ${isChristmas ? 'bg-green-950/20 border-green-500/20 hover:border-red-500/30' : 'bg-slate-900/90 border-white/15 hover:border-indigo-500/30'}`}>
                <div className={`flex-shrink-0 p-3 md:p-4 rounded-xl md:rounded-2xl h-fit border transition-all ${isChristmas ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
                    {isChristmas ? <Gift className="w-6 h-6 md:w-8 md:h-8" /> : <FileArchive className="w-6 h-6 md:w-8 md:h-8" />}
                </div>
                <div>
                    <h4 className="text-lg md:text-xl font-black text-white mb-2 transition-colors tracking-tight">La rivoluzione bzip2</h4>
                    <p className="text-slate-300 leading-relaxed text-sm md:text-base font-medium">
                        Celebre con <strong>bzip2</strong> (1996), surclassando i formati dell'epoca nel mondo UNIX/Linux.
                    </p>
                </div>
            </div>

            {/* Genomics Card */}
            <div className={`flex gap-4 md:gap-6 group p-6 md:p-8 rounded-2xl md:rounded-3xl border transition-all shadow-xl ${isChristmas ? 'bg-red-950/20 border-red-500/20 hover:border-green-500/30' : 'bg-slate-900/90 border-white/15 hover:border-cyan-500/30'}`}>
                <div className={`flex-shrink-0 p-3 md:p-4 rounded-xl md:rounded-2xl h-fit border transition-all ${isChristmas ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}`}>
                    <Dna className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                    <h4 className="text-lg md:text-xl font-black text-white mb-2 transition-colors tracking-tight">Bioinformatica</h4>
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
