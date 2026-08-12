export const ROUTES = {
  DASHBOARD: '/',
  CV_BUILDER: '/cv-builder',
  JOB_SEARCH: '/job-search',
  SAVED_JOBS: '/saved-jobs',
  APPLICATIONS: '/applications',
  INTERVIEW_PREP: '/interview-prep',
  AI_ASSISTANT: '/ai-assistant',
  SETTINGS: '/settings',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
