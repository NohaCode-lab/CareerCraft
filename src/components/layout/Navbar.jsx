import { Menu, Bell, Search } from 'lucide-react';

const Navbar = ({ title = 'Dashboard', onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 xl:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            CareerCraft
          </p>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 lg:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
            className="w-48 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <button
          type="button"
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-sm font-semibold text-indigo-700">
          CC
        </div>
      </div>
    </header>
  );
};

export default Navbar;