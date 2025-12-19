import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-12 text-center text-slate-600 text-sm border-t border-white/5">
      <div className="container mx-auto px-4">
        <p className="mb-2">Sviluppato per la Tesina di Informatica.</p>
        <p>BWT Visualizer © {new Date().getFullYear()} - Implementato in React & TypeScript.</p>
      </div>
    </footer>
  );
};