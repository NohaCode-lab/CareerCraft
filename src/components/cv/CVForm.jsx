import useLocalStorage from '../../hooks/useLocalStorage';

const defaultCV = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  skills: '',
  experience: [],
  education: [],
  languages: [],
  projects: [],
};

const inputClasses =
  'w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20';

const labelClasses = 'mb-2 block text-sm font-medium text-slate-700';

const sectionCardClasses = 'rounded-xl border border-slate-200 bg-slate-50 p-4';

const createExperienceItem = () => ({
  id: Date.now() + Math.random(),
  role: '',
  company: '',
  duration: '',
  description: '',
});

const createEducationItem = () => ({
  id: Date.now() + Math.random(),
  degree: '',
  school: '',
  year: '',
});

const createLanguageItem = () => ({
  id: Date.now() + Math.random(),
  name: '',
  level: '',
});

const createProjectItem = () => ({
  id: Date.now() + Math.random(),
  title: '',
  description: '',
  link: '',
});

const CVForm = () => {
  const [cvData, setCvData] = useLocalStorage('cvData', defaultCV);

  const safeCVData = {
    ...defaultCV,
    ...(cvData || {}),
    experience: Array.isArray(cvData?.experience) ? cvData.experience : [],
    education: Array.isArray(cvData?.education) ? cvData.education : [],
    languages: Array.isArray(cvData?.languages) ? cvData.languages : [],
    projects: Array.isArray(cvData?.projects) ? cvData.projects : [],
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCvData((previousData) => ({
      ...(previousData || defaultCV),
      [name]: value,
    }));
  };

  const handleListChange = (section, index, field, value) => {
    setCvData((previousData) => {
      const currentData = previousData || defaultCV;
      const updatedItems = [...(currentData[section] || [])];

      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };

      return {
        ...currentData,
        [section]: updatedItems,
      };
    });
  };

  const addItem = (section) => {
    const factories = {
      experience: createExperienceItem,
      education: createEducationItem,
      languages: createLanguageItem,
      projects: createProjectItem,
    };

    const createItem = factories[section];

    if (!createItem) {
      return;
    }

    setCvData((previousData) => {
      const currentData = previousData || defaultCV;

      return {
        ...currentData,
        [section]: [...(currentData[section] || []), createItem()],
      };
    });
  };

  const removeItem = (section, index) => {
    setCvData((previousData) => {
      const currentData = previousData || defaultCV;
      const updatedItems = [...(currentData[section] || [])];

      updatedItems.splice(index, 1);

      return {
        ...currentData,
        [section]: updatedItems,
      };
    });
  };

  return (
    <div className="card-base p-6">
      <div className="mb-6">
        <h2 className="section-title">CV Information</h2>
        <p className="mt-2 text-sm text-slate-600">
          Add your core details to build a clean and professional resume.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClasses}>
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={safeCVData.fullName}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="title" className={labelClasses}>
            Job Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Front-End Developer"
            value={safeCVData.title}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="name@example.com"
            value={safeCVData.email}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="+20 100 000 0000"
            value={safeCVData.phone}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="location" className={labelClasses}>
            Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Cairo, Egypt"
            value={safeCVData.location}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="summary" className={labelClasses}>
          Professional Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          placeholder="Write a short professional summary that highlights your strengths, experience, and career focus."
          value={safeCVData.summary}
          onChange={handleChange}
          rows={4}
          className={inputClasses}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="skills" className={labelClasses}>
          Skills
        </label>
        <textarea
          id="skills"
          name="skills"
          placeholder="HTML, CSS, JavaScript, React, Tailwind CSS"
          value={safeCVData.skills}
          onChange={handleChange}
          rows={3}
          className={inputClasses}
        />
        <p className="mt-2 text-xs text-slate-500">
          Separate each skill with a comma.
        </p>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Experience</h3>
          <button
            type="button"
            onClick={() => addItem('experience')}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Add Experience
          </button>
        </div>

        {safeCVData.experience.length > 0 ? (
          <div className="space-y-4">
            {safeCVData.experience.map((item, index) => (
              <div key={item.id || index} className={sectionCardClasses}>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">
                    Experience #{index + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem('experience', index)}
                    className="text-sm font-medium text-red-600 transition hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClasses}>Role</label>
                    <input
                      type="text"
                      placeholder="Front-End Developer"
                      value={item.role || ''}
                      onChange={(event) =>
                        handleListChange(
                          'experience',
                          index,
                          'role',
                          event.target.value
                        )
                      }
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Company</label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={item.company || ''}
                      onChange={(event) =>
                        handleListChange(
                          'experience',
                          index,
                          'company',
                          event.target.value
                        )
                      }
                      className={inputClasses}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClasses}>Duration</label>
                    <input
                      type="text"
                      placeholder="Jan 2024 - Present"
                      value={item.duration || ''}
                      onChange={(event) =>
                        handleListChange(
                          'experience',
                          index,
                          'duration',
                          event.target.value
                        )
                      }
                      className={inputClasses}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClasses}>Description</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your responsibilities and achievements."
                      value={item.description || ''}
                      onChange={(event) =>
                        handleListChange(
                          'experience',
                          index,
                          'description',
                          event.target.value
                        )
                      }
                      className={inputClasses}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No experience added yet.
          </p>
        )}
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Education</h3>
          <button
            type="button"
            onClick={() => addItem('education')}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Add Education
          </button>
        </div>

        {safeCVData.education.length > 0 ? (
          <div className="space-y-4">
            {safeCVData.education.map((item, index) => (
              <div key={item.id || index} className={sectionCardClasses}>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">
                    Education #{index + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem('education', index)}
                    className="text-sm font-medium text-red-600 transition hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClasses}>Degree</label>
                    <input
                      type="text"
                      placeholder="Bachelor of Computer Science"
                      value={item.degree || ''}
                      onChange={(event) =>
                        handleListChange(
                          'education',
                          index,
                          'degree',
                          event.target.value
                        )
                      }
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>School</label>
                    <input
                      type="text"
                      placeholder="University Name"
                      value={item.school || ''}
                      onChange={(event) =>
                        handleListChange(
                          'education',
                          index,
                          'school',
                          event.target.value
                        )
                      }
                      className={inputClasses}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClasses}>Year</label>
                    <input
                      type="text"
                      placeholder="2024"
                      value={item.year || ''}
                      onChange={(event) =>
                        handleListChange(
                          'education',
                          index,
                          'year',
                          event.target.value
                        )
                      }
                      className={inputClasses}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No education added yet.
          </p>
        )}
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Languages</h3>
          <button
            type="button"
            onClick={() => addItem('languages')}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Add Language
          </button>
        </div>

        {safeCVData.languages.length > 0 ? (
          <div className="space-y-4">
            {safeCVData.languages.map((item, index) => (
              <div key={item.id || index} className={sectionCardClasses}>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">
                    Language #{index + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem('languages', index)}
                    className="text-sm font-medium text-red-600 transition hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClasses}>Language</label>
                    <input
                      type="text"
                      placeholder="English"
                      value={item.name || ''}
                      onChange={(event) =>
                        handleListChange(
                          'languages',
                          index,
                          'name',
                          event.target.value
                        )
                      }
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Level</label>
                    <input
                      type="text"
                      placeholder="Fluent"
                      value={item.level || ''}
                      onChange={(event) =>
                        handleListChange(
                          'languages',
                          index,
                          'level',
                          event.target.value
                        )
                      }
                      className={inputClasses}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No languages added yet.
          </p>
        )}
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Projects</h3>
          <button
            type="button"
            onClick={() => addItem('projects')}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Add Project
          </button>
        </div>

        {safeCVData.projects.length > 0 ? (
          <div className="space-y-4">
            {safeCVData.projects.map((item, index) => (
              <div key={item.id || index} className={sectionCardClasses}>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">
                    Project #{index + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem('projects', index)}
                    className="text-sm font-medium text-red-600 transition hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className={labelClasses}>Project Title</label>
                    <input
                      type="text"
                      placeholder="Portfolio Website"
                      value={item.title || ''}
                      onChange={(event) =>
                        handleListChange(
                          'projects',
                          index,
                          'title',
                          event.target.value
                        )
                      }
                      className={inputClasses}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClasses}>Description</label>
                    <textarea
                      rows={4}
                      placeholder="Describe the project, your role, and the technologies used."
                      value={item.description || ''}
                      onChange={(event) =>
                        handleListChange(
                          'projects',
                          index,
                          'description',
                          event.target.value
                        )
                      }
                      className={inputClasses}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClasses}>Project Link</label>
                    <input
                      type="url"
                      placeholder="https://github.com/username/project"
                      value={item.link || ''}
                      onChange={(event) =>
                        handleListChange(
                          'projects',
                          index,
                          'link',
                          event.target.value
                        )
                      }
                      className={inputClasses}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No projects added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default CVForm;