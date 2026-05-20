import PropTypes from 'prop-types';
import { useContext } from 'react';

import LanguageContext from '../context/LanguageContext';
import { translations } from '../config/translations';

const EMPTY_TEXT = '';

const getSafeArray = (value) =>
  Array.isArray(value) ? value.filter(Boolean) : [];

const getSafeText = (value) =>
  typeof value === 'string' ? value.trim() : EMPTY_TEXT;

const isEmail = (value) =>
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isUrl = (value) =>
  typeof value === 'string' && /^https?:\/\//i.test(value);

const getContactHref = (item) => {
  if (isEmail(item)) return `mailto:${item}`;
  if (isUrl(item)) return item;
  return null;
};

const formatDateRange = ({ startDate, endDate, duration, year }) => {
  if (getSafeText(duration)) return getSafeText(duration);
  if (getSafeText(year)) return getSafeText(year);

  const start = getSafeText(startDate);
  const end = getSafeText(endDate);

  if (start && end) return `${start} - ${end}`;
  return start || end || EMPTY_TEXT;
};

const normalizeSkills = (skills) => {
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

const SectionHeading = ({ children }) => (
  <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-600">
    {children}
  </h2>
);

SectionHeading.propTypes = {
  children: PropTypes.node.isRequired,
};

const BulletList = ({ items }) => {
  const safeItems = getSafeArray(items)
    .map((item) => getSafeText(String(item)))
    .filter(Boolean);

  if (safeItems.length === 0) return null;

  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 rtl:pr-5 rtl:pl-0">
      {safeItems.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
};

BulletList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
};

BulletList.defaultProps = {
  items: [],
};

const ContactItem = ({ item }) => {
  const href = getContactHref(item);

  if (!item) return null;

  if (href) {
    return (
      <a
        href={href}
        target={isUrl(item) ? '_blank' : undefined}
        rel={isUrl(item) ? 'noopener noreferrer' : undefined}
        className="break-all hover:text-indigo-600 sm:break-normal"
      >
        {item}
      </a>
    );
  }

  return (
    <span className="break-all sm:break-normal">{item}</span>
  );
};

ContactItem.propTypes = {
  item: PropTypes.string.isRequired,
};

const ExperienceItem = ({ item }) => {
  const title = getSafeText(item.role) || getSafeText(item.title);
  const company = getSafeText(item.company);
  const location = getSafeText(item.location);
  const description = getSafeText(item.description);
  const highlights = getSafeArray(item.highlights);

  const dateRange = formatDateRange({
    startDate: item.startDate,
    endDate: item.endDate,
    duration: item.duration,
  });

  if (!title && !company && !description && highlights.length === 0) {
    return null;
  }

  return (
    <article className="break-inside-avoid">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="min-w-0">
          {title && <p className="font-semibold text-slate-900">{title}</p>}
          {company && (
            <p className="text-sm text-slate-600">{company}</p>
          )}
          {location && (
            <p className="text-sm text-slate-500">{location}</p>
          )}
        </div>
        {dateRange && (
          <p className="shrink-0 text-xs uppercase tracking-wide text-slate-500">
            {dateRange}
          </p>
        )}
      </div>
      {description && (
        <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>
      )}
      <BulletList items={highlights} />
    </article>
  );
};

ExperienceItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    role: PropTypes.string,
    title: PropTypes.string,
    company: PropTypes.string,
    location: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    duration: PropTypes.string,
    description: PropTypes.string,
    highlights: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
  }).isRequired,
};

const EducationItem = ({ item }) => {
  const degree = getSafeText(item.degree);
  const institution =
    getSafeText(item.school) || getSafeText(item.institution);
  const location = getSafeText(item.location);
  const description = getSafeText(item.description);

  const dateRange = formatDateRange({
    startDate: item.startDate,
    endDate: item.endDate,
    duration: item.duration,
    year: item.year,
  });

  if (!degree && !institution && !description) {
    return null;
  }

  return (
    <article className="break-inside-avoid">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="min-w-0">
          {degree && <p className="font-semibold text-slate-900">{degree}</p>}
          {institution && (
            <p className="text-sm text-slate-600">{institution}</p>
          )}
          {location && (
            <p className="text-sm text-slate-500">{location}</p>
          )}
        </div>
        {dateRange && (
          <p className="shrink-0 text-xs uppercase tracking-wide text-slate-500">
            {dateRange}
          </p>
        )}
      </div>
      {description && (
        <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>
      )}
    </article>
  );
};

EducationItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    degree: PropTypes.string,
    school: PropTypes.string,
    institution: PropTypes.string,
    location: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    duration: PropTypes.string,
    year: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

const ProjectItem = ({ item }) => {
  const title = getSafeText(item.name) || getSafeText(item.title);
  const link = getSafeText(item.link);
  const technologies = getSafeText(item.technologies);
  const description = getSafeText(item.description);
  const highlights = getSafeArray(item.highlights);

  if (!title && !description && highlights.length === 0) {
    return null;
  }

  return (
    <article className="break-inside-avoid">
      {title && <p className="font-semibold text-slate-900">{title}</p>}
      {(link || technologies) && (
        <p className="mt-1 text-sm text-slate-500">
          {link && isUrl(link) ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all hover:text-indigo-600"
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
        <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>
      )}
      <BulletList items={highlights} />
    </article>
  );
};

ProjectItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
    technologies: PropTypes.string,
    description: PropTypes.string,
    highlights: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
  }).isRequired,
};

