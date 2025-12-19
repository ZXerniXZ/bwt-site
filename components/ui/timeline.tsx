
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-slate-950 font-sans md:px-10 overflow-x-hidden"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-2xl md:text-4xl mb-4 text-white max-w-4xl font-bold">
          Roadmap di Sviluppo
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-sm">
          Il percorso evolutivo di questa tesina, dall'idea concettuale all'implementazione finale.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-12 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-24 md:top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-8 w-8 md:h-10 md:w-10 absolute left-4 md:left-3 rounded-full bg-slate-900 flex items-center justify-center border border-white/10">
                <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-cyan-500 border border-cyan-400 p-2 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-slate-500">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-16 pr-4 md:pl-4 w-full overflow-hidden">
              <h3 className="md:hidden block text-xl mb-4 text-left font-bold text-slate-400">
                {item.title}
              </h3>
              <div className="w-full overflow-hidden">
                {item.content}
              </div>
            </div>
          </div>
        ))}
        
        {/* The connecting line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-8 md:left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,transparent_0%,#1e293b_10%,#1e293b_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-cyan-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
