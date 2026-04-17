
import React, { useEffect, useMemo, useState } from 'react';
import { ClipboardList, RefreshCcw, Save, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'careercraft_star_builder';

const defaultState = {
  situation: '',
  task: '',
  action: '',
  result: '',
};

const STARBuilder = () => {
  const [formData, setFormData] = useState(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : defaultState;
    } catch {
      return defaultState;
    }
  });

  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const previewText = useMemo(() => {
    const sections = [
      formData.situation
        ? `Situation: ${formData.situation}`
        : 'Situation: Describe the context clearly.',
      formData.task
        ? `Task: ${formData.task}`
        : 'Task: Explain your responsibility.',
      formData.action
        ? `Action: ${formData.action}`
        : 'Action: Show the steps you took.',
      formData.result
        ? `Result: ${formData.result}`
        : 'Result: Quantify or highlight the outcome.',
    ];

    return sections.join('\n\n');
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData(defaultState);
    setSavedMessage('');
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    setSavedMessage('Saved successfully');

    window.setTimeout(() => {
      setSavedMessage('');
    }, 2000);
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
            <Sparkles size={14} />
            STAR Method
          </div>

          <h2 className="text-2xl font-bold text-white">STAR Builder</h2>
          <p className="mt-2 text-sm text-slate-300">
            Build strong behavioral interview answers with Situation, Task, Action, and Result.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200 transition hover:bg-indigo-500/20"
          >
            <Save size={16} />
            Save
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            <RefreshCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      {savedMessage ? (
        <div className="mb-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-300">
          {savedMessage}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-4">
            <label
              htmlFor="star-situation"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Situation
            </label>
            <textarea
              id="star-situation"
              name="situation"
              value={formData.situation}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the background and context of the story."
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/40"
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-4">
            <label
              htmlFor="star-task"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Task
            </label>
            <textarea
              id="star-task"
              name="task"
              value={formData.task}
              onChange={handleChange}
              rows={4}
              placeholder="Explain what responsibility or challenge you had."
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/40"
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-4">
            <label
              htmlFor="star-action"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Action
            </label>
            <textarea
              id="star-action"
              name="action"
              value={formData.action}
              onChange={handleChange}
              rows={4}
              placeholder="Write the exact steps you took to solve the problem."
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/40"
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-4">
            <label
              htmlFor="star-result"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Result
            </label>
            <textarea
              id="star-result"
              name="result"
              value={formData.result}
              onChange={handleChange}
              rows={4}
              placeholder="Highlight the outcome, impact, or measurable result."
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/40"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-5">
          <div className="mb-4 flex items-center gap-2 text-indigo-300">
            <ClipboardList size={18} />
            <h3 className="text-lg font-semibold text-white">Answer Preview</h3>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-slate-300">
              {previewText}
            </pre>
          </div>

          <div className="mt-4 rounded-2xl border border-amber-400/10 bg-amber-400/5 p-4">
            <p className="text-sm leading-6 text-amber-200">
              Tip: Keep your answer concise, specific, and results-focused. Strong STAR answers often sound more convincing when the result includes numbers, impact, or lessons learned.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default STARBuilder;