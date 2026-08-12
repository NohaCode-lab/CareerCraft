export const APPLICATION_STATUSES = {
  SAVED: 'Saved',
  APPLIED: 'Applied',
  INTERVIEW: 'Interview',
  OFFER: 'Offer',
  REJECTED: 'Rejected',
} as const;

export type ApplicationStatusValue = typeof APPLICATION_STATUSES[keyof typeof APPLICATION_STATUSES];

export const APPLICATION_STATUS_ORDER: ApplicationStatusValue[] = [
  APPLICATION_STATUSES.SAVED,
  APPLICATION_STATUSES.APPLIED,
  APPLICATION_STATUSES.INTERVIEW,
  APPLICATION_STATUSES.OFFER,
  APPLICATION_STATUSES.REJECTED,
];

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatusValue, string> = {
  [APPLICATION_STATUSES.SAVED]: 'Saved',
  [APPLICATION_STATUSES.APPLIED]: 'Applied',
  [APPLICATION_STATUSES.INTERVIEW]: 'Interview',
  [APPLICATION_STATUSES.OFFER]: 'Offer',
  [APPLICATION_STATUSES.REJECTED]: 'Rejected',
};

export const APPLICATION_STATUS_COLORS: Record<ApplicationStatusValue, string> = {
  [APPLICATION_STATUSES.SAVED]: 'bg-slate-500',
  [APPLICATION_STATUSES.APPLIED]: 'bg-blue-500',
  [APPLICATION_STATUSES.INTERVIEW]: 'bg-yellow-500',
  [APPLICATION_STATUSES.OFFER]: 'bg-green-500',
  [APPLICATION_STATUSES.REJECTED]: 'bg-red-500',
};

export const isValidStatus = (status: unknown): status is ApplicationStatusValue => {
  return typeof status === 'string' && Object.values(APPLICATION_STATUSES).includes(status as ApplicationStatusValue);
};
