import React, { useMemo, useState } from 'react';
import { FileText, Sparkles, Wand2 } from 'lucide-react';
import AIResponseCard from './AIResponseCard';
import useLanguage from '../../hooks/useLanguage';
import { translations } from '../../config/translations';

interface CoverLetterFormData {
  fullName: string;
  jobTitle: string;
  companyName: string;
  experience: string;
  skills: string;
  [key: string]: string;
}

const initialFormData: CoverLetterFormData = {
  fullName: '',
  jobTitle: '',
  companyName: '',
  experience: '',
  skills: '',
};

const CoverLetterGenerator: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const [formData, setFormData] = useState<CoverLetterFormData>(initialFormData);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fields = useMemo(
    () => [
      {
        id: 'fullName',
        name: 'fullName',
        label: t.fullNameLabel || 'Full Name',
        type: 'text',
        placeholder: language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name',
      },
      {
        id: 'jobTitle',
        name: 'jobTitle',
        label: t.jobTitleLabel || 'Job Title',
        type: 'text',
        placeholder: language === 'ar' ? 'أدخل المسمى الوظيفي المستهدف' : 'Enter the target job title',
      },
      {
        id: 'companyName',
        name: 'companyName',
        label: t.companyNameLabel || 'Company Name',
        type: 'text',
        placeholder: language === 'ar' ? 'أدخل اسم الشركة' : 'Enter the company name',
        fullWidth: true,
      },
      {
        id: 'experience',
        name: 'experience',
        label: t.experienceLabel || 'Experience',
        type: 'textarea',
        rows: 4,
        placeholder: language === 'ar' ? 'اشرح ملخص خبراتك ومؤهلاتك باختصار' : 'Briefly describe your background and relevant experience',
        fullWidth: true,
      },
      {
        id: 'skills',
        name: 'skills',
        label: t.skillsLabel || 'Key Skills',
        type: 'textarea',
        rows: 4,
        placeholder: language === 'ar' ? 'اذكر أبرز مهاراتك التي ترغب بإبرازها' : 'List the most relevant skills you want to highlight',
        fullWidth: true,
      },
    ],
    [language, t]
  );

  const isFormValid = useMemo(() => {
    return Object.values(formData).every((value) => value.trim());
  }, [formData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      const letter = await new Promise<string>((resolve) => {
        window.setTimeout(() => {
          if (language === 'ar') {
            resolve(`عزيزي مسؤول التوظيف،

أكتب إليكم لإبداء اهتمامي البالغ بالانضمام إلى فريق عملكم في وظيفة ${jobTitle} لدى ${companyName}. اسمي ${fullName}، ويسعدني استعراض مؤهلاتي وخبراتي معك.

من خلال خبرتي في ${experience}، تمكنت من بناء قاعدة مهنية متينة تتوافق مع متطلبات هذه الوظيفة. تشمل مهاراتي الأساسية ${skills}، وأعتقد أن هذه المؤهلات ستتيح لي تقديم إضافة نوعية وقيمة مضافة لدى ${companyName}.

أتطلع إلى فرصة لمناقشة كيف يمكن لخبرتي ومهاراتي دعم أهداف فريقكم.

شاكراً لكم حسن وقتكم والاهتمام.

مع خالص التحية،
${fullName}`);
          } else {
            resolve(`Dear Hiring Manager,

I am writing to express my interest in the ${jobTitle} position at ${companyName}. My name is ${fullName}, and I am excited about the opportunity to contribute my background and strengths to your team.

With experience in ${experience}, I have built a strong foundation that aligns well with the expectations of this role. My key skills include ${skills}, and I believe these strengths would allow me to contribute effectively and create meaningful value at ${companyName}.

Thank you for your time and consideration.

Sincerely,
${fullName}`);
          }
        }, 1200);
      });

      setGeneratedLetter(letter);
    } catch {
      const fallbackError =
        language === 'ar'
          ? 'حدث خطأ أثناء توليد خطاب التغطية. يرجى المحاولة مرة أخرى.'
          : 'Something went wrong while generating the cover letter. Please try again.';

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
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80 dark:shadow-lg dark:backdrop-blur-sm"
        aria-labelledby="cover-letter-generator-heading"
      >
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-600 dark:text-violet-300">
            <FileText size={22} />
          </div>

          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-300">
              <Sparkles size={14} />
              {t.coverLetterTitle || 'Cover Letter Generator'}
            </div>

            <h2
              id="cover-letter-generator-heading"
              className="text-2xl font-semibold text-slate-900 dark:text-white"
            >
              {t.coverLetterTitle || 'Cover Letter Generator'}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              {t.coverLetterDesc || 'Generate a more tailored and polished cover letter for your next application.'}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((field) => {
            const commonClasses =
              'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:border-violet-500 focus:bg-white dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-violet-400/30 dark:focus:bg-slate-800';

            const wrapperClass = field.fullWidth ? 'md:col-span-2' : '';

            return (
              <div
                key={field.id}
                className={wrapperClass}
              >
                <label
                  htmlFor={field.id}
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
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
            {isLoading ? t.generating || 'Generating...' : t.generateCoverLetter || 'Generate Cover Letter'}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-medium text-slate-700 transition duration-300 hover:bg-slate-200 dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {t.reset || 'Reset'}
          </button>
        </div>

        {!isFormValid && (
          <p className="mt-4 text-sm text-amber-600 dark:text-amber-300">
            {language === 'ar' ? 'يرجى تعبئة جميع الحقول لتوليد خطاب تغطية مخصص.' : 'Fill in all fields to generate a tailored cover letter.'}
          </p>
        )}
      </section>

      <AIResponseCard
        title={t.generatedCoverLetterTitle || 'Generated Cover Letter'}
        response={generatedLetter}
        isLoading={isLoading}
        error={errorMessage}
      />
    </div>
  );
};

export default CoverLetterGenerator;
