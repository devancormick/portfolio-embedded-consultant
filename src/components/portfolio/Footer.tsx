import React from 'react';
import { Cpu, Mail, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600">
              <Cpu className="w-5 h-5 text-white" />
            </span>
            Devan<span className="text-cyan-400">McCormick</span>
          </div>
          <p className="mt-4 text-slate-400 text-sm max-w-sm leading-relaxed">
            Senior Embedded Systems &amp; Full-Stack Engineer delivering production-grade hardware,
            firmware and cloud platforms from Montgomery, AL.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm">Navigate</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[['About', '#about'], ['Expertise', '#expertise'], ['Projects', '#projects'], ['Experience', '#experience'], ['Contact', '#contact']].map(([l, h]) => (
              <li key={h}><button onClick={() => go(h)} className="text-slate-400 hover:text-cyan-400 transition-colors">{l}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm">Connect</h4>
          <div className="mt-4 flex gap-3">
            <a href="#" className="grid place-items-center w-10 h-10 rounded-lg bg-slate-800 hover:bg-cyan-500 transition-colors"><Linkedin className="w-5 h-5 text-white" /></a>
            <a href="#" className="grid place-items-center w-10 h-10 rounded-lg bg-slate-800 hover:bg-cyan-500 transition-colors"><Github className="w-5 h-5 text-white" /></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-slate-500 text-xs">© {new Date().getFullYear()} Devan McCormick. All rights reserved.</p>
        <p className="text-slate-500 text-xs">Embedded · Firmware · Full-Stack · Cloud</p>
      </div>
    </footer>
  );
};

export default Footer;
