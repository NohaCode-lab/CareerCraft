import React, { useMemo } from 'react';
import { CheckCircle2, CircleAlert, Sparkles } from 'lucide-react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import useAuth from '../../hooks/useAuth';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';

interface ProfileCheck {
  key: string;
  labelKey: string;
  completed: boolean;
  weight: number;
}

const DashboardProfileStrength: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();

  const profileAnalysis = useMemo(() => {
    const profile = user || {};

    const checks: ProfileCheck[] = [
      {
        key: 'name',
        labelKey: 'addName',
        completed: Boolean(profile.name?.trim()),
        weight: 15,
      },
      {
        key: 'email',
        labelKey: 'addEmail',
        completed: Boolean(profile.email?.trim()),
        weight: 15,
      },
      {
        key: 'title',
        labelKey: 'addTitle',
        completed: Boolean(profile.title?.trim()),
        weight: 20,
      },
      {
        key: 'location',
        labelKey: 'addLocation',
        completed: Boolean(profile.location?.trim()),
        weight: 10,
      },
      {
        key: 'summary',
        labelKey: 'addSummary',
        completed: Boolean(profile.summary?.trim()),
        weight: 20,
      },
      {
        key: 'skills',
        labelKey: 'addSkills',
        completed: Array.isArray(profile.skills)
          ? profile.skills.length > 0
          : typeof profile.skills === 'string'
            ? Boolean((profile.skills as string).trim())
            : false,
        weight: 20,
      },
    ];

    const score = checks.reduce((total, item) => {
      return item.completed ? total + item.weight : total;
    }, 0);

    const missingItems = checks.filter((item) => !item.completed);

    let toneClass = 'text-amber-300 bg-amber-500/10 border-amber-400/20';
    let statusText = t('needsImprovement', language);

    if (score >= 85) {
      statusText = t('strong', language);
      toneClass = 'text-emerald-300 bg-emerald-500/10 border-emerald-400/20';
    } else if (score >= 55) {
      statusText = t('good', language);
      toneClass = 'text-sky-300 bg-sky-500/10 border-sky-400/20';
    }

    return {
      score,
      statusText,
      toneClass,
      missingItems,
      completedItems: checks.filter((item) => item.completed).length,
      totalItems: checks.length,
    };
  }, [user, language]);

  const { score, statusText, toneClass, missingItems, completedItems, totalItems } =
    profileAnalysis;

  const formattedSectionsCompleted = t('sectionsCompleted', language)
    .replace('{completed}', String(completedItems))
    .replace('{total}', String(totalItems));

  return (
    <Card
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/80"
      aria-label={t('profileStrength', language)}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300">
            <Sparkles size={14} />
            {t('profileHealth', language)}
          </div>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t('profileStrength', language)}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {t('profileStrengthDesc', language)}
          </p>
        </div>

        <div
          className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold ${toneClass}`}
        >
          {statusText}
        </div>
      </div>

      <div
        className="mb-4 flex items-center justify-between"
        role="status"
        aria-label={`Profile strength is ${statusText} at ${score}%`}
      >
        <div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {t('completionScore', language)}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {formattedSectionsCompleted}
          </p>
        </div>

        <span className="text-lg font-bold text-slate-900 dark:text-white">{score}%</span>
      </div>

      <ProgressBar value={score} />

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-800/50">
        {missingItems.length > 0 ? (
          <>
            <div className="mb-3 flex items-center gap-2">
              <CircleAlert size={16} className="text-amber-500 dark:text-amber-300" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {t('recommendedNextImprovements', language)}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {missingItems.slice(0, 3).map((item) => (
                <span
                  key={item.key}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300"
                >
                  {t(item.labelKey, language)}
                </span>
              ))}
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {t('completingMissingSections', language)}
            </p>
          </>
        ) : (
          <>
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500 dark:text-emerald-300" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {t('profileLooksStrong', language)}
              </h3>
            </div>

            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              {t('profileLooksStrongDesc', language)}
            </p>
          </>
        )}
      </div>
    </Card>
  );
};

export default DashboardProfileStrength;
