import React from 'react';
import { Cpu, CircuitBoard, Network, Cloud } from 'lucide-react';
import { SKILLS } from '@/data/portfolio';

const iconMap: Record<string, React.ElementType> = {
  cpu: Cpu,
  circuit: CircuitBoard,
  network: Network,
  cloud: Cloud,
};

const Skills: React.FC = () => (
  <section id="expertise" className="bg-slate-950 py-24 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
    <div className="relative max-w-7xl mx-auto px-5">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-cyan-400 font-semibold tracking-wide uppercase text-sm">Technical Expertise</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">Full-spectrum engineering stack</h2>
        <p className="mt-4 text-slate-400">From the bare metal to the cloud — a unified, vertically-integrated skill set.</p>
      </div>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILLS.map((g) => {
          const Icon = iconMap[g.icon] ?? Cpu;
          return (
            <div key={g.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <div className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-semibold">{g.title}</h3>
              </div>
              <ul className="space-y-2.5">
                {g.items.map((i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Skills;
