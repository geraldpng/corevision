'use client';
import { motion } from 'framer-motion';

const industries = [
  'Manufacturing', 'Healthcare', 'Technology', 'Financial Services',
  'Retail & FMCG', 'Logistics', 'Life Sciences', 'Government',
  'Construction', 'Energy & Utilities',
];

export default function Industries() {
  return (
    <section id="industries" style={{ background: 'white', padding: '100px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#00AEEF', marginBottom: 14 }}>INDUSTRIES SERVED</div>
          <h2 style={{ fontSize: 42, fontWeight: 900, color: '#111827', letterSpacing: '-0.025em', margin: 0 }}>Deep Sector Expertise</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}
        >
          {industries.map((ind, i) => (
            <motion.div
              key={ind}
              whileHover={{ scale: 1.04, borderColor: '#005BAC', color: '#005BAC', background: 'rgba(0,91,172,0.04)' }}
              transition={{ duration: 0.15 }}
              style={{ padding: '11px 24px', borderRadius: 50, border: '1.5px solid #e5e7eb', fontSize: 14, fontWeight: 500, color: '#374151', cursor: 'pointer' }}
            >
              {ind}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
