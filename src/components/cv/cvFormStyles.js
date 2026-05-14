export const inputClasses =
  'w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20';

export const labelClasses = 'mb-2 block text-sm font-medium text-slate-700';

export const sectionCardClasses =
  'rounded-xl border border-slate-200 bg-slate-50 p-4';

export const addButtonClasses =
  'rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30';

export const removeButtonClasses =
  'text-sm font-medium text-red-600 transition hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/20';

export const helperTextClasses = 'mt-2 text-xs text-slate-500';

export const errorTextClasses = 'mt-1 text-xs font-medium text-red-500';

export const getInputClasses = (hasError) => {
  return [
    inputClasses,
    hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '',
  ].join(' ');
};
