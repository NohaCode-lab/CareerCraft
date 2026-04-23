import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Check, LayoutTemplate } from 'lucide-react';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Bold layout with a polished recruiter-friendly look.',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, elegant, and distraction-free presentation.',
  },
  {
    id: 'european',
    name: 'European',
    description: 'Structured and ATS-friendly professional format.',
  },
];

const TemplateSwitcher = () => {
  const [selectedTemplate, setSelectedTemplate] = useLocalStorage(
    'cvTemplate',
    'modern'
  );

  return (
    <div className="card-base overflow-hidden border border-slate-200/80 bg-white/95 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
              <LayoutTemplate size={18} />
            </span>
            <h2 className="section-title">Choose Template</h2>
          </div>

          <p className="section-subtitle mt-3 max-w-2xl">
            Select the resume style that best matches your personal brand.
            Your chosen template will be used in the live preview and PDF export.
          </p>
        </div>

        <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Premium CV Styles
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {templates.map((template) => {
          const isActive = selectedTemplate === template.id;

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => setSelectedTemplate(template.id)}
              className={[
                'group relative rounded-2xl border p-5 text-left transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-indigo-500/20',
                isActive
                  ? 'border-indigo-500 bg-indigo-50 shadow-sm ring-1 ring-indigo-200'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3
                    className={[
                      'text-base font-semibold transition-colors',
                      isActive ? 'text-indigo-700' : 'text-slate-900',
                    ].join(' ')}
                  >
                    {template.name}
                  </h3>

                  <p
                    className={[
                      'mt-2 text-sm leading-6 transition-colors',
                      isActive ? 'text-indigo-600' : 'text-slate-500',
                    ].join(' ')}
                  >
                    {template.description}
                  </p>
                </div>

                <span
                  className={[
                    'flex h-8 w-8 items-center justify-center rounded-full border transition-all',
                    isActive
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-300 bg-white text-transparent group-hover:border-slate-400',
                  ].join(' ')}
                >
                  <Check size={16} />
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span
                  className={[
                    'rounded-full px-3 py-1 text-xs font-medium',
                    isActive
                      ? 'bg-white text-indigo-700 ring-1 ring-indigo-200'
                      : 'bg-slate-100 text-slate-600',
                  ].join(' ')}
                >
                  {isActive ? 'Selected' : 'Click to apply'}
                </span>

                <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  {template.id}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSwitcher;