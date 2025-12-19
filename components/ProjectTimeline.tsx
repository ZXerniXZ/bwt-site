
import React from 'react';
import { Sparkles, Terminal, Code, Rocket } from 'lucide-react';

const EVENTS = [
  {
    version: 'v0.1',
    date: 'Fase 1',
    title: 'CLI & Python Script',
    description: 'Implementazione iniziale dell\'algoritmo BWT in Python puro. Funzionamento tramite riga di comando senza interfaccia grafica.',
    icon: <Terminal className="w-5 h-5" />,
    color: 'emerald',
    tags: ['Python', 'Algoritmo', 'CLI']
  },
  {
    version: 'v0.2',
    date: 'Fase 2',
    title: 'React Prototype',
    description: 'Creazione della prima interfaccia web. Implementazione del visualizzatore di rotazioni e ordinamento per il debugging visivo.',
    icon: <Code className="w-5 h-5" />,
    color: 'cyan',
    tags: ['React', 'TypeScript', 'Tailwind']
  },
  {
    version: 'v0.3',
    date: 'Fase 3',
    title: 'WebGL & UI Polish',
    description: 'Aggiunta di shader Three.js per sfondi dinamici, ottimizzazione delle performance e raffinamento della UX per la presentazione finale.',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'purple',
    tags: ['Three.js', 'Shaders', 'Animations']
  }
];

export const ProjectTimeline: React.FC = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      
      {/* Central Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent transform md:-translate-x-1/2" />

      <div className="space-y-12 md:space-y-24">
        {EVENTS.map((event, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div key={event.version} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Spacer for Desktop Centering */}
              <div className="hidden md:block w-1/2" />
              
              {/* Central Node Dot */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center z-10 transform -translate-x-1/2 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                 <div className={`w-3 h-3 rounded-full ${
                     event.color === 'emerald' ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' :
                     event.color === 'cyan' ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' :
                     'bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.5)]'
                 }`} />
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  
                  <div className={`group relative bg-slate-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm hover:border-white/10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}>
                      
                      {/* Decorative Gradient Blob */}
                      <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-10 transition duration-500 blur ${
                          event.color === 'emerald' ? 'from-emerald-600 to-teal-600' :
                          event.color === 'cyan' ? 'from-cyan-600 to-blue-600' :
                          'from-purple-600 to-pink-600'
                      }`} />

                      <div className="relative">
                          <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 text-slate-400 border border-white/5`}>
                                  {event.date}
                              </span>
                              <span className={`text-sm font-mono font-bold ${
                                  event.color === 'emerald' ? 'text-emerald-400' :
                                  event.color === 'cyan' ? 'text-cyan-400' :
                                  'text-purple-400'
                              }`}>
                                  {event.version}
                              </span>
                          </div>

                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                              {event.title}
                          </h3>
                          
                          <p className="text-slate-400 text-sm leading-relaxed mb-4">
                              {event.description}
                          </p>

                          <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                              {event.tags.map(tag => (
                                  <span key={tag} className="px-2 py-1 rounded-md bg-slate-950/50 text-xs text-slate-500 font-mono border border-white/5">
                                      #{tag}
                                  </span>
                              ))}
                          </div>
                      </div>
                  </div>

              </div>
            </div>
          );
        })}

        {/* Future Node */}
        <div className="relative flex flex-col items-center justify-center pt-12">
            <div className="w-px h-16 bg-gradient-to-b from-slate-700 to-transparent absolute top-0" />
            <div className="flex flex-col items-center gap-3 opacity-50">
                 <div className="p-3 rounded-full bg-slate-900 border border-slate-800">
                     <Rocket className="w-5 h-5 text-slate-600" />
                 </div>
                 <span className="text-xs font-mono text-slate-600 uppercase tracking-widest">Futuro</span>
            </div>
        </div>

      </div>
    </div>
  );
};
