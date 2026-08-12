import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => void;
  onClear?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
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
        'flex items-center gap-3 rounded-2xl border border-theme bg-surface px-4 py-3 shadow-sm backdrop-blur transition duration-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20',
        disabled ? 'cursor-not-allowed opacity-60' : '',
        className,
      ].join(' ')}
    >
      <Search className="h-5 w-5 text-theme-muted" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full bg-transparent text-sm text-theme-primary outline-none placeholder:text-theme-muted disabled:cursor-not-allowed"
        aria-label={placeholder}
      />

      {hasValue && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg p-1 text-theme-muted transition hover:bg-slate-100 hover:text-theme-primary dark:hover:bg-white/5"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
