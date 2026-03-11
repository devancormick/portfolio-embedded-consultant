import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Download } from 'lucide-react';
import { generateResume } from '@/lib/resume';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-cyan-500/20 py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        <button onClick={() => go('#hero')} className="flex items-center gap-2 text-white font-bold text-lg">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600">
            <Cpu className="w-5 h-5 text-white" />
          </span>
          <span>Devan<span className="text-cyan-400">McCormick</span></span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => generateResume()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-700 text-slate-200 text-sm font-medium hover:border-cyan-400 hover:text-cyan-400 transition-colors"
          >
            <Download className="w-4 h-4" /> Resume
          </button>
          <button
            onClick={() => go('#contact')}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-shadow"
          >
            Hire Me
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-slate-950/95 border-t border-cyan-500/20 px-5 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <button key={l.href} onClick={() => go(l.href)} className="text-left text-slate-200 py-2">
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { setOpen(false); generateResume(); }}
            className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-200 font-medium"
          >
            <Download className="w-4 h-4" /> Download Resume
          </button>
          <button onClick={() => go('#contact')} className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold">
            Hire Me
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
