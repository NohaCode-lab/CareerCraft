import logo from '../../assets/favicon.svg';
import { SIDEBAR_LINKS } from '../config/sidebarLinks';
import SidebarItem from './SidebarItem';

const MobileSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={[
          'fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 xl:hidden',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={[
          'fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-slate-950 text-white shadow-2xl transition-transform duration-300 xl:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        aria-hidden={!isOpen}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
              <img
                src={logo}
                alt="CareerCraft logo"
                className="h-8 w-8 object-contain"
              />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                CareerCraft
              </h1>
              <p className="text-sm text-slate-400">AI Career Assistant</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
            aria-label="Close mobile sidebar"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            {SIDEBAR_LINKS.map((item) => (
              <SidebarItem key={item.id} item={item} onClick={onClose} />
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 px-4 py-4">
          <div className="rounded-3xl border border-white/10 bg-white/3 p-4">
            <p className="text-sm font-semibold text-white">
              Stay career-ready
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-400">
              Manage your career journey from one organized dashboard.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;