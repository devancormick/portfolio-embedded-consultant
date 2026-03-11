import React, { useState } from 'react';
import { ArrowRight, Download, MapPin, CircuitBoard, Loader2 } from 'lucide-react';
import { IMAGES, STATS } from '@/data/portfolio';
import { generateResume } from '@/lib/resume';

const Hero: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const downloadResume = async () => {
    setDownloading(true);
    try {
      generateResume();
    } finally {
      setTimeout(() => setDownloading(false), 600);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* background grid + glow */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.15) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-5 pt-32 pb-16 grid lg:grid-cols-2 gap-12 items-center w-full">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for senior contract engagements
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Devan McCormick
          </h1>
          <p className="mt-3 text-xl sm:text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Senior Embedded Systems &amp; Full-Stack Engineer
          </p>
          <p className="mt-5 text-slate-400 max-w-xl leading-relaxed">
            I architect production-grade hardware and software — from custom PCB design and bare-metal
            firmware to real-time control systems and cloud-native SaaS platforms. End-to-end delivery,
            schematic capture to field commissioning.
          </p>

          <div className="mt-5 flex items-center gap-2 text-slate-400 text-sm">
            <MapPin className="w-4 h-4 text-cyan-400" /> Montgomery, AL — Remote &amp; On-site
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo('#projects')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
            >
              View Projects <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={downloadResume}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 text-slate-200 font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-colors disabled:opacity-60"
            >
              {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {downloading ? 'Preparing PDF...' : 'Download Resume'}
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-slate-300 font-semibold hover:text-cyan-400 transition-colors"
            >
              Get In Touch <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-blue-600/30 rounded-3xl blur-2xl" />
          <div className="relative rounded-3xl border border-cyan-500/20 bg-slate-900/60 backdrop-blur p-6">
            <img src={IMAGES.headshot} alt="Devan McCormick" className="w-full max-w-sm mx-auto drop-shadow-2xl" />
            <div className="absolute -bottom-4 -left-4 bg-slate-900 border border-cyan-500/30 rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl">
              <CircuitBoard className="w-6 h-6 text-cyan-400" />
              <div>
                <p className="text-white font-bold text-sm">12+ PCB Designs</p>
                <p className="text-slate-400 text-xs">STM32 · ESP32 · CM4</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 pb-16 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 text-center hover:border-cyan-500/40 transition-colors">
              <p className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{s.value}</p>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
