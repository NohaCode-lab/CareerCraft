import { useMemo, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import European from '../templates/European';
import Modern from '../templates/Modern';
import Minimal from '../templates/Minimal';

const defaultCV = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  skills: '',
  experience: [],
  education: [],
  languages: [],
  projects: [],
};

const templateOptions = [
  {
    id: 'european',
    label: 'European',
    description: 'ATS-friendly and professional',
  },
  {
    id: 'modern',
    label: 'Modern',
    description: 'Bold and recruiter-friendly',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'Clean and elegant',
  },
];

const parseSkills = (skills) => {
  if (Array.isArray(skills)) {
    return skills.filter(Boolean);
  }

  if (typeof skills !== 'string') {
    return [];
  }

  return skills
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean);
};

const getSafeArray = (value) => {
  return Array.isArray(value) ? value : [];
};

const CVPreview = () => {
  const [cvData] = useLocalStorage('cvData', defaultCV);
  const [selectedTemplate, setSelectedTemplate] = useState('european');

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
    const templates = {
      european: European,
      modern: Modern,
      minimal: Minimal,
    };

    return templates[selectedTemplate] || European;
  }, [selectedTemplate]);

  const TemplateComponent = selectedTemplateComponent;

  return (
    <div className="space-y-6">
      <div className="card-base overflow-hidden border border-slate-200/80 bg-white/95 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="section-title">Live CV Preview</h2>
            <p className="section-subtitle mt-2 max-w-2xl">
              Choose a premium template and preview your resume in real time.
              Your selected style will also be used when exporting the CV.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {templateOptions.map((template) => {
              const isActive = selectedTemplate === template.id;

              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setSelectedTemplate(template.id)}
                  className={[
                    'group rounded-2xl border p-4 text-left transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-indigo-500/20',
                    isActive
                      ? 'border-indigo-500 bg-indigo-50 shadow-sm ring-1 ring-indigo-200'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
                  ].join(' ')}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={[
                        'text-sm font-semibold',
                        isActive ? 'text-indigo-700' : 'text-slate-900',
                      ].join(' ')}
                    >
                      {template.label}
                    </span>

                    <span
                      className={[
                        'h-2.5 w-2.5 rounded-full transition-colors',
                        isActive ? 'bg-indigo-600' : 'bg-slate-300',
                      ].join(' ')}
                    />
                  </div>

                  <p
                    className={[
                      'mt-2 text-xs leading-5',
                      isActive ? 'text-indigo-600' : 'text-slate-500',
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

      <div className="card-base overflow-hidden border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-3 shadow-sm sm:p-4">
        <div className="rounded-[28px] border border-slate-200 bg-white p-2 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] sm:p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Selected Template
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
                Live Preview
              </span>
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                ATS-aware
              </span>
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                Export Ready
              </span>
            </div>
          </div>

          <div
            id="cv-preview"
            className="overflow-hidden rounded-[24px] bg-white"
          >
            <TemplateComponent data={safeCVData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPreview;