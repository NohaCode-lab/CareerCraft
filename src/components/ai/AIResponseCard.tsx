import React, { useState } from 'react';
import { Check, Copy, AlertCircle, Loader2, Sparkles } from 'lucide-react';

interface AIResponseCardProps {
  title?: string;
  response?: string;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

const AIResponseCard: React.FC<AIResponseCardProps> = ({
  title = 'AI Response',
  response,
  isLoading = false,
  error,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!response) return;
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  if (!isLoading && !error && !response) {
    return null;
  }

  return (
    <div
      className={`rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg backdrop-blur-sm ${className}`}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-violet-300">
          <Sparkles size={18} />
          <h3 className="text-base font-semibold text-white">{title}</h3>
        </div>

        {response && !isLoading && !error && (
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/70 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-800"
            aria-label="Copy AI response"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center gap-3 py-6 text-sm text-violet-300">
          <Loader2 size={20} className="animate-spin" />
          <span>Generating response...</span>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-rose-400" />
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && response && (
        <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
          <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-slate-300">
            {response}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AIResponseCard;
