'use client';
import { motion } from 'framer-motion';

const steps = [
  { n: '01', title: 'Complete Assessment',  desc: 'Answer 8 targeted questions about your workforce objectives and business context.' },
  { n: '02', title: 'AI Analysis',          desc: 'CoreVision analyses your profile against 200+ hiring benchmarks in real time.' },
  { n: '03', title: 'Receive Your Report',  desc: 'Get a personalised Executive Workforce Intelligence Report with recommended solutions.' },
  { n: '04', title: 'Consult an Expert',    desc: 'A Corestaff specialist reviews your report and proposes a tailored engagement.' },
];

export default function HowItWorks() {
  return (
    <section id="how" style={{ background: '#F7F9FC', padding: '100px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#00AEEF', marginBottom: 14 }}>HOW IT WORKS</div>
          <h2 style={{ fontSize: 42, fontWeight: 900, color: '#111827', letterSpacing: '-0.025em', margin: 0 }}>From Assessment to Action in 4 Steps</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 36, left: '12%', right: '12%', height: 1, background: 'linear-gradient(90deg, #005BAC, #00AEEF)', opacity: 0.18 }} />
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{ textAlign: 'center', padding: '0 18px' }}
            >
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: i < 2 ? 'linear-gradient(135deg, #005BAC, #00AEEF)' : 'white',
                border: i < 2 ? 'none' : '2px solid #e5e7eb',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: i < 2 ? '0 8px 28px rgba(0,91,172,0.28)' : 'none',
              }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: i < 2 ? 'white' : '#9ca3af' }}>{s.n}</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 10 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.65 }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
