import { Service } from './types';

export const SERVICES: Service[] = [
  { id: 'perm',     label: 'Permanent Recruitment',          icon: '👔', desc: 'Direct-hire talent acquisition for permanent roles' },
  { id: 'exec',     label: 'Executive Search',               icon: '🎯', desc: 'C-suite and senior leadership retained search' },
  { id: 'contract', label: 'Contract Staffing',              icon: '📋', desc: 'Flexible short-to-mid term workforce solutions' },
  { id: 'rpo',      label: 'Recruitment Process Outsourcing',icon: '⚙️', desc: 'Full-cycle recruitment managed by Corestaff' },
  { id: 'payroll',  label: 'Payroll Outsourcing',            icon: '💳', desc: 'Compliant, accurate payroll processing and admin' },
  { id: 'hr',       label: 'HR Consultancy',                 icon: '📊', desc: 'Strategic HR advisory and policy design' },
  { id: 'managed',  label: 'Managed Workforce',              icon: '🏢', desc: 'On-site workforce management and vendor oversight' },
  { id: 'bpo',      label: 'Business Process Outsourcing',   icon: '🔄', desc: 'Non-core function outsourcing for efficiency' },
  { id: 'transform',label: 'Workforce Transformation',       icon: '🚀', desc: 'End-to-end reskilling and future workforce design' },
];

export function getService(id: string): Service | undefined {
  return SERVICES.find(s => s.id === id);
}
