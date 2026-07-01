'use client';
import { useEffect, useState } from 'react';

interface Props { target: number; duration?: number; suffix?: string; prefix?: string; }

export default function AnimatedCounter({ target, duration = 1600, suffix = '', prefix = '' }: Props) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(ease * target));
      if (frame >= totalFrames) { setVal(target); clearInterval(timer); }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <>{prefix}{val.toLocaleString()}{suffix}</>;
}
