'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AssessmentAnswers } from '@/lib/types';
import { runEngine } from '@/lib/engine';
import { saveAssessment } from '@/lib/storage';
import { DEMO_PROFILES } from '@/lib/demoProfiles';

const EMPTY: AssessmentAnswers = {
  industry: '', size: '', challenges: [], volume: '',
  timeline: '', budget: '', goals: '',
  name: '', company: '', position: '', email: '', phone: '', consent: false,
};

const INDUSTRIES = ['Manufacturing','Healthcare','Technology','Retail','Logistics','Finance','Construction','Life Sciences','Government','Other'];
const CHALLENGES = ['Talent shortage','High turnover','Rapid expansion','Executive hiring','Seasonal hiring','Payroll burden','HR compliance','No HR team','Scaling operations'];
const VOLUMES    = ['1–5','5–20','20–50','50–100','100+','Continuous hiring'];
const TIMELINES  = [
  ['Immediate',  'Roles needed within 2 weeks'],
  ['30 Days',    'Placement by next month'],
  ['90 Days',    'End of quarter'],
  ['6 Months',   'Mid-year planning'],
  ['Planning',   'Exploratory — no confirmed date'],
];
const BUDGETS = [
  ['Approved',        'Budget is confirmed and ready'],
  ['Estimated',       'Indicative budget, not yet confirmed'],
  ['Proposal Needed', 'Need a proposal to get approval'],
  ['Unknown',         'Not sure at this stage'],
];

function OptionPill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        padding: '16px 14px', borderRadius: 12, fontSize: 14, fontWeight: 600,
        cursor: 'pointer', border: '2px solid', transition: 'all 0.2s ease',
        borderColor: selected ? '#005BAC' : '#e5e7eb',
        background: selected ? 'rgba(0,91,172,0.05)' : 'white',
        color: selected ? '#005BAC' : '#374151',
        textAlign: 'center',
      }}
    >{label}</motion.button>
  );
}

function RowOption({ label, sub, selected, onClick }: { label: string; sub: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      onClick={onClick}
      style={{
        padding: '18px 24px', borderRadius: 12, background: 'white',
        border: '2px solid', borderColor: selected ? '#005BAC' : '#e5e7eb',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        cursor: 'pointer', transition: 'all 0.2s ease', width: '100%', textAlign: 'left',
      }}
    >
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: selected ? '#005BAC' : '#374151' }}>{label}</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>{sub}</div>
      </div>
      {selected && (
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#005BAC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>✓</span>
        </div>
      )}
    </motion.button>
  );
}

