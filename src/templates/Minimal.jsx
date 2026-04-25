
const SectionHeading = ({ children }) => {
  return (
    <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-600">
      {children}
    </h2>
  );
};

const formatDateRange = (startDate, endDate) => {
  if (!startDate && !endDate) {
    return '';
  }

  if (startDate && endDate) {
    return `${startDate} - ${endDate}`;
  }

  return startDate || endDate || '';
};

const getSafeArray = (value) => {
  return Array.isArray(value) ? value : [];
};

const renderBulletList = (items) => {
  const safeItems = getSafeArray(items).filter(Boolean);

  if (safeItems.length === 0) {
    return null;
  }

  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
      {safeItems.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
};

const ExperienceItem = ({ item }) => {
  const title = item.role || item.title || 'Role Title';
  const company = item.company || 'Company Name';
  const location = item.location || '';
  const dateRange = formatDateRange(item.startDate, item.endDate);
  const description = item.description || '';
  const highlights = getSafeArray(item.highlights);

  return (
    <article>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-700">{company}</p>
          {location && <p className="mt-1 text-sm text-slate-500">{location}</p>}
        </div>

        {dateRange && (
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {dateRange}
          </p>
        )}
      </div>

      {description && (
        <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>
      )}

      {renderBulletList(highlights)}
    </article>
  );
};

const EducationItem = ({ item }) => {
  const degree = item.degree || 'Degree';
  const institution = item.school || item.institution || 'Institution';
  const location = item.location || '';
  const dateRange = formatDateRange(item.startDate, item.endDate);
  const description = item.description || '';

  return (
    <article>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900">{degree}</h3>
          <p className="text-sm text-slate-700">{institution}</p>
          {location && <p className="mt-1 text-sm text-slate-500">{location}</p>}
        </div>

        {dateRange && (
          <p className="text-xs uppercase tracking-wide text-slate-500">
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

const ProjectItem = ({ item }) => {
  const title = item.name || item.title || 'Project';
  const link = item.link || '';
  const technologies = item.technologies || '';
  const description = item.description || '';
  const highlights = getSafeArray(item.highlights);

  return (
    <article>
      <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>

      {(link || technologies) && (
        <p className="mt-1 text-sm text-slate-500">
          {[link, technologies].filter(Boolean).join(' • ')}
        </p>
      )}

      {description && (
        <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>
      )}

      {renderBulletList(highlights)}
    </article>
  );
};

const LanguageItem = ({ item }) => {
  if (typeof item === 'string') {
    return <p className="text-sm leading-6 text-slate-700">{item}</p>;
  }

  const name = item.name || 'Language';
  const level = item.level || '';

  return (
    <p className="text-sm leading-6 text-slate-700">
      {name}
      {level ? ` — ${level}` : ''}
    </p>
  );
};

const CertificationItem = ({ item }) => {
  if (typeof item === 'string') {
    return <p className="text-sm leading-6 text-slate-700">{item}</p>;
  }

  const title = item.title || 'Certification';
  const issuer = item.issuer || '';
  const date = item.date || '';

  return (
    <div>
      <p className="text-sm font-medium text-slate-800">{title}</p>
      {(issuer || date) && (
        <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
          {[issuer, date].filter(Boolean).join(' • ')}
        </p>
      )}
    </div>
  );
};

const Minimal = ({ data = {} }) => {
  const personalInfo = data.personalInfo || {};
  const summary = data.summary || '';

  const experience = getSafeArray(data.experience);
  const education = getSafeArray(data.education);
  const projects = getSafeArray(data.projects);
  const skills = getSafeArray(data.skills);
  const languages = getSafeArray(data.languages);
  const certifications = getSafeArray(data.certifications);

  const fullName =
    personalInfo.fullName || personalInfo.name || 'Your Name';
  const headline =
    personalInfo.headline || personalInfo.jobTitle || 'Professional Title';

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.website,
    personalInfo.github,
  ].filter(Boolean);

  return (
    <div className="mx-auto w-full max-w-[850px] bg-white px-10 py-10 text-slate-900 shadow-sm print:max-w-none print:shadow-none">
      <header className="pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {fullName}
        </h1>
        <p className="mt-2 text-base text-slate-600">{headline}</p>

        {contactItems.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
            {contactItems.map((item) => (
              <span key={item} className="break-all sm:break-normal">
                {item}
              </span>
            ))}
          </div>
        )}
      </header>

      {summary && (
        <section className="mt-6 border-t border-slate-200 pt-6">
          <SectionHeading>Summary</SectionHeading>
          <p className="mt-3 text-sm leading-7 text-slate-700">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mt-6 border-t border-slate-200 pt-6">
          <SectionHeading>Experience</SectionHeading>
          <div className="mt-4 space-y-6">
            {experience.map((item, index) => (
              <ExperienceItem
                key={`${item.role || item.title || 'experience'}-${index}`}
                item={item}
              />
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mt-6 border-t border-slate-200 pt-6">
          <SectionHeading>Education</SectionHeading>
          <div className="mt-4 space-y-6">
            {education.map((item, index) => (
              <EducationItem
                key={`${item.degree || item.school || 'education'}-${index}`}
                item={item}
              />
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-6 border-t border-slate-200 pt-6">
          <SectionHeading>Projects</SectionHeading>
          <div className="mt-4 space-y-6">
            {projects.map((item, index) => (
              <ProjectItem
                key={`${item.name || item.title || 'project'}-${index}`}
                item={item}
              />
            ))}
          </div>
        </section>
      )}

      {(skills.length > 0 || languages.length > 0 || certifications.length > 0) && (
        <section className="mt-6 border-t border-slate-200 pt-6">
          <SectionHeading>Additional Information</SectionHeading>

          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {skills.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Skills
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {skills.join(', ')}
                </p>
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Languages
                </h3>
                <div className="mt-3 space-y-2">
                  {languages.map((item, index) => (
                    <LanguageItem
                      key={`${typeof item === 'string' ? item : item.name || 'language'}-${index}`}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Certifications
                </h3>
                <div className="mt-3 space-y-3">
                  {certifications.map((item, index) => (
                    <CertificationItem
                      key={`${typeof item === 'string' ? item : item.title || 'certification'}-${index}`}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Minimal;