import React, { useState } from 'react';
import { Loader2, SendHorizonal, Sparkles } from 'lucide-react';

const PromptInput = ({
  onSubmit,
  placeholder = 'Ask AI anything...',
  disabled = false,
}) => {
  const [input, setInput] = useState('');

  const trimmedInput = input.trim();
  const isSubmitDisabled = disabled || !trimmedInput;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSubmitDisabled) return;

    onSubmit(trimmedInput);
    setInput('');
  };

  return (
    <section
      className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-lg backdrop-blur-sm"
      aria-label="AI prompt input"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-medium text-violet-300">
          <Sparkles size={14} />
          AI Prompt
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label
              htmlFor="ai-prompt-input"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Your prompt
            </label>

            <input
              id="ai-prompt-input"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              className="w-full rounded-2xl border border-white/10 bg-slate-800/60 px-4 py-3 text-sm text-slate-200 outline-none transition duration-300 placeholder:text-slate-500 focus:border-violet-400/30 focus:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="inline-flex min-w-35 items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {disabled ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <SendHorizonal size={16} />
                Send
              </>
            )}
          </button>
        </div>

        <p className="text-xs leading-5 text-slate-500">
          Ask for CV improvements, ATS suggestions, interview answers, or career guidance.
        </p>
      </form>
    </section>
  );
};

export default PromptInput;