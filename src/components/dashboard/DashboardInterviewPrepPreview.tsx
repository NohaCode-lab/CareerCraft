import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MessageSquareText } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ROUTES } from '../../config/routes';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';

interface PrepTip {
  id: number;
  titleKey: string;
  descKey: string;
}

const DashboardInterviewPrepPreview: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const tips: PrepTip[] = useMemo(
    () => [
      {
        id: 1,
        titleKey: 'prepTip1Title',
        descKey: 'prepTip1Desc',
      },
      {
        id: 2,
        titleKey: 'prepTip2Title',
        descKey: 'prepTip2Desc',
      },
      {
        id: 3,
        titleKey: 'prepTip3Title',
        descKey: 'prepTip3Desc',
      },
    ],
    []
  );

  const handleNavigate = () => {
    navigate(ROUTES.INTERVIEW_PREP);
  };

  return (
    <Card
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg backdrop-blur-sm transition duration-300 hover:border-indigo-400/30 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/80"
      aria-label={t('interviewPrepPreviewTitle', language)}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-indigo-500/10 via-transparent to-cyan-400/5 opacity-80" />

      <div className="relative z-10">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-500/10 dark:text-indigo-300">
              <MessageSquareText size={14} />
              {t('interviewPrep', language)}
            </div>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {t('interviewPrepPreviewTitle', language)}
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
              {t('interviewPrepPreviewDesc', language)}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:border-indigo-400/20 dark:border-white/10 dark:bg-slate-800/60 dark:hover:bg-slate-800/80"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                  {tip.id}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t(tip.titleKey, language)}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {t(tip.descKey, language)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          className="mt-6 inline-flex w-full items-center justify-center gap-2"
          onClick={handleNavigate}
          aria-label="Go to interview preparation page"
        >
          {t('startPractice', language)}
          <ArrowRight size={16} className="rtl:rotate-180" />
        </Button>
      </div>
    </Card>
  );
};

export default DashboardInterviewPrepPreview;
