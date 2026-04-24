// ==============================
// Application Status Constants
// ==============================

export const APPLICATION_STATUSES = {
  SAVED: 'Saved',
  APPLIED: 'Applied',
  INTERVIEW: 'Interview',
  OFFER: 'Offer',
  REJECTED: 'Rejected',
};

// ==============================
// Ordered list (important for UI)
// ==============================

export const APPLICATION_STATUS_ORDER = [
  APPLICATION_STATUSES.SAVED,
  APPLICATION_STATUSES.APPLIED,
  APPLICATION_STATUSES.INTERVIEW,
  APPLICATION_STATUSES.OFFER,
  APPLICATION_STATUSES.REJECTED,
];

// ==============================
// Status Labels (for UI)
// ==============================

export const APPLICATION_STATUS_LABELS = {
  [APPLICATION_STATUSES.SAVED]: 'Saved',
  [APPLICATION_STATUSES.APPLIED]: 'Applied',
  [APPLICATION_STATUSES.INTERVIEW]: 'Interview',
  [APPLICATION_STATUSES.OFFER]: 'Offer',
  [APPLICATION_STATUSES.REJECTED]: 'Rejected',
};

// ==============================
// Status Colors (UI)
// ==============================

export const APPLICATION_STATUS_COLORS = {
  [APPLICATION_STATUSES.SAVED]: 'bg-slate-500',
  [APPLICATION_STATUSES.APPLIED]: 'bg-blue-500',
  [APPLICATION_STATUSES.INTERVIEW]: 'bg-yellow-500',
  [APPLICATION_STATUSES.OFFER]: 'bg-green-500',
  [APPLICATION_STATUSES.REJECTED]: 'bg-red-500',
};

// ==============================
// Helpers
// ==============================

export const isValidStatus = (status) => {
  return Object.values(APPLICATION_STATUSES).includes(status);
};