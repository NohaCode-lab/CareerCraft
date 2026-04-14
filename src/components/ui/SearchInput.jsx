
import { Search } from 'lucide-react';

const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}) => {
  return (
    <div
      className={[
        'flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm',
        className,
      ].join(' ')}
    >
      <Search className="h-5 w-5 text-slate-400" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />
    </div>
  );
};

export default SearchInput;