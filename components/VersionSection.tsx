import React, { ReactNode } from 'react';

interface VersionSectionProps {
  id: string;
  version: string;
  title: string;
  date: string;
  icon: ReactNode;
  description: string;
  children: ReactNode;
  color: 'cyan' | 'emerald' | 'purple' | 'indigo';
}

const colorMap = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-cyan-500/10',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/10',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-purple-500/10',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-indigo-500/10',
};

export const VersionSection: React.FC<VersionSectionProps> = ({ 
    id, version, title, date, icon, description, children, color 
}) => {
    
    const themeClass = colorMap[color];

    return (
        <section id={id} className="scroll-mt-24 min-h-[90vh] flex flex-col pt-12">
            
            {/* Version Header */}
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12">
                <div className={`flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-3xl border shadow-[0_0_30px_rgba(0,0,0,0)] ${themeClass}`}>
                    {icon}
                </div>
                
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider border bg-opacity-20 ${themeClass}`}>
                            {version}
                        </span>
                        <span className="text-slate-500 text-sm font-mono">{date}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white">{title}</h2>
                </div>
            </div>

            {/* Description Block */}
            <div className="mb-12 max-w-3xl">
                <p className="text-xl text-slate-400 leading-relaxed border-l-2 border-slate-800 pl-6">
                    {description}
                </p>
            </div>

            {/* Content Slot */}
            <div className="flex-1">
                {children}
            </div>

        </section>
    );
};