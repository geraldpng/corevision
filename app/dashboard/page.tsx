'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardView from '@/components/dashboard/DashboardView';
import { loadAssessment } from '@/lib/storage';
import { AssessmentAnswers, RecommendationResult } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<{ answers: AssessmentAnswers; result: RecommendationResult } | null>(null);

  useEffect(() => {
    const stored = loadAssessment();
    if (!stored) { router.push('/assessment'); return; }
    setData(stored);
  }, [router]);

  if (!data) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a1020' }}>
      <div style={{ fontSize: 16, color: '#4b5563' }}>Loading…</div>
    </div>
  );

  return <DashboardView answers={data.answers} result={data.result} />;
}
