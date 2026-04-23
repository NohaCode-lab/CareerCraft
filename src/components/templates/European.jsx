const SectionHeading = ({ children }) => {
  return (
    <h2 className="border-b border-slate-300 pb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-700">
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
  const dateRange =
    item.duration || formatDateRange(item.startDate, item.endDate);
  const description = item.description || '';
  const highlights = getSafeArray(item.highlights);

  return (
    <article className="break-inside-avoid">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm font-medium text-slate-700">{company}</p>
          {location && <p className="mt-1 text-sm text-slate-500">{location}</p>}
        </div>

        {dateRange && (
          <p className="shrink-0 text-xs font-medium uppercase tracking-wide text-slate-500">
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
  const dateRange =
    item.year || item.duration || formatDateRange(item.startDate, item.endDate);
  const description = item.description || '';

  return (
    <article className="break-inside-avoid">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-slate-900">{degree}</h3>
          <p className="mt-1 text-sm font-medium text-slate-700">{institution}</p>
          {location && <p className="mt-1 text-sm text-slate-500">{location}</p>}
        </div>

        {dateRange && (
          <p className="shrink-0 text-xs font-medium uppercase tracking-wide text-slate-500">
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
    <article className="break-inside-avoid">
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

const CertificationItem = ({ item }) => {
  if (typeof item === 'string') {
    return <p className="text-sm leading-6 text-slate-700">{item}</p>;
  }

  const title = item.title || 'Certification';
  const issuer = item.issuer || '';
  const date = item.date || '';

  return (
    <div className="break-inside-avoid">
      <p className="text-sm font-medium text-slate-800">{title}</p>
      {(issuer || date) && (
        <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
          {[issuer, date].filter(Boolean).join(' • ')}
        </p>
      )}
    </div>
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

const European = ({ data = {} }) => {
  const personalInfo = {
    fullName: data.fullName || '',
    name: data.fullName || '',
    jobTitle: data.title || '',
    headline: data.title || '',
    email: data.email || '',
    phone: data.phone || '',
    location: data.location || '',
    linkedin: data.linkedin || '',
    website: data.website || '',
    github: data.github || '',
    ...(data.personalInfo || {}),
  };

  const summary = data.summary || '';

  const experience = getSafeArray(data.experience);
  const education = getSafeArray(data.education);

  const skills =
    typeof data.skills === 'string'
      ? data.skills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean)
      : getSafeArray(data.skills);

  const languages = getSafeArray(data.languages);
  const certifications = getSafeArray(data.certifications);
  const projects = getSafeArray(data.projects);

  const fullName = personalInfo.fullName || personalInfo.name || 'Your Name';
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
    <div className="mx-auto w-full max-w-[900px] bg-white px-10 py-10 text-slate-900 shadow-sm print:max-w-none print:shadow-none">
      <header className="border-b border-slate-300 pb-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {fullName}
            </h1>
            <p className="mt-2 text-base font-medium text-slate-600">
              {headline}
            </p>
          </div>
        </div>

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
        <section className="mt-7">
          <SectionHeading>Professional Summary</SectionHeading>
          <p className="mt-4 text-sm leading-7 text-slate-700">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mt-7">
          <SectionHeading>Work Experience</SectionHeading>
          <div className="mt-5 space-y-6">
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
        <section className="mt-7">
          <SectionHeading>Education</SectionHeading>
          <div className="mt-5 space-y-6">
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
        <section className="mt-7">
          <SectionHeading>Projects</SectionHeading>
          <div className="mt-5 space-y-6">
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
        <section className="mt-7">
          <SectionHeading>Additional Information</SectionHeading>

          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {skills.length > 0 && (
              <div className="break-inside-avoid">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Skills
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {skills.join(', ')}
                </p>
              </div>
            )}

            {languages.length > 0 && (
              <div className="break-inside-avoid">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Languages
                </h3>
                <div className="mt-3 space-y-2">
                  {languages.map((item, index) => (
                    <LanguageItem
                      key={`${
                        typeof item === 'string'
                          ? item
                          : item.name || 'language'
                      }-${index}`}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div className="break-inside-avoid">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Certifications
                </h3>
                <div className="mt-3 space-y-3">
                  {certifications.map((item, index) => (
                    <CertificationItem
                      key={`${
                        typeof item === 'string'
                          ? item
                          : item.title || 'certification'
                      }-${index}`}
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

export default European;