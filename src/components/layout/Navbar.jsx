import { Bell, Menu, Search } from 'lucide-react';

const Navbar = ({ title = 'Dashboard', onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/85 px-4 text-white backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40 xl:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300">
            CareerCraft
          </p>
          <h2 className="text-lg font-semibold tracking-tight text-white">
            {title}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 transition focus-within:border-indigo-400/50 focus-within:bg-white/10 lg:flex">
          <Search className="h-4 w-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search dashboard..."
            aria-label="Search"
            className="w-52 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
          />
        </label>

        <button
          type="button"
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-slate-950" />
        </button>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
          aria-label="User profile"
        >
          CC
        </button>
      </div>
    </header>
  );
};

export default Navbar;