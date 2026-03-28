import React, { useState } from 'react';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PROJECTS, Project } from '@/data/portfolio';

const categories = ['All', 'Firmware / Control Systems', 'Hardware / Test Engineering', 'PCB Design / Firmware', 'Industrial Automation / HMI', 'PCB Design / Edge Compute', 'Full-Stack / Cloud'];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState<Project | null>(null);

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-cyan-400 font-semibold tracking-wide uppercase text-sm">Selected Work</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">Production-grade projects</h2>
          <p className="mt-4 text-slate-400">Real hardware and software shipped for industrial, IoT and enterprise clients.</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                filter === c ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className="group text-left rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/50 hover:border-cyan-500/50 hover:-translate-y-1.5 transition-all"
            >
              <div className="relative h-52 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 border border-cyan-500/30 text-cyan-300 text-[11px] font-medium">
                  {p.category}
                </span>
                <span className="absolute top-3 right-3 grid place-items-center w-8 h-8 rounded-full bg-cyan-500/90 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-400 line-clamp-2">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">{t}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-[60] grid place-items-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={() => setActive(null)}>
          <div className="relative max-w-2xl w-full rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-900 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActive(null)} className="absolute top-3 right-3 z-10 grid place-items-center w-9 h-9 rounded-full bg-slate-950/80 text-white hover:bg-cyan-500 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <img src={active.image} alt={active.title} className="w-full h-60 object-cover" />
            <div className="p-7">
              <span className="text-cyan-400 text-xs font-medium uppercase tracking-wide">{active.category}</span>
              <h3 className="mt-2 text-2xl font-bold text-white">{active.title}</h3>
              <p className="mt-3 text-slate-400 leading-relaxed">{active.summary}</p>
              <h4 className="mt-6 text-white font-semibold text-sm uppercase tracking-wide">Highlights</h4>
              <ul className="mt-3 space-y-2">
                {active.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" /> {h}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {active.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-slate-800 text-cyan-300 text-xs font-medium">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
