import { AssessmentAnswers } from './types';

export interface DemoProfile {
  label: string;
  emoji: string;
  answers: AssessmentAnswers;
}

export const DEMO_PROFILES: DemoProfile[] = [
  {
    label: 'Manufacturing Expansion',
    emoji: '🏭',
    answers: {
      industry: 'Manufacturing', size: '100–500',
      challenges: ['Rapid expansion', 'Talent shortage', 'Scaling operations'],
      volume: '50–100', timeline: '30 Days', budget: 'Approved',
      goals: 'We are expanding our production lines across three facilities and need to onboard 80+ skilled workers including engineers, technicians, and floor supervisors. Speed-to-hire and compliance are our top priorities.',
      name: 'David Tan', company: 'Precision Parts Asia Pte Ltd', position: 'Head of HR',
      email: 'dtan@precisionparts.sg', phone: '+65 9123 4567', consent: true,
    },
  },
  {
    label: 'Healthcare Provider',
    emoji: '🏥',
    answers: {
      industry: 'Healthcare', size: '500+',
      challenges: ['Talent shortage', 'High turnover', 'HR compliance'],
      volume: '20–50', timeline: 'Immediate', budget: 'Approved',
      goals: 'Our nursing and allied health vacancies are critical. We have ongoing MOH compliance requirements and need a partner experienced in healthcare credentialing and fast placement.',
      name: 'Sarah Lim', company: 'MedCare Singapore', position: 'Director of Operations',
      email: 'slim@medcare.sg', phone: '+65 8234 5678', consent: true,
    },
  },
  {
    label: 'Tech Startup (Post Series B)',
    emoji: '💻',
    answers: {
      industry: 'Technology', size: '20–100',
      challenges: ['Rapid expansion', 'No HR team', 'Scaling operations'],
      volume: '5–20', timeline: '30 Days', budget: 'Estimated',
      goals: 'Post Series B, we are scaling from 30 to 120 people in 12 months. No internal HR function — need an outsourced partner to handle hiring, payroll, and compliance as we grow.',
      name: 'Marcus Chen', company: 'Nexus AI Pte Ltd', position: 'CEO',
      email: 'mchen@nexusai.sg', phone: '+65 9345 6789', consent: true,
    },
  },
  {
    label: 'Retail Expansion',
    emoji: '🛍',
    answers: {
      industry: 'Retail', size: '100–500',
      challenges: ['Seasonal hiring', 'High turnover', 'Payroll burden'],
      volume: 'Continuous hiring', timeline: '90 Days', budget: 'Estimated',
      goals: 'Opening 12 new stores across Singapore and Malaysia. Need reliable part-time and contract staff plus payroll handled across two jurisdictions.',
      name: 'Priya Nair', company: 'UrbanStyle Retail Group', position: 'VP People & Culture',
      email: 'pnair@urbanstyle.sg', phone: '+65 8456 7890', consent: true,
    },
  },
  {
    label: 'Financial Institution',
    emoji: '🏦',
    answers: {
      industry: 'Finance', size: '500+',
      challenges: ['Executive hiring', 'HR compliance'],
      volume: '1–5', timeline: '90 Days', budget: 'Approved',
      goals: 'We are recruiting a new CFO and two board-level directors as part of our regional expansion. Confidentiality, sector expertise, and discretion are paramount.',
      name: 'Jonathan Koh', company: 'Meridian Capital Group', position: 'Group CEO',
      email: 'jkoh@meridiancap.sg', phone: '+65 9567 8901', consent: true,
    },
  },
];
