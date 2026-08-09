import React from 'react';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, description, children }) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-lg dark:backdrop-blur-xl">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {children}
      </div>
    </section>
  );
};

export default SettingsSection;
