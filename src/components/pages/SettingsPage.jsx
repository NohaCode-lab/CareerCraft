import React from 'react';
import { Bell, FileText, Settings } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import SettingsSection from '../settings/SettingsSection';
import ThemeToggle from '../settings/ThemeToggle';
import LanguageSwitcher from '../settings/LanguageSwitcher';

const upcomingSettings = [
  {
    id: 'notifications',
    icon: Bell,
    title: 'Notification preferences',
  },
  {
    id: 'cv-defaults',
    icon: FileText,
    title: 'CV defaults',
  },
  {
    id: 'export-options',
    icon: Settings,
    title: 'Export options',
  },
];

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Customize your CareerCraft experience, manage preferences, and personalize your workspace."
      />

      <div className="space-y-6">
        <SettingsSection
          title="Appearance"
          description="Choose the theme that fits your workflow and visual preference."
        >
          <ThemeToggle />
        </SettingsSection>

        <SettingsSection
          title="Language"
          description="Select your preferred language for the application interface."
        >
          <LanguageSwitcher />
        </SettingsSection>

        <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg backdrop-blur-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              More settings coming soon
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Future updates will include notification preferences, CV defaults,
              export options, and additional personalization tools.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {upcomingSettings.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/50 p-4 text-sm text-slate-300"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300">
                    <Icon size={16} />
                  </div>
                  <span>{item.title}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;