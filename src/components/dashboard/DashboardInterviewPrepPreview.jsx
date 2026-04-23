import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MessageSquareText } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ROUTES } from '../../config/routes';

const DashboardInterviewPrepPreview = () => {
  const navigate = useNavigate();

  const tips = useMemo(
    () => [
      {
        id: 1,
        title: 'Strong Introduction',
        description:
          'Practice a short, confident self-introduction that highlights your strengths clearly.',
      },
      {
        id: 2,
        title: 'STAR Examples',
        description:
          'Prepare achievement stories using the STAR method for behavioral interview questions.',
      },
      {
        id: 3,
        title: 'Frontend Review',
        description:
          'Refresh React, JavaScript, problem-solving, and core frontend concepts before interviews.',
      },
    ],
    []
  );

  const handleNavigate = () => {
    navigate(ROUTES.INTERVIEW_PREP);
  };

  return (
    <Card
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg backdrop-blur-sm transition duration-300 hover:border-indigo-400/30 hover:shadow-xl"
      aria-label="Interview preparation preview"
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-indigo-500/10 via-transparent to-cyan-400/5 opacity-80" />

      <div className="relative z-10">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
              <MessageSquareText size={14} />
              Interview Prep
            </div>

            <h2 className="text-xl font-semibold text-white">
              Stay ready for your next interview
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
              Review essential preparation tips for technical and behavioral
              interviews and practice with confidence.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {tips.length > 0 ? (
            tips.map((tip) => (
              <div
                key={tip.id}
                className="rounded-2xl border border-white/10 bg-slate-800/60 p-4 transition duration-300 hover:border-indigo-400/20 hover:bg-slate-800/80"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-xs font-semibold text-indigo-300">
                    {tip.id}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {tip.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-slate-800/40 p-4 text-sm text-slate-400">
              No interview tips available right now.
            </div>
          )}
        </div>

        <Button
          className="mt-6 inline-flex w-full items-center justify-center gap-2"
          onClick={handleNavigate}
          aria-label="Go to interview preparation page"
        >
          Start Practice
          <ArrowRight size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default DashboardInterviewPrepPreview;