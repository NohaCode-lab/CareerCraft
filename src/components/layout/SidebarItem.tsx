import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';
import { translations } from '../../config/translations';

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
}

interface SidebarItemProps {
  item: NavigationItem;
  onClick?: () => void;
}

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

const SidebarItem: React.FC<SidebarItemProps> = ({ item, onClick }) => {
  const { language, isRTL } = useLanguage();
  const t = translations[language] || translations.en;
  const Icon = item.icon;

  const tKey = translationKeyMap[item.id];
  const translatedLabel = tKey && (t as any)[tKey] ? (t as any)[tKey] : item.label;

  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      aria-label={translatedLabel}
      className={({ isActive }) =>
        [
          'group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 min-w-0',
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

          <span className="line-clamp-2 leading-snug break-words min-w-0">{translatedLabel}</span>
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;
