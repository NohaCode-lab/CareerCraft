
import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Circle, RotateCcw, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'careercraft_interview_checklist';

const defaultChecklist = [
  {
    id: 'research-company',
    label: 'Research the company and role',
    checked: true,
  },
  {
    id: 'review-job-description',
    label: 'Review the job description carefully',
    checked: true,
  },
  {
    id: 'prepare-introduction',
    label: 'Prepare a strong self introduction',
    checked: false,
  },
  {
    id: 'practice-star-stories',
    label: 'Practice STAR stories',
    checked: false,
  },
  {
    id: 'prepare-questions',
    label: 'Prepare smart questions for the interviewer',
    checked: false,
  },
  {
    id: 'test-setup',
    label: 'Test internet, camera, and microphone',
    checked: false,
  },
  {
    id: 'prepare-cv',
    label: 'Keep CV, portfolio, and notes ready',
    checked: false,
  },
];

const InterviewChecklist = () => {
  const [items, setItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      return savedItems ? JSON.parse(savedItems) : defaultChecklist;
    } catch {
      return defaultChecklist;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const completedCount = useMemo(
    () => items.filter((item) => item.checked).length,
    [items]
  );

  const progress = useMemo(() => {
    if (!items.length) return 0;
    return Math.round((completedCount / items.length) * 100);
  }, [completedCount, items.length]);

  const toggleItem = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const resetChecklist = () => {
    setItems(defaultChecklist);
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            <Sparkles size={14} />
            Interview Readiness
          </div>

          <h2 className="text-2xl font-bold text-white">Interview Checklist</h2>
          <p className="mt-2 text-sm text-slate-300">
            Track your preparation progress before the interview.
          </p>
        </div>

        <button
          type="button"
          onClick={resetChecklist}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      <div className="mb-6 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-300">Progress</span>
          <span className="text-sm font-semibold text-white">
            {completedCount}/{items.length} completed
          </span>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-slate-400">{progress}% ready</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => toggleItem(item.id)}
            className="flex w-full items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/30 p-4 text-left transition hover:bg-slate-800/40"
          >
            <span className="mt-0.5 shrink-0">
              {item.checked ? (
                <CheckCircle2 className="text-emerald-400" size={20} />
              ) : (
                <Circle className="text-slate-500" size={20} />
              )}
            </span>

            <div>
              <p
                className={`text-sm font-medium ${
                  item.checked ? 'text-white' : 'text-slate-300'
                }`}
              >
                {item.label}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default InterviewChecklist;