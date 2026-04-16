
import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const templates = [
  { id: 'modern', name: 'Modern' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'european', name: 'European' },
];

const TemplateSwitcher = () => {
  const [selectedTemplate, setSelectedTemplate] = useLocalStorage(
    'cvTemplate',
    'modern'
  );

  return (
    <div className="card-base p-6">
      <h2 className="section-title mb-4">Choose Template</h2>

      <div className="flex flex-wrap gap-3">
        {templates.map((template) => {
          const isActive = selectedTemplate === template.id;

          return (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition
                ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                }
              `}
            >
              {template.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSwitcher;