import React from 'react';
import { Briefcase } from 'lucide-react';
import { EXPERIENCE } from '@/data/portfolio';

const Experience: React.FC = () => (
  <section id="experience" className="bg-slate-950 py-24">
    <div className="max-w-5xl mx-auto px-5">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-cyan-400 font-semibold tracking-wide uppercase text-sm">Career</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">Professional Experience</h2>
      </div>

      <div className="mt-14 relative">
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/60 via-blue-600/40 to-transparent" />
        <div className="space-y-12">
          {EXPERIENCE.map((e, i) => (
            <div key={i} className={`relative sm:grid sm:grid-cols-2 sm:gap-10 ${i % 2 === 0 ? '' : ''}`}>
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 grid place-items-center w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 ring-4 ring-slate-950 z-10">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <div className={`pl-14 sm:pl-0 ${i % 2 === 0 ? 'sm:text-right sm:pr-12' : 'sm:col-start-2 sm:pl-12'}`}>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-cyan-500/40 transition-colors">
                  <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium">{e.period}</span>
                  <h3 className="mt-3 text-lg font-bold text-white">{e.role}</h3>
                  <p className="text-cyan-400 text-sm font-medium">{e.company}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{e.location}</p>
                  <ul className={`mt-4 space-y-2 ${i % 2 === 0 ? 'sm:text-left' : ''}`}>
                    {e.points.map((pt, j) => (
                      <li key={j} className="text-sm text-slate-400 leading-relaxed flex gap-2 text-left">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" /> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
