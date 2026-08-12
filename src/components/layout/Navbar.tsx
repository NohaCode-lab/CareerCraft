import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Menu, Search, User, Check, X, Sun, Moon, Globe } from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';
import { getTranslationPack } from '../../config/translations';
import { ROUTES } from '../../config/routes';
import useUI from '../../hooks/useUI';
import useTheme from '../../hooks/useTheme';

interface NavbarProps {
  title?: string;
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ title = 'Dashboard', onMenuClick }) => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const t = getTranslationPack(language);
  const { showToast } = useUI();
  const { theme, toggleTheme } = useTheme();

  const routeTitleMap: Record<string, string> = {
    'Dashboard': 'dashboard',
    'CV Builder': 'cvBuilder',
    'Job Search': 'jobSearch',
    'Saved Jobs': 'savedJobs',
    'Applications': 'applications',
    'Interview Prep': 'interviewPrep',
    'AI Assistant': 'aiAssistant',
    'Settings': 'settings',
    'Page Not Found': 'pageNotFound',
  };

  const tKey = routeTitleMap[title];
  const translatedTitle = tKey && t[tKey] ? t[tKey] : title;

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages = [
    { code: 'en', label: '🇬🇧 EN', name: 'English' },
    { code: 'de', label: '🇩🇪 DE', name: 'Deutsch' },
    { code: 'ar', label: '🇸🇦 AR', name: 'العربية' },
  ];

  const currentLangLabel = languages.find((l) => l.code === language)?.label || 'EN';

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${ROUTES.JOB_SEARCH}?q=${encodeURIComponent(searchQuery.trim())}`);
      showToast(`Searching for "${searchQuery.trim()}"`, 'info');
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
    setShowLangMenu(false);
  };

  const handleLangMenuClick = () => {
    setShowLangMenu((prev) => !prev);
    setShowNotifications(false);
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full max-w-full items-center justify-between border-b border-slate-200 bg-white/90 px-4 text-slate-900 backdrop-blur-xl transition-colors duration-200 dark:border-white/10 dark:bg-slate-950/85 dark:text-white sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40 xl:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300 truncate">
            CareerCraft
          </p>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white truncate">
            {translatedTitle}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <form onSubmit={handleSearchSubmit}>
          <label className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 transition focus-within:border-indigo-500 focus-within:bg-white dark:border-white/10 dark:bg-white/5 dark:focus-within:border-indigo-400/50 dark:focus-within:bg-white/10 lg:flex">
            <Search className="h-4 w-4 text-slate-400" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchDashboard}
              aria-label="Search"
              className="w-44 xl:w-52 bg-transparent text-sm text-slate-900 dark:text-slate-200 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </label>
        </form>

        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={handleLangMenuClick}
            className="inline-flex h-11 items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-100 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
            aria-label="Select application language"
            title="Language"
          >
            <Globe className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
            <span>{currentLangLabel}</span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 top-14 z-50 w-40 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900 ltr:right-0 rtl:left-0 rtl:right-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    language === lang.code
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10'
                  }`}
                >
                  <span>{lang.label}</span>
                  <span className="text-[10px] opacity-75">{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
          aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-indigo-600" />
          )}
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            type="button"
            onClick={handleNotificationClick}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
            aria-label={t.notifications || 'Notifications'}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-950" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-14 z-50 w-72 sm:w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900 ltr:right-0 rtl:left-0 rtl:right-auto">
              <div className="mb-3 flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{t.notifications || 'Notifications'}</span>
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 p-2.5">
                  <Check size={14} className="mt-0.5 shrink-0 text-emerald-500 dark:text-emerald-400" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{t.systemStatusNormal || 'System Status Normal'}</p>
                    <p className="mt-0.5 text-slate-500 dark:text-slate-400">{t.systemStatusDesc || 'All microservices and AI gateway active.'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 p-2.5">
                  <Bell size={14} className="mt-0.5 shrink-0 text-indigo-500 dark:text-indigo-400" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{t.interviewPrepReady || 'Interview Prep Ready'}</p>
                    <p className="mt-0.5 text-slate-500 dark:text-slate-400">{t.practiceStarDesc || 'Practice STAR stories and behavioral questions.'}</p>
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
        >
          <User size={18} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
