// ==============================
// Chart Config
// ==============================

export const applicationStatusChartConfig = {
  dataKey: 'value',
  nameKey: 'name',
};

export const weeklyApplicationsChartConfig = {
  xAxisKey: 'day',
  dataKey: 'applications',
};

// ==============================
// Constants
// ==============================

const DEFAULT_STATUSES = [
  'Saved',
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
];

// ==============================
// Helpers
// ==============================

const normalizeStatus = (status) => {
  if (!status || typeof status !== 'string') return null;
  return status.trim();
};

// ==============================
// Builders
// ==============================

export const buildStatusChartData = (
  applications = [],
  statuses = DEFAULT_STATUSES
) => {
  if (!Array.isArray(applications)) return [];

  const counts = statuses.reduce((acc, status) => {
    acc[status] = 0;
    return acc;
  }, {});

  applications.forEach((application) => {
    const status = normalizeStatus(application?.status);

    if (status && counts[status] !== undefined) {
      counts[status] += 1;
    }
  });

  return Object.entries(counts).map(([name, value]) => ({
    name,
    value,
  }));
};