import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { SIDEBAR_LINKS } from '../../config/sidebarLinks';

const Sidebar = () => {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-slate-200 bg-white xl:flex xl:flex-col">
      
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
        <img
          src={logo}
          alt="CareerCraft logo"
          className="h-11 w-11 rounded-xl object-contain"
        />

        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900">
            CareerCraft
          </h1>
          <p className="text-sm text-slate-500">Career Assistant</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <nav className="flex flex-col gap-2">
          {SIDEBAR_LINKS.map((item) => {
            const { id, path, label, icon: Icon } = item;

            return (
              <NavLink
                key={id}
                to={path}
                className={({ isActive }) =>
                  [
                    'group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                  ].join(' ')
                }
                aria-label={label}
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

                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 px-4 py-4">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-800">
            Stay career-ready
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Track applications, improve your CV, and prepare for interviews in one place.
          </p>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;