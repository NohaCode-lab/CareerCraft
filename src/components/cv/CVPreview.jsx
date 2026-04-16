
import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const defaultCV = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  skills: '',
};

const CVPreview = () => {
  const [cvData] = useLocalStorage('cvData', defaultCV);

  const skillsList = cvData.skills
    ? cvData.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  return (
    <div id="cv-preview" className="card-base p-6">
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {cvData.fullName || 'Your Name'}
        </h2>

        <p className="mt-2 text-base font-medium text-indigo-600">
          {cvData.title || 'Professional Title'}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
          {cvData.email && <span>{cvData.email}</span>}
          {cvData.phone && <span>{cvData.phone}</span>}
          {cvData.location && <span>{cvData.location}</span>}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <section>
          <h3 className="text-lg font-semibold text-slate-900">Professional Summary</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {cvData.summary || 'Your professional summary will appear here.'}
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-slate-900">Skills</h3>

          {skillsList.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {skillsList.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-600">
              Your skills will appear here.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default CVPreview;