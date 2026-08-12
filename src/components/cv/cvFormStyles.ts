export const inputClasses =
  'w-full rounded-lg border border-theme bg-surface p-3 text-sm text-theme-primary placeholder:text-theme-muted focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20';

export const labelClasses = 'mb-2 block text-sm font-medium text-theme-secondary';

export const sectionCardClasses =
  'rounded-xl border border-theme bg-surface p-4';

export const addButtonClasses =
  'rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30';

export const removeButtonClasses =
  'text-sm font-medium text-red-600 transition hover:text-red-700 dark:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/20';

export const helperTextClasses = 'mt-2 text-xs text-theme-muted';

export const errorTextClasses = 'mt-1 text-xs font-medium text-red-600 dark:text-red-400';

export const getInputClasses = (hasError?: boolean): string => {
  return [
    inputClasses,
    hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '',
  ].join(' ');
};
