import React from 'react';
import useLanguage from '../hooks/useLanguage';
import { translations } from '../config/translations';
import { CVData, CVExperience, CVEducation, CVProject, CVLanguage, CVCertification } from '../types';

const EMPTY_TEXT = '';

const getSafeArray = <T,>(value: T[] | unknown): T[] => {
  return Array.isArray(value) ? (value.filter(Boolean) as T[]) : [];
};

const getSafeText = (value: unknown): string => {
  return typeof value === 'string' ? value.trim() : EMPTY_TEXT;
};

const isEmail = (value: unknown): boolean => {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const isUrl = (value: unknown): boolean => {
  return typeof value === 'string' && /^https?:\/\//i.test(value);
};

const getContactHref = (item: string) => {
  if (isEmail(item)) return `mailto:${item}`;
  if (isUrl(item)) return item;
  return null;
};

const formatDateRange = ({ startDate, endDate, duration, year }: { startDate?: string; endDate?: string; duration?: string; year?: string }) => {
  if (getSafeText(duration)) return getSafeText(duration);
  if (getSafeText(year)) return getSafeText(year);

  const start = getSafeText(startDate);
  const end = getSafeText(endDate);

  if (start && end) return `${start} - ${end}`;
  return start || end || EMPTY_TEXT;
};

const normalizeSkills = (skills: string[] | string | unknown): string[] => {
  if (typeof skills === 'string') {
    return skills
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);
  }

  return getSafeArray(skills)
    .map(String)
    .map((skill) => skill.trim())
    .filter(Boolean);
};

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
      {children}
    </h2>
  );
};

const BulletList: React.FC<{ items?: unknown[] }> = ({ items }) => {
  const safeItems = getSafeArray(items)
    .map((item) => getSafeText(String(item)))
    .filter(Boolean);

  if (safeItems.length === 0) return null;

  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 rtl:pr-5 rtl:pl-0">
      {safeItems.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
};

const ContactItem: React.FC<{ item: string }> = ({ item }) => {
  const href = getContactHref(item);

  if (!item) return null;

  if (href) {
    return (
      <a
        href={href}
        target={isUrl(item) ? '_blank' : undefined}
        rel={isUrl(item) ? 'noopener noreferrer' : undefined}
        className="break-all transition hover:text-white sm:break-normal"
      >
        {item}
      </a>
    );
  }

  return <span className="break-all sm:break-normal">{item}</span>;
};

const ExperienceItem: React.FC<{ item: CVExperience | Record<string, unknown> }> = ({ item }) => {
  const exp = item as Record<string, string>;
  const title = getSafeText(exp.role) || getSafeText(exp.title);
  const company = getSafeText(exp.company);
  const location = getSafeText(exp.location);
  const description = getSafeText(exp.description);
  const highlights = getSafeArray(exp.highlights || exp.bullets);

  const dateRange = formatDateRange({
    startDate: exp.startDate,
    endDate: exp.endDate,
    duration: exp.duration,
  });

  if (!title && !company && !description && highlights.length === 0) {
    return null;
  }

  return (
    <article className="break-inside-avoid rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <div className="min-w-0">
          {title && (
            <h3 className="text-[15px] font-semibold text-slate-900">
              {title}
            </h3>
          )}

          {company && (
            <p className="mt-1 text-sm font-medium text-slate-700">
              {company}
            </p>
          )}

          {location && <p className="text-sm text-slate-500">{location}</p>}
        </div>

        {dateRange && (
          <p className="shrink-0 text-xs uppercase tracking-wide text-slate-500">
            {dateRange}
          </p>
        )}
      </div>

      {description && (
        <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>
      )}

      <BulletList items={highlights} />
    </article>
  );
};

const EducationItem: React.FC<{ item: CVEducation | Record<string, unknown> }> = ({ item }) => {
  const edu = item as Record<string, string>;
  const degree = getSafeText(edu.degree);
  const institution = getSafeText(edu.school) || getSafeText(edu.institution);
  const location = getSafeText(edu.location);
  const description = getSafeText(edu.description || edu.details);

  const dateRange = formatDateRange({
    startDate: edu.startDate,
    endDate: edu.endDate,
    duration: edu.duration,
    year: edu.year,
  });

  if (!degree && !institution && !description) {
    return null;
  }

  return (
    <article className="break-inside-avoid rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <div className="min-w-0">
          {degree && (
            <h3 className="text-[15px] font-semibold text-slate-900">
              {degree}
            </h3>
          )}

          {institution && (
            <p className="mt-1 text-sm font-medium text-slate-700">
              {institution}
            </p>
          )}

          {location && <p className="text-sm text-slate-500">{location}</p>}
        </div>

        {dateRange && (
          <p className="shrink-0 text-xs uppercase tracking-wide text-slate-500">
            {dateRange}
          </p>
        )}
      </div>

      {description && (
        <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>
      )}
    </article>
  );
};

const ProjectItem: React.FC<{ item: CVProject | Record<string, unknown> }> = ({ item }) => {
  const title = getSafeText(item.name) || getSafeText((item as Record<string, unknown>).title);
  const link = getSafeText(item.link);
  const technologies = getSafeText((item as Record<string, unknown>).technologies);
  const description = getSafeText(item.description);
  const highlights = getSafeArray((item as Record<string, unknown>).highlights || item.bullets);

  if (!title && !link && !technologies && !description && highlights.length === 0) {
    return null;
  }

  return (
    <article className="break-inside-avoid rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {title && (
        <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
      )}

      {(link || technologies) && (
        <p className="mt-1 text-sm text-slate-500">
          {link && isUrl(link) ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all transition hover:text-slate-900"
            >
              {link}
            </a>
          ) : (
            link
          )}

          {link && technologies ? ' • ' : ''}
          {technologies}
        </p>
      )}

      {description && (
        <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>
      )}

      <BulletList items={highlights} />
    </article>
  );
};