export default function AssessmentFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>(EMPTY);
  const [direction, setDirection] = useState(1);
  const router = useRouter();
  const TOTAL = 8;

  function go(n: number) {
    setDirection(n > step ? 1 : -1);
    setStep(n);
  }

  function toggleChallenge(c: string) {
    setAnswers(a => ({
      ...a,
      challenges: a.challenges.includes(c) ? a.challenges.filter(x => x !== c) : [...a.challenges, c],
    }));
  }

  function canProceed() {
    if (step === 0) return !!answers.industry;
    if (step === 1) return !!answers.size;
    if (step === 2) return answers.challenges.length > 0;
    if (step === 3) return !!answers.volume;
    if (step === 4) return !!answers.timeline;
    if (step === 5) return !!answers.budget;
    if (step === 6) return answers.goals.trim().length > 10;
    if (step === 7) return !!(answers.name && answers.email && answers.company && answers.consent);
    return true;
  }

  function handleSubmit() {
    if (!canProceed()) return;
    const result = runEngine(answers);
    saveAssessment(answers, result);
    router.push('/analysis');
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0 },
    exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -48 : 48 }),
  };

  const steps = [
    {
      title: 'What industry are you in?',
      sub: 'We benchmark your profile against Singapore hiring data in your sector.',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {INDUSTRIES.map(ind => (
            <OptionPill key={ind} label={ind} selected={answers.industry === ind} onClick={() => setAnswers(a => ({ ...a, industry: ind }))} />
          ))}
        </div>
      ),
    },
    {
      title: 'How many employees does your company have?',
      sub: 'This calibrates your workforce complexity and hiring capacity.',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {[['1–20','Early stage'],['20–100','Growing SME'],['100–500','Mid-market'],['500+','Enterprise']].map(([sz, lbl]) => (
            <motion.button key={sz} whileHover={{ y: -2 }} onClick={() => setAnswers(a => ({ ...a, size: sz }))}
              style={{ padding: '28px 28px', borderRadius: 14, background: 'white', border: '2px solid', borderColor: answers.size === sz ? '#005BAC' : '#e5e7eb', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: answers.size === sz ? '#005BAC' : '#111827', marginBottom: 6 }}>{sz}</div>
              <div style={{ fontSize: 13, color: '#9ca3af' }}>{lbl}</div>
            </motion.button>
          ))}
        </div>
      ),
    },
    {
      title: 'What are your biggest hiring challenges?',
      sub: 'Select all that apply — this drives your service recommendation.',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {CHALLENGES.map(c => (
            <motion.button key={c} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => toggleChallenge(c)}
              style={{ padding: '16px 14px', borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: '2px solid', borderColor: answers.challenges.includes(c) ? '#005BAC' : '#e5e7eb', background: answers.challenges.includes(c) ? 'rgba(0,91,172,0.05)' : 'white', color: answers.challenges.includes(c) ? '#005BAC' : '#374151', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.2s' }}>
              <div style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, background: answers.challenges.includes(c) ? '#005BAC' : 'transparent', border: answers.challenges.includes(c) ? 'none' : '2px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {answers.challenges.includes(c) && <span style={{ color: 'white', fontSize: 10, fontWeight: 900 }}>✓</span>}
              </div>
              {c}
            </motion.button>
          ))}
        </div>
      ),
    },
    {
      title: 'How many roles do you need to fill?',
      sub: 'Hiring volume determines the most cost-efficient engagement model.',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {VOLUMES.map(v => (
            <OptionPill key={v} label={v} selected={answers.volume === v} onClick={() => setAnswers(a => ({ ...a, volume: v }))} />
          ))}
        </div>
      ),
    },
    {
      title: 'What is your hiring timeline?',
      sub: 'Urgency shapes how we prioritise your engagement.',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TIMELINES.map(([t, desc]) => (
            <RowOption key={t} label={t} sub={desc} selected={answers.timeline === t} onClick={() => setAnswers(a => ({ ...a, timeline: t }))} />
          ))}
        </div>
      ),
    },
    {
      title: 'What is your budget status?',
      sub: 'Budget readiness determines how quickly we can engage.',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {BUDGETS.map(([b, desc]) => (
            <motion.button key={b} whileHover={{ y: -2 }} onClick={() => setAnswers(a => ({ ...a, budget: b }))}
              style={{ padding: '24px', borderRadius: 14, background: 'white', border: '2px solid', borderColor: answers.budget === b ? '#005BAC' : '#e5e7eb', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: answers.budget === b ? '#005BAC' : '#111827', marginBottom: 6 }}>{b}</div>
              <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.5 }}>{desc}</div>
            </motion.button>
          ))}
        </div>
      ),
    },
    {
      title: 'Describe your workforce goals.',
      sub: 'Tell us what success looks like for your organisation in the next 12 months.',
      content: (
        <textarea value={answers.goals} onChange={e => setAnswers(a => ({ ...a, goals: e.target.value }))}
          placeholder="e.g. We are expanding into three new markets and need to hire 60 engineers and operations managers within Q2. Speed and compliance are our primary concerns..."
          style={{ width: '100%', minHeight: 200, padding: '20px', borderRadius: 14, border: '2px solid #e5e7eb', fontSize: 15, color: '#374151', lineHeight: 1.72, resize: 'vertical', outline: 'none', fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
          onFocus={e => (e.target.style.borderColor = '#005BAC')}
          onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
        />
      ),
    },
    {
      title: 'Almost done — tell us about yourself.',
      sub: 'Your Executive Report will be sent here and reviewed by a Corestaff specialist.',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { k: 'name',     label: 'Full Name',      type: 'text' },
            { k: 'company',  label: 'Company Name',   type: 'text' },
            { k: 'position', label: 'Your Position',  type: 'text' },
            { k: 'email',    label: 'Work Email',     type: 'email' },
            { k: 'phone',    label: 'Phone Number',   type: 'tel' },
          ].map(({ k, label, type }) => (
            <div key={k} style={{ gridColumn: k === 'phone' ? '2' : 'auto' }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 7, letterSpacing: '0.04em' }}>{label.toUpperCase()}</label>
              <input type={type} value={(answers as Record<string, string>)[k]}
                onChange={e => setAnswers(a => ({ ...a, [k]: e.target.value }))}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: 15, color: '#111827', outline: 'none', fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                onFocus={e => (e.target.style.borderColor = '#005BAC')}
                onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
              />
            </div>
          ))}
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12, padding: '16px 18px', background: 'rgba(0,91,172,0.03)', borderRadius: 12, border: '1px solid rgba(0,91,172,0.08)', cursor: 'pointer', alignItems: 'flex-start' }}
            onClick={() => setAnswers(a => ({ ...a, consent: !a.consent }))}>
            <div style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, background: answers.consent ? '#005BAC' : 'transparent', border: answers.consent ? 'none' : '2px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
              {answers.consent && <span style={{ color: 'white', fontSize: 11, fontWeight: 900 }}>✓</span>}
            </div>
            <span style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.65 }}>
              I consent to Corestaff using my information to generate this assessment and contact me regarding relevant workforce solutions. Data is handled per Corestaff&apos;s privacy policy.
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F7F9FC' }}>
      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'white', borderBottom: '1px solid #f3f4f6', padding: '16px 32px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <button onClick={() => step > 0 ? go(step - 1) : router.push('/')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#6b7280', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6, padding: 0 }}>
              ← {step > 0 ? 'Previous' : 'Back to Home'}
            </button>
            <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 500 }}>Step {step + 1} of {TOTAL}</div>
          </div>
          <div style={{ background: '#f3f4f6', borderRadius: 4, height: 4 }}>
            <motion.div
              animate={{ width: `${((step + 1) / TOTAL) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #005BAC, #00AEEF)', borderRadius: 4 }}
            />
          </div>
        </div>
      </div>

      {/* Demo profiles panel */}
      {step === 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ position: 'fixed', top: 90, right: 24, zIndex: 40, background: 'white', border: '1px solid #e5e7eb', borderRadius: 16, padding: '16px 18px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', width: 220 }}
        >
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#9ca3af', marginBottom: 12 }}>QUICK DEMO PROFILES</div>
          {DEMO_PROFILES.map((p, i) => (
            <button key={i} onClick={() => { setAnswers({ ...p.answers }); setStep(7); }}
              style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 10px', borderRadius: 8, fontSize: 13, color: '#374151', fontWeight: 500, transition: 'all 0.2s', marginBottom: 2 }}
              onMouseOver={e => { (e.currentTarget.style.background = 'rgba(0,91,172,0.06)'); (e.currentTarget.style.color = '#005BAC'); }}
              onMouseOut={e => { (e.currentTarget.style.background = 'transparent'); (e.currentTarget.style.color = '#374151'); }}
            >
              {p.emoji} {p.label}
            </button>
          ))}
        </motion.div>
      )}

      {/* Step content */}
      <div style={{ paddingTop: 88, paddingBottom: 120, display: 'flex', justifyContent: 'center', padding: '88px 32px 120px' }}>
        <div style={{ maxWidth: 820, width: '100%' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={step} custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#00AEEF', letterSpacing: '0.12em', marginBottom: 14 }}>QUESTION {step + 1} OF {TOTAL}</div>
                <h2 style={{ fontSize: 36, fontWeight: 900, color: '#111827', margin: '0 0 12px', letterSpacing: '-0.025em', lineHeight: 1.18 }}>{steps[step].title}</h2>
                <p style={{ fontSize: 16, color: '#6b7280', margin: 0, lineHeight: 1.6 }}>{steps[step].sub}</p>
              </div>
              {steps[step].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #f3f4f6', padding: '18px 32px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', justifyContent: 'flex-end' }}>
          {step < TOTAL - 1 ? (
            <motion.button whileHover={canProceed() ? { y: -1, boxShadow: '0 10px 28px rgba(0,91,172,0.3)' } : {}} whileTap={canProceed() ? { scale: 0.98 } : {}}
              onClick={() => canProceed() && go(step + 1)}
              style={{ padding: '13px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700, background: canProceed() ? 'linear-gradient(135deg, #005BAC, #00AEEF)' : '#e5e7eb', color: canProceed() ? 'white' : '#9ca3af', border: 'none', cursor: canProceed() ? 'pointer' : 'default', transition: 'all 0.25s' }}
            >
              Continue →
            </motion.button>
          ) : (
            <motion.button whileHover={canProceed() ? { y: -1, boxShadow: '0 10px 28px rgba(0,91,172,0.3)' } : {}} whileTap={canProceed() ? { scale: 0.98 } : {}}
              onClick={handleSubmit}
              style={{ padding: '13px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700, background: canProceed() ? 'linear-gradient(135deg, #005BAC, #00AEEF)' : '#e5e7eb', color: canProceed() ? 'white' : '#9ca3af', border: 'none', cursor: canProceed() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.25s' }}
            >
              ✦ Generate My Report
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
