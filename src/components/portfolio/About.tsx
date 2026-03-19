import React from 'react';
import { Cpu, Layers, Zap, CheckCircle2 } from 'lucide-react';

const points = [
  { icon: Cpu, title: 'Embedded Architecture', text: 'Bare-metal & RTOS firmware for STM32, ESP32 and ATmega with deterministic real-time control.' },
  { icon: Layers, title: 'Hardware Design', text: 'Mixed-signal 4-layer PCBs with EMI mitigation, power distribution and industrial connectors.' },
  { icon: Zap, title: 'Control Systems', text: 'FOC motor control, PID loops and SCADA-grade industrial communication networks.' },
  { icon: CheckCircle2, title: 'Full-Stack Delivery', text: 'Next.js, GoLang and AWS cloud platforms for real-time monitoring and SaaS.' },
];

const About: React.FC = () => (
  <section id="about" className="bg-slate-900 py-24">
    <div className="max-w-7xl mx-auto px-5">
      <div className="max-w-3xl">
        <p className="text-cyan-400 font-semibold tracking-wide uppercase text-sm">Professional Summary</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
          Bridging silicon and software at a senior level
        </h2>
        <p className="mt-5 text-slate-400 leading-relaxed">
          Senior-level embedded systems architect and full-stack engineer with proven expertise in
          delivering production-grade hardware solutions and scalable web applications. Specialized in
          custom PCB design, bare-metal firmware development, real-time control systems, and cloud-native
          SaaS platforms — with a track record of managing complete product lifecycles from schematic
          capture through production deployment.
        </p>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {points.map((p) => (
          <div key={p.title} className="group rounded-2xl border border-slate-800 bg-slate-950/50 p-6 hover:border-cyan-500/40 hover:-translate-y-1 transition-all">
            <div className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-500/30 mb-4">
              <p.icon className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-white font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
