import React, { useState } from 'react';

const AIResponseCard = ({
  title = 'AI Response',
  response = '',
  isLoading = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!response) return;

    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy response:', error);
    }
  };

  return (
    <div className="card-base p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="section-title">{title}</h2>

        {!isLoading && response && (
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
        </div>
      ) : response ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
            {response}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-500">
            Your AI response will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default AIResponseCard;