const LanguageItem = ({ item }) => {
  if (typeof item === 'string') {
    const language = getSafeText(item);
    if (!language) return null;
    return <p className="text-sm leading-6 text-slate-700">{language}</p>;
  }

  const name = getSafeText(item.name);
  const level = getSafeText(item.level);

  if (!name && !level) return null;

  return (
    <p className="text-sm leading-6 text-slate-700">
      {name}
      {name && level ? ' — ' : ''}
      {level}
    </p>
  );
};

LanguageItem.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string,
      level: PropTypes.string,
    }),
  ]).isRequired,
};

const CertificationItem = ({ item }) => {
  if (typeof item === 'string') {
    const certification = getSafeText(item);
    if (!certification) return null;
    return <p className="text-sm leading-6 text-slate-700">{certification}</p>;
  }

  const title = getSafeText(item.title);
  const issuer = getSafeText(item.issuer);
  const date = getSafeText(item.date);

  if (!title && !issuer && !date) return null;

  return (
    <div className="break-inside-avoid">
      {title && <p className="text-sm font-medium text-slate-800">{title}</p>}
      {(issuer || date) && (
        <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
          {[issuer, date].filter(Boolean).join(' • ')}
        </p>
      )}
    </div>
  );
};

CertificationItem.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      title: PropTypes.string,
      issuer: PropTypes.string,
      date: PropTypes.string,
    }),
  ]).isRequired,
};

const Minimal = ({ data }) => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.en;
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

  const fullName =
    getSafeText(personalInfo.fullName) || getSafeText(personalInfo.name);

  const headline =
    getSafeText(personalInfo.headline) || getSafeText(personalInfo.jobTitle);

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
  ]
    .map(getSafeText)
    .filter(Boolean);

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="mx-auto w-full max-w-[850px] bg-white px-10 py-10 text-slate-900 shadow-sm print:max-w-none print:shadow-none"
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
            {contactItems.map((item, index) => (
              <ContactItem key={`${item}-${index}`} item={item} />
            ))}
          </div>
        )}
      </header>

      {summary && (
        <section className="mt-6">
          <SectionHeading>{t.summary}</SectionHeading>
          <p className="mt-3 text-sm leading-7 text-slate-700">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mt-6">
          <SectionHeading>{t.experience}</SectionHeading>
          <div className="mt-4 space-y-5">
            {experience.map((item, index) => (
              <ExperienceItem
                key={item.id ?? `experience-${index}`}
                item={item}
              />
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mt-6">
          <SectionHeading>{t.education}</SectionHeading>
          <div className="mt-4 space-y-5">
            {education.map((item, index) => (
              <EducationItem
                key={item.id ?? `education-${index}`}
                item={item}
              />
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-6">
          <SectionHeading>{t.projects}</SectionHeading>
          <div className="mt-4 space-y-5">
            {projects.map((item, index) => (
              <ProjectItem
                key={item.id ?? `project-${index}`}
                item={item}
              />
            ))}
          </div>
        </section>
      )}

      {(skills.length > 0 ||
        languages.length > 0 ||
        certifications.length > 0) && (
        <section className="mt-6">
          <SectionHeading>{t.additional}</SectionHeading>

          {skills.length > 0 && (
            <div className="mt-3 break-inside-avoid">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t.skills}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                {skills.join(', ')}
              </p>
            </div>
          )}

          {languages.length > 0 && (
            <div className="mt-4 break-inside-avoid">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t.languages}
              </h3>
              <div className="mt-2 space-y-1">
                {languages.map((item, index) => (
                  <LanguageItem
                    key={
                      item.id ??
                      `language-${index}-${
                        typeof item === 'string' ? item : item.name || 'item'
                      }`
                    }
                    item={item}
                  />
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div className="mt-4 break-inside-avoid">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t.certifications}
              </h3>
              <div className="mt-2 space-y-2">
                {certifications.map((item, index) => (
                  <CertificationItem
                    key={
                      item.id ??
                      `certification-${index}-${
                        typeof item === 'string' ? item : item.title || 'item'
                      }`
                    }
                    item={item}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

Minimal.propTypes = {
  data: PropTypes.shape({
    fullName: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    headline: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.string,
    linkedin: PropTypes.string,
    website: PropTypes.string,
    github: PropTypes.string,
    summary: PropTypes.string,
    skills: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    experience: PropTypes.arrayOf(PropTypes.object),
    education: PropTypes.arrayOf(PropTypes.object),
    projects: PropTypes.arrayOf(PropTypes.object),
    languages: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          level: PropTypes.string,
        }),
      ])
    ),
    certifications: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
          issuer: PropTypes.string,
          date: PropTypes.string,
        }),
      ])
    ),
    personalInfo: PropTypes.object,
  }),
};

Minimal.defaultProps = {
  data: {},
};

export default Minimal;
