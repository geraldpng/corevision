import { AssessmentAnswers, RecommendationResult } from './types';

export function runEngine(answers: AssessmentAnswers): RecommendationResult {
  const { challenges = [], volume, timeline, budget, industry, size } = answers;
  const recs: string[] = [];

  // Rule-based logic
  if (challenges.includes('Executive hiring'))                              recs.push('exec');
  if (['50–100', '100+', 'Continuous hiring'].includes(volume))            recs.push('rpo');
  if (challenges.includes('Seasonal hiring') || challenges.includes('Rapid expansion')) recs.push('contract');
  if (challenges.includes('Payroll burden') || challenges.includes('HR compliance'))    recs.push('payroll');
  if (challenges.includes('No HR team'))                                   recs.push('managed');
  if (challenges.includes('Scaling operations'))                           recs.push('hr');
  if (challenges.includes('High turnover') && !recs.includes('perm'))      recs.push('perm');
  if (challenges.includes('Talent shortage') && !recs.includes('perm'))   recs.push('perm');

  const unique = [...new Set(recs)];
  const primary = unique[0] || 'perm';
  const secondary = unique.filter(r => r !== primary).slice(0, 3);

  // Scoring
  const timelineScore = ({ Immediate: 95, '30 Days': 87, '90 Days': 74, '6 Months': 58, Planning: 42 } as Record<string, number>)[timeline] ?? 70;
  const budgetScore   = ({ Approved: 96, Estimated: 76, 'Proposal Needed': 54, Unknown: 30 } as Record<string, number>)[budget] ?? 60;
  const sizeScore     = ({ '1–20': 52, '20–100': 68, '100–500': 84, '500+': 96 } as Record<string, number>)[size] ?? 70;
  const challengeScore = Math.min(95, 50 + challenges.length * 8);

  const readiness    = Math.round(timelineScore * 0.35 + budgetScore * 0.35 + challengeScore * 0.2 + sizeScore * 0.1);
  const confidence   = Math.min(97, 70 + recs.length * 4 + (budget === 'Approved' ? 10 : 0));
  const opportunity  = Math.round(sizeScore * 0.4 + budgetScore * 0.4 + timelineScore * 0.2);
  const priority     = readiness >= 84 ? 'HIGH' : readiness >= 64 ? 'MEDIUM' : 'LOW';

  const breakdown = {
    business:    Math.round(sizeScore * 0.7 + challengeScore * 0.3),
    budget:      budgetScore,
    timeline:    timelineScore,
    hr:          challenges.includes('No HR team') ? 38 : 82,
    operational: Math.round(sizeScore * 0.5 + challengeScore * 0.5),
  };

  const summaries: Record<string, string> = {
    exec:     `${answers.company} requires a confidential senior leadership search. Executive Search is the optimal model to identify and secure top-tier talent at the pace your growth demands.`,
    rpo:      `Your hiring volume and growth trajectory make Recruitment Process Outsourcing the highest-impact solution. Corestaff's RPO model delivers cost efficiency, speed, and compliance at scale.`,
    contract: `${answers.company}'s expansion requirements are best served through Contract Staffing. This model gives immediate access to vetted talent without long-term headcount commitments.`,
    payroll:  `Your compliance exposure and payroll complexity make Payroll Outsourcing a critical risk-mitigation strategy. Corestaff manages full payroll operations so your team focuses on growth.`,
    managed:  `Without an internal HR function, ${answers.company} needs a fully managed workforce partner. Corestaff's Managed Workforce service acts as your embedded HR department from day one.`,
    hr:       `Scaling operations require strategic HR foundations. Corestaff's HR Consultancy will design the people infrastructure needed to support ${answers.company}'s next growth stage.`,
    perm:     `Talent retention and quality of hire are the priority for ${answers.company}. Permanent Recruitment with Corestaff's deep networks ensures you attract and keep the right people.`,
    bpo:      `Streamlining non-core functions through Business Process Outsourcing will free ${answers.company}'s leadership to focus on strategic priorities.`,
    transform:`${answers.company} is positioned for significant change. Workforce Transformation aligns your people strategy with long-term business objectives.`,
  };

  const primaryLabel = ({ exec:'Executive Search', rpo:'RPO', contract:'Contract Staffing', payroll:'Payroll Outsourcing', managed:'Managed Workforce', hr:'HR Consultancy', perm:'Permanent Recruitment', bpo:'Business Process Outsourcing', transform:'Workforce Transformation' } as Record<string, string>)[primary] ?? primary;

  const nextSteps = [
    `Schedule a 60-minute Discovery Call with a Corestaff ${primaryLabel} specialist`,
    `Receive a tailored ${primaryLabel} proposal within 3 business days`,
    `Review Corestaff's track record in the ${industry} sector`,
    budget === 'Approved'
      ? 'Initiate formal engagement with signed NDA and project charter'
      : 'Align internal budget approval to proceed',
  ];

  const discovery = [
    `What does your current hiring process look like for ${industry} roles?`,
    `What's been the biggest barrier to hiring in the last 12 months?`,
    ['50–100', '100+', 'Continuous hiring'].includes(volume)
      ? `With ${volume} roles needed, have you considered a dedicated RPO over ad-hoc search?`
      : `How quickly do you need the first hires onboarded?`,
    `Who are the key internal stakeholders involved in final hiring decisions?`,
    `What does success look like 6 months after engaging Corestaff?`,
  ];

  return { primary, secondary, confidence, readiness, opportunity, priority, breakdown, summary: summaries[primary] ?? '', nextSteps, discovery };
}
