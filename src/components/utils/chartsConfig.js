
export const applicationStatusChartConfig = {
  dataKey: 'value',
  nameKey: 'name',
};

export const weeklyApplicationsChartConfig = {
  xAxisKey: 'day',
  dataKey: 'applications',
};

export const buildStatusChartData = (applications = []) => {
  const counts = {
    Saved: 0,
    Applied: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0,
  };

  applications.forEach((application) => {
    if (counts[application.status] !== undefined) {
      counts[application.status] += 1;
    }
  });

  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};