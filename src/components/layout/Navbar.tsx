import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Menu, Search, User, Check, X } from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';
import { translations } from '../../config/translations';
import { ROUTES } from '../../config/routes';
import useUI from '../../hooks/useUI';

interface NavbarProps {
  title?: string;
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ title = 'Dashboard', onMenuClick }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const { showToast } = useUI();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${ROUTES.JOB_SEARCH}?q=${encodeURIComponent(searchQuery.trim())}`);
      showToast(`Searching for "${searchQuery.trim()}"`, 'info');
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
  };

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
        <form onSubmit={handleSearchSubmit}>
          <label className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 transition focus-within:border-indigo-400/50 focus-within:bg-white/10 lg:flex">
            <Search className="h-4 w-4 text-slate-400" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchDashboard}
              aria-label="Search"
              className="w-52 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
            />
          </label>
        </form>

        <div className="relative">
          <button
            type="button"
            onClick={handleNotificationClick}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-indigo-500 ring-2 ring-slate-950" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-14 z-50 w-80 rounded-2xl border border-white/10 bg-slate-900 p-4 shadow-2xl backdrop-blur-xl ltr:right-0 rtl:left-0 rtl:right-auto">
              <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-sm font-semibold text-white">Notifications</span>
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="rounded-lg p-1 text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2 rounded-xl bg-slate-800/60 p-2.5">
                  <Check size={14} className="mt-0.5 shrink-0 text-emerald-400" />
                  <div>
                    <p className="font-medium text-white">System Status Normal</p>
                    <p className="mt-0.5 text-slate-400">All microservices and LiteLLM gateway active.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-xl bg-slate-800/60 p-2.5">
                  <Bell size={14} className="mt-0.5 shrink-0 text-indigo-400" />
                  <div>
                    <p className="font-medium text-white">Interview Prep Ready</p>
                    <p className="mt-0.5 text-slate-400">Practice STAR stories and behavioral questions.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate(ROUTES.SETTINGS)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
          aria-label="User profile settings"
          title="Open Settings"
        >
          <User size={18} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
