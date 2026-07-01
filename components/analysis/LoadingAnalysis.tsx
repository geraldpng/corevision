'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const MESSAGES = [
  'Understanding your organisation…',
  'Analysing workforce maturity…',
  'Comparing 200+ hiring benchmarks…',
  'Reviewing business objectives…',
  'Calculating hiring readiness score…',
  'Matching Corestaff services…',
  'Scoring lead opportunity…',
  'Preparing your Executive Report…',
];

const NODES = [
  { x: 50, y: 50 }, { x: 22, y: 22 }, { x: 78, y: 22 }, { x: 12, y: 62 },
  { x: 88, y: 62 }, { x: 32, y: 80 }, { x: 68, y: 80 }, { x: 50, y: 12 },
  { x: 16, y: 42 }, { x: 84, y: 42 },
];
const EDGES = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,7],[2,7],[3,8],[4,9],[1,8],[2,9]];

export default function LoadingAnalysis() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIdx(i => (i < MESSAGES.length - 1 ? i + 1 : i));
    }, 870);
    let p = 0;
    const progTimer = setInterval(() => {
      p += 1.5;
      setProgress(Math.min(100, p));
      if (p >= 100) { clearInterval(progTimer); setTimeout(() => router.push('/report'), 500); }
    }, 90);
    return () => { clearInterval(msgTimer); clearInterval(progTimer); };
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #080f1e 0%, #0b1e3f 50%, #060d1a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <svg width="700" height="500" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', opacity: 0.15 }}>
        {EDGES.map(([a, b], i) => (
          <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} stroke="#00AEEF" strokeWidth="0.4"
            style={{ animation: `network-pulse ${1.6 + i * 0.2}s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }} />
        ))}
        {NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={i === 0 ? 2.2 : 1.1} fill={i === 0 ? '#00AEEF' : '#005BAC'}
            style={{ animation: `network-pulse ${2 + i * 0.25}s ease-in-out infinite`, animationDelay: `${i * 0.18}s` }} />
        ))}
      </svg>
      <div style={{ position: 'absolute', top: '18%', left: '12%', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,174,239,0.07) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: '18%', right: '12%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,91,172,0.09) 0%, transparent 70%)' }} />

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 560, padding: '0 32px' }}>
        <div style={{ width: 110, height: 110, margin: '0 auto 44px', position: 'relative' }}>
          <svg width="110" height="110" className="spin-ring" style={{ position: 'absolute' }}>
            <circle cx="55" cy="55" r="48" fill="none" stroke="rgba(0,174,239,0.12)" strokeWidth="3" />
            <circle cx="55" cy="55" r="48" fill="none" stroke="#00AEEF" strokeWidth="3" strokeDasharray="75 227" strokeLinecap="round" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #005BAC, #00AEEF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🧠</div>
          </div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: '#00AEEF', marginBottom: 14 }}>COREVISION AI ENGINE</div>
        <h2 style={{ fontSize: 34, fontWeight: 900, color: 'white', margin: '0 0 16px', letterSpacing: '-0.025em' }}>Analysing Your Profile</h2>
        <div style={{ minHeight: 30, marginBottom: 52 }}>
          <AnimatePresence mode="wait">
            <motion.div key={msgIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}
              style={{ fontSize: 16, color: 'rgba(255,255,255,0.48)' }}>
              {MESSAGES[msgIdx]}
            </motion.div>
          </AnimatePresence>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 8, height: 8, marginBottom: 12, overflow: 'hidden' }}>
          <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.1, ease: 'linear' }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #005BAC, #00AEEF)', borderRadius: 8, position: 'relative' }}>
            <div className="shimmer-bar" style={{ position: 'absolute', inset: 0, borderRadius: 8 }} />
          </motion.div>
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)' }}>{Math.round(progress)}% complete</div>
      </div>
    </div>
  );
}
