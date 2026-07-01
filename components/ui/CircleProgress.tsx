'use client';
import { useEffect, useState } from 'react';

interface Props {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  sublabel?: string;
  delay?: number;
}

export default function CircleProgress({
  value, size = 96, stroke = 8,
  color = '#005BAC', trackColor = '#e5e7eb',
  label, sublabel, delay = 300,
}: Props) {
  const [animated, setAnimated] = useState(0);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    const t = setTimeout(() => {
      let frame = 0;
      const total = 60;
      const timer = setInterval(() => {
        frame++;
        const ease = 1 - Math.pow(1 - frame / total, 3);
        setAnimated(Math.round(ease * value));
        if (frame >= total) { setAnimated(value); clearInterval(timer); }
      }, 25);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  const offset = circ - (animated / 100) * circ;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={color} strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.05s ease' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column',
        }}>
          <span style={{ fontSize: size * 0.21, fontWeight: 800, color: '#111827', lineHeight: 1 }}>
            {animated}%
          </span>
        </div>
      </div>
      {label    && <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', textAlign: 'center' }}>{label}</div>}
      {sublabel && <div style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>{sublabel}</div>}
    </div>
  );
}
