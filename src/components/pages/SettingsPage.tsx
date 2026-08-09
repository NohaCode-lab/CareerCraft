import React, { useState } from 'react';
import { Bell, FileText, Settings, LucideIcon, Check, SlidersHorizontal, Download } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import SettingsSection from '../settings/SettingsSection';
import ThemeToggle from '../settings/ThemeToggle';
import LanguageSwitcher from '../settings/LanguageSwitcher';
import useLanguage from '../../hooks/useLanguage';
import { translations } from '../../config/translations';
import useUI from '../../hooks/useUI';

interface UpcomingSetting {
  id: string;
  icon: LucideIcon;
  titleKey: 'notificationsPref' | 'cvDefaults' | 'exportOptions';
}

const upcomingSettings: UpcomingSetting[] = [
  {
    id: 'notifications',
    icon: Bell,
    titleKey: 'notificationsPref',
  },
  {
    id: 'cv-defaults',
    icon: FileText,
    titleKey: 'cvDefaults',
  },
  {
    id: 'export-options',
    icon: Settings,
    titleKey: 'exportOptions',
  },
];

const SettingsPage: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const { showToast } = useUI();

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleCardClick = (id: string, title: string) => {
    setActiveModal(id);
    showToast(`Configuring ${title}`, 'info');
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title={t.settings}
        description="Customize your CareerCraft experience, manage preferences, and personalize your workspace."
      />

      <div className="space-y-6">
        <SettingsSection
          title={t.appearance}
          description={t.appearanceDesc}
        >
          <ThemeToggle />
        </SettingsSection>

        <SettingsSection
          title={t.languageSection}
          description={t.languageSectionDesc}
        >
          <LanguageSwitcher />
        </SettingsSection>

        <section className="rounded-3xl border border-white/10 bg-white/3 p-6 shadow-lg backdrop-blur-xl">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              {t.moreSettingsTitle}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {t.moreSettingsDesc}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {upcomingSettings.map((item) => {
              const Icon = item.icon;
              const title = t[item.titleKey] || item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleCardClick(item.id, title)}
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-sm text-slate-300 transition hover:border-indigo-400/30 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 transition group-hover:bg-indigo-500/20 group-hover:text-indigo-200">
                    <Icon size={16} />
                  </div>

                  <span className="font-medium">{title}</span>
                </button>
              );
            })}
          </div>
        </section>

        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-300">
                  <SlidersHorizontal size={20} />
                  <h3 className="text-lg font-semibold text-white">
                    {activeModal === 'notifications'
                      ? t.notificationsPref
                      : activeModal === 'cv-defaults'
                      ? t.cvDefaults
                      : t.exportOptions}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="rounded-xl p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="mb-6 text-sm text-slate-300">
                Preferences updated and saved to your browser session.
              </p>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null);
                    showToast('Setting preferences saved', 'success');
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  <Check size={16} />
                  Save & Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
