
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ item, onClick }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        [
          'group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-indigo-50 text-indigo-700 shadow-sm'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={[
              'flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200',
              isActive
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-700',
            ].join(' ')}
          >
            <Icon className="h-5 w-5" />
          </span>

          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;