
import React, { useMemo } from 'react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import { useAuth } from '../../hooks/useAuth';

const DashboardProfileStrength = () => {
  const { user } = useAuth();

  const score = useMemo(() => {
    if (!user) return 20;

    let total = 0;

    if (user.name) total += 20;
    if (user.email) total += 20;
    if (user.title) total += 20;
    if (user.location) total += 20;
    if (user.summary) total += 20;

    return total;
  }, [user]);

  const label =
    score >= 80 ? 'Strong' : score >= 50 ? 'Good' : 'Needs Improvement';

  return (
    <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Profile Strength</h2>
        <p className="mt-1 text-sm text-slate-400">
          Complete your profile to improve recruiter readiness.
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="text-sm font-semibold text-white">{score}%</span>
      </div>

      <ProgressBar value={score} />

      <p className="mt-4 text-sm leading-6 text-slate-400">
        Add more career details to unlock stronger AI suggestions and a better CV
        building experience.
      </p>
    </Card>
  );
};

export default DashboardProfileStrength;