'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AssessmentAnswers, RecommendationResult } from '@/lib/types';
import { SERVICES, getService } from '@/lib/services';
import CircleProgress from '@/components/ui/CircleProgress';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

interface Props { answers: AssessmentAnswers; result: RecommendationResult; }

const PRIORITY_COLOR: Record<string, string> = { HIGH: '#ef4444', MEDIUM: '#f59e0b', LOW: '#10b981' };

export default function ReportView({ answers, result }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const primary   = getService(result.primary);
  const secondary = result.secondary.map(id => getService(id)).filter(Boolean);

  const breakdown = [
    { label: 'Business Maturity',  value: result.breakdown.business,    color: '#005BAC' },
    { label: 'Budget Readiness',   value: result.breakdown.budget,      color: '#00AEEF' },
    { label: 'Timeline Urgency',   value: result.breakdown.timeline,    color: '#6366f1' },
    { label: 'HR Capability',      value: result.breakdown.hr,          color: '#10b981' },
    { label: 'Operational Scale',  value: result.breakdown.operational, color: '#f59e0b' },
  ];

  const card = {
    background: 'white', borderRadius: 20, padding: '32px',
    border: '1px solid rgba(0,91,172,0.07)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F7F9FC' }}>
      {/* Hero banner */}
      <div style={{ background: 'linear-gradient(135deg, #080f1e 0%, #0b1e3f 45%, #003a8c 100%)', padding: '120px 32px 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 50%, rgba(0,174,239,0.08) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: '#00AEEF', marginBottom: 14 }}>EXECUTIVE WORKFORCE INTELLIGENCE REPORT</div>
            <h1 style={{ fontSize: 44, fontWeight: 900, color: 'white', margin: '0 0 10px', letterSpacing: '-0.03em' }}>{answers.company || 'Your Organisation'}</h1>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.48)', margin: '0 0 22px' }}>
              Prepared for {answers.name} · {answers.industry} · {new Date().toLocaleDateString('en-SG', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 20, background: `${PRIORITY_COLOR[result.priority]}18`, border: `1px solid ${PRIORITY_COLOR[result.priority]}44` }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: PRIORITY_COLOR[result.priority] }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: PRIORITY_COLOR[result.priority], letterSpacing: '0.1em' }}>{result.priority} PRIORITY LEAD</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="glass" style={{ borderRadius: 20, padding: '32px 40px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.45)', marginBottom: 14 }}>HIRING READINESS SCORE</div>
            <div style={{ fontSize: 76, fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-0.04em' }}>
              {mounted && <AnimatedCounter target={result.readiness} suffix="%" duration={1600} />}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 8 }}>
              {result.readiness > 80 ? 'Top 20% of market' : result.readiness > 65 ? 'Above industry average' : 'Baseline assessment'}
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px 80px' }}>

        {/* Primary recommendation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          style={{ ...card, border: '2px solid rgba(0,91,172,0.14)', marginBottom: 24, boxShadow: '0 4px 32px rgba(0,91,172,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: '#00AEEF', marginBottom: 14 }}>PRIMARY RECOMMENDATION</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <span style={{ fontSize: 34 }}>{primary?.icon}</span>
                <div>
                  <h2 style={{ fontSize: 28, fontWeight: 900, color: '#111827', margin: '0 0 4px', letterSpacing: '-0.025em' }}>{primary?.label}</h2>
                  <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>{primary?.desc}</p>
                </div>
              </div>
              <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.75, margin: '0 0 24px', maxWidth: 580 }}>{result.summary}</p>
              <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 10, background: 'linear-gradient(135deg, #005BAC, #00AEEF)', color: 'white', textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>
                View Consultant Dashboard →
              </Link>
            </div>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', marginBottom: 8 }}>CONFIDENCE</div>
              <div style={{ fontSize: 52, fontWeight: 900, color: '#005BAC', lineHeight: 1 }}>{result.confidence}%</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>AI match score</div>
            </div>
          </div>
        </motion.div>

        {/* Scores + Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} style={card}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: '#9ca3af', marginBottom: 24 }}>READINESS DASHBOARD</div>
            {breakdown.map((item, i) => (
              <div key={i} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.value}%</span>
                </div>
                <div style={{ background: '#f3f4f6', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: mounted ? `${item.value}%` : '0%' }}
                    transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                    style={{ height: '100%', background: item.color, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} style={card}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: '#9ca3af', marginBottom: 24 }}>AI ASSESSMENT SCORES</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, justifyItems: 'center', marginBottom: 24 }}>
              <CircleProgress value={result.readiness}  size={96} color="#005BAC" label="Readiness"   sublabel="Overall" delay={400} />
              <CircleProgress value={result.confidence} size={96} color="#00AEEF" label="Confidence"  sublabel="Match"   delay={550} />
              <CircleProgress value={result.opportunity} size={96} color="#6366f1" label="Opportunity" sublabel="Score"  delay={700} />
            </div>
            <div style={{ padding: '16px', background: 'rgba(0,91,172,0.03)', borderRadius: 12, border: '1px solid rgba(0,91,172,0.08)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>Executive Summary</div>
              <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.65 }}>
                {answers.company || 'This organisation'} presents a{' '}
                <strong style={{ color: '#005BAC' }}>{result.priority.toLowerCase()}-priority</strong> engagement opportunity.
                Budget is <strong style={{ color: '#374151' }}>{answers.budget.toLowerCase()}</strong>, timeline is{' '}
                <strong style={{ color: '#374151' }}>{answers.timeline.toLowerCase()}</strong>, and primary fit is{' '}
                <strong style={{ color: '#005BAC' }}>{primary?.label}</strong>.
              </div>
            </div>
          </motion.div>
        </div>

        {/* Secondary recommendations */}
        {secondary.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} style={{ ...card, marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: '#9ca3af', marginBottom: 24 }}>ADDITIONAL RECOMMENDATIONS</div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${secondary.length}, 1fr)`, gap: 16 }}>
              {secondary.map((svc, i) => svc && (
                <div key={i} style={{ padding: '20px', borderRadius: 14, background: '#F7F9FC', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontSize: 26, marginBottom: 10 }}>{svc.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 6 }}>{svc.label}</div>
                  <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.55 }}>{svc.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Next steps */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} style={{ ...card, marginBottom: 24 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: '#9ca3af', marginBottom: 24 }}>SUGGESTED NEXT STEPS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {result.nextSteps.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '15px 18px', borderRadius: 12, background: i === 0 ? 'rgba(0,91,172,0.04)' : 'transparent', border: i === 0 ? '1px solid rgba(0,91,172,0.1)' : 'none' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: i === 0 ? 'linear-gradient(135deg, #005BAC, #00AEEF)' : '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: i === 0 ? 'white' : '#9ca3af' }}>{i + 1}</span>
                </div>
                <div style={{ fontSize: 14, color: i === 0 ? '#111827' : '#6b7280', fontWeight: i === 0 ? 600 : 400, lineHeight: 1.6, paddingTop: 3 }}>{s}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
          style={{ background: 'linear-gradient(135deg, #080f1e, #003a8c)', borderRadius: 20, padding: '48px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(0,174,239,0.1) 0%, transparent 65%)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: 'white', marginBottom: 10 }}>Ready to Take the Next Step?</div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', marginBottom: 28 }}>A Corestaff specialist will review your report and reach out within one business day.</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
              <button style={{ padding: '13px 26px', borderRadius: 10, fontSize: 14, fontWeight: 700, background: 'linear-gradient(135deg, #005BAC, #00AEEF)', color: 'white', border: 'none', cursor: 'pointer' }}>
                ✉ Request Consultation
              </button>
              <Link href="/dashboard" style={{ padding: '13px 22px', borderRadius: 10, fontSize: 14, fontWeight: 500, background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(255,255,255,0.25)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                View Consultant Panel
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
