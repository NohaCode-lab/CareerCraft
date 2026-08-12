import React, { useMemo } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import useLanguage from '../../hooks/useLanguage';
import { getTranslationPack } from '../../config/translations';
import European from '../../templates/European';
import Modern from '../../templates/Modern';
import Minimal from '../../templates/Minimal';
import { CVData } from '../../types';

const defaultCV = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  skills: [],
  experience: [],
  education: [],
  languages: [],
  projects: [],
};

const templates: Record<string, React.FC<{ data?: CVData }>> = {
  european: European,
  modern: Modern,
  minimal: Minimal,
};

const parseSkills = (skills: string[] | string | unknown): string[] => {
  if (Array.isArray(skills)) {
    return skills.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof skills === 'string') {
    return skills
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const getSafeArray = <T,>(value: T[] | unknown): T[] => {
  return Array.isArray(value) ? (value as T[]) : [];
};

const CVPreview: React.FC = () => {
  const { language } = useLanguage();
  const t = getTranslationPack(language);

  const templateOptions = useMemo(() => [
    {
      id: 'european',
      label: t.templateEuropean || 'European',
      description: t.templateEuropeanDesc || 'ATS-friendly and professional',
    },
    {
      id: 'modern',
      label: t.templateModern || 'Modern',
      description: t.templateModernDesc || 'Bold and recruiter-friendly',
    },
    {
      id: 'minimal',
      label: t.templateMinimal || 'Minimal',
      description: t.templateMinimalDesc || 'Clean and elegant',
    },
  ], [t]);

  const [cvData] = useLocalStorage('cvData', defaultCV);

  const [selectedTemplate, setSelectedTemplate] = useLocalStorage(
    'cvTemplate',
    'european'
  );

  const safeCVData = useMemo(() => {
    const data = cvData || defaultCV;

    return {
      ...defaultCV,
      ...data,
      skills: parseSkills(data.skills),
      experience: getSafeArray(data.experience),
      education: getSafeArray(data.education),
      languages: getSafeArray(data.languages),
      projects: getSafeArray(data.projects),
    };
  }, [cvData]);

  const selectedTemplateComponent = useMemo(() => {
    return templates[selectedTemplate] || European;
  }, [selectedTemplate]);

  const TemplateComponent = selectedTemplateComponent;

  return (
    <div className="space-y-6">
      <div className="card-base overflow-hidden border border-slate-200/80 bg-white/95 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
        <div className="space-y-4">
          <div>
            <h2 className="section-title text-slate-900 dark:text-white">{t.liveCvPreviewTitle}</h2>
            <p className="section-subtitle mt-1 max-w-2xl text-slate-600 dark:text-slate-400">
              {t.liveCvPreviewDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 w-full">
            {templateOptions.map((template) => {
              const isActive = selectedTemplate === template.id;

              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setSelectedTemplate(template.id)}
                  className={[
                    'group rounded-2xl border p-3.5 text-left transition-all duration-200 w-full min-w-0 ltr:text-left rtl:text-right',
                    'focus:outline-none focus:ring-2 focus:ring-indigo-500/20',
                    isActive
                      ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 shadow-sm ring-1 ring-indigo-200 dark:ring-indigo-500/40'
                      : 'border-slate-200 bg-white dark:border-white/10 dark:bg-slate-800/60 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800',
                  ].join(' ')}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={[
                        'text-sm font-semibold truncate min-w-0',
                        isActive ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-900 dark:text-white',
                      ].join(' ')}
                    >
                      {template.label}
                    </span>

                    <span
                      className={[
                        'h-2.5 w-2.5 shrink-0 rounded-full transition-colors',
                        isActive ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-slate-300 dark:bg-slate-600',
                      ].join(' ')}
                    />
                  </div>

                  <p
                    className={[
                      'mt-1.5 text-xs leading-relaxed break-words',
                      isActive ? 'text-indigo-600 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400',
                    ].join(' ')}
                  >
                    {template.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card-base overflow-hidden border border-slate-200/80 bg-linear-to-br from-slate-50 via-white to-slate-100 p-3 shadow-sm sm:p-4">
        <div className="rounded-[28px] border border-slate-200 bg-white p-2 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] sm:p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {t.selectedTemplateLabel}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {
                  templateOptions.find(
                    (template) => template.id === selectedTemplate
                  )?.label
                }
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                {t.badgeLivePreview}
              </span>
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                {t.badgeAtsAware}
              </span>
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                {t.badgeExportReady}
              </span>
            </div>
          </div>

          <div
            id="cv-preview"
            className="overflow-hidden rounded-3xl bg-white break-words [word-break:break-word]"
          >
            <TemplateComponent data={safeCVData as unknown as CVData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPreview;
