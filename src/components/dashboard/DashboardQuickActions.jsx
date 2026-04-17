import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileEdit, Search, MessageSquareText, Settings } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const actions = [
  {
    id: 'build-cv',
    title: 'Build CV',
    description: 'Edit your CV and improve ATS readiness.',
    icon: FileEdit,
    path: '/cv-builder',
  },
  {
    id: 'search-jobs',
    title: 'Search Jobs',
    description: 'Explore matching opportunities.',
    icon: Search,
    path: '/job-search',
  },
  {
    id: 'interview-prep',
    title: 'Interview Prep',
    description: 'Practice common interview questions.',
    icon: MessageSquareText,
    path: '/interview-prep',
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Adjust preferences and language.',
    icon: Settings,
    path: '/settings',
  },
];

const DashboardQuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
        <p className="mt-2 text-sm text-slate-400">
          Jump directly to the tools you use most.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <div
              key={action.id}
              className="rounded-2xl border border-white/10 bg-slate-800/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/40"
            >
              <div className="mb-4 inline-flex rounded-2xl bg-indigo-500/10 p-3 text-indigo-300">
                <Icon size={20} />
              </div>

              <h3 className="text-base font-semibold text-white">
                {action.title}
              </h3>

              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
                {action.description}
              </p>

              <Button
                className="mt-4 w-full"
                onClick={() => navigate(action.path)}
                aria-label={`Open ${action.title}`}
              >
                Open
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default DashboardQuickActions;