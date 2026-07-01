'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const path = usePathname();
  const isDark = path === '/';

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: isDark ? 'rgba(10,22,40,0.88)' : 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,91,172,0.08)',
      transition: 'all 0.4s ease',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.corestaff.com.sg/wp-content/uploads/2025/01/logo_corestaff.png"
            alt="Corestaff"
            style={{ height: 30, objectFit: 'contain', filter: isDark ? 'brightness(0) invert(1)' : 'none' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div style={{ width: 1, height: 20, background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)' }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: '#00AEEF', lineHeight: 1 }}>COREVISION™</div>
            <div style={{ fontSize: 10, color: isDark ? 'rgba(255,255,255,0.4)' : '#9ca3af', lineHeight: 1.3 }}>AI Workforce Intelligence</div>
          </div>
        </Link>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {[
            { label: 'Solutions',   href: '/#why' },
            { label: 'Industries',  href: '/#industries' },
            { label: 'Assessment',  href: '/assessment' },
            { label: 'About',       href: '/#how' },
          ].map(({ label, href }) => (
            <Link key={label} href={href}
              style={{
                padding: '7px 14px', borderRadius: 7, fontSize: 14, fontWeight: 500,
                color: isDark ? 'rgba(255,255,255,0.72)' : '#4b5563',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.color = isDark ? 'white' : '#005BAC';
                (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,91,172,0.06)';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.color = isDark ? 'rgba(255,255,255,0.72)' : '#4b5563';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >{label}</Link>
          ))}
          <Link href="/assessment"
            style={{
              marginLeft: 8, padding: '9px 20px', borderRadius: 9,
              background: 'linear-gradient(135deg, #005BAC, #00AEEF)',
              color: 'white', fontSize: 14, fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,91,172,0.35)';
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'none';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Start Assessment
          </Link>
        </nav>
      </div>
    </header>
  );
}
