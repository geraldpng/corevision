'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import ReportView from '@/components/report/ReportView';
import { loadAssessment } from '@/lib/storage';
import { AssessmentAnswers, RecommendationResult } from '@/lib/types';

export default function ReportPage() {
  const router = useRouter();
  const [data, setData] = useState<{ answers: AssessmentAnswers; result: RecommendationResult } | null>(null);

  useEffect(() => {
    const stored = loadAssessment();
    if (!stored) { router.push('/assessment'); return; }
    setData(stored);
  }, [router]);

  if (!data) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F9FC' }}>
      <div style={{ fontSize: 16, color: '#9ca3af' }}>Loading report…</div>
    </div>
  );

  return (
    <>
      <Header />
      <div style={{ paddingTop: 64 }}>
        <ReportView answers={data.answers} result={data.result} />
      </div>
    </>
  );
}
