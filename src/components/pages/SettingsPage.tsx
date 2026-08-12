import React, { useState } from 'react';
import { Bell, FileText, Settings, LucideIcon, Check, ShieldCheck, Mail, Sparkles, FileSpreadsheet } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import SettingsSection from '../settings/SettingsSection';
import ThemeToggle from '../settings/ThemeToggle';
import LanguageSwitcher from '../settings/LanguageSwitcher';
import useLanguage from '../../hooks/useLanguage';
import { getTranslationPack } from '../../config/translations';
import useUI from '../../hooks/useUI';

interface UpcomingSetting {
  id: 'notifications' | 'cv-defaults' | 'export-options';
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

interface UserPreferences {
  notificationAlerts: boolean;
  statusReminders: boolean;
  weeklyDigest: boolean;
  defaultTemplate: string;
  atsOptimization: boolean;
  preferredFormat: string;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  notificationAlerts: true,
  statusReminders: true,
  weeklyDigest: false,
  defaultTemplate: 'European',
  atsOptimization: true,
  preferredFormat: 'PDF',
};

const getSavedPreferences = (): UserPreferences => {
  try {
    const saved = localStorage.getItem('careercraft_user_preferences');
    return saved ? { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) } : DEFAULT_PREFERENCES;
  } catch {
    return DEFAULT_PREFERENCES;
  }
};

const SettingsPage: React.FC = () => {
  const { language } = useLanguage();
  const t = getTranslationPack(language);
  const { showToast } = useUI();

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>(getSavedPreferences);

  const handleCardClick = (id: string) => {
    setActiveModal(id);
  };

  const handleTogglePref = (key: keyof UserPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelectPref = (key: keyof UserPreferences, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('careercraft_user_preferences', JSON.stringify(preferences));
      if (preferences.defaultTemplate) {
        localStorage.setItem('cvTemplate', preferences.defaultTemplate);
      }
      showToast(t.preferencesSavedToast || 'Preferences saved successfully', 'success');
    } catch {
      showToast('Saved preferences locally', 'info');
    } finally {
      setActiveModal(null);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title={t.settings}
        description={t.settingsDesc}
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

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-lg dark:backdrop-blur-xl">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {t.moreSettingsTitle}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
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
                  onClick={() => handleCardClick(item.id)}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-sm text-slate-700 transition hover:border-indigo-500 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-indigo-400/40 dark:hover:bg-white/10 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 transition group-hover:bg-indigo-500 group-hover:text-white dark:text-indigo-300">
                      <Icon size={18} />
                    </div>
                    <span className="font-semibold">{title}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl transition-colors duration-200 dark:border-white/10 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.moreSettingsTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* MODAL 1: NOTIFICATION PREFERENCES */}
              {activeModal === 'notifications' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/5 dark:bg-slate-950">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.notificationAlerts || 'Email Job Match Alerts'}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Receive alerts when new jobs match your skills</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTogglePref('notificationAlerts')}
                      className={`h-6 w-11 rounded-full transition ${preferences.notificationAlerts ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                      <span className={`block h-5 w-5 rounded-full bg-white transition ${preferences.notificationAlerts ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/5 dark:bg-slate-950">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.statusReminders || 'Application Status Reminders'}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Follow-up reminders for active interviews</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTogglePref('statusReminders')}
                      className={`h-6 w-11 rounded-full transition ${preferences.statusReminders ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                      <span className={`block h-5 w-5 rounded-full bg-white transition ${preferences.statusReminders ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                </div>
              )}

              {/* MODAL 2: CV DEFAULTS */}
              {activeModal === 'cv-defaults' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-indigo-600 dark:text-indigo-400 mb-2">{t.defaultTemplate || 'Default Template'}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['european', 'modern', 'minimal'].map((tpl) => (
                        <button
                          key={tpl}
                          type="button"
                          onClick={() => handleSelectPref('defaultTemplate', tpl)}
                          className={`rounded-2xl border p-3 text-center text-xs font-semibold capitalize transition ${
                            preferences.defaultTemplate === tpl
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-500/20 dark:text-white'
                              : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-white/5'
                          }`}
                        >
                          {tpl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/5 dark:bg-slate-950">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.atsOptimization || 'ATS Optimization Mode'}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Ensure CV layout passes machine scanners</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTogglePref('atsOptimization')}
                      className={`h-6 w-11 rounded-full transition ${preferences.atsOptimization ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                      <span className={`block h-5 w-5 rounded-full bg-white transition ${preferences.atsOptimization ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                </div>
              )}

              {/* MODAL 3: EXPORT OPTIONS */}
              {activeModal === 'export-options' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-indigo-600 dark:text-indigo-400 mb-2">{t.preferredFormat || 'Preferred Export Format'}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'pdf', label: 'PDF Document', icon: FileText },
                        { id: 'json', label: 'JSON Data', icon: Sparkles },
                        { id: 'txt', label: 'Plain Text', icon: FileSpreadsheet },
                      ].map((fmt) => {
                        const Icon = fmt.icon;
                        return (
                          <button
                            key={fmt.id}
                            type="button"
                            onClick={() => handleSelectPref('preferredFormat', fmt.id)}
                            className={`flex flex-col items-center gap-2 rounded-2xl border p-3 text-center text-xs font-semibold transition ${
                              preferences.preferredFormat === fmt.id
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-500/20 dark:text-white'
                                : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-white/5'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {fmt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="rounded-2xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                >
                  {t.cancel || 'Cancel'}
                </button>

                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 shadow-lg shadow-indigo-600/30"
                >
                  <Check size={16} />
                  {t.savePreferences || 'Save & Apply Preferences'}
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
