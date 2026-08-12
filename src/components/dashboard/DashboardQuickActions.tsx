import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileEdit, Search, MessageSquareText, Settings, LucideIcon } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ROUTES } from '../../config/routes';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';

interface QuickActionItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  path: string;
}

const actions: QuickActionItem[] = [
  {
    id: 'build-cv',
    titleKey: 'cvBuilder',
    descriptionKey: 'cvBuilderDesc',
    icon: FileEdit,
    path: ROUTES.CV_BUILDER,
  },
  {
    id: 'search-jobs',
    titleKey: 'jobSearch',
    descriptionKey: 'jobSearchDesc',
    icon: Search,
    path: ROUTES.JOB_SEARCH,
  },
  {
    id: 'interview-prep',
    titleKey: 'interviewPrep',
    descriptionKey: 'interviewPrepDesc',
    icon: MessageSquareText,
    path: ROUTES.INTERVIEW_PREP,
  },
  {
    id: 'settings',
    titleKey: 'settings',
    descriptionKey: 'settingsDesc',
    icon: Settings,
    path: ROUTES.SETTINGS,
  },
];

const DashboardQuickActions: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900/80">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t('quickActionsTitle', language)}</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {t('quickActionsDesc', language)}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;
          const translatedTitle = t(action.titleKey, language);

          return (
            <div
              key={action.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/40 dark:border-white/10 dark:bg-slate-800/70"
            >
              <div>
                <div className="mb-4 inline-flex rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <Icon size={20} />
                </div>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {translatedTitle}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {t(action.descriptionKey, language)}
                </p>
              </div>

              <Button
                className="mt-4 w-full"
                onClick={() => navigate(action.path)}
                aria-label={`${t('open', language)} ${translatedTitle}`}
              >
                {t('open', language)}
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default DashboardQuickActions;
