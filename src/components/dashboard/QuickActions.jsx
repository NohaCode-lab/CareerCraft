
import React from 'react';
import { useNavigate } from 'react-router-dom';

const actions = [
  {
    title: 'Build CV',
    description: 'Create and optimize your CV for ATS systems.',
    path: '/cv-builder',
  },
  {
    title: 'Search Jobs',
    description: 'Find jobs that match your skills and goals.',
    path: '/job-search',
  },
  {
    title: 'Interview Prep',
    description: 'Practice interview questions and improve answers.',
    path: '/interview-prep',
  },
  {
    title: 'Settings',
    description: 'Manage your preferences and profile settings.',
    path: '/settings',
  },
];

const DashboardQuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="card-base p-6">
      <div className="mb-6">
        <h2 className="section-title">Quick Actions</h2>
        <p className="section-subtitle mt-1">
          Jump quickly to the most important tools.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <div
            key={action.title}
            className="flex min-h-12 flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
          >
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                {action.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate(action.path)}
              className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardQuickActions;