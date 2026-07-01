import { AssessmentAnswers, RecommendationResult } from './types';

const ANSWERS_KEY = 'cv_assessment_answers';
const RESULT_KEY  = 'cv_recommendation_result';

export function saveAssessment(answers: AssessmentAnswers, result: RecommendationResult) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
  localStorage.setItem(RESULT_KEY, JSON.stringify(result));
}

export function loadAssessment(): { answers: AssessmentAnswers; result: RecommendationResult } | null {
  if (typeof window === 'undefined') return null;
  const a = localStorage.getItem(ANSWERS_KEY);
  const r = localStorage.getItem(RESULT_KEY);
  if (!a || !r) return null;
  try {
    return { answers: JSON.parse(a), result: JSON.parse(r) };
  } catch {
    return null;
  }
}
