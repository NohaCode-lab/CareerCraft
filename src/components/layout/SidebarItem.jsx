import { NavLink } from 'react-router-dom';

const SidebarItem = ({ item, onClick }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      aria-label={item.label}
      className={({ isActive }) =>
        [
          'group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-indigo-400/40',
          isActive
            ? 'bg-indigo-500/15 text-white shadow-sm ring-1 ring-indigo-400/20'
            : 'text-slate-400 hover:bg-white/5 hover:text-white',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={[
              'absolute left-0 h-8 w-1 rounded-r-full transition-all duration-200',
              isActive ? 'bg-indigo-400 opacity-100' : 'opacity-0',
            ].join(' ')}
          />

          <span
            className={[
              'flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200',
              isActive
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white',
            ].join(' ')}
          >
            <Icon className="h-5 w-5" />
          </span>

          <span className="truncate">{item.label}</span>
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem; 