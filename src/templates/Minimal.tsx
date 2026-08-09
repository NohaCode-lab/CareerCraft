import React from 'react';
import useLanguage from '../hooks/useLanguage';
import { translations } from '../config/translations';

const EMPTY_TEXT = '';

const getSafeArray = (value: any) => Array.isArray(value) ? value.filter(Boolean) : [];

const getSafeText = (value: any) =>
  typeof value === 'string' ? value.trim() : EMPTY_TEXT;

const normalizeSkills = (skills: any): string[] => {
  if (typeof skills === 'string') {
    return skills.split(',').map(s => s.trim()).filter(Boolean);
  }
  return getSafeArray(skills);
};

const isEmail = (value: any) =>
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isUrl = (value: any) =>
  typeof value === 'string' && /^https?:\/\//i.test(value);

const getContactHref = (item: string) => {
  if (isEmail(item)) return `mailto:${item}`;
  if (isUrl(item)) return item;
  return null;
};

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-600">
    {children}
  </h2>
);

const BulletList: React.FC<{ items?: any[] }> = ({ items }) => {
  const safeItems = getSafeArray(items);

  if (!safeItems.length) return null;

  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 rtl:pr-5 rtl:pl-0">
      {safeItems.map((item, i) => (
        <li key={`${item}-${i}`}>{item}</li>
      ))}
    </ul>
  );
};

const ContactItem: React.FC<{ item: string }> = ({ item }) => {
  const href = getContactHref(item);

  if (href) {
    return (
      <a
        href={href}
        target={isUrl(item) ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="break-all hover:text-indigo-600"
      >
        {item}
      </a>
    );
  }

  return <span>{item}</span>;
};

interface MinimalProps {
  data?: any;
}

const Minimal: React.FC<MinimalProps> = ({ data = {} }) => {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;
  const isArabic = language === 'ar';

  const personalInfo = {
    fullName: getSafeText(data.fullName),
    name: getSafeText(data.name),
    jobTitle: getSafeText(data.title),
    headline: getSafeText(data.headline),
    email: getSafeText(data.email),
    phone: getSafeText(data.phone),
    location: getSafeText(data.location),
    linkedin: getSafeText(data.linkedin),
    website: getSafeText(data.website),
    github: getSafeText(data.github),
    ...(data.personalInfo || {}),
  };

  const fullName = personalInfo.fullName || personalInfo.name;
  const headline = personalInfo.headline || personalInfo.jobTitle;

  const summary = getSafeText(data.summary);
  const experience = getSafeArray(data.experience);
  const education = getSafeArray(data.education);
  const projects = getSafeArray(data.projects);
  const skills = normalizeSkills(data.skills);
  const languages = getSafeArray(data.languages);
  const certifications = getSafeArray(data.certifications);

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.website,
    personalInfo.github,
  ].filter(Boolean);

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="mx-auto w-full max-w-[850px] bg-white px-4 py-6 sm:px-10 sm:py-10 text-slate-900 shadow-sm print:max-w-none print:shadow-none"
    >
      <header>
        {fullName && (
          <h1 className="text-3xl font-bold">{fullName}</h1>
        )}
        {headline && (
          <p className="mt-2 text-slate-600">{headline}</p>
        )}

        {contactItems.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            {contactItems.map((item, i) => (
              <ContactItem key={`${item}-${i}`} item={item} />
            ))}
          </div>
        )}
      </header>

      {summary && (
        <section className="mt-6">
          <SectionHeading>{t.summary}</SectionHeading>
          <p className="mt-3 text-sm">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mt-6">
          <SectionHeading>{t.experience}</SectionHeading>
          {experience.map((item: any, i: number) => (
            <div key={i} className="mt-4">
              <p className="font-semibold">{item.role || item.title}</p>
              <p className="text-sm text-slate-600">{item.company}</p>
              <BulletList items={item.highlights} />
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mt-6">
          <SectionHeading>{t.education}</SectionHeading>
          {education.map((item: any, i: number) => (
            <div key={i} className="mt-4">
              <p className="font-semibold">{item.degree}</p>
              <p className="text-sm text-slate-600">{item.school}</p>
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-6">
          <SectionHeading>{t.projects}</SectionHeading>
          {projects.map((item: any, i: number) => (
            <div key={i} className="mt-4">
              <p className="font-semibold">{item.name}</p>
              <BulletList items={item.highlights} />
            </div>
          ))}
        </section>
      )}

      {(skills.length > 0 || languages.length > 0 || certifications.length > 0) && (
        <section className="mt-6">
          <SectionHeading>{t.additional}</SectionHeading>

          {skills.length > 0 && (
            <p className="mt-3">{skills.join(', ')}</p>
          )}

          {languages.length > 0 && (
            <div className="mt-3">
              {languages.map((l: any, i: number) => (
                <p key={i}>{typeof l === 'string' ? l : l.name}</p>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div className="mt-3">
              {certifications.map((c: any, i: number) => (
                <p key={i}>{typeof c === 'string' ? c : c.title}</p>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Minimal;
