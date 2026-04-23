import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  FileText,
  Settings,
  Sparkles,
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ROUTES } from '../../config/routes';

const actions = [
  {
    id: 'build-cv',
    title: 'Build CV',
    description: 'Create, improve, and tailor your CV for ATS-friendly applications.',
    path: ROUTES.CV_BUILDER,
    icon: FileText,
  },
  {
    id: 'search-jobs',
    title: 'Search Jobs',
    description: 'Explore relevant opportunities that match your skills and goals.',
    path: ROUTES.JOB_SEARCH,
    icon: Briefcase,
  },
  {
    id: 'interview-prep',
    title: 'Interview Prep',
    description: 'Practice common questions and improve technical and behavioral answers.',
    path: ROUTES.INTERVIEW_PREP,
    icon: Sparkles,
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Manage profile details, preferences, and app configuration.',
    path: ROUTES.SETTINGS,
    icon: Settings,
  },
];

const DashboardQuickActions = () => {
  const navigate = useNavigate();

  return (
    <section
      className="space-y-4"
      aria-labelledby="dashboard-quick-actions-heading"
    >
      <div>
        <h2
          id="dashboard-quick-actions-heading"
          className="text-lg font-semibold text-white"
        >
          Quick Actions
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Jump into the most important tools and keep your career workflow moving.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Card
              key={action.id}
              className="group rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:shadow-xl"
              aria-label={action.title}
            >
              <div className="flex h-full flex-col">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 transition duration-300 group-hover:scale-105 group-hover:bg-indigo-500/15">
                  <Icon size={20} />
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-semibold text-white">
                    {action.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {action.description}
                  </p>
                </div>

                <Button
                  type="button"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2"
                  onClick={() => navigate(action.path)}
                  aria-label={`Open ${action.title}`}
                >
                  Open
                  <ArrowRight size={16} />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardQuickActions;