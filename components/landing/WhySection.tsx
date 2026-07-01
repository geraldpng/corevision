'use client';
import { motion } from 'framer-motion';

const cards = [
  { icon: '🧠', title: 'AI-Powered Matching',    desc: 'Proprietary algorithms analyse 40+ workforce signals to surface the optimal engagement model for your organisation.' },
  { icon: '🛡', title: 'Compliance-First',        desc: 'Singapore MOM regulations, payroll compliance, and employment law built into every recommendation.' },
  { icon: '📈', title: 'Workforce Intelligence',  desc: 'Benchmark your hiring maturity against 200+ Singapore employers across your industry sector.' },
  { icon: '⚡', title: 'Speed to Hire',           desc: 'Average time-to-offer of 14 days for permanent roles. Contract placements within 48 hours.' },
  { icon: '🏆', title: 'Enterprise Grade',        desc: 'Trusted by Fortune 500 regional HQs, government-linked companies, and high-growth startups.' },
  { icon: '👥', title: 'Dedicated Consultants',   desc: 'Industry-specialised consultants with an average of 9 years sector experience.' },
];

export default function WhySection() {
  return (
    <section id="why" style={{ background: 'white', padding: '100px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#00AEEF', marginBottom: 14 }}>WHY COREVISION</div>
          <h2 style={{ fontSize: 42, fontWeight: 900, color: '#111827', margin: '0 0 16px', letterSpacing: '-0.025em' }}>Intelligence Before Engagement</h2>
          <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 540, margin: '0 auto', lineHeight: 1.65 }}>Most companies waste weeks in discovery. CoreVision cuts to clarity in minutes.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.09 }}
              whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(0,91,172,0.1)' }}
              style={{ background: 'white', borderRadius: 18, padding: '32px 28px', border: '1px solid rgba(0,91,172,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', transition: 'box-shadow 0.3s ease', cursor: 'default' }}
            >
              <div style={{ fontSize: 28, marginBottom: 18 }}>{c.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#111827', marginBottom: 10 }}>{c.title}</div>
              <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.68 }}>{c.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
