'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CtaFooter() {
  return (
    <>
      {/* CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #080f1e 0%, #0b1e3f 50%, #003a8c 100%)',
        padding: '100px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(0,174,239,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#00AEEF', marginBottom: 18 }}>GET STARTED</div>
          <h2 style={{ fontSize: 46, fontWeight: 900, color: 'white', lineHeight: 1.12, margin: '0 0 20px', letterSpacing: '-0.025em' }}>
            Ready to Transform Hiring Into Workforce Intelligence?
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', marginBottom: 40, lineHeight: 1.65 }}>
            Complete your AI Workforce Assessment in under 3 minutes and receive a personalised Executive Report.
          </p>
          <Link href="/assessment" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '15px 34px', borderRadius: 12, fontSize: 16, fontWeight: 700,
            background: 'linear-gradient(135deg, #005BAC, #00AEEF)', color: 'white', textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(0,91,172,0.4)', transition: 'all 0.3s ease',
          }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,91,172,0.5)'; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,91,172,0.4)'; }}
          >
            ✦ Begin Your Assessment
          </Link>
          <div style={{ marginTop: 22, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            No commitment required · Results in under 3 minutes · Reviewed by a Corestaff specialist
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#080f1e', padding: '44px 32px 32px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700, color: 'rgba(255,255,255,0.65)', marginBottom: 5, fontSize: 14 }}>Corestaff Pte Ltd</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>© 2025 Corestaff Singapore. All rights reserved.</div>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Use', 'Contact Us'].map(l => (
              <span key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
