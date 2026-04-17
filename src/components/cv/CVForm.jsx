import useLocalStorage from '../../hooks/useLocalStorage';

const defaultCV = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  skills: '',
};

const inputClasses =
  'w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20';

const labelClasses = 'mb-2 block text-sm font-medium text-slate-700';

const CVForm = () => {
  const [cvData, setCvData] = useLocalStorage('cvData', defaultCV);

  const safeCVData = cvData || defaultCV;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCvData((previousData) => ({
      ...(previousData || defaultCV),
      [name]: value,
    }));
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
    </div>
  );
};

export default CVForm;