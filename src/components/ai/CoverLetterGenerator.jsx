import React, { useMemo, useState } from 'react';
import { FileText, Sparkles, Wand2 } from 'lucide-react';
import AIResponseCard from './AIResponseCard';

const initialFormData = {
  fullName: '',
  jobTitle: '',
  companyName: '',
  experience: '',
  skills: '',
};

const CoverLetterGenerator = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fields = useMemo(
    () => [
      {
        id: 'fullName',
        name: 'fullName',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Enter your full name',
      },
      {
        id: 'jobTitle',
        name: 'jobTitle',
        label: 'Job Title',
        type: 'text',
        placeholder: 'Enter the target job title',
      },
      {
        id: 'companyName',
        name: 'companyName',
        label: 'Company Name',
        type: 'text',
        placeholder: 'Enter the company name',
        fullWidth: true,
      },
      {
        id: 'experience',
        name: 'experience',
        label: 'Experience',
        type: 'textarea',
        rows: 4,
        placeholder: 'Briefly describe your background and relevant experience',
        fullWidth: true,
      },
      {
        id: 'skills',
        name: 'skills',
        label: 'Key Skills',
        type: 'textarea',
        rows: 4,
        placeholder: 'List the most relevant skills you want to highlight',
        fullWidth: true,
      },
    ],
    []
  );

  const isFormValid = useMemo(() => {
    return Object.values(formData).every((value) => value.trim());
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerate = async () => {
    if (!isFormValid || isLoading) return;

    const { fullName, jobTitle, companyName, experience, skills } = formData;

    setIsLoading(true);
    setGeneratedLetter('');
    setErrorMessage('');

    try {
      const letter = await new Promise((resolve) => {
        window.setTimeout(() => {
          resolve(`Dear Hiring Manager,

I am writing to express my interest in the ${jobTitle} position at ${companyName}. My name is ${fullName}, and I am excited about the opportunity to contribute my background and strengths to your team.

With experience in ${experience}, I have built a strong foundation that aligns well with the expectations of this role. My key skills include ${skills}, and I believe these strengths would allow me to contribute effectively and create meaningful value at ${companyName}.

I am motivated by opportunities to grow, solve problems, and deliver high-quality work. I would welcome the chance to further discuss how my experience, skills, and enthusiasm can support your team and goals.

Thank you for your time and consideration.

Sincerely,
${fullName}`);
        }, 1200);
      });

      setGeneratedLetter(letter);
    } catch {
      const fallbackError =
        'Something went wrong while generating the cover letter. Please try again.';

      setErrorMessage(fallbackError);
      setGeneratedLetter(fallbackError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (isLoading) return;

    setFormData(initialFormData);
    setGeneratedLetter('');
    setErrorMessage('');
  };

  return (
    <div className="space-y-6">
      <section
        className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg backdrop-blur-sm"
        aria-labelledby="cover-letter-generator-heading"
      >
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
            <FileText size={22} />
          </div>

          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              <Sparkles size={14} />
              Letter Generator
            </div>

            <h2
              id="cover-letter-generator-heading"
              className="text-2xl font-semibold text-white"
            >
              Cover Letter Generator
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Generate a more tailored and polished cover letter for your next
              application using your role, company, skills, and experience.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((field) => {
            const commonClasses =
              'w-full rounded-2xl border border-white/10 bg-slate-800/60 px-4 py-3 text-sm text-slate-200 outline-none transition duration-300 placeholder:text-slate-500 focus:border-violet-400/30 focus:bg-slate-800';

            const wrapperClass = field.fullWidth ? 'md:col-span-2' : '';

            return (
              <div
                key={field.id}
                className={wrapperClass}
              >
                <label
                  htmlFor={field.id}
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  {field.label}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    rows={field.rows}
                    className={`${commonClasses} resize-none`}
                  />
                ) : (
                  <input
                    id={field.id}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={commonClasses}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!isFormValid || isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Wand2 size={16} />
            {isLoading ? 'Generating...' : 'Generate Cover Letter'}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-slate-800/70 px-5 py-3 text-sm font-medium text-slate-200 transition duration-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reset
          </button>
        </div>

        {!isFormValid && (
          <p className="mt-4 text-sm text-amber-300">
            Fill in all fields to generate a tailored cover letter.
          </p>
        )}
      </section>

      <AIResponseCard
        title="Generated Cover Letter"
        response={generatedLetter}
        isLoading={isLoading}
        error={errorMessage}
      />
    </div>
  );
};

export default CoverLetterGenerator;