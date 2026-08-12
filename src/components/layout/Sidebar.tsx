import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/favicon.svg';
import { SIDEBAR_LINKS } from '../../config/sidebarLinks';
import useLanguage from '../../hooks/useLanguage';
import { getTranslationPack } from '../../config/translations';

const Sidebar: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const t = getTranslationPack(language);

  const translationKeyMap: Record<string, string> = {
    dashboard: 'dashboard',
    'cv-builder': 'cvBuilder',
    'job-search': 'jobSearch',
    'saved-jobs': 'savedJobs',
    applications: 'applications',
    'interview-prep': 'interviewPrep',
    'ai-assistant': 'aiAssistant',
    settings: 'settings',
  };

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/10 bg-slate-950 text-white ltr:border-r rtl:border-l rtl:border-r-0 xl:flex xl:flex-col">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 shadow-sm ring-1 ring-white/10">
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
          <p className="text-sm text-slate-400">{t.aiCareerAssistant}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-6">
        <nav className="flex flex-col gap-2" aria-label="Main navigation">
          {SIDEBAR_LINKS.map((item) => {
            const { id, path, label, icon: Icon } = item;
            const tKey = translationKeyMap[id];
            const translatedLabel = tKey && t[tKey] ? t[tKey] : label;

            return (
              <NavLink
                key={id}
                to={path}
                aria-label={translatedLabel}
                className={({ isActive }) =>
                  [
                    'group relative flex items-center gap-3 rounded-2xl px-3.5 py-3 text-xs font-medium transition-all duration-200 sm:text-sm',
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
                        'absolute h-8 w-1 transition-all duration-200',
                        isRTL ? 'right-0 rounded-l-full' : 'left-0 rounded-r-full',
                        isActive ? 'bg-indigo-400 opacity-100' : 'opacity-0',
                      ].join(' ')}
                    />

                    <span
                      className={[
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200',
                        isActive
                          ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                          : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white',
                      ].join(' ')}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="line-clamp-2 leading-snug">{translatedLabel}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 px-4 py-4">
        <div className="rounded-3xl border border-white/10 bg-white/3 p-4 shadow-sm">
          <p className="text-sm font-semibold text-white">
            {t.stayCareerReady}
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-400">
            {t.stayCareerReadyDesc}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