const LanguageItem: React.FC<{ item: CVLanguage | string | Record<string, unknown> }> = ({ item }) => {
  if (typeof item === 'string') {
    const languageName = getSafeText(item);

    if (!languageName) return null;

    return <p className="text-sm leading-6 text-slate-700">{languageName}</p>;
  }

  const name = getSafeText((item as CVLanguage).language || (item as Record<string, unknown>).name);
  const level = getSafeText((item as CVLanguage).proficiency || (item as Record<string, unknown>).level);

  if (!name && !level) return null;

  return (
    <p className="text-sm leading-6 text-slate-700">
      {name}
      {name && level ? ' — ' : ''}
      {level}
    </p>
  );
};

const CertificationItem: React.FC<{ item: CVCertification | string | Record<string, unknown> }> = ({ item }) => {
  if (typeof item === 'string') {
    const certification = getSafeText(item);

    if (!certification) return null;

    return <p className="text-sm leading-6 text-slate-700">{certification}</p>;
  }

  const title = getSafeText((item as Record<string, unknown>).title || (item as CVCertification).name);
  const issuer = getSafeText((item as CVCertification).issuer);
  const date = getSafeText((item as CVCertification).date);

  if (!title && !issuer && !date) return null;

  return (
    <div className="break-inside-avoid">
      {title && <p className="text-sm font-medium text-slate-800">{title}</p>}

      {(issuer || date) && (
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {[issuer, date].filter(Boolean).join(' • ')}
        </p>
      )}
    </div>
  );
};

interface ModernProps {
  data?: CVData | Record<string, unknown>;
}

