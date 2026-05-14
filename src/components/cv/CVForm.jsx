import useCVFormState from '../../hooks/useCVFormState';

import CVFormEducationSection from './CVFormEducationSection';
import CVFormExperienceSection from './CVFormExperienceSection';
import CVFormLanguagesSection from './CVFormLanguagesSection';
import CVFormProjectsSection from './CVFormProjectsSection';
import {
  errorTextClasses,
  getInputClasses,
  helperTextClasses,
  inputClasses,
  labelClasses,
} from './cvFormStyles';

const CVForm = () => {
  const {
    safeCVData,
    isNameInvalid,
    isEmailInvalid,
    handleChange,
    handleListChange,
    addItem,
    removeItem,
  } = useCVFormState();

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
            className={getInputClasses(isNameInvalid)}
            autoComplete="name"
          />
          {isNameInvalid && (
            <p className={errorTextClasses}>
              Name must be at least 3 characters.
            </p>
          )}
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
            autoComplete="organization-title"
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
            className={getInputClasses(isEmailInvalid)}
            autoComplete="email"
          />
          {isEmailInvalid && (
            <p className={errorTextClasses}>Enter a valid email address.</p>
          )}
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
            autoComplete="tel"
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
            autoComplete="address-level2"
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
        <p className={helperTextClasses}>Separate each skill with a comma.</p>
      </div>

      <CVFormExperienceSection
        items={safeCVData.experience}
        onAdd={() => addItem('experience')}
        onRemove={(index) => removeItem('experience', index)}
        onFieldChange={(index, field, value) =>
          handleListChange('experience', index, field, value)
        }
      />

      <CVFormEducationSection
        items={safeCVData.education}
        onAdd={() => addItem('education')}
        onRemove={(index) => removeItem('education', index)}
        onFieldChange={(index, field, value) =>
          handleListChange('education', index, field, value)
        }
      />

      <CVFormLanguagesSection
        items={safeCVData.languages}
        onAdd={() => addItem('languages')}
        onRemove={(index) => removeItem('languages', index)}
        onFieldChange={(index, field, value) =>
          handleListChange('languages', index, field, value)
        }
      />

      <CVFormProjectsSection
        items={safeCVData.projects}
        onAdd={() => addItem('projects')}
        onRemove={(index) => removeItem('projects', index)}
        onFieldChange={(index, field, value) =>
          handleListChange('projects', index, field, value)
        }
      />
    </div>
  );
};

export default CVForm;