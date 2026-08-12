import React from 'react';
import useLanguage from '../../hooks/useLanguage';
import { getTranslationPack } from '../../config/translations';
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
  const { language } = useLanguage();
  const t = getTranslationPack(language);

  return (
    <div className="mt-4">
      <label htmlFor="skills" className={labelClasses}>
        {t.skills}
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
      <p className={helperTextClasses}>{t.skillsHelperText}</p>
    </div>
  );
};

export default CVFormSkillsSection;
