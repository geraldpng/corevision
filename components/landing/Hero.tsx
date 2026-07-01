'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export default function Hero() {
  const stats = [
    { target: 2400, suffix: '+', label: 'Placements Annually' },
    { target: 98,   suffix: '%', label: 'Client Retention' },
    { target: 15,   suffix: '+', label: 'Years in Singapore' },
    { target: 200,  suffix: '+', label: 'Active Clients' },
  ];

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #080f1e 0%, #0b1e3f 40%, #083060 70%, #003a8c 100%)',
      display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden',
    }}>
      {/* Orbs */}
      <div style={{ position: 'absolute', top: '15%', right: '8%', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,174,239,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,91,172,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 32px 80px', width: '100%', display: 'flex', gap: 80, alignItems: 'center' }}>

        {/* Left copy */}
        <motion.div
          style={{ flex: 1 }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,174,239,0.1)', border: '1px solid rgba(0,174,239,0.22)', borderRadius: 24, padding: '6px 16px', marginBottom: 24 }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00AEEF', animation: 'pulse-dot 2s ease infinite' }} />
            <span style={{ fontSize: 11, color: '#00AEEF', fontWeight: 700, letterSpacing: '0.1em' }}>AI WORKFORCE INTELLIGENCE — SINGAPORE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            style={{ fontSize: 58, fontWeight: 900, color: 'white', lineHeight: 1.08, margin: '0 0 24px', letterSpacing: '-0.03em' }}
          >
            Build Your Future<br />
            <span style={{ background: 'linear-gradient(90deg, #00AEEF, #60d4fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Workforce
            </span>{' '}
            With Confidence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.7 }}
            style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.72, marginBottom: 40, maxWidth: 520 }}
          >
            CoreVision analyses your hiring objectives, workforce challenges, and business priorities to recommend the optimal workforce strategy — before you speak to a consultant.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ display: 'flex', gap: 14 }}
          >
            <Link href="/assessment" style={{
              padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 700,
              background: 'linear-gradient(135deg, #005BAC, #00AEEF)', color: 'white',
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(0,91,172,0.3)',
            }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,91,172,0.4)'; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,91,172,0.3)'; }}
            >
              Start Workforce Assessment →
            </Link>
            <button style={{
              padding: '14px 24px', borderRadius: 10, fontSize: 16, fontWeight: 500,
              background: 'transparent', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >Watch Demo</button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{ display: 'flex', gap: 32, marginTop: 52 }}
          >
            {stats.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 30, fontWeight: 900, color: 'white', lineHeight: 1 }}>
                  <AnimatedCounter target={s.target} suffix={s.suffix} duration={1600 + i * 150} />
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 5 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Floating Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          style={{ flex: '0 0 400px', position: 'relative', height: 460 }}
        >
          {/* Card 1 — Hiring Readiness */}
          <div className="glass float-a" style={{ position: 'absolute', top: 0, left: 20, borderRadius: 18, padding: '22px 26px', minWidth: 230 }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 12 }}>HIRING READINESS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: 'white', lineHeight: 1 }}>91<span style={{ fontSize: 22 }}>%</span></div>
              <div style={{ flex: 1 }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 4, height: 6, marginBottom: 5 }}>
                  <div style={{ width: '91%', height: '100%', background: 'linear-gradient(90deg, #005BAC, #00AEEF)', borderRadius: 4 }} />
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>Top 15% of market</div>
              </div>
            </div>
          </div>

          {/* Card 2 — AI Recommendation */}
          <div className="glass float-b" style={{ position: 'absolute', top: 130, right: 0, borderRadius: 18, padding: '22px 26px', minWidth: 250 }}>
            <div style={{ fontSize: 10, color: '#00AEEF', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 12 }}>AI RECOMMENDATION</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 12 }}>Recruitment Process Outsourcing</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>96% confidence match</span>
            </div>
          </div>

          {/* Card 3 — Growth Forecast */}
          <div className="glass float-c" style={{ position: 'absolute', bottom: 100, left: 0, borderRadius: 18, padding: '22px 26px', minWidth: 210 }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 12 }}>GROWTH FORECAST</div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 52, marginBottom: 10 }}>
              {[28, 42, 36, 58, 50, 72, 65, 90].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === 7 ? 'linear-gradient(to top, #005BAC, #00AEEF)' : 'rgba(255,255,255,0.14)' }} />
              ))}
            </div>
            <div style={{ fontSize: 13, color: '#00AEEF', fontWeight: 600 }}>↑ 34% YoY hiring velocity</div>
          </div>

          {/* Card 4 — Priority */}
          <div className="glass float-a" style={{ position: 'absolute', bottom: 0, right: 20, borderRadius: 18, padding: '18px 22px', animationDelay: '1.2s' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', marginBottom: 10 }}>LEAD PRIORITY</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: 16 }}>A</div>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>HIGH VALUE</div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>Fast-track engagement</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
