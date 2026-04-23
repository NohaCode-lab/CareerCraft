import React, { useMemo } from 'react';
import { CheckCircle2, CircleAlert, Sparkles } from 'lucide-react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import { useAuth } from '../../hooks/useAuth';

const DashboardProfileStrength = () => {
  const { user } = useAuth();

  const profileAnalysis = useMemo(() => {
    const profile = user || {};

    const checks = [
      {
        key: 'name',
        label: 'Full name',
        completed: Boolean(profile.name?.trim()),
        weight: 15,
      },
      {
        key: 'email',
        label: 'Email address',
        completed: Boolean(profile.email?.trim()),
        weight: 15,
      },
      {
        key: 'title',
        label: 'Professional title',
        completed: Boolean(profile.title?.trim()),
        weight: 20,
      },
      {
        key: 'location',
        label: 'Location',
        completed: Boolean(profile.location?.trim()),
        weight: 10,
      },
      {
        key: 'summary',
        label: 'Career summary',
        completed: Boolean(profile.summary?.trim()),
        weight: 20,
      },
      {
        key: 'skills',
        label: 'Skills',
        completed: Array.isArray(profile.skills)
          ? profile.skills.length > 0
          : Boolean(profile.skills?.trim()),
        weight: 20,
      },
    ];

    const score = checks.reduce((total, item) => {
      return item.completed ? total + item.weight : total;
    }, 0);

    const missingItems = checks.filter((item) => !item.completed);

    let label = 'Needs Improvement';
    let toneClass = 'text-amber-300 bg-amber-500/10 border-amber-400/20';

    if (score >= 85) {
      label = 'Strong';
      toneClass = 'text-emerald-300 bg-emerald-500/10 border-emerald-400/20';
    } else if (score >= 55) {
      label = 'Good';
      toneClass = 'text-sky-300 bg-sky-500/10 border-sky-400/20';
    }

    return {
      score,
      label,
      toneClass,
      missingItems,
      completedItems: checks.filter((item) => item.completed).length,
      totalItems: checks.length,
    };
  }, [user]);

  const { score, label, toneClass, missingItems, completedItems, totalItems } =
    profileAnalysis;

  return (
    <Card
      className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg backdrop-blur-sm"
      aria-label="Profile strength"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            <Sparkles size={14} />
            Profile Health
          </div>

          <h2 className="text-xl font-semibold text-white">Profile Strength</h2>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            Complete your profile to improve recruiter readiness, AI suggestions,
            and CV quality.
          </p>
        </div>

        <div
          className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold ${toneClass}`}
        >
          {label}
        </div>
      </div>

      <div
        className="mb-4 flex items-center justify-between"
        role="status"
        aria-label={`Profile strength is ${label} at ${score}%`}
      >
        <div>
          <p className="text-sm font-medium text-slate-200">
            Completion score
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {completedItems} of {totalItems} profile sections completed
          </p>
        </div>

        <span className="text-lg font-bold text-white">{score}%</span>
      </div>

      <ProgressBar value={score} />

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-800/50 p-4">
        {missingItems.length > 0 ? (
          <>
            <div className="mb-3 flex items-center gap-2">
              <CircleAlert size={16} className="text-amber-300" />
              <h3 className="text-sm font-semibold text-white">
                Recommended next improvements
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {missingItems.slice(0, 3).map((item) => (
                <span
                  key={item.key}
                  className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-slate-300"
                >
                  Add {item.label}
                </span>
              ))}
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Completing the missing sections will make your profile more useful
              for CV building, job matching, and AI-powered recommendations.
            </p>
          </>
        ) : (
          <>
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-300" />
              <h3 className="text-sm font-semibold text-white">
                Your profile looks strong
              </h3>
            </div>

            <p className="text-sm leading-6 text-slate-400">
              Great job. Your profile has the core details needed for a more
              complete career workflow and better personalized insights.
            </p>
          </>
        )}
      </div>
    </Card>
  );
};

export default DashboardProfileStrength;