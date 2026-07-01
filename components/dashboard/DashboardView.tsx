'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AssessmentAnswers, RecommendationResult } from '@/lib/types';
import { getService } from '@/lib/services';

interface Props { answers: AssessmentAnswers; result: RecommendationResult; }

const PRIORITY_COLOR: Record<string, string> = { HIGH: '#ef4444', MEDIUM: '#f59e0b', LOW: '#10b981' };
const REVENUE_MAP: Record<string, string> = {
  '1–5': '$8K – $20K', '5–20': '$20K – $80K', '20–50': '$80K – $200K',
  '50–100': '$200K – $400K', '100+': '$400K+', 'Continuous hiring': '$500K+',
};

const cell = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '24px' };

export default function DashboardView({ answers, result }: Props) {
  const [notes, setNotes] = useState('');
  const primary   = getService(result.primary);
  const secondary = result.secondary.map(id => getService(id)).filter(Boolean);

  return (
    <div style={{ minHeight: '100vh', background: '#0a1020' }}>
      {/* Topbar */}
      <div style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/report" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 8, padding: '7px 14px', color: 'rgba(255,255,255,0.55)', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            ← Back to Report
          </Link>
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: '#00AEEF' }}>CONSULTANT DASHBOARD</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>— Internal View Only</div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ padding: '5px 14px', borderRadius: 20, background: `${PRIORITY_COLOR[result.priority]}18`, border: `1px solid ${PRIORITY_COLOR[result.priority]}44`, fontSize: 11, fontWeight: 700, color: PRIORITY_COLOR[result.priority], letterSpacing: '0.1em' }}>
            {result.priority} PRIORITY
          </div>
          <div style={{ padding: '5px 14px', borderRadius: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
            {new Date().toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 32px 60px' }}>

        {/* Row 1: Lead details, Scoring, Hiring profile */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, marginBottom: 18 }}>
          {/* Lead */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={cell}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)', marginBottom: 18 }}>LEAD DETAILS</div>
            {[
              ['Name',      answers.name],
              ['Company',   answers.company],
              ['Position',  answers.position],
              ['Email',     answers.email],
              ['Phone',     answers.phone],
              ['Industry',  answers.industry],
              ['Headcount', answers.size],
            ].filter(([, v]) => v).map(([k, v]) => (
              <div key={k} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 3 }}>{k!.toUpperCase()}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)', fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </motion.div>

          {/* Scoring */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={cell}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)', marginBottom: 18 }}>LEAD SCORING</div>
            {[
              ['Readiness Score',  result.readiness,    '#00AEEF'],
              ['Confidence Match', result.confidence,   '#10b981'],
              ['Opportunity Score',result.opportunity,  '#6366f1'],
            ].map(([l, v, c]) => (
              <div key={l as string} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{l}</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: c as string }}>{v}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 4, height: 5 }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                    style={{ height: '100%', background: c as string, borderRadius: 4 }} />
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 18, marginTop: 4 }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 8 }}>EST. REVENUE OPPORTUNITY</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: 'white' }}>{REVENUE_MAP[answers.volume] ?? '$20K+'}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>{answers.volume} roles · {answers.timeline}</div>
            </div>
          </motion.div>

          {/* Hiring profile */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={cell}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)', marginBottom: 18 }}>HIRING PROFILE</div>
            {[
              ['Volume',          answers.volume],
              ['Timeline',        answers.timeline],
              ['Budget Status',   answers.budget],
              ['Key Challenges',  answers.challenges.join(', ')],
            ].filter(([, v]) => v).map(([k, v]) => (
              <div key={k} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 5 }}>{k!.toUpperCase()}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55 }}>{v}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Discovery questions + Cross-sell + Notes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 18, marginBottom: 18 }}>
          {/* Discovery */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={cell}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)', marginBottom: 18 }}>SUGGESTED DISCOVERY QUESTIONS</div>
            {result.discovery.map((q, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 18, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: 7, background: 'rgba(0,174,239,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#00AEEF' }}>{i + 1}</span>
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.68)', lineHeight: 1.65 }}>{q}</div>
              </div>
            ))}
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Cross-sell */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ ...cell, flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)', marginBottom: 18 }}>CROSS-SELL OPPORTUNITIES</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[primary, ...secondary].filter(Boolean).map((svc, i) => svc && (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10, background: i === 0 ? 'rgba(0,91,172,0.2)' : 'rgba(255,255,255,0.03)', border: i === 0 ? '1px solid rgba(0,91,172,0.35)' : '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: 20 }}>{svc.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: i === 0 ? '#60d4fa' : 'rgba(255,255,255,0.65)' }}>{svc.label}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>{i === 0 ? 'Primary recommendation' : 'Secondary opportunity'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Notes */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={cell}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)', marginBottom: 14 }}>INTERNAL NOTES</div>
              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Add notes for the consulting team…"
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 9, padding: '12px', color: 'rgba(255,255,255,0.7)', fontSize: 13, resize: 'none', height: 88, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }} />
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button style={{ flex: 1, padding: '9px', borderRadius: 8, background: 'rgba(0,91,172,0.2)', border: '1px solid rgba(0,91,172,0.35)', color: '#60d4fa', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  Save to CRM
                </button>
                <button style={{ flex: 1, padding: '9px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)', fontSize: 13, cursor: 'pointer' }}>
                  Export PDF
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Goals */}
        {answers.goals && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={cell}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)', marginBottom: 14 }}>CLIENT-STATED GOALS</div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.78, fontStyle: 'italic' }}>&ldquo;{answers.goals}&rdquo;</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