const Modern: React.FC<ModernProps> = ({ data = {} }) => {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;
  const isArabic = language === 'ar';

  const rawData = data as Record<string, unknown>;

  const personalInfo = {
    fullName: getSafeText(data.fullName),
    name: getSafeText(rawData.name),
    jobTitle: getSafeText(data.title),
    headline: getSafeText(rawData.headline),
    email: getSafeText(data.email),
    phone: getSafeText(data.phone),
    location: getSafeText(data.location),
    linkedin: getSafeText(data.linkedin),
    website: getSafeText(data.website),
    github: getSafeText(data.github),
    ...((rawData.personalInfo as Record<string, unknown>) || {}),
  };

  const fullName =
    getSafeText(personalInfo.fullName) || getSafeText(personalInfo.name);

  const headline =
    getSafeText(personalInfo.headline) || getSafeText(personalInfo.jobTitle);

  const summary = getSafeText(data.summary);
  const experience = getSafeArray<CVExperience | Record<string, unknown>>(data.experience);
  const education = getSafeArray<CVEducation | Record<string, unknown>>(data.education);
  const projects = getSafeArray<CVProject | Record<string, unknown>>(data.projects);
  const skills = normalizeSkills(data.skills);
  const languages = getSafeArray<CVLanguage | string | Record<string, unknown>>(data.languages);
  const certifications = getSafeArray<CVCertification | string | Record<string, unknown>>(data.certifications);

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.website,
    personalInfo.github,
  ]
    .map(getSafeText)
    .filter(Boolean);

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="mx-auto w-full max-w-[980px] overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-sm print:max-w-none print:rounded-none print:border-0 print:shadow-none"
    >
      <header className="border-b bg-slate-900 px-4 py-6 sm:px-10 sm:py-10 text-white">
        {(fullName || headline) && (
          <div>
            {fullName && <h1 className="text-3xl font-bold">{fullName}</h1>}

            {headline && <p className="mt-2 text-slate-300">{headline}</p>}
          </div>
        )}

        {contactItems.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
            {contactItems.map((item, index) => (
              <ContactItem key={`${item}-${index}`} item={item} />
            ))}
          </div>
        )}
      </header>

      <div className="grid lg:grid-cols-[1.65fr_0.95fr]">
        <main className="p-8">
          {summary && (
            <section>
              <SectionHeading>{t.summary}</SectionHeading>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                {summary}
              </p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="mt-8">
              <SectionHeading>{t.experience}</SectionHeading>
              <div className="mt-5 space-y-5">
                {experience.map((item, index: number) => {
                  const rec = item as Record<string, string>;
                  return (
                    <ExperienceItem
                      key={String(rec.id || `${rec.role || rec.title || rec.company || 'experience'}-${index}`)}
                      item={item}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="mt-8">
              <SectionHeading>{t.projects}</SectionHeading>
              <div className="mt-5 space-y-5">
                {projects.map((item, index: number) => {
                  const rec = item as Record<string, string>;
                  return (
                    <ProjectItem
                      key={String(rec.id || `${rec.name || rec.title || 'project'}-${index}`)}
                      item={item}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="mt-8">
              <SectionHeading>{t.education}</SectionHeading>
              <div className="mt-5 space-y-5">
                {education.map((item, index: number) => {
                  const rec = item as Record<string, string>;
                  return (
                    <EducationItem
                      key={String(rec.id || `${rec.degree || rec.school || rec.institution || 'education'}-${index}`)}
                      item={item}
                    />
                  );
                })}
              </div>
            </section>
          )}
        </main>

        <aside className="border-slate-200 bg-slate-50 p-8 ltr:border-l rtl:border-r">
          {skills.length > 0 && (
            <section>
              <SectionHeading>{t.skills}</SectionHeading>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {skills.join(', ')}
              </p>
            </section>
          )}

          {languages.length > 0 && (
            <section className="mt-6">
              <SectionHeading>{t.languages}</SectionHeading>
              <div className="mt-3 space-y-2">
                {languages.map((item, index: number) => (
                  <LanguageItem
                    key={
                      typeof item === 'object' && item && 'id' in item && item.id
                        ? String(item.id)
                        : `language-${index}`
                    }
                    item={item}
                  />
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section className="mt-6">
              <SectionHeading>{t.certifications}</SectionHeading>
              <div className="mt-3 space-y-2">
                {certifications.map((item, index: number) => (
                  <CertificationItem
                    key={
                      typeof item === 'object' && item && 'id' in item && item.id
                        ? String(item.id)
                        : `certification-${index}`
                    }
                    item={item}
                  />
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Modern;
