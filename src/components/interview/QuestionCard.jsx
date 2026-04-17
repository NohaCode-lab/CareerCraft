
import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Lightbulb, MessageSquareQuote } from 'lucide-react';

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

const QuestionCard = ({
  question,
  category,
  tip,
  sampleAnswer,
  difficulty = 'Medium',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const difficultyClasses = useMemo(() => {
    const normalizedDifficulty = difficulty.toLowerCase();

    if (normalizedDifficulty === 'easy') {
      return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300';
    }

    if (normalizedDifficulty === 'hard') {
      return 'border-rose-400/20 bg-rose-400/10 text-rose-300';
    }

    return 'border-amber-400/20 bg-amber-400/10 text-amber-300';
  }, [difficulty]);

  const handleCopy = async () => {
    const textToCopy = [
      `Question: ${question}`,
      category ? `Category: ${category}` : '',
      tip ? `Tip: ${tip}` : '',
      sampleAnswer ? `Sample Answer: ${sampleAnswer}` : '',
    ]
      .filter(Boolean)
      .join('\n\n');

    const success = await copyToClipboard(textToCopy);

    if (success) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-xl">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {category ? (
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-300">
            {category}
          </span>
        ) : null}

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${difficultyClasses}`}
        >
          {difficulty}
        </span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-indigo-500/10 p-2 text-indigo-300">
            <MessageSquareQuote size={20} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">{question}</h3>
            <p className="mt-2 text-sm text-slate-400">
              Use this question to practice a structured and confident answer.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prevState) => !prevState)}
          className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10"
          aria-label={isOpen ? 'Collapse answer details' : 'Expand answer details'}
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
        >
          <Copy size={16} />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {isOpen ? (
        <div className="mt-5 space-y-4 border-t border-white/10 pt-5">
          {tip ? (
            <div className="rounded-2xl border border-indigo-400/10 bg-indigo-500/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-indigo-300">
                <Lightbulb size={16} />
                <span className="text-sm font-semibold">Answer Tip</span>
              </div>
              <p className="text-sm leading-6 text-slate-300">{tip}</p>
            </div>
          ) : null}

          {sampleAnswer ? (
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <p className="mb-2 text-sm font-semibold text-white">Sample Answer</p>
              <p className="text-sm leading-6 text-slate-300">{sampleAnswer}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
};

export default QuestionCard;