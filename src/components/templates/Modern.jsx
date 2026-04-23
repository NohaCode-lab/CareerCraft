const SectionHeading = ({ children }) => {
  return (
    <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
      {children}
    </h2>
  );
};

const formatDateRange = (startDate, endDate) => {
  if (!startDate && !endDate) return '';
  if (startDate && endDate) return `${startDate} - ${endDate}`;
  return startDate || endDate || '';
};

const getSafeArray = (value) => {
  return Array.isArray(value) ? value : [];
};

const renderBulletList = (items) => {
  const safeItems = getSafeArray(items).filter(Boolean);
  if (safeItems.length === 0) return null;

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
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm break-inside-avoid">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm font-medium text-slate-700">{company}</p>
          {location && <p className="text-sm text-slate-500">{location}</p>}
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

  const dateRange =
    item.year || item.duration || formatDateRange(item.startDate, item.endDate);

  const description = item.description || '';

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm break-inside-avoid">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900">{degree}</h3>
          <p className="mt-1 text-sm font-medium text-slate-700">
            {institution}
          </p>
          {location && <p className="text-sm text-slate-500">{location}</p>}
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
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm break-inside-avoid">
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
    return <p className="text-sm text-slate-700">{item}</p>;
  }

  return (
    <p className="text-sm text-slate-700">
      {item.name}
      {item.level ? ` — ${item.level}` : ''}
    </p>
  );
};

const CertificationItem = ({ item }) => {
  if (typeof item === 'string') {
    return <p className="text-sm text-slate-700">{item}</p>;
  }

  return (
    <div>
      <p className="text-sm font-medium text-slate-800">
        {item.title || 'Certification'}
      </p>
      {(item.issuer || item.date) && (
        <p className="text-xs text-slate-500 uppercase">
          {[item.issuer, item.date].filter(Boolean).join(' • ')}
        </p>
      )}
    </div>
  );
};

const Modern = ({ data = {} }) => {
  // 🔥 Adapter (أهم جزء)
  const personalInfo = {
    fullName: data.fullName,
    name: data.fullName,
    jobTitle: data.title,
    headline: data.title,
    email: data.email,
    phone: data.phone,
    location: data.location,
    linkedin: data.linkedin,
    website: data.website,
    github: data.github,
    ...data.personalInfo,
  };

  const summary = data.summary || '';

  const experience = getSafeArray(data.experience);
  const education = getSafeArray(data.education);
  const projects = getSafeArray(data.projects);

  // 🔥 Fix skills (string → array)
  const skills =
    typeof data.skills === 'string'
      ? data.skills.split(',').map((s) => s.trim()).filter(Boolean)
      : getSafeArray(data.skills);

  const languages = getSafeArray(data.languages);
  const certifications = getSafeArray(data.certifications);

  const fullName = personalInfo.fullName || 'Your Name';
  const headline = personalInfo.jobTitle || 'Professional Title';

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.website,
    personalInfo.github,
  ].filter(Boolean);

  return (
    <div className="mx-auto w-full max-w-[980px] overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-sm print:max-w-none print:rounded-none print:border-0 print:shadow-none">
      <header className="border-b bg-slate-900 px-10 py-10 text-white">
        <h1 className="text-3xl font-bold">{fullName}</h1>
        <p className="mt-2 text-slate-300">{headline}</p>

        <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
          {contactItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </header>

      <div className="grid lg:grid-cols-[1.65fr_0.95fr]">
        <main className="p-8">
          {summary && (
            <section>
              <SectionHeading>Professional Summary</SectionHeading>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                {summary}
              </p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="mt-8">
              <SectionHeading>Experience</SectionHeading>
              <div className="mt-5 space-y-5">
                {experience.map((item, i) => (
                  <ExperienceItem key={i} item={item} />
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="mt-8">
              <SectionHeading>Projects</SectionHeading>
              <div className="mt-5 space-y-5">
                {projects.map((item, i) => (
                  <ProjectItem key={i} item={item} />
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="mt-8">
              <SectionHeading>Education</SectionHeading>
              <div className="mt-5 space-y-5">
                {education.map((item, i) => (
                  <EducationItem key={i} item={item} />
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className="bg-slate-50 p-8 border-l">
          {skills.length > 0 && (
            <section>
              <SectionHeading>Skills</SectionHeading>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {skills.join(', ')}
              </p>
            </section>
          )}

          {languages.length > 0 && (
            <section className="mt-6">
              <SectionHeading>Languages</SectionHeading>
              <div className="mt-3 space-y-2">
                {languages.map((item, i) => (
                  <LanguageItem key={i} item={item} />
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section className="mt-6">
              <SectionHeading>Certifications</SectionHeading>
              <div className="mt-3 space-y-2">
                {certifications.map((item, i) => (
                  <CertificationItem key={i} item={item} />
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