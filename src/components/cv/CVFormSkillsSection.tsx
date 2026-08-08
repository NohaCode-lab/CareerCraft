import React from 'react';
import {
  helperTextClasses,
  inputClasses,
  labelClasses,
} from './cvFormStyles';

interface CVFormSkillsSectionProps {
  skills: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CVFormSkillsSection: React.FC<CVFormSkillsSectionProps> = ({ skills, onChange }) => {
  return (
    <div className="mt-4">
      <label htmlFor="skills" className={labelClasses}>
        Skills
      </label>
      <textarea
        id="skills"
        name="skills"
        placeholder="HTML, CSS, JavaScript, React, Tailwind CSS"
        value={skills}
        onChange={onChange}
        rows={3}
        className={inputClasses}
      />
      <p className={helperTextClasses}>Separate each skill with a comma.</p>
    </div>
  );
};

export default CVFormSkillsSection;
