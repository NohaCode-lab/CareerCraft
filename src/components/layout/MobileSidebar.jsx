
import logo from '../../assets/logo.svg';
import { SIDEBAR_LINKS } from '../../config/sidebarLinks';
import SidebarItem from './SidebarItem';

const MobileSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={[
          'fixed inset-0 z-40 bg-slate-900/40 transition-opacity duration-300 xl:hidden',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        onClick={onClose}
      />

      <aside
        className={[
          'fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 xl:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
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

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Close mobile sidebar"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 px-4 py-6">
          <nav className="flex flex-col gap-2">
            {SIDEBAR_LINKS.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                onClick={onClose}
              />
            ))}
          </nav>
        </div>

        <div className="border-t border-slate-200 px-4 py-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">
              Stay career-ready
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Manage your career journey from one organized dashboard.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;