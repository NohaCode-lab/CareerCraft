
import React from 'react';
import { Briefcase, Code2, Lightbulb, MessageCircle, UserRound } from 'lucide-react';

const iconMap = {
  behavioral: UserRound,
  technical: Code2,
  hr: MessageCircle,
  situational: Lightbulb,
  role: Briefcase,
};

const colorMap = {
  behavioral: 'border-violet-400/20 bg-violet-400/10 text-violet-300',
  technical: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300',
  hr: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
  situational: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
  role: 'border-rose-400/20 bg-rose-400/10 text-rose-300',
};

const QuestionCategory = ({
  title,
  description,
  count = 0,
  type = 'behavioral',
  isActive = false,
  onSelect,
}) => {
  const Icon = iconMap[type] || UserRound;
  const colorClasses =
    colorMap[type] || 'border-white/10 bg-white/5 text-slate-200';

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-3xl border p-5 text-left shadow-lg backdrop-blur-xl transition duration-300 ${
        isActive
          ? 'border-indigo-400/30 bg-indigo-500/10 ring-1 ring-indigo-400/20'
          : 'border-white/10 bg-white/5 hover:bg-white/10'
      }`}
    >
      <div
        className={`mb-4 inline-flex rounded-2xl border p-3 ${colorClasses}`}
      >
        <Icon size={20} />
      </div>

      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="rounded-full border border-white/10 bg-slate-900/50 px-3 py-1 text-xs font-semibold text-slate-300">
          {count} questions
        </span>
      </div>

      <p className="text-sm leading-6 text-slate-400">{description}</p>
    </button>
  );
};

export default QuestionCategory;