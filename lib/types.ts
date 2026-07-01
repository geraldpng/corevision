export interface AssessmentAnswers {
  industry: string;
  size: string;
  challenges: string[];
  volume: string;
  timeline: string;
  budget: string;
  goals: string;
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  consent: boolean;
}

export interface ReadinessBreakdown {
  business: number;
  budget: number;
  timeline: number;
  hr: number;
  operational: number;
}

export interface RecommendationResult {
  primary: string;
  secondary: string[];
  confidence: number;
  readiness: number;
  opportunity: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  breakdown: ReadinessBreakdown;
  summary: string;
  nextSteps: string[];
  discovery: string[];
}

export interface Service {
  id: string;
  label: string;
  icon: string;
  desc: string;
}
