import React, { useState } from 'react';
import { Mail, MapPin, Linkedin, Github, Send, Loader2, CheckCircle2 } from 'lucide-react';
const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter your name and a valid email address.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message
        })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Request failed');
      }
      setStatus('success');
      setForm({
        name: '',
        email: '',
        message: ''
      });
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error && err.message ? err.message : 'Something went wrong. Please email me directly.');
    }
  };
  return <section id="contact" className="bg-slate-900 py-24 relative overflow-hidden">
      <div className="absolute -bottom-32 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px]" />
      <div className="relative max-w-6xl mx-auto px-5 grid lg:grid-cols-2 gap-12">
        <div>
          <p className="text-cyan-400 font-semibold tracking-wide uppercase text-sm">Let's Build</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">Start your next project</h2>
          <p className="mt-4 text-slate-400 leading-relaxed max-w-md">
            Need embedded firmware, custom hardware, or a full-stack platform delivered end-to-end?
            Send a message and I'll respond within one business day.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-slate-300"><span className="grid place-items-center w-10 h-10 rounded-xl bg-slate-800"><MapPin className="w-5 h-5 text-cyan-400" /></span>Montgomery, Alabama — Remote</div>
            <div className="flex gap-3 pt-2">
              <a href="#" className="grid place-items-center w-11 h-11 rounded-xl bg-slate-800 hover:bg-cyan-500 transition-colors"><Linkedin className="w-5 h-5 text-white" /></a>
              <a href="#" className="grid place-items-center w-11 h-11 rounded-xl bg-slate-800 hover:bg-cyan-500 transition-colors"><Github className="w-5 h-5 text-white" /></a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-7">
          {status === 'success' ? <div className="h-full grid place-items-center text-center py-10">
              <div>
                <CheckCircle2 className="w-14 h-14 text-green-400 mx-auto" />
                <h3 className="mt-4 text-xl font-bold text-white">Message received!</h3>
                <p className="mt-2 text-slate-400">Thanks for reaching out — I'll be in touch shortly.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 px-5 py-2 rounded-lg bg-slate-800 text-white text-sm hover:bg-slate-700">Send another</button>
              </div>
            </div> : <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">Name</label>
                <input value={form.name} onChange={e => setForm({
              ...form,
              name: e.target.value
            })} className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none transition-colors" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">Email</label>
                <input value={form.email} onChange={e => setForm({
              ...form,
              email: e.target.value
            })} className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none transition-colors" placeholder="jane@company.com" />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">Project Details</label>
                <textarea value={form.message} onChange={e => setForm({
              ...form,
              message: e.target.value
            })} rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none" placeholder="Tell me about your hardware or software project..." />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button type="submit" disabled={status === 'loading'} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-60">
                {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>}
        </div>
      </div>
    </section>;
};
export default Contact;