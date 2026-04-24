import { Search, X } from 'lucide-react';

const SearchInput = ({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search...',
  disabled = false,
  className = '',
}) => {
  const hasValue = Boolean(value);

  const handleClear = () => {
    if (disabled) return;

    if (onClear) {
      onClear();
      return;
    }

    if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  return (
    <div
      className={[
        'flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 shadow-sm backdrop-blur transition duration-300 focus-within:border-indigo-400/40 focus-within:bg-slate-900',
        disabled ? 'cursor-not-allowed opacity-60' : '',
        className,
      ].join(' ')}
    >
      <Search className="h-5 w-5 text-slate-500" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500 disabled:cursor-not-allowed"
        aria-label={placeholder}
      />

      {hasValue && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg p-1 text-slate-500 transition hover:bg-white/5 hover:text-slate-200"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;