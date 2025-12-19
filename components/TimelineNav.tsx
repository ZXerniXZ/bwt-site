import React from 'react';
import { Code, GitCommit, Layers, Box } from 'lucide-react';

interface TimelineNavProps {
  onNavigate: (id: string) => void;
}

export const TimelineNav: React.FC<TimelineNavProps> = ({ onNavigate }) => {
  const steps = [
    { id: 'algorithm', label: 'Algorithm', icon: <Code className="w-4 h-4" /> },
    { id: 'v0.1', label: 'v0.1', icon: <GitCommit className="w-4 h-4" /> },
    { id: 'v0.2', label: 'v0.2', icon: <Layers className="w-4 h-4" /> },
    { id: 'v0.3', label: 'v0.3', icon: <Box className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-8">
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent -z-10" />
        
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => onNavigate(step.id)}
            className="group relative flex items-center"
          >
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300 z-10">
              {step.icon}
            </div>
            <span className="absolute left-14 px-3 py-1 rounded bg-slate-800 text-xs font-mono text-slate-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap border border-white/5">
              {step.label}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-2 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => onNavigate(step.id)}
            className="px-4 py-2 rounded-full text-xs font-bold text-slate-400 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
          >
            {step.icon}
            <span>{step.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};