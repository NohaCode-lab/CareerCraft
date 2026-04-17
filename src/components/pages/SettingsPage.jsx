import React from 'react';
import MainLayout from '../layout/MainLayout';
import PageHeader from '../layout/PageHeader';
import SettingsSection from '../settings/SettingsSection';
import ThemeToggle from '../settings/ThemeToggle';
import LanguageSwitcher from '../settings/LanguageSwitcher';

const SettingsPage = () => {
  return (
    <MainLayout pageTitle="Settings">
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

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">More settings coming soon</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Future updates will include notification preferences, CV defaults, export options,
            and additional personalization tools.
          </p>
        </section>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;