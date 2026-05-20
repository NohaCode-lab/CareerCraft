import useCVFormState from '../../hooks/useCVFormState';

import CVFormEducationSection from './CVFormEducationSection';
import CVFormExperienceSection from './CVFormExperienceSection';
import CVFormLanguagesSection from './CVFormLanguagesSection';
import CVFormProfileSection from './CVFormProfileSection';
import CVFormProjectsSection from './CVFormProjectsSection';
import CVFormSkillsSection from './CVFormSkillsSection';

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

      <CVFormProfileSection
        fullName={safeCVData.fullName}
        title={safeCVData.title}
        email={safeCVData.email}
        phone={safeCVData.phone}
        location={safeCVData.location}
        summary={safeCVData.summary}
        isNameInvalid={isNameInvalid}
        isEmailInvalid={isEmailInvalid}
        onChange={handleChange}
      />

      <CVFormSkillsSection
        skills={safeCVData.skills}
        onChange={handleChange}
      />

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
