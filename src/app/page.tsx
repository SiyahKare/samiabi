'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Terminal, 
  Zap, 
  Database, 
  Target, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Upload, 
  Trash2, 
  Loader2,
  ChevronRight,
  TrendingUp,
  History,
  Workflow
} from 'lucide-react';
import { AnalysisResult } from '@/lib/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const [raceProgram, setRaceProgram] = useState('');
  const [pastPerformances, setPastPerformances] = useState('');
  const [splitData, setSplitData] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateJson = (str: string) => {
    try {
      if (!str.trim()) return null;
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isAllValid = validateJson(raceProgram) === true && 
                    validateJson(pastPerformances) === true && 
                    validateJson(splitData) === true;

  const handleAnalyze = async () => {
    if (!isAllValid) return;
    setStatus({ type: 'loading', message: 'ENGAGING_AI_CORE: Synchronizing data streams...' });
    setAnalysis(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          raceProgram: JSON.parse(raceProgram),
          pastPerformances: JSON.parse(pastPerformances),
          splitData: JSON.parse(splitData),
        }),
      });
      if (!res.ok) throw new Error('SYSTEM_FAILURE: AI Core synchronization failed.');
      const data = await res.json();
      setAnalysis(data);
      setStatus({ type: 'success', message: 'ANALYSIS_COMPLETE: Results projected below.' });
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (e: any) {
      setStatus({ type: 'error', message: e.message });
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen text-slate-200">
      {/* Premium Header */}
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center futuristic-glow">
                <Cpu className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-xl font-black uppercase tracking-widest italic cyan-terminal-text">
                  SamiAbi <span className="text-slate-600">v1.3</span>
                </h1>
                <p className="text-[9px] text-slate-500 uppercase font-mono tracking-tighter mt-1">Advanced Tactical Intelligence</p>
              </div>
            </div>
            <div className="h-10 w-px bg-slate-800" />
            <div className="hidden lg:flex gap-6">
               <StatusIndicator label="Security" value="Level 4" />
               <StatusIndicator label="Environment" value="Simulation" />
               <StatusIndicator label="Kernel" value="v1.3.0RC" />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="text-right">
                <div className="text-[10px] text-slate-500 uppercase font-mono tracking-[0.2em]">Deployment State</div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Active Intelligence</div>
             </div>
             <div className="w-10 h-10 border border-slate-800 rounded-full flex items-center justify-center bg-slate-900/50">
                <Layers className="w-4 h-4 text-slate-600" />
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto p-8 space-y-20 pb-40">
        
        {/* Intro Section */}
        <section className="text-center space-y-4 pt-10">
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white">
             Yarış Veri ve <span className="text-cyan-400 italic">Analiz Platformu</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 text-sm leading-relaxed">
             Yarış verilerinin yapı, tempo ve senaryo bazlı analizine yönelik ileri düzey terminal.
             Yüksek hassasiyetli algoritma ile koşu karakterlerini çözümler.
          </p>
        </section>

        {/* Control Panel */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-8"
        >
          <div className="flex items-center gap-3 border-l-2 border-cyan-500 pl-4 py-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Data Ingestion Units</h3>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <DataIngestionUnit 
              title="Program JSON"
              icon={<TrendingUp className="w-4 h-4" />}
              value={raceProgram}
              onChange={setRaceProgram}
              isValid={validateJson(raceProgram)}
              description="Koşu iskeleti ve at listesini kapsayan temel veri akışı."
            />
            <DataIngestionUnit 
              title="History JSON"
              icon={<History className="w-4 h-4" />}
              value={pastPerformances}
              onChange={setPastPerformances}
              isValid={validateJson(pastPerformances)}
              description="Atların geçmiş performans ve derecelendirme verileri."
            />
            <DataIngestionUnit 
              title="Splits JSON"
              icon={<Workflow className="w-4 h-4" />}
              value={splitData}
              onChange={setSplitData}
              isValid={validateJson(splitData)}
              description="Koşu içindeki taktiksel mesafe ve süre kırılımları."
            />
          </div>

          {/* Action Center */}
          <div className="relative group">
            <div className="absolute inset-0 bg-cyan-500/5 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className={cn(
               "relative glass-card rounded-[2rem] p-8 flex flex-col lg:flex-row items-center justify-between gap-8 border transition-all duration-700",
               isAllValid ? "border-cyan-500/30" : "border-slate-800"
            )}>
              <div className="flex items-center gap-6">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-1000",
                  isAllValid ? "bg-cyan-500 text-black futuristic-glow" : "bg-slate-900 text-slate-700 border border-slate-800"
                )}>
                  {isAllValid ? <ShieldCheck className="w-8 h-8" /> : <Activity className="w-8 h-8" />}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-tight">System Diagnostic</h4>
                  <p className="text-slate-500 text-xs mt-1 font-mono uppercase italic tracking-tighter">
                    {isAllValid ? "Diagnostic Passed: Core connection ready." : "Awaiting Streams: Incomplete parameters detected."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {status.type !== 'idle' && (
                  <div className={cn(
                    "text-[10px] font-bold uppercase tracking-widest px-4 py-2 border rounded-full",
                    status.type === 'loading' ? "text-cyan-400 border-cyan-500/20" : status.type === 'error' ? "text-rose-500 border-rose-500/20" : "text-emerald-400 border-emerald-500/20"
                  )}>
                    {status.message}
                  </div>
                )}
                <button
                  onClick={handleAnalyze}
                  disabled={!isAllValid || status.type === 'loading'}
                  className={cn(
                    "group relative px-12 py-5 rounded-2xl font-black uppercase tracking-widest transition-all overflow-hidden",
                    isAllValid && status.type !== 'loading'
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_40px_rgba(34,211,238,0.2)] hover:scale-105 active:scale-95"
                      : "bg-slate-900 text-slate-700 border border-slate-800 cursor-not-allowed"
                  )}
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 italic" />
                  <div className="flex items-center gap-3 relative z-10">
                    {status.type === 'loading' ? <Loader2 className="w-6 h-6 animate-spin" /> : <Zap className="w-6 h-6" />}
                    <span>Execute Intelligence Analysis</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Results Dashboard */}
        <AnimatePresence>
          {analysis && (
            <motion.section 
              id="results"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="space-y-20 pt-20 border-t border-slate-900"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                 <div className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.4em] rounded-full">
                    Analysis Succeeded
                 </div>
                 <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Tactical Intelligence Output</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Process Steps */}
                <div className="lg:col-span-12">
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2 bg-slate-950/50 border border-slate-900 rounded-3xl">
                     {analysis.steps.slice(0, 4).map((step, i) => (
                       <div key={i} className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all group">
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Pipeline Step 0{i+1}</div>
                          <p className="text-xs text-slate-400 leading-relaxed font-mono">{step}</p>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Pace Map Visualization */}
                <div className="lg:col-span-8 space-y-10">
                  <div className="p-8 glass-card rounded-[2.5rem] space-y-8 relative overflow-hidden">
                    <div className="absolute inset-0 shimmer pointer-events-none" />
                    <div className="flex items-center justify-between relative">
                       <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Tactical Field Positioning (Pace Map)</h3>
                       <div className="flex gap-4">
                         <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-cyan-400" /><span className="text-[10px] uppercase text-slate-500">Early</span></div>
                         <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-violet-400" /><span className="text-[10px] uppercase text-slate-500">Late</span></div>
                       </div>
                    </div>
                    
                    {/* The Pace Map Grid */}
                    <div className="space-y-2 relative pt-2">
                       <div className="absolute left-1/4 top-0 bottom-0 w-px bg-slate-800/50 dashed" />
                       <div className="absolute left-2/4 top-0 bottom-0 w-px bg-slate-800/50" />
                       <div className="absolute left-3/4 top-0 bottom-0 w-px bg-slate-800/50" />
                       
                       <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/80 p-6 border border-slate-900 rounded-xl relative z-10 font-mono italic">
                         "{analysis.paceMap}"
                       </p>
                    </div>

                    <div className="flex justify-between text-[9px] text-slate-700 font-mono uppercase font-bold px-1">
                       <span>Front Runners (Leaders)</span>
                       <span>Stalkers</span>
                       <span>Pressers</span>
                       <span>Closers</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <IntelligenceCard title="Race Dynamic" content={analysis.raceShape} />
                    <IntelligenceCard title="Final Decision" content={analysis.finalDecision} variant="highlight" />
                  </div>
                </div>

                {/* Scenarios and Horse Intelligence */}
                <div className="lg:col-span-4 space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 ml-2">Scenario Probabilities</h4>
                  {analysis.scenarios.map((s, i) => (
                    <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden group hover:border-violet-500/30 transition-all">
                       <div className="absolute top-0 right-0 p-4 text-4xl font-black text-white/5 opacity-10 group-hover:text-violet-500/20 transition-all">{s.probability}%</div>
                       <div className="relative">
                         <div className="text-xs font-black text-violet-400 uppercase tracking-widest mb-2">{s.title}</div>
                         <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-tighter">{s.description}</p>
                       </div>
                    </div>
                  ))}
                  
                  <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl space-y-4">
                     <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Winning Target Pool</span>
                     <div className="flex flex-wrap gap-2">
                        {analysis.winnerPool.map(name => (
                          <span key={name} className="px-3 py-1.5 bg-black border border-cyan-500/30 text-white font-bold text-xs rounded-lg uppercase italic tracking-tighter">
                            {name}
                          </span>
                        ))}
                     </div>
                  </div>
                </div>

                {/* Runner Matrix */}
                <div className="lg:col-span-12 space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 ml-2">Runner Intelligence Matrix</h4>
                  <div className="bg-slate-950/50 border border-slate-900 rounded-[2rem] overflow-hidden shadow-2xl">
                    <table className="w-full text-left">
                      <thead className="bg-slate-900/50 border-b border-slate-800">
                        <tr className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                          <th className="px-8 py-6">Unit_Ident</th>
                          <th className="px-8 py-6">Tactical_Style</th>
                          <th className="px-8 py-6">Intelligence</th>
                          <th className="px-8 py-6 text-center">Probability</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900">
                        {analysis.horses.map((h, i) => (
                          <tr key={i} className="hover:bg-cyan-500/[0.02] group transition-colors">
                            <td className="px-8 py-8">
                               <div className="text-lg font-black text-white uppercase italic tracking-tighter group-hover:text-cyan-400 transition-colors">{h.name}</div>
                               <div className="text-[10px] text-slate-500 uppercase mt-1 tracking-tight">{h.scenarioFit}</div>
                            </td>
                            <td className="px-8 py-8">
                               <span className={cn(
                                 "text-[10px] px-3 py-1.5 rounded-lg font-bold tracking-widest uppercase",
                                 h.runningStyle === 'Leader' ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "bg-slate-800 text-slate-500"
                               )}>
                                 {h.runningStyle}
                               </span>
                            </td>
                            <td className="px-8 py-8">
                               <div className="flex flex-wrap gap-2">
                                  {h.strengths.slice(0, 2).map((s, j) => (
                                    <span key={j} className="text-[9px] text-slate-500 uppercase border border-slate-800 px-2 py-0.5 rounded">
                                      {s}
                                    </span>
                                  ))}
                               </div>
                            </td>
                            <td className="px-8 py-8 text-center">
                               <div className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase italic">{h.winPercentage}%</div>
                               <div className="w-24 h-1 bg-slate-900 rounded-full mx-auto mt-2 relative overflow-hidden border border-white/5">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${h.winPercentage}%` }}
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500"
                                  />
                               </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Terminal Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-950/90 border-t border-slate-800/50 h-10 px-8 flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 backdrop-blur-md z-50">
        <div className="flex gap-10 items-center">
           <div className="flex gap-2 items-center">
              <div className={cn("w-1.5 h-1.5 rounded-full", isAllValid ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-slate-800")} />
              <span>Link_Status: {isAllValid ? 'Synchronized' : 'Offline'}</span>
           </div>
           <div className="flex gap-2 items-center">
              <Zap className="w-3 h-3" />
              <span>Engine_Efficiency: 98.4%</span>
           </div>
           <div className="hidden md:flex gap-2 items-center">
              <Activity className="w-3 h-3" />
              <span>Signal: Stable</span>
           </div>
        </div>
        <div className="flex gap-10 items-center">
           <span className="text-slate-800 tracking-tighter">Classification: Restricted_Access</span>
           <span className="text-cyan-500/50">© SamiAbi AI Systems 2026</span>
        </div>
      </footer>
    </div>
  );
}

function DataIngestionUnit({ title, icon, value, onChange, isValid, description }: { title: string; icon: React.ReactNode; value: string; onChange: (v: string) => void; isValid: boolean | null; description: string }) {
  return (
    <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] space-y-6 group hover:border-cyan-500/20 hover:bg-slate-900/60 transition-all duration-500 flex flex-col h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-xl border transition-all duration-500",
            isValid ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]" : "bg-slate-950 border-slate-800 text-slate-700"
          )}>
            {icon}
          </div>
          <h4 className="text-sm font-black uppercase tracking-widest text-white">{title}</h4>
        </div>
        {isValid === true && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase rounded-md tracking-tighter">
             <ShieldCheck className="w-3 h-3" /> DATA_SYNC
          </motion.div>
        )}
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{description}</p>
      
      <div className="relative flex-1">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Input ${title} stream...`}
          className={cn(
            "w-full h-40 bg-black/40 border p-4 text-[10px] text-cyan-500 font-mono transition-all focus:outline-none placeholder:text-slate-800 rounded-3xl resize-none",
            isValid === false ? "border-rose-500/30 focus:border-rose-500/50" : "border-slate-800 focus:border-cyan-500/30"
          )}
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button className="p-2 bg-slate-900 border border-slate-800 text-slate-600 hover:text-cyan-400 hover:border-cyan-500/50 transition-all rounded-xl">
            <Upload className="w-3 h-3" />
          </button>
          <button onClick={() => onChange('')} className="p-2 bg-slate-900 border border-slate-800 text-slate-600 hover:text-rose-500 hover:border-rose-500/50 transition-all rounded-xl">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

function IntelligenceCard({ title, content, variant = 'default' }: { title: string; content: string; variant?: 'default' | 'highlight' }) {
  return (
    <div className={cn(
      "p-8 rounded-[2.5rem] border space-y-4 relative overflow-hidden group transition-all duration-700 h-full",
      variant === 'default' ? "bg-slate-900/50 border-slate-800 hover:border-slate-700" : "bg-cyan-500/5 border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.05)]"
    )}>
      {variant === 'highlight' && <div className="absolute inset-0 shimmer opacity-20" />}
      <h5 className={cn(
        "text-[10px] font-black uppercase tracking-[0.3em]",
        variant === 'default' ? "text-slate-500" : "text-cyan-400 leading-none"
      )}>{title}</h5>
      <p className={cn(
        "text-sm leading-relaxed",
        variant === 'default' ? "text-slate-400" : "text-white italic font-serif tracking-tight"
      )}>{content}</p>
    </div>
  );
}

function StatusIndicator({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
       <span className="text-[9px] text-slate-600 uppercase font-mono">{label}</span>
       <span className="text-xs font-bold text-slate-300 uppercase italic tracking-tighter">{value}</span>
    </div>
  );
}
