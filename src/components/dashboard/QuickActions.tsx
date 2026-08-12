import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  FileText,
  Settings,
  Sparkles,
  LucideIcon,
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ROUTES } from '../../config/routes';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';

interface QuickActionItem {
  id: string;
  titleKey: string;
  description: string;
  path: string;
  icon: LucideIcon;
}

const actions: QuickActionItem[] = [
  {
    id: 'cv-builder',
    titleKey: 'cvBuilder',
    description: 'Build, edit, and export ATS-optimized CVs.',
    path: ROUTES.CV_BUILDER,
    icon: FileText,
  },
  {
    id: 'job-search',
    titleKey: 'jobSearch',
    description: 'Search matched roles and save active opportunities.',
    path: ROUTES.JOB_SEARCH,
    icon: Briefcase,
  },
  {
    id: 'ai-assistant',
    titleKey: 'aiAssistant',
    description: 'Get AI advice, bullet suggestions, and summary help.',
    path: ROUTES.AI_ASSISTANT,
    icon: Sparkles,
  },
  {
    id: 'settings',
    titleKey: 'settings',
    description: 'Manage profile details, preferences, and app configuration.',
    path: ROUTES.SETTINGS,
    icon: Settings,
  },
];

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <section
      className="space-y-4"
      aria-labelledby="dashboard-quick-actions-heading"
    >
      <div>
        <h2
          id="dashboard-quick-actions-heading"
          className="text-xl font-semibold text-theme-primary"
        >
          {t('open', language)} Quick Actions
        </h2>
        <p className="mt-1 text-sm text-theme-secondary">
          Jump into the most important tools and keep your career workflow moving.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;
          const translatedTitle = t(action.titleKey, language) || action.id;

          return (
            <Card
              key={action.id}
              className="group rounded-3xl p-5 shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:shadow-xl"
              aria-label={translatedTitle}
            >
              <div className="flex h-full flex-col">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-200 bg-indigo-50 text-indigo-600 transition duration-300 group-hover:scale-105 dark:border-indigo-400/20 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <Icon size={20} />
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-semibold text-theme-primary">
                    {translatedTitle}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-theme-secondary">
                    {action.description}
                  </p>
                </div>

                <Button
                  type="button"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2"
                  onClick={() => navigate(action.path)}
                  aria-label={`${t('open', language)} ${translatedTitle}`}
                >
                  {t('open', language)}
                  <ArrowRight size={16} className="rtl:rotate-180" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;
