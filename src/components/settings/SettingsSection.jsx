
import React from 'react';

const SettingsSection = ({ title, description, children }) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {children}
      </div>
    </section>
  );
};

export default SettingsSection;